const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRepository =
    require('../repository/auth.repository');

const signUp = async (signUpRequest) => {

    // Check if user already exists
    const existingUser =
        await authRepository.findByEmail(
            signUpRequest.email
        );

    if (existingUser) {

        throw {
            statusCode: 409,
            message:
                'User already registered. Please sign in.'
        };

    }

    // Determine role
    let role = 'USER';

    if (
        signUpRequest.email.endsWith('@ai.com')
    ) {
        role = 'ADMIN';
    }

    // Hash password
    const encodedPassword =
        await bcrypt.hash(
            signUpRequest.password,
            10
        );

    // Save user
    const result =
        await authRepository.saveUser(
            signUpRequest.name,
            signUpRequest.email,
            signUpRequest.phone,
            role,
            encodedPassword
        );

    if (!result) {

        throw {
            statusCode: 500,
            message:
                'Something went wrong while registering user.'
        };

    }

    return {
        status: 'SUCCESS',
        message: 'User registered successfully'
    };
};

const signIn = async (loginRequest) => {

    // Check if user exists
    const user =
        await authRepository.findByEmail(
            loginRequest.email
        );

    if (!user) {

        throw {
            statusCode: 404,
            message: 'User not registered'
        };

    }

    // Validate password
    const isValid =
        await bcrypt.compare(
            loginRequest.password,
            user.password
        );

    if (!isValid) {

        throw {
            statusCode: 401,
            message: 'Invalid password'
        };

    }

    // Generate JWT
    const token =
        jwt.sign(
            {
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

    return {
        status: 'SUCCESS',
        message: 'User logged in successfully',
        token,
        email: user.email,
        role: user.role
    };
};

module.exports = {
    signUp,
    signIn
};