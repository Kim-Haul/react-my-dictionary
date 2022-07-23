import { db } from "../../firebase";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Actions
// 액션 타입 설정
const ADD = "cardReducer/ADD";
const DELETE = "cardReducer/DELETE";
const LOAD = "cardReducer/LOAD";
const LOADED = "cardReducer/LOADED";

// 초기값 설정
const initialState = {
  is_loaded: false,

  list: [
    { title: "구름", desc: "물이 기화되어 발생", ex: "구름이 예쁘다" },
    { title: "바다", desc: "지구를 이루는 물", ex: "바다가 파랗다" },
    // {
    //   title: "단어를 입력해주세요.",
    //   desc: "설명을 입력해주세요.",
    //   ex: "예시를 입력해주세요.",
    // },
  ],
};

// Action Creators
// 액션 생성함수에서 액션 개체 리턴
export function plusWord(addContent) {
  console.log("단어 추가 액션을 실행할거야!");
  return { type: ADD, addContent: addContent };
}

export function deleteWord(wordIndex) {
  console.log("단어 삭제 액션을 실행할거야!");
  return { type: DELETE, wordIndex };
}

export function loadWord(wordIist) {
  console.log("단어 로드 액션을 실행할거야!");
  return { type: LOAD, wordIist };
}

export function isLoaded(loaded) {
  console.log("단어 추가시 스피너를 띄우기위한 사전작업이야!");
  return { type: LOADED, loaded };
}

// middlewares (redux-thunk)
export const loadWordFB = () => {
  return async function (dispatch) {
    const firestore_word_list = await getDocs(collection(db, "word"));

    let word_list = [];
    firestore_word_list.forEach((doc) => {
      // word_list = [...word_list, {...doc.data()}]
      word_list.push({ id: doc.id, ...doc.data() });
    });

    // console.log(word_list);
    dispatch(loadWord(word_list));
  };
};

export const addWordFB = (word) => {
  return async function (dispatch) {
    dispatch(isLoaded(false));
    // 스피너 생성을 위한 isLoaded dispatch 추가
    const docRef = await addDoc(collection(db, "word"), {
      title: word.title,
      desc: word.desc,
      ex: word.ex,
      //word로만 넣어도 OK.
    });
    // console.log(docRef)
    // console.log(docRef.data())
    // console.log((await getDoc(docRef)).data());

    const _word = await getDoc(docRef);
    const word_data = { id: _word.id, ..._word.data() };
    dispatch(plusWord(word_data));
  };
};

export const updateWordFB = (word) => {
  return async function (dispatch) {
    // console.log(word.id);
    // console.log(word.id.slice(1));

    const docRef = doc(db, "word", word.id);
    await updateDoc(docRef, {
      title: word.title,
      desc: word.desc,
      ex: word.ex,
    });

    const firestore_word_list = await getDocs(collection(db, "word"));
    let word_list = [];
    firestore_word_list.forEach((doc) => {
      // word_list = [...word_list, {...doc.data()}]
      word_list.push({ id: doc.id, ...doc.data() });
    });

    // console.log(word_list);
    dispatch(loadWord(word_list));
  };
};

export const deleteWordFB = (word_id) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "word", word_id);
    await deleteDoc(docRef);

    const firestore_word_list = await getDocs(collection(db, "word"));
    let word_list = [];
    firestore_word_list.forEach((doc) => {
      // word_list = [...word_list, {...doc.data()}]
      word_list.push({ id: doc.id, ...doc.data() });
    });
    console.log("리듀서가 아닌, 미들웨이에서 삭제 진행중이야!");

    // console.log(word_list);
    dispatch(loadWord(word_list));
  };
};

// Reducer
// 액션생성함수가 요청 -> 실제로 바꾸는건 리듀서에서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "cardReducer/ADD": {
      console.log("리듀서에서 값을 추가할거야!");
      console.log(state);
      const new_word_list = [...state.list, action.addContent];
      return { list: new_word_list, is_loaded: true };
    }

    case "cardReducer/DELETE": {
      console.log("리듀서에서 값을 삭제할거야!");
      const new_word_list = state.list.filter((x, i) => {
        return action.wordIndex != i;
      });
      return { ...state, list: new_word_list };
    }

    case "cardReducer/LOAD": {
      console.log("값을 로드할거야 !");
      return { list: action.wordIist, is_loaded: true };
    }

    case "cardReducer/LOADED": {
      console.log("추가시 스피너를 띄울거야");
      return { ...state, is_loaded: action.loaded };
    }

    default:
      return state;
  }
}
