import React, { useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";

const Inpupt = styled.TextInput``;

export default function Search({ navigation }) {
    const { setValue, register, watch } = useForm();
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
    console.log(watch());
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
