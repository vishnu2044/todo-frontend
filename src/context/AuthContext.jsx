import { createContext, useNavigate } from "react";



const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{

    let [authToken, setAuthToken] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null)

    const navigate = useNavigate()

    // let handleLogin = async(e) =>{
    //     e.preventDefault()
    //     console.log(e.target.username.value);
    //     console.log(e.target.password.value);
    //     if (isInputEmptyOrSpaces(e.target.username)){
    //         ErrorMessage({message: "Please enter username"})
    //     }else if (isInputEmptyOrSpaces(e.target.password)){
    //         ErrorMessage({message: "Please enter password"})
    //     }else{
    //         let response = await fetch(`${baseUrl}/mentor-profile/mentor-login/`,{
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ 
    //               'username':e.target.username.value, 
    //               'password':e.target.password.value 
    //               }),
    //         });
    //         if (response.status === 200){
    //             let data = await response.json();
    //         }else if(response.status === 400) {
    //             ErrorMessage({message: "Invalid credentials"})
    //         }else{
    //             console.log("some error found", response.status);
    //         }
    //     }

    // }

    let ContextData = {

    }
    return(
        <AuthProvider.Provider value = {ContextData} >
            {children}
        </AuthProvider.Provider>

    )
}