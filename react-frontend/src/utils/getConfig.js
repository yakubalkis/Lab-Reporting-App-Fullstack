
export default function getConfig(){
    const tokenKey = localStorage.getItem("tokenKey"); // get jwt from local storage
    const config = {  // create config for http requests
        headers: {
            Authorization: tokenKey
        }
    }
    return config;
}