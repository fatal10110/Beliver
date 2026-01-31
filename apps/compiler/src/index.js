const http = require('http');
const crypto = require('crypto');

const port = process.env.COMPILER_PORT || 8082;

function readBody(req, callback) {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    callback(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  if (req.url === '/compile' && req.method === 'POST') {
    readBody(req, (body) => {
      const policyHash = crypto.createHash('sha256').update(body).digest('hex');
      const response = {
        policy_hash: policyHash,
        policy_schema_version: '0.1.0',
        compiler_model_version: 'mock',
        engine_version: '0.1.0',
        budget_used: 1,
        policy: {
          version: '0.1.0',
          weights: {},
          rules: [],
          complexity_usage: 1,
          seeded_personality: 0
        }
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('not found');
});

server.listen(port, () => {
  console.log(`compiler service listening on :${port}`);
});
