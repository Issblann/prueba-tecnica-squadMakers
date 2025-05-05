import { MathDomain } from '../domain/math.domain';

describe('MathDomain', () => {
    let domain: MathDomain;

    beforeEach(() => {
        domain = new MathDomain();
    });

    describe('getHCF', () => {
        it('should return the correct HCF for two numbers', () => {
            expect(domain['getHCF'](12, 18)).toBe(6);
            expect(domain['getHCF'](20, 30)).toBe(10);
        });

        it('should return 1 if no common factors', () => {
            expect(domain['getHCF'](5, 9)).toBe(1);
        });
    });

    describe('getLCMofTwo', () => {
        it('should return the correct LCM for two numbers', () => {
            expect(domain['getLCMofTwo'](12, 18)).toBe(36);
            expect(domain['getLCMofTwo'](5, 9)).toBe(45);
        });
    });

    describe('getLCM', () => {
        let controller: any;

        beforeEach(() => {
            controller = {
                getLCM: jest.fn(async (req: any, res: any) => {
                    const numbers = req.query.numbers.split(',').map(Number);
                    if (numbers.some(isNaN)) {
                        res.status(400).json({ error: 'All elements must be valid integers.' });
                    } else {
                        res.status(200).json({ lcm: domain.getLCM(numbers) });
                    }
                })
            };
        });

        it('should return the correct LCM for an array of numbers', () => {
            expect(domain.getLCM([12, 18, 30])).toBe(180);
            expect(domain.getLCM([4, 5, 10])).toBe(20);
        });

        it('should throw an error if no numbers are provided', () => {
            expect(() => domain.getLCM([])).toThrow('No numbers provided');
        });
    });

    describe('increment', () => {
        it('should increment a number by 1', () => {
            expect(domain.increment(5)).toBe(6);
            expect(domain.increment(0)).toBe(1);
        });

        it('should throw an error if the input is not a valid number', () => {
            expect(() => domain.increment(NaN)).toThrow('Invalid number');
        });
    });
});
