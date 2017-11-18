import * as createStore from "redux-zero";

const store = (createStore as any)({
  profile: {
    name: "default"
  },
  items: []
});

export const setProfileName = (state, { target }) => ({ profile: { name: target.value } })

export default store
