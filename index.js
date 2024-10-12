const {
  normalizeDataSet,
  getInitialWeights,
  findBMU,
} = require('./transformers');

const input = [
  {
    id: '1',
    values: [1, 2, 3, 100, 200, 500, 100, 200, 500, 0.5, 0.49, 0.3, 0.01],
  },
  {
    id: '2',
    values: [11, 22, 31, 34, 2490, 500, 145, 210, 530, 0.59, 0.495, 0.33, 0.01],
  },
  {
    id: '3',
    values: [
      21, 324, 35, 1050, 240, 505, 10, 201, 540, 0.66, 0.466, 0.32, 0.016,
    ],
  },
  {
    id: '4',
    values: [14, 23, 34, 104, 200, 500, 100, 230, 540, 0.5, 0.49, 0.3, 0.01],
  },
  {
    id: '5',
    values: [1, 2, 3, 100, 200, 500, 100, 200, 500, 0.5, 0.49, 0.3, 0.01],
  },
];

const inputWithNormalizedValues = normalizeDataSet(
  input.map(({ values }) => values)
).map((normalizedRow, rowIndex) => ({
  ...input[rowIndex],
  normalizedValue: normalizedRow,
}));

const nFeatures = inputWithNormalizedValues.length;
const featureDimension = inputWithNormalizedValues[0].values.length;
const mapSideLength = Math.ceil(Math.sqrt(nFeatures));

const neuronWeights = getInitialWeights(
  mapSideLength,
  mapSideLength,
  featureDimension
);

const N_STEPS = 500;
for (s = 0; s < N_STEPS; s++) {
  const updateVectorIndex = Math.floor(Math.random() * nFeatures);
  const updateVectorValues =
    inputWithNormalizedValues[updateVectorIndex].normalizedValue;

  const [iBMU, jBMU] = findBMU(neuronWeights, updateVectorValues);

  const learningRate = 0.1 * Math.exp(-s / N_STEPS);
  for (i = 0; i < mapSideLength; i++) {
    for (j = 0; j < mapSideLength; j++) {
      neighbourUpdateWeight =
        1 / Math.pow(2, Math.abs(i - iBMU) + Math.abs(j - jBMU));
      neuronWeights[i][j] = neuronWeights[i][j].map(
        (currentValue, index) =>
          currentValue +
          learningRate *
            neighbourUpdateWeight *
            (updateVectorValues[index] - currentValue)
      );
    }
  }
}

const inputWithNormalizedValuesAndIndices = inputWithNormalizedValues.map(
  (element) => {
    const [iBMU, jBMU] = findBMU(neuronWeights, element.normalizedValue);

    return {
      ...element,
      indices: [iBMU, jBMU],
    };
  }
);

for (i = 0; i < mapSideLength; i++) {
  let line = '| ';

  for (j = 0; j < mapSideLength; j++) {
    const matchingFeatures = inputWithNormalizedValuesAndIndices.filter(
      ({ indices }) => indices[0] === i && indices[1] === j
    );

    if (matchingFeatures.length > 0) {
      line += matchingFeatures.map(({id}) => id).join(', ');
    } else {
      line += ' ';
    }

    line += ' | ';
  }

  console.log(line);
}
