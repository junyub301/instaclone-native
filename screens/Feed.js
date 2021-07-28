import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { COMMNET_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";

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
    const { data, loading } = useQuery(FEED_QUERY);
    const renderPohoto = ({ item: photo }) => {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ color: "white" }}>{photo.caption}</Text>
            </View>
        );
    };
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                data={data?.seeFeed}
                keyExtractor={(pohto) => "" + pohto.id}
                renderItem={renderPohoto}
            />
        </ScreenLayout>
    );
}
