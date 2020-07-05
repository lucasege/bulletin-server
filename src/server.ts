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
  console.log("submitPost post:", req.body);
  PostModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error("submitPost Error:", err);
      res.status(404).json({ success: false });
    });
});

app.post('/submitUser', (req, res) => {
  console.log("submitUser user:", req.body);
  UserModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error("submitUser Error:", err);
      res.status(404).json({ success: false });
    });
});

app.post('/submitImage', async (req, res) => {
  console.log("submitImage");
  UploadImageToS3(req.body)
    .then((response) => {
      res.json({
        success: true,
        locator: response.Location,
      });
    })
    .catch((err) => {
      console.error("submitImage Error:", err);
      res.status(404).json({
        success: false
      });
    })
});

const port = 5002;

connect();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
