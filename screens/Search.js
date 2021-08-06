import React, { useEffect } from "react";
import { View, Text, TextInput, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_PHOTOS = gql`
    query searchPhotos($keyword: String!) {
        searchPhotos(keyword: $keyword) {
            id
            file
        }
    }
`;

const MessageContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;
const MessageText = styled.Text`
    margin-top: 15px;
    color: white;
    font-weight: 600;
`;

const Inpupt = styled.TextInput``;

export default function Search({ navigation }) {
    const { setValue, register, watch, handleSubmit } = useForm();
    // useQuery를 component가 mount될때 즉시 실행 하지만 useLazyQuery는 바로 실행되지 않는다.
    const [startQueryFn, { loading, data, called }] = useLazyQuery(
        SEARCH_PHOTOS
    );
    const onValid = ({ keyword }) => {
        startQueryFn({
            variables: {
                keyword,
            },
        });
    };
    console.log(data);
    const SearchBox = () => (
        <TextInput
            style={{ backgroundColor: "white" }}
            placeholderTextColor='black'
            placeholder='Search photos'
            autoCapitalize='none'
            returnKeyLabel='Search'
            returnKeyType='search'
            autoCorrect={false}
            onChangeText={(text) => setValue("keyword", text)}
            onSubmitEditing={handleSubmit(onValid)}
        />
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register("keyword", { required: true, minLength: 3 });
    }, []);
    return (
        <DismissKeyboard>
            <View style={{ flex: 1, backgroundColor: "black" }}>
                {loading ? (
                    <MessageContainer>
                        <ActivityIndicator size='large' />
                        <MessageText>Searching...</MessageText>
                    </MessageContainer>
                ) : null}
                {!called ? (
                    <MessageContainer>
                        <MessageText>Search by keyword</MessageText>
                    </MessageContainer>
                ) : null}
                {data?.searchPhotos !== undefined &&
                data?.searchPhotos?.length === 0 ? (
                    <MessageContainer>
                        <MessageText>Could not find anything.</MessageText>
                    </MessageContainer>
                ) : null}
            </View>
        </DismissKeyboard>
    );
}
