import React from "react";
import {
    Box,
    Button,
    FormControl,
    Input,
    VStack,
    Text,
    IconButton,
    Icon,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Entypo } from "@expo/vector-icons";
type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation, route }: Props) {
    return (
        <Box
            safeArea
            flex={1}
            pt={5}
            bg={{
                linearGradient: {
                    colors: ["#fa7745", "#f3c442"],
                    start: [0, 0.8],
                    end: [0, 0],
                },
            }}
        >
            <Box
                flexDirection="row"
                px="3"
                alignItems="center"
                position="relative"
            >
                <Box justifyContent="center" zIndex={1}>
                    <IconButton
                        onPress={() =>
                            navigation.canGoBack() && navigation.goBack()
                        }
                        position="absolute"
                        borderRadius="full"
                        backgroundColor="white"
                        _icon={{
                            color: "black",
                            size: "2xl",
                        }}
                        icon={<Icon as={Entypo} name="chevron-thin-left" />}
                    />
                </Box>
                <Text
                    fontSize="2xl"
                    flex={1}
                    textAlign="center"
                    color="white"
                    fontWeight="bold"
                >
                    {route.name}
                </Text>
            </Box>
            <Box pt="8" alignItems="center">
                <VStack space={4} maxW="full" w="80%" alignItems="center">
                    <FormControl>
                        <FormControl.Label
                            _text={{ color: "white", fontWeight: "semibold" }}
                        >
                            Email
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label
                            _text={{ color: "white", fontWeight: "semibold" }}
                        >
                            Password
                        </FormControl.Label>
                        <Input />
                    </FormControl>
                    <Button
                        size="lg"
                        shadow="7"
                        _text={{ textTransform: "uppercase" }}
                        w="46%"
                        maxWidth="100%"
                        onPress={() => navigation.navigate("EditProfile")}
                    >
                        Log in
                    </Button>
                    <Button
                        backgroundColor="transparent"
                        fontSize="2xl"
                        textDecoration="underline"
                    >
                        Forgot my password
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
