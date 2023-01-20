import { getToken } from "firebase/messaging";
import { messaging } from "./config";

const requestPermission = async () => {
  console.log("Requesting permisssion...");
  const permission = await Notification.requestPermission();
  if (permission == "granted") {
    console.log("Notification permission granted.");
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_API_KEY,
    });
    if (currentToken) {
      console.log("current Token: ", currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } else {
    console.log("error");
  }
};

requestPermission();
