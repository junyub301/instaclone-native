import React, { useEffect } from "react";
import { View, Text, TextInput } from "react-native";
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

const Inpupt = styled.TextInput``;

export default function Search({ navigation }) {
    const { setValue, register, watch } = useForm();
    // useQuery를 component가 mount될때 즉시 실행 하지만 useLazyQuery는 바로 실행되지 않는다.
    const [startQueryFn, { loading, data }] = useLazyQuery(SEARCH_PHOTOS);
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
        />
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register("keyword");
    }, []);

    return (
        <DismissKeyboard>
            <View
                style={{
                    backgroundColor: "black",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ color: "white" }}>Photo</Text>
            </View>
        </DismissKeyboard>
    );
}
