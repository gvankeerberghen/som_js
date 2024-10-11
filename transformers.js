const normalizeDataSet = (observations) => {
  const maxAndMin = observations.reduce((acc, currentRow, rowIndex) => {
    if (rowIndex === 0) {
      return currentRow.map((value) => ({
        min: value,
        max: value,
      }));
    }

    return acc.map(({ min, max }, columnIndex) => ({
      min: Math.min(min, currentRow[columnIndex]),
      max: Math.max(max, currentRow[columnIndex]),
    }));
  }, []);

  return observations.map((row) =>
    row.map(
      (entry, columnIndex) =>
        (entry - maxAndMin[columnIndex].min) /
        (maxAndMin[columnIndex].max - maxAndMin[columnIndex].min)
    )
  );
};

const getInitialWeights = (mapNRows, mapNColumns, featureDimension) =>
  Array.from({ length: mapNRows }, () =>
    Array.from({ length: mapNColumns }, () =>
      Array.from({ length: featureDimension }, () => Math.random())
    )
  );

const computeVectorDistance = (v1, v2) =>
  v1.reduce((acc, v1_i, iIndex) => acc + Math.pow((v1_i - v2[iIndex]), 2), 0);

const findBMU = (neuronWeights, inputVector) => {
  let minDistance = null;
  let minRowIndex = null;
  let minColumnIndex = null;

  neuronWeights.forEach((row, rowIndex) => {
    row.forEach((weights, columnIndex) => {
      if (rowIndex === 0 && columnIndex === 0) {
        minDistance = computeVectorDistance(weights, inputVector);
        minRowIndex = rowIndex;
        minColumnIndex = columnIndex;
      } else {
        distance = computeVectorDistance(weights, inputVector);

        if (distance < minDistance) {
          minDistance = distance;
          minRowIndex = rowIndex;
          minColumnIndex = columnIndex;
        }
      }
    });
  });

  return [minRowIndex, minColumnIndex];
};

module.exports = {
  normalizeDataSet,
  getInitialWeights,
  findBMU,
};
