import { Response } from 'express'

import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from './consts'

export function badRequestResponse(response: Response) {
    response.statusCode = HTTP_BAD_REQUEST
    response.send("Bad Request")
}

export function internalServerError(response: Response) {
    response.statusCode = HTTP_INTERNAL_SERVER_ERROR
    response.send("Something went wrong")
}