const net = require("net");

const connectToPrinter = (host, port, buffer) => {
  return new Promise((resolve, reject) => {
    let device = new net.Socket();

    device.on("close", () => {
      if (device) {
        device.destroy();
        device = null;
      }
      resolve(true);
      return;
    });

    device.on("error", reject);

    device.connect(port, host, () => {
      device.write(buffer);
      device.emit("close");
    });
  });
};
module.exports = connectToPrinter;
