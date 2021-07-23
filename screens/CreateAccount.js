import React, { useRef } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const Cotainer = styled.View`
    flex: 1;
    background-color: black;
`;
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
                placeholderTextColor='gray'
                returnKeyType='next'
                style={{ backgroundColor: "white", width: "100%" }}
                onSubmitEditing={() => onNext(lastNameRef)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder='Last Name'
                placeholderTextColor='gray'
                returnKeyType='next'
                style={{ backgroundColor: "white", width: "100%" }}
                onSubmitEditing={() => onNext(usernameRef)}
            />
            <TextInput
                ref={usernameRef}
                placeholder='Username'
                placeholderTextColor='gray'
                returnKeyType='next'
                style={{ backgroundColor: "white", width: "100%" }}
                onSubmitEditing={() => onNext(emailRef)}
            />
            <TextInput
                ref={emailRef}
                placeholder='Email'
                placeholderTextColor='gray'
                keyboardType='email-address'
                returnKeyType='next'
                style={{ backgroundColor: "white", width: "100%" }}
                onSubmitEditing={() => onNext(passwrodRef)}
            />
            <TextInput
                ref={passwrodRef}
                placeholder='Password'
                placeholderTextColor='gray'
                secureTextEntry
                returnKeyType='done'
                style={{ backgroundColor: "white", width: "100%" }}
                onSubmitEditing={onDone}
            />
            <AuthButton
                text='Create Account'
                disabled={true}
                onPoress={() => null}
            />
        </AuthLayout>
    );
}
