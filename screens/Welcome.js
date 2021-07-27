import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

// 리액트 네이티브에서는 모든 flex 컨테이너가 기본적으로 flex direction : column이다.
// 리액트에서는 모든 flex 컨테이너가 기본적으로 flex direction : row이다.

const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin-top: 20px;
    text-align: center;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("Login");
    return (
        <AuthLayout>
            <AuthButton
                disabled={false}
                onPress={goToCreateAccount}
                text='Create New Account'
            />
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    );
}
