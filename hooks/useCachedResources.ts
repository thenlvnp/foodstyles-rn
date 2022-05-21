import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuthStore } from "../store";

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const setAuthValues = useAuthStore((state) => state.setAuthStatus);
    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            setAuthValues("isCheckingSession", true);
            try {
                SplashScreen.preventAutoHideAsync();
                // Check if token exists
                let result = await SecureStore.getItemAsync("accessToken");
                let user = await AsyncStorage.getItem("@user");
                setAuthValues("isLoggedIn", !!result ? true : false);
                console.log("user", user);
                setAuthValues("user", JSON.parse(user ?? "{}"));
                // Load fonts
                await Font.loadAsync({
                    ...FontAwesome.font,
                    "ProximaNova-regular": require("../assets/fonts/ProximaNovaAlt-Regular.ttf"),
                    "ProximaNova-semibold": require("../assets/fonts/ProximaNovaAlt-Semibold.ttf"),
                    "ProximaNova-condensed-semibold": require("../assets/fonts/ProximaNovaAltCond-Semibold.ttf"),
                    "ProximaNova-condensed-bold": require("../assets/fonts/ProximaNovaAlt-Bold.ttf"),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                setAuthValues("isCheckingSession", false);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
