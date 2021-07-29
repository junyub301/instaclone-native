import React from "react";
// import { View, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native/";

const Container = styled.View``;
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Username = styled.Text`
    color: white;
`;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text`
    color: white;
`;
const Likes = styled.Text`
    color: white;
`;

function Photo({ id, user, caption, file, isLiked, likes }) {
    const { width, height } = useWindowDimensions();
    return (
        <Container>
            <Header>
                <UserAvatar />
                <Username>{user.username}</Username>
            </Header>
            {/* react native에서는 웹에서 사진을 불러오기 위해서는 width와 height값이 필수값이다. */}
            <File
                style={{ width, height: height - 500 }}
                source={{ uri: file }}
            />
            <Actions>
                <Action />
                <Action />
            </Actions>
            <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
            <Caption>
                <Username>{user.username}</Username>
                <CaptionText>{caption}</CaptionText>
            </Caption>
        </Container>
    );
}

Photo.protoTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    commentNumber: PropTypes.number.isRequired,
};

export default Photo;
