import { Request, Response } from 'express';
import { JokeService } from '../services/joke.service';

export class JokeController {
    private service: JokeService;

    constructor() {
        this.service = new JokeService();
    }
    async getJoke(req: Request, res: Response) {
        try {
            const type = req.params.type;
            const joke = await this.service.getJoke(type);
            res.status(200).json({ data: { joke } });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async saveJoke(req: Request, res: Response) {
        try {
            const { text, type } = req.body;
            if (!text || !type) {
                res.status(400).json({ error: 'Text and type are required' });
            }
            const joke = await this.service.saveJoke(text, type);
            res.status(201).json(joke);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateJoke(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { text, type } = req.body;
            if (!text || !type) {
                res.status(400).json({ error: 'Text is required' });
                return;
            }

            const joke = await this.service.updateJoke(id, text, type);
            res.status(200).json({ data: joke, message: 'Updated successfully' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteJoke(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            await this.service.deleteJoke(id);
            res.status(200).json({ message: 'Joke deleted successfully' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
