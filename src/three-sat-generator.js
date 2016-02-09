// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import MersenneTwister from 'mersenne-twister';
import Sat from './sat';

export default class ThreeSatGenerator {

  constructor(seed) {
    if (seed !== parseInt(seed) && seed !== undefined) {
      throw 'Seed must be integer or undefined';
    }
    this.seed = seed;
    this.reset();
  }

  reset() {
    this.generator = new MersenneTwister(this.seed);
    this.count = 0;
  }

  /**
   * @param clauseCount
   * @param {number} variableCount
   * @param {Object} weightRange
   * @param {number} [weightRange.min=1]
   * @param {number} [weightRange.max=10]
   * @returns {Sat}
   */
  getThreeSat(clauseCount, variableCount, weightRange = {min: 1, max: 10}) {
    const variables = [];
    for (let i = 0; i < clauseCount * 3; ++i) {
      const sign = this.generator.random_int() % 2 ? 1 : -1;
      const variable = this.generator.random_int() % variableCount + 1;
      variables.push(variable * sign);
    }

    const weights = [];
    for (let i = 0; i < variableCount; ++i) {
      weights.push(this.generator.random_int() % (weightRange.max + 1 - weightRange.min) + weightRange.min);
    }

    return new Sat(variables, weights, this.seed, this.count++);
  }
}
