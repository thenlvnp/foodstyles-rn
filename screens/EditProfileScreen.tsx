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

export default function EditProfileScreen() {
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
                    <FormControl>
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
                        />
                    </FormControl>
                    <FormControl>
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
                        />
                    </FormControl>
                </VStack>
                <Button
                    variant="outline"
                    backgroundColor="#f8f8f8"
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
