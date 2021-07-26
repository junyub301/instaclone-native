import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
export default function Login() {
    const { register, handleSubmit, setValue } = useForm();
    const passwordRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        console.log(data);
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
                disabled={false}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}
