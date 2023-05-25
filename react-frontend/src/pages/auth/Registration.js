import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import MessageToast from "../../components/MessageToast";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/auth/register";

export default function Registration(){

    
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [labelWarning, setLabelWarning] = useState("");
    const [roleType, setRoleType] = useState("");
 
    const [inputAll, setInputAll] = useState({
        firstName: "",
        lastName: "",
        hospitalIdNo: "",
        password: ""
    }); 

    function handleOption(event){
        setRoleType(event.target.value)
    }

    function handleChange(event){
        const {name, value} = event.target;

        setInputAll(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function saveLaborant(e){
        e.preventDefault();
        
        if(inputAll.firstName === "" || inputAll.lastName === "" || inputAll.hospitalIdNo === "" || inputAll.password === ""){
            setLabelWarning(() => "Please fill in the all text boxes!");
            return;
        }
        else if(inputAll.hospitalIdNo.length !== 7){
            setLabelWarning(() => "Please enter 7 digit ID number!");
            return;
        }
        else if(roleType === ""){
            setLabelWarning(() => "Please choose your role!");
            return
        }
        else{setLabelWarning(() => "");}

        let laborantRegister = {firstName: inputAll.firstName, lastName: inputAll.lastName, hospitalIdNo: inputAll.hospitalIdNo, password: inputAll.password}; 
        
        
        axios.post(LAB_API_BASE_URL +"/"+ roleType, laborantRegister)
            .then(res => {
                if(res.status === 201){
                   setMessage(res.data.message);
                   setShow(true);
                   setRoleType("");
                   setInputAll({ 
                   firstName: "",
                   lastName: "",
                   hospitalIdNo: "",
                   password: ""});
                }
            }).catch(res => {
                   setMessage(res.response.data.message);
                   setShow(true);
            })
    }

    return(
        
            <div className="row">
                <div className="col-md-6 col-md-offset-3">

                    <br></br>
                    <h1>Laborant Registration Page</h1>

                    <div className="card-body">
                        <form>

                            <div className="form-group">
                                <label>First Name: </label>
                                <input className="form-control" placeholder="First Name" type="text" name="firstName" value={inputAll.firstName}  onChange={handleChange}/>
                            </div><br></br>

                            <div className="form-group">
                                <label>Last Name: </label>
                                <input className="form-control" placeholder="Last Name" type="text" name="lastName" value={inputAll.lastName}  onChange={handleChange}/>
                            </div><br></br>

                            <div className="form-group">
                                <label>Hospital Id No: </label>
                                <input className="form-control" placeholder="Id No" type="text" name="hospitalIdNo" value={inputAll.hospitalIdNo}  onChange={handleChange} maxLength={7}/>
                            </div><br></br>

                            <div className="form-group">
                                <label>Password: </label>
                                <input className="form-control" placeholder="Password" type="text" name="password" value={inputAll.password}  onChange={handleChange}/>
                            </div><br></br>

                            <div>
                                <input className="form-check-input" type="radio" name="role" value="user"  onChange={handleOption} checked={roleType==="user"} />
                                    <label style={{marginLeft:".2rem"}}>Normal User</label>
                                <input className="form-check-input" style={{marginLeft:"1rem"}} type="radio" name="role" value="manager" onChange={handleOption} checked={roleType==="manager"}/>
                                    <label style={{marginLeft:".2rem"}}>Manager</label>
                            </div><br></br>
                            
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" onClick={saveLaborant}>Register</button>
                                <span style={{marginLeft: "1rem"}}>Already registered?
                                   <Link to="/login">
                                        <span style={{marginLeft: "3px"}}>Login</span>
                                   </Link>
                                </span>
                            </div>

                            <label  style={{color: "red"}}>{labelWarning}</label>

                        </form>
                    </div>

                    <div style={{ position: 'fixed', left: 0, bottom: 0 }}>
                        <MessageToast show={show} message={message} setShow={setShow} />
                    </div>
                    
                </div>
            </div>
        
    )

}