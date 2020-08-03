var path = require('path');
var apn = require('apn');

// configuring APN with credentials
const apnOptions = {
  token: {
    key: path.join(__dirname, '..', 'certs', 'bulletin_apn_key.p8'),
    keyId: "CX7G5XHV3W",
    teamId: "W35YDS774K"
  },
  production: false
};

const topic = "com.lucasege.bulletin";
var apnProvider = null;

export const initApn = () => {
  console.log(path.join(__dirname, '..', 'certs', 'bulletin_api_key.p8'))
  apnProvider = new apn.Provider(apnOptions);
};

export const sendNotification = (apnTokens: string[], alert: string, payload: {}) => {
  var note = new apn.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.badge = 3;
  note.sound = "ping.aiff";
  note.alert = alert;
  note.payload = payload;
  note.topic = topic;
  // TODO: handle failures
  apnProvider.send(note, apnTokens).then((result: any) => {
    console.log("Send Notification result:", result);
  })
    .catch((err: any) => {
      throw (err);
    });
}


