export const typeDefs = `#graphql
    scalar Date
    type Category{
        _id:String,
        code:String,
        name:String,
        createdAt: Date
        updatedAt: Date       
    },
    type Query {
        categorys:[Category]
    },
    type Mutation {
        addCategory(name:String!,code:String!):Category
        deleteCategory(_id:String!):String
        updateCategory(_id:String!,name:String!,code:String!):Category
    }
 `;