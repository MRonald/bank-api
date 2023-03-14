const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const custumers = [];

app.use(express.json());

// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.params;

    const custumer = custumers.find((custumer) => custumer.cpf === cpf);

    if (!custumer) {
        return response.status(400).json({ error: 'Customer not found' });
    }

    request.custumer = custumer;

    return next();
}

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

app.get('/:cpf/statement', verifyIfExistsAccountCPF, (request, response) => {
    const { custumer } = request;

    return response.json(custumer.statement);
});

app.listen(3333);