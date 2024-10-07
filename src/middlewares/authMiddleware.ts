
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {

    const authenticated = true;

    authenticated ? next() : res.sendStatus(401).json({ message: "Acesso negado!" }); 

};
