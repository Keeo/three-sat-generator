const { abs, sign } = Math;

export default class Sat {
  constructor(variables, weights, seed, order) {
    if (!Array.isArray(variables) || !Array.isArray(weights)) {
      throw 'Variables and weights must be array.';
    }
    this.variables = variables;
    this.variableCount = weights.length;
    this.weights = weights;
    this.seed = seed;
    this.order = order;
    this.id = `${seed}-${order}-${this.variableCount}`;
  }

  solve(values) {
    if (!Array.isArray(values) || !values.every(val => typeof val === 'boolean') || values.length !== this.variableCount) {
      throw 'Values must be array with only boolean values and length equal to variable count.';
    }

    let evaluation = true;
    for (let i = 0; i < this.variables.length; i = i + 3) {
      evaluation = evaluation && (this._evaluate(values, i) || this._evaluate(values, i + 1) || this._evaluate(values, i + 2));
    }
    return evaluation ? this.weight(values) : false;
  }

  variablesToString() {
    let s = '';
    const v = this.variables;
    for (let i = 0; i < v.length;) {
      s += '( ' + Sat._variableToChar(v[i++]) + ' | ' + Sat._variableToChar(v[i++]) + ' | ' + Sat._variableToChar(v[i++]) + ' )';
      if (i < v.length) {
        s += ' & ';
      }
    }
    return s;
  }

  static _variableToChar(variable) {
    return (variable > 0 ? '' : '!') + String.fromCharCode(97 + abs(variable) - 1);
  }

  /**
   * @param {Array} values
   * @returns {number}
   */
  weight(values) {
    return this.weights.reduce((prev, current, index) => prev + (values[index] ? current : 0), 0);
  }

  _evaluate(values, position) {
    const variable = this.variables[position];
    const value = values[abs(variable) - 1];
    return sign(variable) === 1 ? value : !value;
  }

  toString() {
    return this.id + ' - ' + this.variablesToString().replace(/ /g,'');
  }
}
