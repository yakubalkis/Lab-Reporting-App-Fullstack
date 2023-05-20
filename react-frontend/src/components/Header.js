import { useEffect, useState } from "react"
import Logout from "./Logout"


export default function Header(){

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const hostIdNoOfCurrentUser = localStorage.getItem("hostIdNoOfCurrentUser");
    

    useEffect(() => {
        if(hostIdNoOfCurrentUser){
            setIsLoggedIn(true)
        }
    }, []);
    
    return(
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div style={{ marginLeft: "1rem"}} className="navbar-brand">Laboratory Reporting App</div>
                    {isLoggedIn && <Logout/>}
                </nav>
            </header>
        </div>
    )

}