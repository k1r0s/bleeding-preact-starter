import * as createStore from "redux-zero";
import { BindGroupChange } from "./common/bind-group";

const store = (createStore as any)({
  profile: {},
  items: []
});

export const updateForm = ({ profile }, change: BindGroupChange) => ({
  profile: { ...profile, [change.name]: change.value }
})

export default store
