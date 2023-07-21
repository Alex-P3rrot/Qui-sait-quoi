import React from 'react';
import ReactDOM, {Root} from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state/auth'
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import {
    persistReducer,
    persistStore
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const persistConfig = {key: 'root', storage, version: 1}
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
    reducer: persistedReducer,
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
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
