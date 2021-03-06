import  { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import  { createApolloProvider }                        from '@vue/apollo-option'
import  { setContext }                                  from 'apollo-link-context'
import  ElementPlus                                     from 'element-plus'
import  'element-plus/dist/index.css'

import  { createApp }                                   from 'vue'
import  App                                             from './App.vue'
import  router                                          from './router'
import  store                                           from './store'

const httpLink = createHttpLink({
    uri: `${process.env.VUE_APP_API_GATEWAY_URL}`,
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "Authorization": localStorage.getItem("token_access") || ""
        }
    }
})

const apolloClient = new ApolloClient({
    link : authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const apolloProvider = new createApolloProvider({
    defaultClient: apolloClient
})

createApp(App).use(store).use(router).use(apolloProvider).use(ElementPlus).mount('#app');

export default apolloClient;