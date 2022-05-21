import React from "react";
import { Box, Button, Text, VStack, Image } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const logo = require("../assets/images/FoodStyles-logo.png");

type Props = NativeStackScreenProps<RootStackParamList, "Root">;

export default function LandingScreen({ navigation }: Props) {
    return (
        <Box
            flex={1}
            pt="24"
            pb="7"
            alignItems="center"
            bg={{
                linearGradient: {
                    colors: ["#fa7745", "#f3c442"],
                    start: [0, 0.8],
                    end: [0, 0],
                },
            }}
            justifyContent="space-between"
        >
            <VStack width="80%" flex={1} space="6">
                <Box alignItems="center">
                    <Image source={logo} alt="Food Styles" />
                </Box>
                <Text color={"white"} textAlign="center" fontSize="lg">
                    Sign in to be able to save your preferences and settings.
                </Text>
                <VStack space="4">
                    <Button
                        shadow="6"
                        bg="white"
                        size="lg"
                        py="4"
                        _pressed={{
                            bg: "light.100",
                        }}
                        _text={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: "lg",
                        }}
                        leftIcon={
                            <Box size="6">
                                <Image
                                    size="6"
                                    resizeMode="contain"
                                    alt="Apple"
                                    source={require("../assets/images/Apple-logo.png")}
                                />
                            </Box>
                        }
                    >
                        Sign in with Apple
                    </Button>

                    <Button
                        shadow="6"
                        bg="white"
                        py="4"
                        _text={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: "lg",
                        }}
                        _icon={{
                            marginRight: "1",
                        }}
                        _pressed={{
                            bg: "light.100",
                        }}
                        size="lg"
                        leftIcon={
                            <Box size="6">
                                <Image
                                    size="6"
                                    resizeMode="contain"
                                    alt="Facebook"
                                    source={require("../assets/images/Facebook-icon.png")}
                                />
                            </Box>
                        }
                    >
                        Sign in with Facebook
                    </Button>

                    <Button
                        shadow="6"
                        bg="white"
                        py="4"
                        _text={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: "lg",
                        }}
                        _pressed={{
                            bg: "light.100",
                        }}
                        size="lg"
                        leftIcon={
                            <Box size="6">
                                <Image
                                    size="6"
                                    resizeMode="contain"
                                    alt="Google"
                                    source={require("../assets/images/Google-icon.png")}
                                />
                            </Box>
                        }
                    >
                        Sign in with Google
                    </Button>

                    <Button
                        shadow="6"
                        bg="white"
                        py="4"
                        _pressed={{
                            bg: "light.100",
                        }}
                        _text={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: "lg",
                        }}
                        size="lg"
                        onPress={() => navigation.navigate("Signup")}
                    >
                        Sign in with Email
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        _text={{
                            fontWeight: 600,
                            color: "white",
                        }}
                        fontSize="2xl"
                        textDecoration="underline"
                        onPress={() => navigation.navigate("Login")}
                    >
                        Login with Email
                    </Button>
                </VStack>
            </VStack>
            <Text color="white" textAlign="center" w="1/2" maxW="full">
                By signing in you accept the{" "}
                <Text underline>General Terms</Text> and{" "}
                <Text underline>Privacy Policy</Text>
            </Text>
        </Box>
    );
}
