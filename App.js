import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    persistCache,
    AsyncStorageWrapper,
    CachePersistor,
} from "apollo3-cache-persist";

export default function App() {
    const [loading, setLoading] = useState(true);
    const onFinish = () => setLoading(false);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const preloadAssets = () => {
        const fontToLoad = [Ionicons.font];
        const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));
        const imagesToLoad = [require("./assets/logo.png")];
        const imagePromises = imagesToLoad.map((image) =>
            Asset.loadAsync(image)
        );
        return Promise.all([...fontPromises, ...imagePromises]);
    };

    const persistor = new CachePersistor({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
    });

    const preload = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            isLoggedInVar(true);
            tokenVar(token);
        }
        await persistor.purge();
        /* await persistCache({
            cache,
            storage: new AsyncStorageWrapper(AsyncStorage),
        }); */

        return preloadAssets();
    };
    if (loading) {
        return (
            <AppLoading
                startAsync={preload}
                onError={console.warn}
                onFinish={onFinish}
            />
        );
    }

    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
            </NavigationContainer>
        </ApolloProvider>
    );
}
