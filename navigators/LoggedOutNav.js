import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Welcome";
import CreateAccount from "../screens/Welcome";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Welcome' component={Welcome} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='CreateAccount' component={CreateAccount} />
        </Stack.Navigator>
    );
}
