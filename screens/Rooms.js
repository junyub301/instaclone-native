import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import ScreenLayout from "../components/ScreenLayout";
import { ROOM_FRAGMENT } from "../fragments";
import useMe from "../hooks/useMe";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            ...RoomParts
        }
    }
    ${ROOM_FRAGMENT}
`;

export default function Rooms() {
    const { data, loading } = useQuery(SEE_ROOMS_QUERY);
    const renderItem = ({ item: room }) => {
        return <RoomItem {...room} />;
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList
                ItemSeparatorComponet={
                    <View
                        style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                    ></View>
                }
                style={{ width: "100%" }}
                data={data?.seeRooms}
                keyExtractor={(room) => "" + room.id}
                renderItem={renderItem}
            />
        </ScreenLayout>
    );
}
