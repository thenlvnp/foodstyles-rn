import React from "react";
import {
    Button,
    FormControl,
    Input,
    VStack,
    Box,
    Text,
    Icon,
    IconButton,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function SignupScreen({ navigation, route }: Props) {
    return (
        <Box
            safeArea
            pt={5}
            flex={1}
            bg={{
                linearGradient: {
                    colors: ["#fa7745", "#f3c442"],
                    start: [0, 0.8],
                    end: [0, 0],
                },
            }}
            alignItems="center"
        >
            <Box
                flexDirection="row"
                px="3"
                alignItems="center"
                position="relative"
            >
                <Box justifyContent="center" zIndex={1}>
                    <IconButton
                        onPress={() => {
                            navigation.canGoBack() && navigation.goBack();
                        }}
                        position="absolute"
                        borderRadius="full"
                        backgroundColor="white"
                        _pressed={{
                            bg: "light.100",
                        }}
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
            <VStack space={4} mt={7} maxW="full" w="80%" alignItems="center">
                <FormControl>
                    <FormControl.Label
                        _text={{ color: "white", fontWeight: "semibold" }}
                    >
                        Your name
                    </FormControl.Label>
                    <Input />
                </FormControl>
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
                        Password (min 6 characters)
                    </FormControl.Label>
                    <Input />
                </FormControl>
                <Button
                    size="lg"
                    shadow="7"
                    _text={{ textTransform: "uppercase" }}
                    w="46%"
                    maxWidth="100%"
                >
                    Log in
                </Button>
            </VStack>
        </Box>
    );
}
