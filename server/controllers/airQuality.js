const getDeviceID = (req, res) => {
  res.send({
    alpha: "124677080",
    beta: "10395607",
    gamma: "6045604",
    theta: "45668756",
  });
};

const getAirQualityData = (req, res) => {
  res.send({
    iaqi: 57,
    temperature: 24.08,
    humidity: 52.36,
    abs_humidity: 9,
    nox_index: 1,
    voc_index: 99,
    co2: 1089,
    pm1: 18.7,
    pm_2_5: 19.8,
    pm_10: 19.8,
    pm_4: 19.8,
    noise: 53,
    ch2o: 0.010,
    light: 16,
    pressure: 1009.17,
  });
};

export { getDeviceID, getAirQualityData };
