import { Request, Response } from 'express';
import Joi from 'joi';
const jwt = require('jsonwebtoken');

class AuthenticateController {

    async index(request: Request, response: Response) {
        try {
            return response.json([{ id: 1, nome: 'teste' }]);
        } catch (err) {
            console.log(err);
            return response.sendStatus(404).json({ message: err });
        }
    }

    async show(request: Request, response: Response) {
        try {
            return response.json({ message: "aqui nao teve validação" });
        } catch (err) {
            console.log(err);
            return response.sendStatus(401).json({ message: err });
        }
    }

    async create(request: Request, response: Response) {
        try {
            const schema = {
                username: Joi.string().min(1),
                password: Joi.string().min(1),
            };

            const {
                username,
                password
            } = request.body;

            const { error } = Joi.validate(request.body, schema);
            if (error) return response.send(error.details[0].message);

            let token = null;

            if (username === 'teste' && password === 'teste') {
                token = jwt.sign({ username }, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });
            }

            return response.json({ token: token });
        } catch (err) {
            console.log(err);
            return response.sendStatus(404).json({ message: err });
        }
    }

}

export default AuthenticateController;