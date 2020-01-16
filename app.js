const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create-user", (req, res) => {
  const username = req.body.username;
  users.push(username);
  res.redirect(302, "/users");
});

app.use("/users", (req, res, next) => {
  let output = "";
  users.forEach(
    (username, index) => (output += `<li>User ${index + 1}: ${username}</li>`)
  );
  res.send(`<ul>${output}</ul>`);
});

app.use("/", (req, res, next) => {
  res.send(`
    <form action='/create-user' method='POST'>
      <input type='text' name='username'/>
      <button type='submit'>Submit</button>
    </form>
  `);
});

app.listen(3000);
