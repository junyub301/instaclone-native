import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";

const Stack = createStackNavigator();

export default function MessageNav() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: "white",
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: "black",
                },
                headerBackImage: ({ tintColor }) => (
                    <Ionicons name='chevron-down' color={tintColor} size={20} />
                ),
            }}
        >
            <Stack.Screen name='Rooms' component={Rooms} />
            <Stack.Screen name='Room' component={Room} />
        </Stack.Navigator>
    );
}
