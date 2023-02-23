import { Request, Response, NextFunction } from 'express';
import {ExpressInterface} from "./interface/express.interface";
import {Injectable, NestMiddleware} from "@nestjs/common";

@Injectable()
export class WritterMiddleware implements NestMiddleware {
    use(req: ExpressInterface, res: Response, next: NextFunction) {

        // Check if user is logged in
        if (!req.session || !req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        // Check if user has role set to true
        const userRole = req.session.userRole;
        if (!userRole || userRole !== true) {
            return res.status(403).send('Forbidden');
        }

        // If user is authorized, call next middleware or endpoint
        next();
    }
}
