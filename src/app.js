const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin.route');
const userRoutes = require('./routes/user.route');

const app = express();

/*
 * Middleware
 */

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

/*
 * Health Check
 */

app.get('/', (req, res) => {

    res.json({
        status: 'SUCCESS',
        message: 'Airlines API working successfully'
    });

});

/*
 * Routes
 */

app.use('/auth', authRoutes);

app.use('/admin', adminRoutes);

app.use('/user', userRoutes);

/*
 * 404 Handler
 */

app.use((req, res) => {

    res.status(404).json({
        status: 'ERROR',
        message: 'Resource Not Found'
    });

});

/*
 * Global Error Handler
 */

app.use((err, req, res, next) => {

    console.error(err);

    res.status(
        err.statusCode || 500
    ).json({
        status: 'ERROR',
        message:
            err.message ||
            'Internal Server Error'
    });

});

module.exports = app;