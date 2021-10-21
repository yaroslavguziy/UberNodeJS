const truckTypes = {
  SPRINTER: {
    dimensions: {
      width: 300,
      length: 250,
      height: 170,
    },
    payload: 1700,
  },
  'SMALL STRAIGHT': {
    dimensions: {
      width: 500,
      length: 250,
      height: 170,
    },
    payload: 2500,
  },
  'LARGE STRAIGHT': {
    dimensions: {
      width: 700,
      length: 350,
      height: 200,
    },
    payload: 4000,
  },
};

module.exports = {
  truckTypes,
};
