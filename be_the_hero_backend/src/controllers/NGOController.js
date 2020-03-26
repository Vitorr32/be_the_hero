const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngos').select('*');

        return response.json(ngos);
    },
    async create(request, response) {
        const { name, email, contact, city, state, country } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ngos').insert({
            id,
            name,
            email,
            contact,
            city,
            state,
            country
        })

        return response.json({ id });
    }
}