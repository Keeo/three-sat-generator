import { expect } from 'chai';
import ThreeSatGenerator from '../src/three-sat-generator';

describe('Three sat generator test', () => {

  it('It should generate sat from inserted parameters.', () => {
    const threeSatGenerator = new ThreeSatGenerator(1);
    const sat = threeSatGenerator.getThreeSat(5, 2);
    expect(sat.weights.length).to.equal(2);
    expect(sat.variables.length).to.equal(5 * 3);
    expect(sat.variableCount).to.equal(2);
    expect(sat.seed).to.equal(1);
  });

  it('It can solve sat.', () => {
    const threeSatGenerator = new ThreeSatGenerator(1);
    const sat = threeSatGenerator.getThreeSat(2, 5);
    expect(sat.solve([false, false, false, false, true])).to.equal(false);
    expect(sat.solve([false, false, false, false, false])).to.equal(0);
    expect(sat.solve([true, true, true, true, true])).to.equal(19);
  });
});