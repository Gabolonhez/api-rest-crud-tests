import createConnection from '../database';
import { getConnection } from 'typeorm'
import { UpdateUserService } from './UpdateUserService';
import { FakeData } from '../assets/fakeData';

describe('UpdateUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query('DELETE FROM users')
        await connection.close();
    })

    const fakeData = new FakeData();

    it('It must edit the user name', async () => {

        const mockUser = await fakeData.createUser()

        const updateUserService = new UpdateUserService();

        const result = await updateUserService.execute({
            id: mockUser.id,
            name: 'Another user'
        });

        expect(result).toHaveLength(0);
    })
})