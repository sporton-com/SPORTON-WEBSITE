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

const initialState: UserData | null = userFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      // localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return action.payload;
    },
    clearUser(state) {
      localStorage.removeItem("userInfo");
      return null; // Reset the state to null
    },
  },
});

export const selectUser = (state: { user: UserData | null }) => state.user;
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
