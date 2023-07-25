import {StrictMode} from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import './index.scss';
import App from './App';
import authReducer from './state/auth'
import navigationReducer from './state/navigation'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import {
    persistCombineReducers,
    persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
const persistConfig = {key: 'root', storage, version: 1}
const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        authState: authReducer,
        navigationState: navigationReducer
    }),
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
    },
});

const root: Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <App/>
            </PersistGate>
        </Provider>
    </StrictMode>
);
