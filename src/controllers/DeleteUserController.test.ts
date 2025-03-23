import createConnection from '../database';
import { getConnection } from 'typeorm';
import { makeMockResponse } from '../assets/mocks/mockResponse';
import { makeMockRequest } from '../assets/mocks/mockRequest';
import { FakeData } from '../assets/fakeData';
import { DeleteUserController } from './DeleteUserController';

describe('DeleteUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        connection.close()
    })

    const fakeData = new FakeData();

    it('It must return status 204 when the user be deleted', async() => {
        const mockUser = await fakeData.createUser();

        const deleteUserController = new DeleteUserController();

        const request = makeMockRequest({
            params: {
                id: mockUser.id
            }
        });

        const response = makeMockResponse()

        await deleteUserController.handle(request, response);

        expect(response.state.status).toBe(204)
    })
})