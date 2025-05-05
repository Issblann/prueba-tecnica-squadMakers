import { MathDomain } from '../domain/math.domain';

export class MathService {
  private domain = new MathDomain();

  getLCM(numbers: number[]) {
    return this.domain.getLCM(numbers);
  }

  increment(number: number) {
    return this.domain.increment(number);
  }
}
