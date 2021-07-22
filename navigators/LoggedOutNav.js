import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
    return (
        /* 
            Statck.Navigator props 
            - 네비게이터 props : 전역 설정이 가능 ex) mode, headerMode...
            - screenOptions : 모든 스크린이 똑같이 보이도록 설정 ex) title,headerTintColor ...

        */
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name='Welcome'
                options={{ headerShown: false }}
                component={Welcome}
            />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen
                name='CreateAccount'
                options={{
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "white",
                }}
                component={CreateAccount}
            />
        </Stack.Navigator>
    );
}
