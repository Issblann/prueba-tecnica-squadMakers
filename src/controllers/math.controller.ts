import { Request, Response } from 'express';
import { MathService } from '../services/math.service';

export class MathController {
    private service = new MathService();

    getLCM(req: Request, res: Response): void {
        try {
            const { numbers } = req.query;
            if (!numbers || typeof numbers !== 'string') {
                throw new Error('Numbers query param is required');
            }

            const parsedNumbers = numbers.split(',').map((n: string) => {
                const trimmedValue = n.trim();
                const regex = /^-?\d+$/; // Expresión regular para enteros

                if (!regex.test(trimmedValue)) {
                    throw new Error('All elements must be valid integers.');
                }

                return parseInt(trimmedValue, 10); // Convertimos el valor a número entero
            });
            const result = this.service.getLCM(parsedNumbers);
            res.status(200).json({ result });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    increment(req: Request, res: Response) {
        try {
            const { number } = req.query;
            if (!number || isNaN(Number(number))) {
                throw new Error('A valid number query param is required.');
            }
            const parsed = parseInt(String(number), 10);
            const result = this.service.increment(parsed);
            res.json({ result });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}
