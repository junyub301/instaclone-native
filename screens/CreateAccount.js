import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwrodRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onDone = () => {
        alert("done!");
    };
    return (
        <AuthLayout>
            <TextInput
                placeholder='First Name'
                returnKeyType='next'
                onSubmitEditing={() => onNext(lastNameRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
            />
            <TextInput
                ref={lastNameRef}
                placeholder='Last Name'
                returnKeyType='next'
                onSubmitEditing={() => onNext(usernameRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
            />
            <TextInput
                ref={usernameRef}
                placeholder='Username'
                returnKeyType='next'
                onSubmitEditing={() => onNext(emailRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
            />
            <TextInput
                ref={emailRef}
                placeholder='Email'
                keyboardType='email-address'
                returnKeyType='next'
                onSubmitEditing={() => onNext(passwrodRef)}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
            />
            <TextInput
                ref={passwrodRef}
                placeholder='Password'
                secureTextEntry
                returnKeyType='done'
                onSubmitEditing={onDone}
                lastOne={true}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
            />
            <AuthButton
                text='Create Account'
                disabled={true}
                onPoress={() => null}
            />
        </AuthLayout>
    );
}
