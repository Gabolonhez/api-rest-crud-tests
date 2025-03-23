
import { Connection, createConnection, getConnetionOptions} from 'typeorm';

export default async(): Promise<Connection> => {
    const defaultOption = await getConnetionOptions();
    return createConnection(
        Object.assign(defaultOption)
    )
}