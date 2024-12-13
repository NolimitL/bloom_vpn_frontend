import { combineReducers } from 'redux'
import { reducers } from '~/store/particles/reducers'

export const rootReducer = combineReducers(reducers)

export type RootState = ReturnType<typeof rootReducer>
