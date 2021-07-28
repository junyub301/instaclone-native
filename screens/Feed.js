import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT, COMMNET_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMNET_FRAGMENT}
`;

export default function Feed({ navigation }) {
    const { data } = useQuery(FEED_QUERY);
    console.log(data);
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: "white" }}>Feed</Text>
        </View>
    );
}
