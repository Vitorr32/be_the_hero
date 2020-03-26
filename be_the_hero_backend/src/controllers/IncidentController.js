const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
            .limit(5)
            .offset(5 * (page - 1))
            .select([
                'incidents.*', 
                'ngos.name', 
                'ngos.email', 
                'ngos.contact', 
                'ngos.city',
                'ngos.state',
                'ngos.country'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, target_value } = request.body;

        const ngo_id = request.headers.authorization;

        const result = await connection('incidents').insert({
            title,
            description,
            target_value,
            current_value: 0,
            ngo_id
        })

        return response.json({ id: result[0] });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ngo_id = request.headers.authorization;

        const incident = await connection('incidents').where('id', id).select('ngo_id').first();

        if (incident.ngo_id !== ngo_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}