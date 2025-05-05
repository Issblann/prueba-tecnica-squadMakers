export class MathDomain {
    private getHCF(a: number, b: number): number {
        let hcf = 1;
        for (let i = 1; i <= a && i <= b; i++) {
            if (a % i === 0 && b % i === 0) {
                hcf = i;
            }
        }
        return hcf;
    }

    private getLCMofTwo(a: number, b: number): number {
        const hcf = this.getHCF(a, b);
        return (a * b) / hcf;
    }

    getLCM(numbers: number[]): number {
        if (!numbers.length) throw new Error('No numbers provided');

        return numbers.reduce((acc, curr) => this.getLCMofTwo(acc, curr));
    }

    increment(number: number): number {
        if (isNaN(number)) throw new Error('Invalid number');
        return number + 1;
    }
}
