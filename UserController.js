const bcrypt =  require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const users = []

const JWT_SECRET = 'KEWLJDEWJIUDEWDUWEHDHD';

async function signup (request , reply) {
    try {
        const {email , password} = request.body;

        if (users.find(user=> user.email ===email)){
            return reply.code(400).send({message:'USER ALREADY EXISTS'})
        }
   
        const hashedPassword = await bcrypt.hash(password , 6);

        const newUser = {
            id:users.length+1,
            email,
            password:hashedPassword
        }

        users.push(newUser)


       reply.code(201).send({message: 'User created successfully'});

    } catch (error) {
        reply.code(500).send({message: 'Internal server error '})
    }
}


async function login (request , reply){
    try {
        const {email , password} =  request.body
        const user =  users.find (users => users.email === email)

        if (!user){
            return reply.code(400).send({message: 'Invalid credentials'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return reply.code(400).send({ message: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    
        reply.code(200).send({ token });
      } catch (error) {
        reply.code(500).send({ message: 'Internal server error' });
      }
    }
module.exports = {signup , login}