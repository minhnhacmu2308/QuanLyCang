import { GRAPHQL_SERVER } from "../constants";
export const userLoader = async() => {
    const query = `query Query {
        users {
          birthday
          address
          code
          _id
          createdAt
          image
          fullName
          userName
          password
          updatedAt
          role
        }
      }`;
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const data = await res.json();
    return data;
}

export const profile = async(payload) => {
  const query = `query User($userId: String!) {
    user(id: $userId) {
      _id
      userName
      fullName
      updatedAt
      createdAt
      birthday
      address
      image
      code
      role
    }
  }`;
  console.log("payload",payload)
  const variables = {
    userId:payload.id
  }
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query,variables })
  });
  const data = await res.json();
  return data;
}

export const driverLoader = async() => {
  const query = `query Query {
    drivers {
      _id
      fullName
      phone
      role
      createdAt
      birthday
      code
      workingAt
    }
  }`;
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
  });
  const data = await res.json();
  return data;
}


export const signUp = async(payload) => {
    const query = `mutation Mutation($login: String!, $password: String!) {
      signIn(login: $login, password: $password) {
        token
      }
    }
      `
    const variables = {
        login: payload.login,
        password: payload.password,
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const addDriver = async(payload) => {
  const query = `mutation Mutation($code: String!, $fullName: String!, $birthday: String!, $workingAt: String!, $phone: String!, $role: String!) {
    addDriver(code: $code, fullName: $fullName, birthday: $birthday, workingAt: $workingAt, phone: $phone, role: $role) {
      _id
      fullName
      taxCode
      phone
      role
      address
      fax
      email
      createdAt
      updatedAt
      birthday
      code
      workingAt
      userName
      image
      password
    }
  }
    `
  const variables = {
    fullName: payload.fullName,
    birthday: payload.birthday,
    workingAt: payload.workingAt,
    phone: payload.phone,
    role: payload.role,
    code:payload.code
  }
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
  });
  const data = await res.json();
  return data;
}


export const deleteDriver = async(payload) => {
    const query = `mutation AddContainer($id: String!) {
      deleteDriver(_id: $id)
    } `
    const variables = {
        id: payload.id,
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const updateDriver = async(payload) => {
    const query = `mutation Mutation($id: String!, $code: String!, $fullName: String!, $birthday: String!, $workingAt: String!, $phone: String!) {
      updateDriver(_id: $id, code: $code, fullName: $fullName, birthday: $birthday, workingAt: $workingAt, phone: $phone) {
        _id
        fullName
        taxCode
        phone
        role
        address
        fax
        email
        createdAt
        updatedAt
        birthday
        code
        workingAt
        userName
        image
        password
      }
    }`
    const variables = {
        id: payload._id,
        fullName: payload.fullName,
        birthday: payload.birthday,
        workingAt: payload.workingAt,
        code: payload.code,
        phone: payload.phone,
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const customerLoader = async() => {
  const query = `query Query {
    customers {
      _id
      fullName
      taxCode
      phone
      code
      role
      address
      fax
      email
      createdAt
      updatedAt
    }
  }`;
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
  });
  const data = await res.json();
  return data;
}

export const addCustomer = async(payload) => {
  const query = `mutation AddCustomer($fullName: String!, $phone: String!, $role: String!, $code: String!, $address: String!, $fax: String!, $email: String!, $taxCode: String!) {
    addCustomer(fullName: $fullName, phone: $phone, role: $role, code: $code, address: $address, fax: $fax, email: $email, taxCode: $taxCode) {
      _id
      fullName
      taxCode
      phone
      code
      role
      address
      fax
      email
      createdAt
      updatedAt
    }
  }`
  const variables = {
    fullName: payload.fullName,
    address: payload.address,
    fax: payload.fax,
    email: payload.email,
    taxCode: payload.taxCode,
    phone: payload.phone,
    role: payload.role,
    code:payload.code
  }
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
  });
  const data = await res.json();
  return data;
}


export const deleteCustomer = async(payload) => {
    const query = `mutation AddCustomer($id: String!) {
      deleteCustomer(_id: $id)
    }`
    const variables = {
        id: payload.id,
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const changePassword = async(payload) => {
  console.log("pay",payload)
  const query = `mutation Mutation($changePasswordId: String!, $password: String!) {
    changePassword(id: $changePasswordId, password: $password)
  }`
  const variables = {
      changePasswordId: payload.changePasswordId,
      password:payload.password
  }
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
  });
  const data = await res.json();
  return data;
}

export const updateCustomer = async(payload) => {
  const query = `mutation addCustomer($id: String!, $fullName: String!, $taxCode: String!, $phone: String!, $code: String!, $address: String!, $fax: String!, $email: String!) {
    updateCustomer(_id: $id, fullName: $fullName, taxCode: $taxCode, phone: $phone, code: $code, address: $address, fax: $fax, email: $email) {
      _id
      fullName
      taxCode
      phone
      code
      role
      address
      fax
      email
      createdAt
      updatedAt
    }
  }`
  const variables = {
      id: payload._id,
      fullName: payload.fullName,
      address: payload.address,
      fax: payload.fax,
      email: payload.email,
      taxCode: payload.taxCode,
      phone: payload.phone,
      code:payload.code
  }
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
  });
  const data = await res.json();
  return data;
}

export const addUser = async(payload) => {
  const query = `mutation Mutation($code: String!, $userName: String!, $fullName: String!, $birthday: String!, $address: String!, $image: String!, $role: String!, $password: String!) {
    addUser(code: $code, userName: $userName, fullName: $fullName, birthday: $birthday, address: $address, image: $image, role: $role, password: $password) {
      address
      _id
      birthday
      fullName
      image
      password
      role
      userName
    }
  }`
  console.log("utils",payload);
  const variables = {
    fullName: payload.fullName,
    birthday: payload.birthday,
    userName: payload.userName,
    image: payload.image,
    role: payload.role,
    password:payload.password,
    code:payload.code,
    address:payload.address
  }
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
  });
  const data = await res.json();
  return data;
}


export const deleteUser = async(payload) => {
    const query = `mutation DeleteUser($deleteUserId: String!) {
      deleteUser(id: $deleteUserId)
    }`
    const variables = {
      deleteUserId: payload.id,
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const updateUser = async(payload) => {
    const query = `mutation Mutation($id: String!, $userName: String!, $fullName: String!, $birthday: String!, $address: String!, $image: String!, $password: String!) {
      updateUser(_id: $id, userName: $userName, fullName: $fullName, birthday: $birthday, address: $address, image: $image, password: $password) {
        address
        birthday
        _id
        code
        fullName
        image
        password
        role
        userName
      }
    }`
    const variables = {
        id: payload._id,
        fullName: payload.fullName,
        birthday: payload.birthday,
        userName: payload.userName,
        image: payload.image,
        address:payload.address,
        password:payload.password
    }
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();
    return data;
}

export const updateProfile = async(payload) => {
  const query = `mutation Mutation($id: String!,$fullName: String!, $birthday: String!, $address: String!, $image: String!) {
    updateProfile(_id: $id, fullName: $fullName, birthday: $birthday, address: $address, image: $image) {
      address
      birthday
      _id
      code
      fullName
      image
      role
      userName
    }
  }`
  const variables = {
      id: payload._id,
      fullName: payload.fullName,
      birthday: payload.birthday,
      image: payload.image,
      address:payload.address,
  }
  const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
  });
  const data = await res.json();
  return data;
}


