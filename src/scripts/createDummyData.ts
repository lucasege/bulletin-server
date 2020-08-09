import { PostModel } from "../database/posts/posts.model";
import { UserModel } from "../database/users/users.model";
import { IUserDocument } from "../database/users/users.types";
import { NotificationModel } from "../database/notifications/notifications.model";
import { LocationModel } from "../database/locations/locations.model";
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
    {
      promptResponses: [
        "The Times 03/Jan/2009",
        "Chancellor on brink of second bailout for banks",
        "",
        "",
        "",
      ],
      latitude: 37.78825,
      longitude: -122.4324,
      authorFirstName: author.firstName,
      authorLastName: author.lastName,
      authorId: author._id,
      published: true,
    },
    {
      promptResponses: [
        "The big US stock indices are telling different stories",
        "The divergence in the performance of the major U.S. stock indexes this year is the widest in more than a decade.",
        "A surge in big technology stocks has helped the Nasdaq Composite rally 13% in 2020, while the Dow Jones Industrial Average of blue- chip stocks is down 8.3 %.The benchmark S & P 500 is hovering in between them, off 3.1 %.",
        "",
        "",
      ],
      latitude: 37.78820,
      longitude: -122.4230,
      authorFirstName: author.firstName,
      authorLastName: author.lastName,
      authorId: author._id,
      published: true,
    }
  ];
  const notificationData = [{
    userId: author._id,
    deviceId: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9",
    apnToken: "e4c75d248658d4e93e1a9fdecbebf6548db9d4fcb6a8014027445404227d738a",
  }
  ];
  const locationsData = [{
    centerLatitude: 40.7081,
    centerLongitude: -73.9571,
    name: "Williamsburg, NY",
  }];
  // const roundupData = [{

  // }]
  try {
    for (const post of posts) {
      console.log("post ", post)
      await PostModel.create(post);
      console.log(`Created post ${post.promptResponses}`)
    }
  } catch (e) {
    console.error(e);
  }

  try {
    for (const notification of notificationData) {
      console.log("notification", notification)
      await NotificationModel.create(notification);
      console.log(`Created notification ${notification.userId}, ${notification.deviceId}, ${notification.apnToken}`)
    }
  } catch (e) {
    console.error(e);
  }
  try {
    for (const location of locationsData) {
      console.log("location", location)
      await LocationModel.create(location);
      console.log(`Created notification ${location.centerLatitude}, ${location.centerLongitude}, ${location.name}`)
    }
  } catch (e) {
    console.error(e);
  }

  try {
    disconnect();
  } catch (e) {
    console.error(e);
  }
})();
