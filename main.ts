// https://firebase.google.com/docs/auth/web/custom-auth
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const appConfig2 = {
  apiKey: "AIzaSyBzF5g8HD1cguiyhkbv90CguVLNas67rZ8",
  authDomain: "test-125de.firebaseapp.com",
  projectId: "test-125de",
};

const appConfig = {
  apiKey: "AIzaSyAezKJuZZNcR7XUR9Cm9K7GRMj90DrquQM",
  authDomain: "pathfinder-52392.firebaseapp.com",
  projectId: "pathfinder-52392",
};

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
    console.log(idtoken)
  } catch (error: any) {
    console.info(error);
  }  
}

main();
