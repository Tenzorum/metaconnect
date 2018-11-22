import { combineReducers } from "redux";
import account from "./_account";
import metaConnection from "./_metaConnection";
import notification from "./_notification";
import p2pRoom from "./_p2pRoom";
import threeBox from "./_3box";

export default combineReducers({
  account,
  metaConnection,
  notification,
  p2pRoom,
  threeBox,
});
