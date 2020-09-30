const sshstore = require('./sshstores/crawl');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const create = async (user, pass) => {
  const result = await sshstore.createAccount(user, pass);
  return result;
};

app.use(bodyParser.json());

app.post('/sshstore', async (req, res) => {
  const { username, password } = req.body;
  const account = await create(username, password);
  res.send(account);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
