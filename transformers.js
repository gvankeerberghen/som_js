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

module.exports = {
  normalizeDataSet,
};
