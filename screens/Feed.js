import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { COMMNET_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "../components/Photo";

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
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
    // fetchMore : 기존 결과를 유지한 채 새로운 결과를 추가하는 방식
    const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
        variables: { offset: 0 },
    });
    const renderPohoto = ({ item: photo }) => {
        return <Photo {...photo} />;
    };
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    const [refreshing, setRefreshing] = useState(false);
    return (
        <ScreenLayout loading={loading}>
            {/* 
        onEndReachedThreshold : 리스트 끝이 어딘지를 설정해주는 함수 0이상의 숫자를 값으로 가진다.
        onEndReached : 리스트 끝에 도달했을 때 호출되는 함수 
        */}
            <FlatList
                onEndReachedThreshold={0.05}
                onEndReached={() =>
                    fetchMore({
                        variables: {
                            offset: data?.seeFeed.length,
                        },
                    })
                }
                refreshing={refreshing}
                onRefresh={refresh}
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                keyExtractor={(pohto) => "" + pohto.id}
                renderItem={renderPohoto}
            />
        </ScreenLayout>
    );
}
