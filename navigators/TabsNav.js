import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Image } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    const { data } = useMe();
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
                {() => <SharedStackNav screenName='Feed' />}
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
                {() => <SharedStackNav screenName='Search' />}
            </Tabs.Screen>
            <Tabs.Screen
                name='Camera'
                component={View}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate("Upload");
                        },
                    };
                }}
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
                {() => <SharedStackNav screenName='Notifications' />}
            </Tabs.Screen>
            <Tabs.Screen
                name='Me'
                options={{
                    tabBarIcon: ({ focused, color, size }) =>
                        data?.me?.avatar ? (
                            <Image
                                source={{ uri: data.me.avatar }}
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    ...(focused && {
                                        borderColor: "white",
                                        borderWidth: 1,
                                    }),
                                }}
                            />
                        ) : (
                            <TabIcon
                                iconName='person'
                                focused={focused}
                                color={color}
                            />
                        ),
                }}
            >
                {() => <SharedStackNav screenName='Me' />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
