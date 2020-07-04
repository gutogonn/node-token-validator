import { Request, Response, NextFunction } from 'express';
import { DecodeOptions } from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

class JwtController {

    async verify(request: Request, response: Response, next: NextFunction) {
        try {
            const token = request.headers['x-access-token'];
            if (!token) return response.sendStatus(401).json({ message: 'No token provided.' });
            
            jwt.verify(token, process.env.SECRET, (err: Error, decoded: DecodeOptions) => {
                if (err) return response.sendStatus(500).json({ message: 'Failed to authenticate token.' });
                request.body = decoded.json;
                next();
            });
        } catch (err) {
            console.log(err);
            return response.sendStatus(404).json({ message: err });
        }
    }
}

export default JwtController;