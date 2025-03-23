import { Response } from 'express';

export type MockResponse = Response & {
    state: {
        status?: number
        json?: TResult | unknown
    }
}

export function makeMockResponse<TResult>() {
    const response = {
        state: {}
    } as MockResponse<TResult>;
    response.status = (status: number) => {
        response.status.status = status;
        return response
    }
    response.json = (json: TResult) => {
        response.state.json = json;
        return response
    }
    return response
 }