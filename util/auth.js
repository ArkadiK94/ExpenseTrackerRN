import { FirebaseWebAPIKey } from "react-native-dotenv";
import axios from "axios";
import { Alert } from "react-native";

const DB_URL = "https://expensetracker-b15b2-default-rtdb.firebaseio.com";

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

const addUserToDB = async (email, token) => {
  try {
    const response = await axios.post(`${DB_URL}/users.json?auth=${token}`, {
      email,
    });
    console.log(response);
  } catch (err) {
    Alert.alert("Error", err.message);
  }
};
export const createNewUser = async (userData) => {
  const token = await authenticate(userData, "signUp");
  await addUserToDB(userData.email, token);
  return token;
};

export const loginUser = (userData) => {
  return authenticate(userData, "signInWithPassword");
};
