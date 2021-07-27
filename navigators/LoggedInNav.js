import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
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
                        <TabIcon
                            iconName='home'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='search'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            />
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
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='heart'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabIcon
                            iconName='person'
                            focused={focused}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
}
