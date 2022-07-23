import React, { useState } from "react";
import "./style.css";

import Modal from "./component/Modal";
import Dictionary from "./component/Dictionary";
import Revisemodal from "./component/Revisemodal";
import Spinner from "./component/Spinner";

import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { loadWordFB } from "./redux/modules/cardReducer";

import { db } from "./firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const list = useSelector((state) => state.cardReducer.list);
  const is_loaded = useSelector((state) => state.cardReducer.is_loaded);

  // const [list, setList] = useState([
  //   { title: "구름", desc: "물이 기화되어 발생", ex: "구름이 예쁘다" },
  // ]);

  // React.useEffect(async () => {

  // [0: firebase.js의 firestore db 연결 확인]
  // console.log(db)

  // [1: 데이터 가져오기]
  // const query = await getDocs(collection(db, "word"));
  // query.forEach((doc) => {
  //   console.log(doc.id, doc.data());
  // });

  // [2: 데이터 추가하기]
  // addDoc(collection(db, "word"), {
  //   text: "별",
  //   desc: "지구 주위의 항성",
  //   ex: "우주에는 별이 있다.",
  // });

  // [3: 데이터 수정하기]
  // const docRef = doc(db, "word", "2YFHxZWW6z8GyaU9sUeS");
  // updateDoc(docRef, { text: "수정된 별" });

  // [4: 데이터 삭제하기]
  // const docRef = doc(db, "word", "2YFHxZWW6z8GyaU9sUeS");
  // deleteDoc(docRef);

  // }, []);

  React.useEffect(() => {
    dispatch(loadWordFB());
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h2>MY DICTIONARY</h2>
        <div className="line"></div>

        <Route path="/" exact>
          <Dictionary list={list} />
        </Route>

        <Route path="/addword" exact>
          <Modal />
        </Route>

        <Route path="/addword/:idx">
          <Revisemodal />
        </Route>

        <button
          className="add_btn"
          onClick={() => {
            history.push("/addword");
          }}
        >
          +
        </button>
      </div>
      {!is_loaded && <Spinner />}
    </div>
  );
}

export default App;
