import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
    # on 뒤에오는 타입은 backend에서 사용한 값과 동일해야 한다.
    fragment PhotoFragment on Photo {
        id
        file
        likes
        commentNumber
        isLiked
    }
`;

export const COMMNET_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        id
        user {
            username
            avatar
        }
        payload
        isMine
        createdAt
    }
`;

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        id
        username
        avatar
        isFollowing
        isMe
    }
`;

export const FEED_PHOTO = gql`
    fragment FeedPhoto on Photo {
        ...PhotoFragment
        user {
            id
            username
            avatar
        }
        caption
        createdAt
        isMine
    }
    ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
    fragment RoomParts on Room {
        id
        unreadTotal
        users {
            avatar
            username
        }
    }
`;
