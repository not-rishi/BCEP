// CSV Creation for Direct Download and Sending via Email

const { format } = require("@fast-csv/format");
const { PassThrough } = require("stream");

module.exports = function makeCsv(students) {
  return new Promise((resolve, reject) => {
    const csvStream = format({ headers: true });
    const bufferStream = new PassThrough();

    const chunks = [];
    bufferStream.on("data", (chunk) => chunks.push(chunk));
    bufferStream.on("end", () => {
      resolve({
        buffer: Buffer.concat(chunks),
        filename: `registrations_${Date.now()}.csv`,
      });
    });
    bufferStream.on("error", reject);

    csvStream.pipe(bufferStream);

    students.forEach((s) => {
      csvStream.write({
        Name: s.name,
        Email: s.email,
        USN: s.usn,
        Branch: s.branch,
      });
    });

    csvStream.end();
  });
};
