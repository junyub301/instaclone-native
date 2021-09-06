import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";

const ROOM_QUERY = gql`
    query seRoom($id: Int!) {
        seeRoom(id: $id) {
            messages {
                id
                payload
                user {
                    username
                    avatar
                }
                read
            }
        }
    }
`;

export default function Room({ route, navigation }) {
    const { data } = useQuery(ROOM_QUERY, {
        variables: { id: route?.params?.id },
    });
    useEffect(() => {
        navigation.setOptions({
            title: `${route?.params?.talkingTo?.username}`,
        });
    }, []);
    return (
        <View>
            <Text>Messages List</Text>
        </View>
    );
}
