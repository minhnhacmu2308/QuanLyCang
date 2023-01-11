export const categoryLoader = async () => {
    const query = `query Categorys {
        categorys {
          _id
          createdAt
          name
          updatedAt
        }
      }`;
    const res = await fetch('http://localhost:5000/graphql',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body:JSON.stringify({query})                     
    });
    const data = await res.json();
    return data;
}