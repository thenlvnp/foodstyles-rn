import React from "react";
import {
    Box,
    Button,
    FormControl,
    Input,
    StatusBar,
    VStack,
    Text,
} from "native-base";
import { useAuthStore } from "../store";
import { Controller, useForm } from "react-hook-form";
import useMutation from "use-mutation";
import * as SecureStore from "expo-secure-store";
import { fetcher } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
type FormFields = {
    name: string;
    email: string;
};

export default function EditProfileScreen() {
    const user = useAuthStore((state) => state.user);
    const setAuth = useAuthStore((state) => state.setAuthStatus);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting: formSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
    });
    const [mutate, { status, reset }] = useMutation(
        ({ email, name }: { email: string; name: string }) => {
            return fetcher(
                `mutation{
                updateUser(name:"${name}", email: "${email}") {
                    id
                    name
                    email
                    facebookId
                    googleId
                    appleId
                }
             }`,
                { authorization: `Bearer ${user?.token}` }
            );
        },
        {
            async onSuccess({ input }) {
                setTimeout(() => {
                    reset();
                }, 2000);
                await AsyncStorage.setItem(
                    "@user",
                    JSON.stringify({
                        ...user,
                        name: input.name,
                        email: input.email,
                    })
                );
                setAuth("user", {
                    ...user,
                    name: input.name,
                    email: input.email,
                });
            },
            onFailure: ({ error }) => {
                console.log("error :>> ", error);
            },
        }
    );
    const [logout, logoutStatus] = useMutation(async () => {
        await SecureStore.deleteItemAsync("accessToken");
        await AsyncStorage.removeItem("@user");
        setAuth("isLoggedIn", false);
        setAuth("user", undefined);
    });

    const isSubmitting = formSubmitting || status === "running";
    const isProfileUpdated = status === "success";
    const isError = status === "failure";
    const onSubmit = handleSubmit(
        async (data) => {
            mutate(data);
        },
        (errors) => console.log("errors", errors)
    );

    return (
        <Box pt={5} flex={1} bg="#f8f8f8" alignItems="center" safeArea>
            <StatusBar barStyle="dark-content" />
            <Text
                textTransform="uppercase"
                w="90%"
                fontSize="lg"
                color="#434343"
                fontWeight="semibold"
            >
                Profile
            </Text>
            <VStack
                mt={5}
                flex={1}
                maxW="full"
                w="90%"
                alignItems="center"
                justifyContent="space-between"
                pb="12"
            >
                <VStack space={4} w="full">
                    <Controller
                        name="name"
                        control={control}
                        defaultValue={user?.name}
                        rules={{
                            required: "This field is required",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormControl isInvalid={!!errors.name}>
                                <FormControl.Label
                                    _text={{
                                        color: "#434343",
                                    }}
                                >
                                    Name shown on your shared cards
                                </FormControl.Label>
                                <Input
                                    _input={{
                                        backgroundColor: "#ececec",
                                        borderRadius: "md",
                                    }}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.name && (
                                    <FormControl.ErrorMessage>
                                        {errors.name?.message}
                                    </FormControl.ErrorMessage>
                                )}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="email"
                        defaultValue={user?.email}
                        control={control}
                        rules={{
                            required: "This field is required",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormControl isInvalid={!!errors.email}>
                                <FormControl.Label
                                    _text={{
                                        color: "#434343",
                                    }}
                                >
                                    Email
                                </FormControl.Label>
                                <Input
                                    _input={{
                                        backgroundColor: "#ececec",
                                        borderRadius: "md",
                                    }}
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
                            Failed to update profile,try again
                        </Text>
                    )}
                    {isProfileUpdated && (
                        <Text
                            bg="#11b777"
                            fontWeight="semibold"
                            color="white"
                            rounded="lg"
                            fontSize="md"
                            py="2"
                            px="4"
                        >
                            Profile updated
                        </Text>
                    )}
                </VStack>
                <Button
                    variant="outline"
                    backgroundColor="#f8f8f8"
                    disabled={logoutStatus.status === "running"}
                    isLoading={logoutStatus.status === "running"}
                    onPress={logout}
                    size="lg"
                    _text={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "#434343",
                    }}
                    _pressed={{
                        backgroundColor: "white",
                    }}
                    w="50%"
                    maxWidth="100%"
                >
                    Log out
                </Button>
            </VStack>

            <Box
                bg="white"
                pb="4"
                w="full"
                alignItems="center"
                position="relative"
            >
                <Button
                    mt="-6"
                    size="lg"
                    shadow="7"
                    onPress={onSubmit}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    _text={{ textTransform: "uppercase", fontWeight: 700 }}
                    w="40%"
                    maxWidth="100%"
                >
                    Done
                </Button>
            </Box>
        </Box>
    );
}
