'use client'

import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import store from "../store";


export default function Providers({ children }) {
    return (
        <HeroUIProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </HeroUIProvider>
    )
}