import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { auth, firestore } from "../../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);

  const showToast = useShowToast();

  const loginUser = useAuthStore((state) => state.login);

  const handelGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();

      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        //Login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        //Signup
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePic: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={handelGoogleAuth}
      >
        <Image src="./google.png" alt="Google Logo" w={5} />
        <Text mx={2} color={"blue.300"}>
          {prefix} with Google
        </Text>
      </Flex>
    </>
  );
};

export default GoogleAuth;
