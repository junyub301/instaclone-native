import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { colors } from "../colors";

const Container = styled.View`
    flex: 1;
    background-color: black;
    padding: 0px 50px;
`;

const Photo = styled.Image`
    height: 350px;
`;
const CaptionContainer = styled.View`
    margin-top: 30px;
`;
const Caption = styled.TextInput`
    background-color: white;
    color: black;
    padding: 10px 20px;
    border-radius: 100px;
`;

const HeaderRightText = styled.Text`
    color: ${colors.blue};
    font-size: 16px;
    font-weight: 600;
    margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
    const HeaderRight = () => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("UploadForm", {
                    file: chosenPhoto,
                })
            }
        >
            <HeaderRightText>Next</HeaderRightText>
        </TouchableOpacity>
    );
    const HeaderRightLoading = () => (
        <ActivityIndicator
            size='small'
            color='white'
            style={{ marginRight: 10 }}
        />
    );
    const { register, handleSubmit, setValue } = useForm();
    useEffect(() => {
        register("caption");
    }, [register]);
    useEffect(() => {
        navigation.setOptions({
            headerRight: HeaderRightLoading,
            headerLeft: () => null,
        });
    }, []);
    const onValid = ({ caption }) => {};
    return (
        <DismissKeyboard>
            <Container>
                <Photo
                    resizeMode='contain'
                    source={{ uri: route.params.file }}
                />
                <CaptionContainer>
                    <Caption
                        placeholder='Write a caption...'
                        placeholderTextColor='rgba(0,0,0,0.5)'
                        onSubmitEditing={handleSubmit(onValid)}
                        returnKeyType='done'
                        onChangeText={(text) => setValue("caption", text)}
                    />
                </CaptionContainer>
            </Container>
        </DismissKeyboard>
    );
}
