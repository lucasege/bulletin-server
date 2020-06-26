import { PostModel } from "../database/posts/posts.model";
import { UserModel } from "../database/users/users.model";
import { IUserDocument } from "../database/users/users.types";
import { connect, disconnect } from "../database/database";

(async () => {
  connect();
  const users = [
    { firstName: "Lucas", lastName: "Ege", email: "3t2aukkdq9@privaterelay.appleid.com", nonce: "mAYgVVjCLd7tJpDp1CBApusbZK3rdZch", appleUserString: "000128.c379ae2a393b4305977dfca8c068f8e7.1800", appleAuthorizationCode: "cc6acd88215eb4d55a4404e2c85d7e7c2.0.nrsy.FTyoq1OhKEIF5iShcqzCFA" }
  ]
  let author: IUserDocument;
  try {
    for (const user of users) {
      author = await UserModel.create(user);
      console.log(`Created user ${user.firstName} ${user.lastName}`);
    }
  } catch (e) {
    console.error(e);
  }
  const posts = [
    { title: "The Times 03/Jan/2009", body: "Chancellor on brink of second bailout for banks", authorFirstName: author.firstName, authorLastName: author.lastName, authorId: author._id },
    {
      title: "The big US stock indices are telling different stories", body: "The divergence in the performance of the major U.S. stock indexes this year is the widest in more than a decade.\nA surge in big technology stocks has helped the Nasdaq Composite rally 13% in 2020, while the Dow Jones Industrial Average of blue- chip stocks is down 8.3 %.The benchmark S & P 500 is hovering in between them, off 3.1 %.", authorFirstName: author.firstName, authorLastName: author.lastName, authorId: author._id
    }
  ];
  try {
    for (const post of posts) {
      await PostModel.create(post);
      console.log(`Created user ${post.title} ${post.body}`);
    }
    disconnect();
  } catch (e) {
    console.error(e);
  }
})();
