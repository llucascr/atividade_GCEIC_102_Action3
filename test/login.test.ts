import { Request, Response } from 'express';
import { login } from '../src/controllers/login';

const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockRequest = (body: unknown): Request =>
  ({ body } as Request);

describe('login', () => {
  describe('sucesso (200)', () => {
    it('responde com 200 e mensagem de sucesso quando login e senha estão corretos', () => {
      const req = mockRequest({ login: 'usuario1', password: '1234' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('Login efetuado com sucesso!');
    });
  });

  describe('erro de autenticação (401)', () => {
    it('responde com 401 quando o login está incorreto', () => {
      const req = mockRequest({ login: 'usuarioErrado', password: '1234' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Login ou senha de usuario incorreta',
      });
    });

    it('responde com 401 quando a senha está incorreta', () => {
      const req = mockRequest({ login: 'usuario1', password: 'senhaErrada' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Login ou senha de usuario incorreta',
      });
    });

    it('responde com 401 quando login e senha estão incorretos', () => {
      const req = mockRequest({ login: 'outro', password: 'outra' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Login ou senha de usuario incorreta',
      });
    });

    it('é case-sensitive no login', () => {
      const req = mockRequest({ login: 'Usuario1', password: '1234' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Login ou senha de usuario incorreta',
      });
    });

    it('responde com 401 quando login e senha estão vazios (strings vazias)', () => {
      const req = mockRequest({ login: '', password: '' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Login ou senha de usuario incorreta',
      });
    });
  });

  describe('erro de validação (400)', () => {
    it('responde com 400 quando o body é undefined', () => {
      const req = mockRequest(undefined);
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Corpo da requisição inválido',
      });
    });

    it('responde com 400 quando o body é null', () => {
      const req = mockRequest(null);
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Corpo da requisição inválido',
      });
    });

    it('responde com 400 quando o body não contém o campo login', () => {
      const req = mockRequest({ password: '1234' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Corpo da requisição inválido',
      });
    });

    it('responde com 400 quando o body não contém o campo password', () => {
      const req = mockRequest({ login: 'usuario1' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Corpo da requisição inválido',
      });
    });

    it('responde com 400 quando login não é uma string', () => {
      const req = mockRequest({ login: 123, password: '1234' });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Corpo da requisição inválido',
      });
    });

    it('responde com 400 quando password não é uma string', () => {
      const req = mockRequest({ login: 'usuario1', password: 1234 });
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Corpo da requisição inválido',
      });
    });

    it('responde com 400 quando o body é uma string', () => {
      const req = mockRequest('usuario1:1234');
      const res = mockResponse();

      login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        erro: 'Corpo da requisição inválido',
      });
    });
  });
});