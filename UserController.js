const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SERCRET = "KJDKWJDINDWKNDINDWLPJPJDWNKWNDI"


async function signup(request, reply) {
    try {
        const { email, password } = request.body;
        const db = this.mongo.db;

        
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return reply.code(400).send({ message: 'User already exists' });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

       
        await db.collection('users').insertOne({ email, password: hashedPassword });

        reply.code(201).send({ message: 'User created successfully' });
    } catch (error) {
        reply.code(500).send({ message: 'Internal server error' });
    }
}

async function login(request, reply) {
    try {
        const { email, password } = request.body;
        const db = this.mongo.db;

        
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return reply.code(400).send({ message: 'Invalid credentials' });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return reply.code(400).send({ message: 'Invalid credentials' });
        }

      
        const token = jwt.sign({ userId: user._id }, 'JWT_SERCRET');

        reply.code(200).send({ token });
    } catch (error) {
        reply.code(500).send({ message: 'Internal server error' });
    }
}

module.exports = { signup, login };
