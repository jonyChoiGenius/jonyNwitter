import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

// 라우터 v6: 리액트를 다루는 기술 328페이지 참조
// 리다이렉트: https://reactrouter.com/en/v6.3.0/getting-started/tutorial#adding-a-no-match-route, https://devalice.tistory.com/112, https://stackoverflow.com/questions/69868956/how-can-i-redirect-in-react-router-v6
function AppRouter({ isLoggedIn, userObj, refreshUser, setIsLoggedIn }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile refreshUser={refreshUser} userObj={userObj} />}
            ></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />}></Route>
          </>
        )}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

{
  /* <Route path="" element={<App></App>} /> */
}
{
  /* <Link to="/about"></Link> */
}
