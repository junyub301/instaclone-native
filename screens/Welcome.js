import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";

// 리액트 네이티브에서는 모든 flex 컨테이너가 기본적으로 flex direction : column이다.
// 리액트에서는 모든 flex 컨테이너가 기본적으로 flex direction : row이다.

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: black;
`;

const Logo = styled.Image`
    max-width: 50%;
    height: 100px;
`;

const CreateAccount = styled.View`
    background-color: ${colors.blue};
    padding: 5px 10px;
    border-radius: 3px;
`;

const CreateAccountText = styled.Text`
    color: white;
    font-weight: 600;
`;
const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin-top: 10px;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("Login");
    return (
        <Container>
            <Logo resizeMode='contain' source={require("../assets/logo.png")} />
            <TouchableOpacity onPress={goToCreateAccount}>
                <CreateAccount>
                    <CreateAccountText>Create Account</CreateAccountText>
                </CreateAccount>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
        </Container>
    );
}
