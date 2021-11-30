'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const { PORT } = process.env;
//Recibir datos como JSON en el body
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const carsRouter = require('./app/routes/cars-routes');
const usersRouter = require('./app/routes/users-routes');

app.use('/api/v1/cars', carsRouter);
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
