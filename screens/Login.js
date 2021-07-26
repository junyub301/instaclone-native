import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const LOG_IN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

export default function Login() {
    const { register, handleSubmit, setValue, watch } = useForm();
    const passwordRef = useRef();
    const onCompleted = (data) => {
        const {
            login: { ok, token },
        } = data;
        if (ok) {
            isLoggedInVar(true);
        }
    };
    const [logInMutation, { loading }] = useMutation(LOG_IN_MUTATION, {
        onCompleted,
    });
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        if (!loading) {
            logInMutation({
                variables: {
                    ...data,
                },
            });
        }
    };
    useEffect(() => {
        register("username", { required: true });
        register("password", { required: true });
    }, [register]);
    return (
        <AuthLayout>
            <TextInput
                placeholder='Username'
                returnKeyType='next'
                autoCapitalize='none'
                onSubmitEditing={() => onNext(passwordRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder='Password'
                secureTextEntry
                returnKeyType='done'
                lastOne={true}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton
                text='Log In'
                loading={loading}
                disabled={!watch("username") || !watch("password")}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}
