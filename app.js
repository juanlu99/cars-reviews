'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const { PORT } = process.env;
//Recibir datos como JSON en el body
app.use(express.json());
const carsRouter = require('./app/routes/cars-routes');

app.use('/api/v1/cars', carsRouter);
// app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
