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
import { Controller, useForm } from "react-hook-form";
import { fetcher } from "../api";
import useMutation from "use-mutation";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;
type FormFields = {
    name: string;
    email: string;
    password: string;
};

export default function SignupScreen({ navigation, route }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const [login, loginMutation] = useMutation(
        async ({
            email,
            password,
            name,
        }: {
            email: string;
            password: string;
            name: string;
        }) => {
            await fetcher(`
        mutation {
           signUpWithEmail(name:"${name}", email:"${email}", password:"${password}"){
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
            onSuccess() {
                navigation.navigate("Login");
            },
        }
    );
    const isLoggingIn = loginMutation.status === "running" || isSubmitting;
    const isError = loginMutation.status === "failure";
    const onSubmit = handleSubmit(
        (data) => {
            login(data);
        },
        (errors) => console.log("errors", errors)
    );

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
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: "This field is required",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl isInvalid={!!errors.name}>
                            <FormControl.Label
                                _text={{
                                    color: "white",
                                    fontWeight: "semibold",
                                }}
                            >
                                Your name
                            </FormControl.Label>
                            <Input
                                _focus={{
                                    bg: "white",
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
                                    {errors.email.message}
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
                        validate: {
                            "is-min": (value) => {
                                return value.length < 6
                                    ? "Password must be 6 characters minimum"
                                    : true;
                            },
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl isInvalid={!!errors.password}>
                            <FormControl.Label
                                _text={{
                                    color: "white",
                                    fontWeight: "semibold",
                                }}
                            >
                                Password (min 6 characters)
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
                            {errors.password?.message && (
                                <FormControl.ErrorMessage>
                                    {errors.password.message}
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
                        Failed to sign up, try again
                    </Text>
                )}
                <Button
                    size="lg"
                    disabled={isLoggingIn}
                    isLoading={isLoggingIn}
                    shadow="7"
                    _text={{ textTransform: "uppercase" }}
                    w="46%"
                    maxWidth="100%"
                    onPress={onSubmit}
                >
                    Sign Up
                </Button>
            </VStack>
        </Box>
    );
}
