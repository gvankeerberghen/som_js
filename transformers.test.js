const transformers = require('./transformers');

describe('normalizeDataSet()', () => {
  test('it normalizes values per column', () => {
    const input = [
      [1, 10, 200],
      [3, 12, 150],
      [4, 50, 100]
    ]
    
    const expectedOutput = [
      [(1-1)/(4-1), (10-10)/(50-10), (200-100)/(200-100)],
      [(3-1)/(4-1), (12-10)/(50-10), (150-100)/(200-100)],
      [(4-1)/(4-1), (50-10)/(50-10), (100-100)/(200-100)]
    ];

    const output = transformers.normalizeDataSet(input);

    expect(output).toEqual(expectedOutput);
  })
})