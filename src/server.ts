import * as express from "express";
import { connect } from "./database/database";
import { PostModel } from "./database/posts/posts.model";
import { UserModel } from "./database/users/users.model";

// TODO(lucas): enforce types

const app = express();
app.use(express.json());
app.get('/getPosts', async (req, res) => {
  PostModel.findAll()
    .then(items => res.json(items))
})

app.get('/getUser/:appleUserString', async (req, res) => {
  UserModel.findUser(req.params.appleUserString)
    .then(user => res.json(user))
})

app.post('/submitPost', (req, res) => {
  console.log(req.body);
  PostModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
})

app.post('/submitUser', (req, res) => {
  console.log(req.body);
  UserModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
})
const port = 5002;

connect();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
