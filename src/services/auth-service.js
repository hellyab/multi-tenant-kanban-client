export const signInProvider = ({username, password}) => {
    const req = new Request(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }
    )
    return fetch(req).then(async (res) => {
        let resJSON = await res.json();
        if (res.status < 200 || res.status >= 300) {
            return Promise.reject(resJSON)
        }
        localStorage.setItem('token', resJSON.accessToken)
        localStorage.setItem('refreshToken', resJSON.refreshToken)
        return Promise.resolve(resJSON)
    })
}