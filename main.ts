// https://firebase.google.com/docs/auth/web/custom-auth
import { initializeApp } from "firebase/app";
import assert from "assert";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import * as dotenv from "dotenv";

const env = dotenv.config()?.parsed;

assert(env);

const appConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const target = `100.85.73.88:12001`;

const emailPassword = ["pengxiao@outlook.com", "123456789"] as const;

const app = initializeApp(appConfig);
const auth = getAuth(app);

async function main() {
  try {
    await createUserWithEmailAndPassword(auth, ...emailPassword);
  } catch (error: any) {
    // ignore error
    // console.info(error);
  }

  try {
    const user = await signInWithEmailAndPassword(auth, ...emailPassword);
    const idtoken = await user.user.getIdToken();
    console.log(
      "got idtoken, exchanging affine refresh token ...",
      `http://${target}/api/user/token`
    );

    const res = await fetch(`http://${target}/api/user/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idtoken, type: "Google" }),
    });

    console.log(await res.json());
  } catch (error: any) {
    console.info(error);
  }
}

main();
