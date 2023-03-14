const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const custumers = [];

app.use(express.json());

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const alreadExists = custumers.some((custumer) => custumer.cpf === cpf);

    if (alreadExists) return response.status(400).json({ error: 'Customer alread exists' });

    custumers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });

    console.log(custumers);

    return response.status(201).send();
});

app.get('/:cpf/statement', (request, response) => {
    const { cpf } = request.params;

    const custumer = custumers.find((custumer) => custumer.cpf === cpf);

    return response.json(custumer.statement);
});

app.listen(3333);