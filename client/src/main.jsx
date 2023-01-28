import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import router from './router/index'
import {ApolloClient,ApolloProvider,InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client"
import './index.css'

const client = new ApolloClient({
  link:createUploadLink({
    uri:"http://localhost:5000/graphql"
  }),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
       <RouterProvider router={router}/>
    </ApolloProvider>  
  </React.StrictMode>,
)
