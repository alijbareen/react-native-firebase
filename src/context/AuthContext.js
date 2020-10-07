import createDataContext from "./createDataContext";
import { navigate } from "../../navigationRef";
import { firebase } from "../firebase/config";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", user: action.payload };
    case "signup":
      return { errorMessage: "", user: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { user: null, errorMessage: "" };

    case "error_password":
      return { ...state, errorMessage: "Passwords don't match." };
    default:
      return state;
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Home", { user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });

    dispatch({ type: "signin", payload: response.data });

    navigate("Home");
  } catch (err) {
    return err;
  }
};

const signup = (dispatch) => ({
  email,
  password,
  confirmPassword,
  fullName,
}) => {
  try {
    console.log(email);
    console.log(password);
    console.log(fullName);

    if (password !== confirmPassword) {
      dispatch({ type: "error_password", payload: "Passwords don't match" });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            dispatch({ type: "signup", payload: data });

            navigate("Login", { user: data });
          })
          .catch((error) => {
            console.log("err1");
            alert(error);
          });
      })
      .catch((error) => {
        console.log("err2");
        alert(error);
      });

    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    });
  }
};

export const { Provider, Context } = createDataContext(
  //reducer
  authReducer,
  {
    //funtions
    signup,
  },
  {
    //data
    user: null,
    errorMessage: "",
  }
);
