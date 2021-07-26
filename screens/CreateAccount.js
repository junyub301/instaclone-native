import React, { useRef, useEffect } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";

export default function CreateAccount() {
    const { register, handleSubmit, setValue } = useForm();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onDone = () => {
        alert("done!");
    };

    const onValid = (data) => {
        console.log(data);
    };

    useEffect(() => {
        register("firstName");
        register("lastName");
        register("userName");
        register("email");
        register("password");
    }, [register]);
    return (
        <AuthLayout>
            <TextInput
                placeholder='First Name'
                returnKeyType='next'
                onSubmitEditing={() => onNext(lastNameRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onChangeText={(text) => setValue("firstName", text)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder='Last Name'
                returnKeyType='next'
                onSubmitEditing={() => onNext(usernameRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onChangeText={(text) => setValue("lastName", text)}
            />
            <TextInput
                ref={usernameRef}
                placeholder='Username'
                autoCapitalize='none'
                returnKeyType='next'
                onSubmitEditing={() => onNext(emailRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onChangeText={(text) => setValue("userName", text)}
            />
            <TextInput
                ref={emailRef}
                placeholder='Email'
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() => onNext(passwordRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onChangeText={(text) => setValue("email", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder='Password'
                autoCapitalize='none'
                secureTextEntry
                returnKeyType='done'
                onSubmitEditing={onDone}
                lastOne={true}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                onChangeText={(text) => setValue("password", text)}
                onSubmitEditing={handleSubmit(onValid)}
            />
            <AuthButton
                text='Create Account'
                disabled={true}
                onPoress={() => null}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    );
}
