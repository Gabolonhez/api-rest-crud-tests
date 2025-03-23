import { getConnection } from 'typeorm';
import createConnection from '../database';
import { GetAllUserService } from './GetAllUserService';
import { FakeData } from '../assets/fakeData';

describe('GetAllUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query('DELETE FROM users')
        await connection.close()
    })

    const fakeData = new FakeData();

    it('It must return all registered users', async()=> {

        await fakeData.execute()

        const expectedResponse = [
            {
                nome: 'Some user',
                email: 'user@gmail.com',
            },
            {
                nome: 'Another user',
                email: ''
            }
        ]

        const getAllUserService = new GetAllUserService();

        const result = await getAllUserService.execute();

        expect(result).toMatchObject(expectedResponse)
    })
})