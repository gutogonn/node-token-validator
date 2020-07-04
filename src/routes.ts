import express, { NextFunction } from 'express';
import JwtController from './controllers/jwtController';
import AuthenticateController from './controllers/authenticateController';
const routes = express.Router();

const authenticateController = new AuthenticateController();
const jwt = new JwtController();

routes.get('/', authenticateController.show);
routes.get('/clientes', jwt.verify, authenticateController.index);
routes.post('/login', authenticateController.create);

export default routes;