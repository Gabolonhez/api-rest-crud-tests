import createConnection from '../database';
import { getConnection } from 'typeorm'
import { FakeData } from '../assets/fakeData';
import { DeleteUserService } from './DeleteUserService';

describe('DeleteUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.close();
    })

    const fakeData = new FakeData();

    it('It must return an empty array when deleted', async () => {
        const mockUser = await fakeData.createUser();

        const deleteUserService = new DeleteUserService();

        const result = await deleteUserService.execute({ id: mockUser.id })

        expect(result).toHaveLength(0)
    })
})