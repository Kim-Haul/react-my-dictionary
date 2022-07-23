import React from "react";

import { deleteWord } from "../redux/modules/cardReducer";
import { deleteWordFB } from "../redux/modules/cardReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Dictionary = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="dictionary_container">
      {props.list.map((v, i) => {
        // console.log(v);
        return (
          <div key={i} className="word_list_box">
            <div className="word_box">
              <div className="word_box_title">Word</div>
              {v["title"]}
            </div>

            <div className="word_box">
              <div className="word_box_title">Describe</div>
              {v["desc"]}
            </div>

            <div className="word_box">
              <div className="word_box_title">Example</div>
              <div className="word_box_ex">{v["ex"]}</div>
            </div>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                // dispatch(deleteWord(i));
                dispatch(deleteWordFB(v.id));
              }}
            >
              X
            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                history.push(`addword/${v.id}`);
              }}
            >
              U
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Dictionary;
