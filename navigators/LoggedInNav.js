import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: "white",
                showLabel: false,
                style: {
                    borderTopColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "black",
                },
            }}
        >
            <Tabs.Screen
                name='Feed'
                component={Feed}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name='home'
                            color={color}
                            size={focused ? 26 : 20}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name='search'
                            color={color}
                            size={focused ? 26 : 20}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Notifications'
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "heart" : "heart-outline"}
                            color={color}
                            size={focused ? 26 : 20}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name='person'
                            color={color}
                            size={focused ? 26 : 20}
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
}
