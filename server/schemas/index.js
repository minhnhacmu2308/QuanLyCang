export const typeDefs = `#graphql
    type Category{
        _id:String,
        code:String,
        name:String,
        createdAt: String       
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