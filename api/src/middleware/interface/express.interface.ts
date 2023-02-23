import { Request } from 'express';

export interface ExpressInterface extends Request {
    session: any; // define the session property type here
}
