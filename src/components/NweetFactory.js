import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function NweetFactory({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet === "") return;
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      // console.log(await response.ref.getDownloadURL);
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const res = await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setNweet("");
    setAttachment("");
    console.log(res);
  };

  const onChange = (event) => {
    event.preventDefault();
    //아래는 event.target은 이벤트가 발생한 <input> 태그를 의미하며, 해당 태그의 <input value={}> 를 받아온다는 의미임.
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
          <input
            className="factoryInput__input"
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="아무 말이나 지껄이세요."
            maxLength={120}
          ></input>
          <input type="submit" value="&rarr;" className="factoryInput__arrow" />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
          <span>사진 추가</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
    </>
  );
}

export default NweetFactory;
