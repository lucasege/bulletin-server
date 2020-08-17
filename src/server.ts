import * as express from "express";
import * as bodyParser from "body-parser";
import { connect } from "./database/database";
import { PostModel } from "./database/posts/posts.model";
import { UserModel } from "./database/users/users.model";
import { NotificationModel } from "./database/notifications/notifications.model";
import { LocationModel } from "./database/locations/locations.model";
import { RoundupModel } from "./database/roundups/roundups.model";
import { UploadImageToS3, SignRoundupS3Request } from "./aws/s3";
import { initApn, sendNotification } from "./apn/apnprovider";

// TODO(lucas): enforce types

const app = express();
initApn();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))

// TODO: organize endpoints by type, i.e. /posts/{get, set}. /users/{get, set}
app.get('/getPosts', async (req, res) => {
  PostModel.find({
    published: true
  })
    .then(items => res.json(items))
});

app.get('/getDrafts/:userId', async (req, res) => {
  PostModel.find({
    authorId: req.params.userId,
  })
    .then(items => res.json(items))
    .catch((error) => {
      console.error("Get Drafts error", error);
    });
});

const PROMPTS = [
  {
    header: "What's happening in your area?",
    subHeader: "Let the people know",
    examples: [
      'Interesting people',
      'Event or Location reviews',
      'Hometown heroes',
      'Sports recap',
      'Breaking news',
    ],
    optional: false,
  },
  {
    header: 'Important points people should know',
    subHeader: "Let's get three ideas on it...",
    examples: [],
    optional: false,
  },
  {
    header: "Let's dig a bit deeper",
    subHeader: "Expand on what's interesting to you about this story.",
    examples: [],
    optional: false,
  },
  {
    header: "Get someone's perspective",
    subHeader: "Broaden the story with an interview",
    examples: [],
    optional: true,
  },
  {
    header: 'Closing thought',
    subHeader: 'The big takeaway or action people should feel.',
    examples: [],
    optional: false,
  },
]

app.get('/getPrompts', async (req, res) => {
  res.json(PROMPTS)
})

app.get('/getUser/:appleUserString', async (req, res) => {
  UserModel.findUser(req.params.appleUserString)
    .then(user => res.json(user))
});

app.post('/submitPost', (req, res) => {
  const filter = { _id: req.body._id };

  console.log("submitPost post:", req.body);
  PostModel.findOneAndUpdate(filter, req.body, {
    new: true,
    upsert: true,
  })
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error("submitPost Error:", err);
      res.status(404).json({ success: false });
    });
});

app.post('/submitUser', async (req, res) => {
  console.log("submitUser user:", req.body);
  try {
    const user = UserModel.create(req.body);
    res.json({
      success: true,
      user: user,
    })
  } catch (err) {
    console.error("submitUser Error:", err);
    res.status(404).json({ success: false });
  }
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

app.post('/submitNotification', async (req, res) => {
  console.log("Submitting notification");
  const filter = { userId: req.body.userId, deviceId: req.body.deviceId };
  NotificationModel.findOneAndUpdate(filter, req.body, {
    new: true,
    upsert: true,
  })
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error("submitNotification Error:", err);
      res.status(404).json({ success: false });
    });
})

app.post('/broadcastNotification', async (req, res) => {
  NotificationModel.find({
    userId: req.body.userId,
  }).then(notificationData => {
    const tokens: string[] = []
    for (const notification of notificationData) {
      tokens.push(notification.apnToken);
    }
    try {
      sendNotification(tokens, req.body.alert, req.body.payload)
      res.json({
        success: true,
      });
    } catch (err) {
      console.error("submitNotification Error:", err);
      res.status(404).json({
        success: false
      });
    }
  })
    .catch((err) => {
      console.error("submitNotification Error:", err)
      res.status(404).json({
        success: false
      });
    })
});

app.post('/signRoundupRequest', async (req, res) => {
  console.log("Signing roundup request")
  SignRoundupS3Request(req.body.fileName, req.body.fileType, res)
})

app.post('/submitRoundup', async (req, res) => {
  console.log("Submitting roundup");
  RoundupModel.insertMany(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error("submitRoundup Error:", err);
      res.status(404).json({ success: false });
    });

})

app.get('/getRoundups/:locationId', async (req, res) => {
  RoundupModel.find({
    locationId: req.params.locationId,
  })
    .then(items => res.json(items))
    .catch((error) => {
      console.error("Get roundups error:", error);
    });
})

app.get('/getLocations', async (req, res) => {
  LocationModel.find()
    .then(locations => res.json(locations))
    .catch((error: any) => {
      console.error("Get locations error:", error);
    });
})

app.get('/getNearestLocation/:latitude/:longitude', async (req, res) => {
  console.log("Getting nearest location", req.params.latitude, req.params.longitude);
  LocationModel.findNearestNeighborhood(Number(req.params.latitude), Number(req.params.longitude))
    .then(location => res.json(location))
    .catch((error: any) => {
      console.error("Get nearest location error:", error);
    });
})

const port = 5002;

connect();
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
