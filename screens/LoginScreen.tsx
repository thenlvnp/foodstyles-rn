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
import { Entypo } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStackParamList } from "../types";
import useMutation from "use-mutation";
import { fetcher } from "../api";
import { useAuthStore } from "../store";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
type FormFields = {
    email: string;
    password: string;
};

export default function LoginScreen({ navigation, route }: Props) {
    const setAuth = useAuthStore((state) => state.setAuthStatus);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting: formSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [mutate, { status }] = useMutation(
        ({ email, password }: { email: string; password: string }) => {
            return fetcher(`
    mutation{
     loginWithEmail(email: "${email}", password: "${password}"){
         user {
           id,
           email,
           name,
           facebookId,
           googleId,
           appleId,
         },
         accessToken,
         refreshToken
       }
    }`);
        },
        {
            async onSuccess({ data, input }) {
                // Store Tokens
                await SecureStore.setItemAsync(
                    "accessToken",
                    data.loginWithEmail.accessToken
                );
                await AsyncStorage.setItem(
                    "@user",
                    JSON.stringify({
                        email: data.loginWithEmail.user.email,
                        name: data.loginWithEmail.user.name,
                        token: data.loginWithEmail.accessToken,
                    })
                );
                setAuth("user", {
                    email: data.loginWithEmail.user.email,
                    name: data.loginWithEmail.user.name,
                    token: data.loginWithEmail.accessToken,
                });
                setAuth("isLoggedIn", true);
            },
        }
    );
    const isSubmitting = formSubmitting || status === "running";
    const isError = status === "failure";
    const onSubmit = handleSubmit(
        async (data) => {
            mutate(data);
        },
        (errors) => console.log("errors", errors)
    );

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
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "This field is required",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormControl isInvalid={!!errors.email}>
                                <FormControl.Label
                                    _text={{
                                        color: "white",
                                        fontWeight: "semibold",
                                    }}
                                >
                                    Email
                                </FormControl.Label>
                                <Input
                                    _focus={{
                                        bg: "white",
                                    }}
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.email && (
                                    <FormControl.ErrorMessage>
                                        {errors.email?.message}
                                    </FormControl.ErrorMessage>
                                )}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "This field is required",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormControl isInvalid={!!errors.password}>
                                <FormControl.Label
                                    _text={{
                                        color: "white",
                                        fontWeight: "semibold",
                                    }}
                                >
                                    Password
                                </FormControl.Label>
                                <Input
                                    _focus={{
                                        bg: "white",
                                    }}
                                    type="password"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.password && (
                                    <FormControl.ErrorMessage>
                                        {errors.password?.message}
                                    </FormControl.ErrorMessage>
                                )}
                            </FormControl>
                        )}
                    />
                    {isError && (
                        <Text
                            bg="#f13838"
                            fontWeight="semibold"
                            color="white"
                            rounded="lg"
                            fontSize="md"
                            py="2"
                            px="4"
                        >
                            Email or password is not correct
                        </Text>
                    )}
                    <Button
                        size="lg"
                        shadow="7"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        _text={{ textTransform: "uppercase" }}
                        w="46%"
                        maxWidth="100%"
                        onPress={onSubmit}
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
