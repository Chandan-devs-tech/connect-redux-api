import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const resp = await fetch('https://randomuser.me/api/?results=5');
    const data = await resp.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    // throw new Error("Failed to get users");
    return rejectWithValue('Something went wrong');
  }
});
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined,
  },
  //   reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchUsers };
// export const usersReducer = usersSlice.reducer;
export default usersSlice;
