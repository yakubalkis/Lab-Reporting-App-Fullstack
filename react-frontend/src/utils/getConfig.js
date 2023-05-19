
export default function getConfig(){
    const tokenKey = localStorage.getItem("tokenKey"); // jwt token
    const config = {
        headers: {
            Authorization: tokenKey
        }
    }
    return config;
}