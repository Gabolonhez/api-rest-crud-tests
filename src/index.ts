import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
import createConnection from './database';
import database from './database';

export default async(): Promise<Connection> => {
    const defaultOption = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOption, {
            database: process.env.NODE_ENV === 'test' ?
            './src/database/database.test.sqlite' :
            defaultOption.database
        })
    )
}
// CRUD:
// Create an user 
// Edit an user 
// Select an user 
// Delet an user

// HTTP:
// GET
// PUT/PATCH
// UPDATE
// DELETE