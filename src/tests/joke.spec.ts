import axios from 'axios';
import { JokeDomain } from '../domain/joke.domain';
import { JokeRepository } from '../repositories/joke.repository';

jest.mock('axios');
jest.mock('../repositories/joke.repository');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const MockedRepository = JokeRepository as jest.MockedClass<typeof JokeRepository>;

describe('JokeDomain', () => {
    let domain: JokeDomain;
    let repo: jest.Mocked<JokeRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        domain = new JokeDomain();
        repo = (domain as any).repository;
    });

    describe('getJoke', () => {
        it('It should return a Chuck Norris joke', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: { value: 'Chuck joke' } });
            const joke = await domain.getJoke('chuck');
            expect(joke).toBe('Chuck joke');
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random');
        });

        it('It should return a Dad Joke', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: { joke: 'Dad joke' } });
            const joke = await domain.getJoke('dad');
            expect(joke).toBe('Dad joke');
            expect(mockedAxios.get).toHaveBeenCalledWith('https://icanhazdadjoke.com/', {
                headers: { Accept: 'application/json' },
            });
        });

        it('It should throw an error with an invalid type', async () => {
            await expect(domain.getJoke('badtype')).rejects.toThrow('Invalid joke type. Use "Chuck" or "Dad".');
        });
    });

    describe('saveJoke', () => {
        it('It should save a valid joke', async () => {
            const fakeJoke = { id: 1, text: 'Un chiste', type: 'dad' };
            repo.save.mockResolvedValueOnce(fakeJoke);

            const result = await domain.saveJoke('Un chiste', 'dad');
            expect(result).toEqual(fakeJoke);
            expect(repo.save).toHaveBeenCalledWith('Un chiste', 'dad');
        });

        it('It should throw an error if the type is invalid', async () => {
            await expect(domain.saveJoke('texto', 'invalido')).rejects.toThrow(
                'Invalid joke type. Use "chuck" or "dad"'
            );
        });
    });

    describe('updateJoke', () => {
        it('It should update an existing joke', async () => {
            const updatedJoke = { id: 1, text: 'actualizado', type: 'dad' };
            repo.findById.mockResolvedValueOnce(true);
            repo.update.mockResolvedValueOnce(updatedJoke);

            const result = await domain.updateJoke(1, 'actualizado', 'dad');
            expect(result).toEqual(updatedJoke);
        });

        it('It should throw an error if the ID does not exist', async () => {
            repo.findById.mockResolvedValueOnce(null);
            await expect(domain.updateJoke(999, 'texto', 'chuck')).rejects.toThrow('Joke with ID 999 does not exist');
        });
    });

    describe('deleteJoke', () => {
        it('Should delete an existing joke', async () => {
            repo.findById.mockResolvedValueOnce(true);
            await domain.deleteJoke(1);
            expect(repo.delete).toHaveBeenCalledWith(1);
        });

        it('Should throw an error if the ID is invalid', async () => {
            await expect(domain.deleteJoke(0)).rejects.toThrow('Invalid ID');
        });

        it('Should throw an error if the joke does not exist', async () => {
            repo.findById.mockResolvedValueOnce(null);
            await expect(domain.deleteJoke(123)).rejects.toThrow('Joke with ID 123 does not exist');
        });
    });
});
