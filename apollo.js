import {
    ApolloClient,
    InMemoryCache,
    makeVar,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offsetLimitPagination } from "@apollo/client/utilities";

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
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
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
    }),
});
export default client;
