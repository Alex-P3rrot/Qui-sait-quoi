import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../state/auth";
import navigationReducer from "../state/navigation";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";

export function buildStore(): ToolkitStore {
    return configureStore({
        reducer: {
            authState: authReducer,
            navigationState: navigationReducer
        }
    })
}