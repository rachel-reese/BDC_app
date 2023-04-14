const getDeviceStatus = (req, res) => {
  const deviceID = req.query.deviceID;
  console.log(req.body)
  const status = {
    124677080: "inactive",
    10395607: "active",
    6045604: "inactive",
    45668756: "active",
  };
  res.send(status[deviceID]);
};

export { getDeviceStatus };
