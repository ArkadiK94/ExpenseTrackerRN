import { FirebaseWebAPIKey } from "react-native-dotenv";
import axios from "axios";
import { Alert } from "react-native";

const authenticate = async ({ email, password }, mode) => {
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FirebaseWebAPIKey}`,
      { email, password, returnSecureToken: true }
    );
    const authToken = response.data.idToken;
    return authToken;
  } catch (err) {
    Alert.alert("Error", err.message);
  }
};

export const createNewUser = async (userData) => {
  return authenticate(userData, "signUp");
};

export const loginUser = (userData) => {
  return authenticate(userData, "signInWithPassword");
};
