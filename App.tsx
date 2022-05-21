import { StatusBar } from "expo-status-bar";
import {
    NativeBaseProvider,
    INativebaseConfig,
    extendTheme,
    Theme,
} from "native-base";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const config: INativebaseConfig = {
    dependencies: {
        // For Expo projects (Bare or managed workflow)
        "linear-gradient": require("expo-linear-gradient").LinearGradient,
        // For non expo projects
        // 'linear-gradient': require('react-native-linear-gradient').default,
    },
};

const theme: Theme = extendTheme({
    colors: {
        primary: {
            50: "#defff3",
            100: "#b4f9df",
            200: "#88f4cb",
            300: "#5cf0b7",
            400: "#32eba3",
            500: "#1cd28a",
            600: "#11b777",
            700: "#05754c",
            800: "#00472d",
            900: "#00190c",
        },
    },
    fontConfig: {
        ProximaNova: {
            100: {
                normal: "ProximaNova-regular",
                italic: "Roboto-LightItalic",
            },
            200: {
                normal: "ProximaNova-regular",
                italic: "Roboto-LightItalic",
            },
            300: {
                normal: "ProximaNova-regular",
                italic: "Roboto-LightItalic",
            },
            400: {
                normal: "ProximaNova-regular",
                italic: "Roboto-Italic",
            },
            500: {
                normal: "ProximaNova-regular",
            },
            600: {
                normal: "ProximaNova-semibold",
            },
            700: {
                normal: "ProximaNova-condensed-bold",
            },
        },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: "ProximaNova",
        body: "ProximaNova",
        mono: "ProximaNova",
    },
    components: {
        Input: {
            baseStyle: {
                borderRadius: "md",
            },
            defaultProps: {
                variant: "filled",
            },
        },
        FormControlLabel: {
            baseStyle: {
                _text: {
                    color: "white",
                    fontWeight: "semibold",
                },
            },
        },
        Button: {
            // Can simply pass default props to change default behaviour of components.
            baseStyle: {
                rounded: "full",
                _text: {
                    fontWeight: 600,
                },
            },
            variants: {
                solid: () => ({
                    _hover: {
                        bg: "red",
                    },
                    _pressed: {
                        bg: "blue",
                    },
                }),
            },
        },
    },
});

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NativeBaseProvider config={config} theme={theme}>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </NativeBaseProvider>
        );
    }
}
