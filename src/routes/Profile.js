import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Nweet from "components/Nweet";
// useHistory 변경점 : https://blog.woolta.com/categories/1/posts/211
function Profile({ refreshUser, userObj }) {
  const navigate = useNavigate();
  const [nweets, setNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    // navigate("/", { replace: true });
    alert("로그아웃 되었습니다");
    navigate("/"); // 푸쉬를 대체
    // navigate('/home', {replace: true}); 리플레이스를 대체
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  useEffect(() => {
    dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createAt", "asc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setNweets(newArray);
      });
  }, []);

  // const getMyNweets = async () => {
  //   const nweets = await dbService
  //     .collection("nweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createAt", "asc")
  //     .get();
  //   const myNweets = nweets.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }));
  //   setNweets(myNweets);
  // };
  // useEffect(() => {
  //   getMyNweets();
  // }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      <div>
        <h3>내가 쓴 느윗</h3>
        {nweets.length ? (
          nweets.map((nweet) => (
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={true} />
          ))
        ) : (
          <div>내가 쓴 느윗이 없습니다.</div>
        )}
      </div>
      <div></div>
    </>
  );
}

export default Profile;
