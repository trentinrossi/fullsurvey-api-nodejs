const { config } = require('dotenv');
const { ok } = require('assert');
const { join } = require('path');
const { handleError } = require('./_shared/handlers/errorHandler');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'dev';
ok(env === 'prod' || env === 'dev', 'Invalid environment');

const configPath = join(__dirname, './config', `.env.${env}`);
config({
  path: configPath,
});

const express = require('express');
const mongoose = require('mongoose');
const respondentRoutes = require('./features/respondent/respondent.routes');
const faker = require('faker');
const { fake } = require('faker');

const app = express();
const port = process.env.PORT || process.env.SERVICE_PORT;

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/respondent', respondentRoutes);

// Handlers Middlewares
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, '0.0.0.0');

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

  // Inserting fake data in mongo database for tests
  if (env === 'dev') {
    console.log('Inserting fake data in mongo...');
    faker.locale = 'pt_BR';
    const Respondent = require('./features/respondent/respondent.model');
    const service = require('./features/respondent/respondent.service');
    const cpfs = require('./mocks/cpf.list');    

    // service.deleteAll();

    for (let index = 0; index < 1000; index++) {
      const respondent = new Respondent({
        identifier: faker.random.number(),
        type: faker.random.arrayElement(cpfs,1),
        registration: faker.random.number(5000),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        cpf: faker.random.arrayElement(['EMPLOYEE', 'CANDIDATE', 'INTERN', 'VISITOR'],1),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        admissionDate: faker.date.past(),
        expContractExpiration: faker.date.past(),
        educationLevel: faker.name.jobDescriptor(),
        workstationId: faker.random.number(),
        workstationName: faker.name.jobArea(),
        positionName: faker.name.jobTitle(),
        companyId: faker.random.number(),
        companyName: faker.company.companyName(),
        branchId: faker.random.number(),
        branchName: faker.company.companySuffix(),
        visitDate: faker.date.past(),
        visitDescription: faker.lorem.sentence()    
      })
      
      service.insert(respondent);
    }    
  }

console.log(`Running on port ${port}`);

module.exports = app; // Only to use in tests
