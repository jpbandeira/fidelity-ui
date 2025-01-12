import api from "./api"

const endpoint = '/users'

export const listUsers = (args) => {
    let listEndpoint = endpoint + "?"
    console.log(listEndpoint)
    if (args !== []) {
        let argsLength = args.length
        console.log(argsLength)

        if (argsLength > 1) {
            for (let i = 0; i < argsLength; i++) {
                console.log(i)
                if (i + 1 == argsLength) {
                    listEndpoint = listEndpoint + args[i]
                    console.log(listEndpoint)
                    continue
                }

                listEndpoint = listEndpoint + args[i] + "&"
                console.log(listEndpoint)
            }
        } else {
            listEndpoint = listEndpoint + args[0]
        }
    }

    return api.get(listEndpoint)
}

export const createUser = async (body) => {
    return api.post(endpoint, body);
}

export const updateUser = async (id, body) => {
    return api.put(endpoint, body);
}

export const deleteUser = async (id) => {
    if (id !== null && id !== "") {
        return api.delete(endpoint + "/" + id);
    }
}
