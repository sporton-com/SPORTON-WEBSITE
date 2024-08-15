// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../actions/user.actions";

// استرجاع الحالة الأولية من localStorage
const userFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  }
  return null;
};

const initialState = userFromLocalStorage();
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state = action.payload;
    },
  },
});
export const selectUser = (state: { user: UserData; }) => state.user;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
