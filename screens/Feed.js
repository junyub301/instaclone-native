import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMNET_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment
            user {
                id
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
    const MessageButton = () => (
        <TouchableOpacity
            style={{ marginRight: 25 }}
            onPress={() => navigation.navigate("Messages")}
        >
            <Ionicons name='paper-plane' color='white' size={20} />
        </TouchableOpacity>
    );
    useEffect(() => {
        navigation.setOptions({
            headerRight: MessageButton,
        });
    }, []);
    return (
        <ScreenLayout loading={loading}>
            {/* 
        onEndReachedThreshold : 리스트 끝이 어딘지를 설정해주는 함수 0이상의 숫자를 값으로 가진다.
        onEndReached : 리스트 끝에 도달했을 때 호출되는 함수 
        */}
            <FlatList
                onEndReachedThreshold={0.02}
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
