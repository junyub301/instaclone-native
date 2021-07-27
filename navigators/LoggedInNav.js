import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import Feed from "../screens/Feed";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import Search from "../screens/Search";
import StackNavFactory from "../components/nav/StackNavFactory";

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
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='home'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            >
                {() => <StackNavFactory screenName='Feed' />}
            </Tabs.Screen>
            <Tabs.Screen
                name='Search'
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='search'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            >
                {() => <StackNavFactory screenName='Search' />}
            </Tabs.Screen>
            <Tabs.Screen
                name='Camera'
                component={View}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='camera'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Notifications'
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='heart'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            >
                {() => <StackNavFactory screenName='Notifications' />}
            </Tabs.Screen>
            <Tabs.Screen
                name='Me'
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='person'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            >
                {() => <StackNavFactory screenName='Me' />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
