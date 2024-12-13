import { createLogger } from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { createTransform, persistReducer, persistStore } from 'redux-persist'
import { rootReducer } from '~/store/root.reducer'
import { applyMiddleware, createStore, Middleware, Store } from 'redux'
import thunk from 'redux-thunk'
import { applicationMode } from '~/environment'
import { Persistor } from 'redux-persist/es/types'
import { AnyAction } from 'typescript-fsa'

/**
 * LOGGER
 */
const logger = createLogger()

/**
 * PERSISTENCE CONFIGURATION
 */
const transformCircular = createTransform(
  (inboundState, _) => JSON.stringify(inboundState),
  (outboundState, _) => JSON.parse(outboundState)
)
const persistConfig = {
  key: 'root',
  storage: storage,
  timeout: null,
  transforms: [transformCircular],
  // migrate: () => null,
  blacklist: [],
}

const persistence = persistReducer(persistConfig, rootReducer)

/**
 * REDUX STORE CONFIGURATION
 */
export function configureStore(): { store: any | Store<any, AnyAction>; persistor: Persistor } {
  const reduxMiddleware: Middleware[] = [thunk]
  if (applicationMode() === 'DEV') {
    reduxMiddleware.push(logger)
  }

  const store = createStore(persistence, applyMiddleware(...reduxMiddleware))
  const persistor = persistStore(store)

  return { store, persistor }
}
