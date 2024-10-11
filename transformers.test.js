const transformers = require('./transformers');

describe('normalizeDataSet()', () => {
  test('it normalizes values per column', () => {
    const input = [
      [1, 10, 200],
      [3, 12, 150],
      [4, 50, 100],
    ];

    const expectedOutput = [
      [(1 - 1) / (4 - 1), (10 - 10) / (50 - 10), (200 - 100) / (200 - 100)],
      [(3 - 1) / (4 - 1), (12 - 10) / (50 - 10), (150 - 100) / (200 - 100)],
      [(4 - 1) / (4 - 1), (50 - 10) / (50 - 10), (100 - 100) / (200 - 100)],
    ];

    const output = transformers.normalizeDataSet(input);

    expect(output).toEqual(expectedOutput);
  });
});

describe('findBMU()', () => {
  test('it returns the indices of the neuro with equal weight', () => {
    const inputWeights = [
      [
        [1, 0, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
    ];

    const inputVector = [1, 0, 0];

    const expectedOutput = [0, 0];

    const output = transformers.findBMU(inputWeights, inputVector);

    expect(output).toEqual(expectedOutput);
  });

  test('it returns the indices of the neuron with closest weights', () => {
    const inputWeights = [
      [
        [1, 0, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
    ];

    const inputVector = [0.8, 0.8, 0.8];

    const expectedOutput = [1, 1];

    const output = transformers.findBMU(inputWeights, inputVector);

    expect(output).toEqual(expectedOutput);
  });
});
