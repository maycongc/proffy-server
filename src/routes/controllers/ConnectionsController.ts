import { Request, Response } from 'express';
import db from '../../database/connection';

class ConnectionsController {
  async index(req: Request, res: Response) {
    try {
      const [{ total }] = await db('connections').count('* as total');
      return res.json({ total });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    try {
      await db('connections').insert({
        user_id,
      });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ConnectionsController();
