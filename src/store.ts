import * as createStore from "redux-zero";

const store = (createStore as any)({
  profile: {},
  items: []
});

export const updateForm = ({ profile }, change) => ({
  profile: { ...profile, ...change }
})

export default store
