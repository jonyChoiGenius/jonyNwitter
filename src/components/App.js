import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import authService from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(user);
        setUserObj({
          // 유저 객체의 크기를 줄임
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
        // setIsLoggedIn(false);
      }
    });
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          // isLoggedIn={isLoggedIn}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
      {/* <footer>&copy;{new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
