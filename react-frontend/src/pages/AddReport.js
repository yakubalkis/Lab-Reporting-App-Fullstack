import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import getConfig from "../utils/getConfig";
const LAB_API_BASE_URL =  "http://localhost:8080/api/v1/reports";
const LAB_API_FILE_BASE_URL = "http://localhost:8080/api/v1/file";

export default function AddReport(){ // is used both adding and updating the report!

    const [inputAll, setInputAll] = useState({ // is used for all inputs
        id: "",
        firstName: "",
        lastName: "",
        tcNo: "",
        diagnosisTitle: "",
        diagnosisDetail: "",
        date: "",
        imageName: ""
    });
    const [imageFile, setImageFile] = useState({}); // is used to store the file 
    const [labelWarning, setLabelWarning] = useState(""); // is used to show basic form errors
    const {laborantHospitalIdNo, reportId} = useParams(); // IF REPORT ID is 0, process will be 'ADDING report', otherwise process will be 'UPDATING the report'
    const navigate = useNavigate(); 
    const config = getConfig();


    useEffect(() => { 
        if(reportId !== String(0)){ // for update process, get report by id to populate the form

            axios.get(LAB_API_BASE_URL + "/" + reportId, config)
                .then((res) => {
                    
                    setInputAll({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        tcNo: res.data.tcNo,
                        diagnosisTitle: res.data.diagnosisTitle,
                        diagnosisDetail: res.data.diagnosisDetail,
                        date: res.data.date,
                        imageName:res.data.imageName,
                        laborant: res.data.laborant // when uptaded, creator must not be changed, creators never change
                    })
                })
        }
        
    }, []);

    
    
    function handleChange(e){ // is used for inputs
        const {name, value} = e.target;

        setInputAll(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    function onFileChangeHandler(e){ // for file input
        
        setInputAll((prevState) => {
            return{
                ...prevState,
                imageName: e.target.files[0].name // set file name
            }
        });

        setImageFile(() => e.target.files[0]); // set file
    }

    function SaveOrUpdateEmployee(e){
        e.preventDefault();

        if(inputAll.firstName==="" || inputAll.lastName === "" || inputAll.tcNo === "" || inputAll.diagnosisTitle === "" || inputAll.diagnosisDetail === "" || inputAll.date === "" || inputAll.imageName === ""){
            setLabelWarning(() => "Please fill in the all fields!");
            return;
        }

        if(reportId=== String(0)){ // CREATE report

            let report = {firstName: inputAll.firstName, lastName: inputAll.lastName,
                          tcNo: inputAll.tcNo, diagnosisTitle: inputAll.diagnosisTitle, 
                          diagnosisDetail: inputAll.diagnosisDetail, date: inputAll.date, imageName: inputAll.imageName}; // report object to send to backend

            axios.post(LAB_API_BASE_URL+ "/" + laborantHospitalIdNo, report, config); // request to create report
            
            const formData = new FormData(); // create FormData to store the image file 
            formData.append('img', imageFile);

            axios.post(LAB_API_FILE_BASE_URL, formData, config); // request to save image in file system
        }
        else{ // UPDATE report
            let report = {id: reportId, firstName: inputAll.firstName, lastName: inputAll.lastName,
                          tcNo: inputAll.tcNo, diagnosisTitle: inputAll.diagnosisTitle, 
                          diagnosisDetail: inputAll.diagnosisDetail, date: inputAll.date, imageName: inputAll.imageName, 
                          laborant:inputAll.laborant}; // unlike the above post request, also need the laborant object for updating
            
            axios.put(LAB_API_BASE_URL, report, config); // request to update the report
            
            const formData = new FormData();
            formData.append('img', imageFile);
           
            axios.put(LAB_API_FILE_BASE_URL, formData, config); // request to update the image 
        }
        
        navigate(`/laborant/${laborantHospitalIdNo}/reports`); // navigate to reports page
        window.location.reload();
    }
    
    const header = reportId === String(0) ? "Add Report": "Update Report"; // conditional content for header
    const fileProcess = reportId === String(0) ? "Upload File" : "Change File (If no file is selected, it will remain the same.)"; // for label of input file

    return(
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">

                            <h3 className="text-center">{header}</h3>
                            <div className="card-body">
                                <form>

                                    <div className="form-group">
                                        <label>First Name: </label>
                                        <input placeholder="First Name" type="text" name="firstName" value={inputAll.firstName} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Last Name: </label>
                                        <input placeholder="Last Name" type="text" name="lastName" value={inputAll.lastName} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>TC No: </label>
                                        <input placeholder="TC No" type="text" name="tcNo" value={inputAll.tcNo} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Diagnosis Title: </label>
                                        <input placeholder="Diagnosis Title" type="text" name="diagnosisTitle" value={inputAll.diagnosisTitle} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Diagnosis Detail: </label>
                                        <input placeholder="Diagnosis Detail" type="text" name="diagnosisDetail" value={inputAll.diagnosisDetail} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Date</label>
                                        <input placeholder="Date" type="date" name="date" value={inputAll.date} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>{fileProcess}</label>
                                        <input placeholder="Image" type="file" accept="image/png, image/jpeg" name="imageName" className="form-control" onChange={onFileChangeHandler}  />
                                    </div><br></br>
                                    
                                    <button type="submit" className="btn btn-success" onClick={SaveOrUpdateEmployee}>Save</button>

                                    <Link to={`/laborant/${laborantHospitalIdNo}/reports`}><button className="btn btn-danger" style={{marginLeft: "10px"}}>Cancel</button></Link>

                                    <label style={{marginLeft: "1rem", color: "red"}}>{labelWarning}</label>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    )

}