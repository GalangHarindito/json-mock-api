const { faker } = require('@faker-js/faker');
const fs = require('fs')


const users = [];
for(let i=1;i<=100;i++){
    const user = {
        id: i,
        first_name: faker.person.fullName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        gender: faker.person.sex()
    }

    users.push(user)
}

const orders = [];
for(let i=1;i<=100;i++){
    const order = {
        id: i,
        product: faker.commerce.product(),
        price: faker.commerce.price(),
        amount: Math.floor(Math.random() * 50)
    }

    orders.push(order)
}

fs.writeFileSync('db.json', JSON.stringify({
    users,
    orders
}, null, 2))