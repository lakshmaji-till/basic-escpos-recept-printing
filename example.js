const { EscPos } = require("@tillpos/xml-escpos-helper");
const connectToPrinter = require("./connectToPrinter");
const fs = require("fs");

/**
 *
 * @params template - the xml template
 * @params data - the dynamic data which ever to be printed
 *
 * @returns bytes - buffers stream
 */
const generateBuffer = (template, data) => {
  // Will add implementation here to generate buffer
  return EscPos.getBufferFromTemplate(template, data);
};

/**
 *
 * @params host - printer IP address
 * @params port - printer port
 * @params message - the buffer stream generated from `generateBuffer` function
 *
 * @return void
 */
const sendMessageToPrinter = async (host, port, message) => {
  try {
    await connectToPrinter(host, port, message);
  } catch (err) {
    console.log("some error", err);
  }
};

/**
 * Entry function
 */
const testPrint = async () => {
  const template = fs.readFileSync("./sample.xml", { encoding: "utf8" });

  const PRINTER = {
    device_name: "Epson TM-M30",
    host: "192.168.0.9",
    port: 9100,
  };
  const sampleInputData = {
    title: "Hello World!",
    date: "07-08-2021",
  };
  const message = generateBuffer(template, sampleInputData);
  await sendMessageToPrinter(PRINTER.host, PRINTER.port, message);
};

testPrint();
