import { FirebaseWebAPIKey } from "react-native-dotenv";
import axios from "axios";

const authenticate = async ({ email, password }, mode) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FirebaseWebAPIKey}`,
    { email, password, returnSecureToken: true }
  );
  const authTokenInfo = [response.data.idToken, response.data.expiresIn];
  return authTokenInfo;
};

export const createNewUser = async (userData) => {
  return authenticate(userData, "signUp");
};

export const loginUser = (userData) => {
  return authenticate(userData, "signInWithPassword");
};
