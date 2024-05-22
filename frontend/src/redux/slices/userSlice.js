import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  firstname: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  role: '',
  defaultAddress: null,
  profileImage: null,
  enabled: false,
  accountNonExpired: false,
  credentialsNonExpired: false,
  authorities: [],
  username: '',
  accountNonLocked: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
