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
    iaqi: [57,"IAQI", ""],
    temperature: [24.08, "Temperature", "°C"],
    humidity: [52.36, "Humidity", "%"],
    abs_humidity: [9, "Abs. Humidity", ""],
    nox_index: [1, "NOx Index", ""],
    voc_index: [99, "VOC Index", ""],
    co2: [1089, "CO2", " ppm"],
    pm1: [18.7, "PM1", ""],
    pm_2_5: [19.8, "PM2.5", ""],
    pm_10: [19.8, "PM10", ""],
    pm_4: [19.8, "PM4", ""],
    noise: [53, "Noise", " db"],
    ch2o: [0.010, "CH2O", " ppm"],
    light: [16, "Light", " Lux"],
    pressure: [1009.17, "Pressure", ""],
  });
};

export { getDeviceID, getAirQualityData };
