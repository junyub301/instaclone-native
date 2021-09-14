import {
    ApolloClient,
    InMemoryCache,
    makeVar,
    createHttpLink,
    split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    offsetLimitPagination,
    getMainDefinition,
} from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN, token);

    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
};

const httpLink = createHttpLink({
    // uri: "http://3f90-180-65-107-236.ngrok.io/graphql",
    uri: "http://localhost:4000/graphql",
});

const uploadHttpLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/graphql",
    options: {
        reconnect: true,
        connectionParams: () => ({
            token: tokenVar(),
        }),
    },
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log(`GraphQl Error`, graphQLErrors);
    }
    if (networkError) {
        console.log("Network Error", networkError);
    }
});

export const cache = new InMemoryCache({
    // typePolicies : apollo 에게 type을 설정할 수 있도록 해주는 것.
    typePolicies: {
        Query: {
            fields: {
                seeFeed: offsetLimitPagination(),
                /* 위와 같은 기능
                    seeFeed: {
                        // apollo가 query들을 argument에 따라 구별시키는걸 막아준다.
                        keyArgs: false,
                        // 기존의 데이터와 새로 가져오 데이터를 합쳐준다.
                        merge(exisiting = [], incoming = []) {
                            return [...exisiting, ...incoming];
                        },
                    }, 
                */
            },
        },
    },
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLinks
);

const client = new ApolloClient({
    // httpLink가 종료하는 link이기 때문에 마지막에 추가해준다.
    link: splitLink,
    cache,
});
export default client;
