import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Welcome({ navigation }) {
    return (
        <View>
            <Text>Welcome</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("CreateAccount")}
            >
                <Text>Go to Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>Go to Login</Text>
            </TouchableOpacity>
        </View>
    );
}
