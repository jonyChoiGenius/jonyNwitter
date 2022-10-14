import { dbService } from "fbase";

import React, { useEffect } from "react";
import { useState } from "react";
import Nweet from "components/Nweet";

import NweetFactory from "components/NweetFactory";

function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);

  //   프로젝트의 src/index.js에서
  // <React.StrictMode> 태그로 <app/>이 감싸져있으면
  // 개발모드에서 (개발 단계시 오류를 잘 잡기위해) 두 번씩 렌더링됩니다.
  // 출처: https://velog.io/@hyes-y-tag/React-useEffect%EA%B0%80-%EB%91%90%EB%B2%88-%EC%8B%A4%ED%96%89%EB%90%9C%EB%8B%A4%EA%B3%A0
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
      console.log("이게 실행됨");
    });
  }, []);

  return (
    <>
      <NweetFactory userObj={userObj} />

      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
