import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
  isLoading: boolean
  isFetching: boolean
}

const initialState: IState = {
  isLoading: false,
  isFetching: false,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setIsFetching: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetching = payload
    },
  },
})

export const { setIsLoading, setIsFetching } = userSlice.actions
export default userSlice.reducer