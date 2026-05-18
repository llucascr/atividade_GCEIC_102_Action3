import { Request, Response } from "express";

interface loginInput {
    login: string
    password: string
}

function isLoginInput(body: unknown): body is loginInput {
    return (
        typeof body === "object" &&
        body !== null &&
        typeof (body as loginInput).login === "string" &&
        typeof (body as loginInput).password === "string"
    )
}

export function login(req: Request, res: Response) {

    if (!isLoginInput(req.body)) {
        return res.status(400).json({ erro: "Corpo da requisição inválido" })
    }

    if (req.body.login === "usuario1" && req.body.password === "1234") {
        return res.status(200).json("Login efetuado com sucesso!")
    }

    return res.status(401).json(
        { erro: "Login ou senha de usuario incorreta" }
    )

}