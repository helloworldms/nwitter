import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, "data_url");
    console.log(response);
    setNweet("");
    //child는 기본적으로 이미지와 path
    //uuid는 기본적으로 어떤 특별한 식별자를 랜더으로 생성
    //파일에 대한 reference를 만들고 난 후 파일을 몇몇 내용과 함꼐 업데이트
    //모든 유저의 사진은 아이디와 분리되어 있음
    //사진에는 이름을 줘야하고 랜듬으로 주기 위해 uuid사용

    // await dbService.collection("nweets").add({
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setNweet("");
  };
  const onChange = (event) => {
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
  const onClearAttachment = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange}></input>
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="filexs" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          ></Nweet>
        ))}
      </div>
    </div>
  );
};
export default Home;
