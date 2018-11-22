import { updateLocal } from "../helpers/localstorage";
// import {set3boxItem} from "../helpers/3box";

// -- Constants ------------------------------------------------------------- //

const THREEBOX_UPDATE_IMAGE = "3box/THREEBOX_UPDATE_IMAGE";
const THREEBOX_INIT_PROFILE = "3box/THREEBOX_INIT_PROFILE"
// const THREEBOX_ = "3box/THREEBOX_"

// -- Actions --------------------------------------------------------------- //

const localStorageKey = "METACONNECT_3BOX";

export const threeBoxUpdateImage = async _image => (dispatch, getState) => {
  if (!_image) return;
  const { image } = getState().threeBox;
  const threeBoxData = { image };
  // const newAccountData = { ...threeBoxData, image: _image };
  updateLocal(localStorageKey, threeBoxData);
  dispatch({
    type: THREEBOX_UPDATE_IMAGE,
    payload: _image,
  });
};

export // -- Reducer --------------------------------------------------------------- //
const INITIAL_STATE = {
  image: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case THREEBOX_INIT_PROFILE:
      return {...state, }
    case THREEBOX_UPDATE_IMAGE:
      return { ...state, image: action.payload };
    default:
      return state;
  }
};
