import * as express from "express";
import * as bodyParser from "body-parser";
import { connect } from "./database/database";
import { PostModel } from "./database/posts/posts.model";
import { UserModel } from "./database/users/users.model";
import { UploadImageToS3 } from "./aws/s3";
const fs = require('fs');

// TODO(lucas): enforce types

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))

app.get('/getPosts', async (req, res) => {
  PostModel.findAll()
    .then(items => res.json(items))
});

app.get('/getUser/:appleUserString', async (req, res) => {
  UserModel.findUser(req.params.appleUserString)
    .then(user => res.json(user))
});

app.post('/submitPost', (req, res) => {
  console.log(req.body);
  PostModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

app.post('/submitUser', (req, res) => {
  console.log(req.body);
  UserModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

app.post('/submitImage', (req, res) => {
  try {
    console.log("req.body ", req.body.imageSource)
    const locator = UploadImageToS3(req.body.imageSource);
    console.log("Locator ", locator)
    res.json({
      success: true,
      locator: locator,
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({
      success: false
    });
  }
});

const port = 5002;

connect();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
