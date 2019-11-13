// better go with state library
let accessToken = "";


export const setAccessToken = (value) => {
    accessToken = value;
}

export const getAccessToken = () => {
    return accessToken;
}