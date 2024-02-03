const request = require("supertest");
const server = require("../index");

// Para realizar este trabajo usé la guía de estudio, las clases
// la página oficial de JEST y otras cosas de internet

describe("Operaciones CRUD de cafés", () => {

    // Punto 1. Devolver un código 200 y el tipo Array
    it('Se obtiene el Status (200) y el tipo (Array)', async () => {
        const response = await request(server).get('/cafes').send();
        const status = response.statusCode;

        expect(status).toBe(200);

        if (response.body.length > 0) {
            expect(response.body).toBeInstanceOf(Array);
        } else {
            expect(response.body).not.toBeInstanceOf(Array);
        }
    });

    // Punto 2. Obtener un 404 al usar un id que no existe
    it('Borrando un café inexistente...', async() => {
        const jwt = 'token';
        const id = 100; /* id inexistente */
        const response = await request(server).delete(`/cafes/${id}`).set('Authorization', jwt).send();

        expect(response.statusCode).toBe(404);
    });
    
    // Punto 3. Probar POST/cafes para agregar y obtener un código 201
    it('Enviando un nuevo café (POST)', async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = { id, nombre: 'Nuevo café'};
        const response = await request(server).post('/cafes').send(cafe);
        console.log('Usando el método POST...')

        const status = response.statusCode;
        // console.log(status)

        expect(status).toBe(201)/* verificación del código 201 pedido */

        expect(response.body).toContainEqual(cafe);/* verificación del contenido agregado */
    });

    // Punto 4. Probar PUT/cafes y obtener un código 400
    it('Devuelve 400 al intentar actualiza un id diferente a del payload', async () => {
        const response = await request(server).put('/cafes/1').send({
            id: 10,
            nombre: 'Café con piernas...'
        });

        expect(response.status).toBe(400)
    });

    // Otra forma puede ser (confieso que esto lo copié...)
    it('Develver un código 400', async () => {
        const { body } = await request(server).get('/cafes').send();
        const id = 100 /* este id no existe */
        const primerCafe = body[0];
        const { statusCode } = await request(server).put(`/cafes/${id}`).send(primerCafe)

        expect(statusCode).toBe(400)
    });

    // Hasta aquí, lo pedido en la prueba.

    // ---------------------------------------------------------------

    // Lo que viene, fue parte de la tutoría

    /*
    it('Obteniendo un café', async () => {
        // const { body } = await request(server).get('/cafes/4').send();
        const response = await request(server).get('/cafes/4').send();
        const cafe = response.body
        const status = response.statusCode

        if(response.statusCode == 200 || response.statusCode == '200' ) {
            console.log('Se encontró lo buscado...')
            expect(cafe).toBeInstanceOf(Object)
        } else {
            console.log('No ha sido hallado...');
            expect(status).toBe(404)
        }
    });



    it('Eliminando un café existente (DELETE)', async () => {
        const jwt = 'token';
        const idCafePorBorrar = 4;
        const { body: cafes } = await request(server).delete(`/cafes/${idCafePorBorrar}`).set('Authorization', jwt).send();
        const ids = cafes.map(c => c.id);

        expect(ids).not.toContain(idCafePorBorrar);
    });
    */


});
