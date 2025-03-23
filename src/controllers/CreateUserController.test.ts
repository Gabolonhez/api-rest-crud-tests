import { getConnection } from 'typeorm';
import createConnection from '../database'
import { CreateUserController } from "./CreateUserController";
import { Request } from 'express'
import  { makeMockResponse } from '../assets/mocks/mockResponse'

describe('CreateUserController', () => {
    beforeAll( async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })
    afterAll (async () => {
        const connection = getConnection()
        await connection.query('DELETE FROM users')
        await connection.close()
    })

    const createUserController = new CreateUserController();
    const response = makeMockResponse()

    it("Must return status 201 when user be created", async () => {
        const request = {
            body: {
                name: 'Some user',
                email: 'email@gmail.com'
            }
        } as Request
        await createUserController.handle(request, response)
        expect(response.state.status).toBe(201)
    })
    it("Must return status 400 when name not informed", async() => {
        const request = {
            body: {
                name: '',
                email: 'email@gmail.com'
            }
        } as Request
        await createUserController.handle(request, response)
        expect(response.state.status).toBe(400)
    })
    it("Must return status 201 when e-mail do not be informed", async () => {
        const request = {
            body: {
                name: 'Test Testing',
                email: ''
            }
        } as Request
        await createUserController.handle(request, response)
        expect(response.state.status).toBe(200)
    })
})