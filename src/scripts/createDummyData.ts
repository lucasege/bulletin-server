import { PostModel } from "../database/posts/posts.model";
import { connect, disconnect } from "../database/database";

(async () => {
  connect(); const posts = [
    { title: "Emma", content: "Bradley" },
    { title: "Elise", content: "Conner" },
    { title: "Jack", content: "Lawson" },
    { title: "Oliver", content: "Moss" },
    { title: "Jamie", content: "Reid" },
    { title: "Aidan", content: "Bradley" },
    { title: "Jordan", content: "Gallagher" },
    { title: "Erin", content: "Miles" },
    { title: "William", content: "May" },
    { title: "Ethan", content: "Butler" },
  ]; try {
    for (const post of posts) {
      await PostModel.create(post);
      console.log(`Created user ${post.title} ${post.content}`);
    } disconnect();
  } catch (e) {
    console.error(e);
  }
})();
