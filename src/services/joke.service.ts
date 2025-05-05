import { JokeDomain } from '../domain/joke.domain';
import { JokeRepository } from '../repositories/joke.repository';

export class JokeService {
    private domain = new JokeDomain();

    constructor() {
        this.domain = new JokeDomain();
    }
    async getJoke(type?: string) {
        return this.domain.getJoke(type);
    }

    async saveJoke(text: string, type: string) {
        return this.domain.saveJoke(text, type);
    }

    async updateJoke(id: number, newText: string, type: string) {
        return this.domain.updateJoke(id, newText, type);
    }

    async deleteJoke(id: number) {
        return this.domain.deleteJoke(id);
    }
}
