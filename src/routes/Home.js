import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = (userObj) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
      //새로 작성한 트윗과 그 이전의 것
      //set이 붙을때 함수전달 가능 , 만약 함수가 전달되면 리액트는 이전 값에 접근할 수 있게 함
    });
  };

  //컴포넌트가 mount될 때, 우리는 getNweets 실행
  //getNweets는 dbService 불러옴
  //collection. nweets를 get써서 가져옴

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createAt: Date.now(),
      createId: userObj.uid, // 작성자를 알 수 있음
    });
    setNweets("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  console.log(nweets);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="input your insprit"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        ></input>
        <input type="submit" value="Nweet"></input>
      </form>
      <div key={nweet.id}>
        {nweets.map((nweet) => (
          <div>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
