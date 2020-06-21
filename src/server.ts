import * as express from "express";
import { connect } from "./database/database";
import { PostModel } from "./database/posts/posts.model";

const app = express();
app.use(express.json());
app.get('/', async (req, res) => {
  PostModel.findAll()
    .then(items => res.json(items))
})

app.post('/', (req, res) => {
  console.log(req.body);
  PostModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
})
const port = 5002;

connect();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
