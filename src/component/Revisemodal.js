import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import { plusWord } from "../redux/modules/cardReducer";
import { updateWordFB } from "../redux/modules/cardReducer";
import { useDispatch } from "react-redux";

const Modal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const text1 = React.useRef(null);
  const text2 = React.useRef(null);
  const text3 = React.useRef(null);

  return (
    <div className="Addword_container">
      <div className="Addword_input">
        <p>Word</p>
        <input ref={text1} />
      </div>

      <div className="Addword_input">
        <p>Describe</p>
        <input ref={text2} />
      </div>

      <div className="Addword_input">
        <p>Example</p>
        <input ref={text3} />
      </div>

      <div className="btn_box">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => {
            if (
              text1.current.value != "" &&
              text2.current.value != "" &&
              text3.current.value != ""
            ) {
              dispatch(
                updateWordFB({
                  title: text1.current.value,
                  desc: text2.current.value,
                  ex: text3.current.value,
                  id: params.idx,
                })
              );
              history.push("/");
            } else {
              window.alert("입력하지 않은 항목이 있습니다.");
            }
          }}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default Modal;
