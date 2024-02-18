const { createServer } = require("https");
const { parse } = require("url");
const { readFileSync } = require("fs");
const next = require("next");

const hostname = "gorillastickersbot.xyz";
const port = 9443;
const app = next({ hostname, port });
const handle = app.getRequestHandler();

/*const httpsOptions = {
  key: readFileSync("/path/to/private-key.pem"),
  cert: readFileSync("/path/to/certificate.pem"),
};*/

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://${hostname}:${port}`);
  });
});
