import createConnection from '../database';
import { getConnection } from 'typeorm';
import { Request } from 'express';
import { makeMockResponse } from '../assets/mocks/mockResponse';
import { UpdateUserController } from './UpdateUserController';
import { FakeData } from '../assets/fakeData';

describe('UpdateUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        connection.query('DELETE FROM users')
        connection.close()
    })

    const fakeData = new FakeData();

    it('It must return status 204 when user be edited', async () => {
        
        const mockUser = await fakeData.createUser()
        
        const updateUserController = new UpdateUserController()

        const request = {
            body: {
                id: mockUser.id,
                nome: 'Another name',
                email: 'email@email.com.br'
            }
        } as Request

        const response = makeMockResponse();

        await updateUserController.handle(request, response)

        expect(response.state.status).toBe(204)
    })
})