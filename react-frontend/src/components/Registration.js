import { useState } from "react"


export default function Registration(){

    const [inputAll, setInputAll] = useState({
        firstName: "",
        lastName: "",
        hospitalIdNo: ""
    })

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

    }

    return(
        <div className="container">
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
                                <input className="form-control" placeholder="Id No" type="text" name="hospitalIdNo" value={inputAll.hospitalIdNo}  onChange={handleChange}/>
                            </div>
                            
                            <br></br>
                            <button type="submit" className="btn btn-success" onClick={saveLaborant}>Save</button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )

}