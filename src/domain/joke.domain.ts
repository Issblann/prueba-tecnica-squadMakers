import axios from 'axios';
import { JokeRepository } from '../repositories/joke.repository';
import { Joke } from '../models/joke.model';

export class JokeDomain {
    private repository: JokeRepository;

    constructor() {
        this.repository = new JokeRepository();
    }
    async getJoke(type?: string): Promise<string> {
        try {
            if (!type) {
                const types = ['chuck', 'dad'];
                type = types[Math.floor(Math.random() * types.length)];
            }

            const normalizedType = type.toLowerCase();

            if (normalizedType !== 'chuck' && normalizedType !== 'dad') {
                throw new Error('Invalid joke type. Use "Chuck" or "Dad".');
            }

            if (normalizedType === 'chuck') {
                const res = await axios.get('https://api.chucknorris.io/jokes/random');
                return res.data.value;
            }

            if (normalizedType === 'dad') {
                const res = await axios.get('https://icanhazdadjoke.com/', {
                    headers: { Accept: 'application/json' },
                });
                return res.data.joke;
            }

            throw new Error('Unexpected error occurred while fetching joke.');
        } catch (error) {
            throw error;
        }
    }

    async validateType(type: string) {
        const allowedTypes = ['chuck', 'dad'];
        if (!allowedTypes.includes(type.toLowerCase())) {
            throw new Error('Invalid joke type. Use "chuck" or "dad"');
        }
    }

    async saveJoke(text: string, type: string): Promise<Joke> {
        try {
            await this.validateType(type);
            return this.repository.save(text, type);
        } catch (error) {
            throw error;
        }
    }

    async updateJoke(id: number, text: string, type: string) {
        if (!id) {
            throw new Error('Id is required');
        }
        if (!text || !type) {
            throw new Error('Text and type are required');
        }

        const jokeExists = await this.repository.findById(id);
        if (!jokeExists) {
            throw new Error(`Joke with ID ${id} does not exist`);
        }
        await this.validateType(type);
        const updatedJoke = await this.repository.update(id, text, type);
        return updatedJoke;
    }

    async deleteJoke(id: number) {
        if (!id || isNaN(id) || id <= 0) {
            throw new Error('Invalid ID');
        }

        const joke = await this.repository.findById(id);
        if (!joke) {
            throw new Error(`Joke with ID ${id} does not exist`);
        }

        await this.repository.delete(id);
    }
}
