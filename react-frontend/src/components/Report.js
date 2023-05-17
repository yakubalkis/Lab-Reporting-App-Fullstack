
import axios from "axios";
import { useState } from "react";
import {useParams,useNavigate} from "react-router-dom";
import {Buffer} from 'buffer';
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";
const LAB_API_FILE_BASE_URL = "http://localhost:8080/api/v1/file";

export default function(props){
    
    const [imgData, setImageData] = useState(null);
    const navigate = useNavigate();
    const {laborantHospitalIdNo} = useParams();

    function editReport(id){
        navigate(`/laborant/${laborantHospitalIdNo}/${id}`);
    } 

    function deleteReport(id){
        axios.delete(LAB_API_BASE_URL + "/" + id);
        window.location.reload();
    }

    function seeImage(id, imageName){

        axios.get(LAB_API_FILE_BASE_URL +"/" +imageName, {
            responseType: 'arraybuffer'})
            .then((res) => {
                setImageData(() => Buffer.from(res.data, 'binary').toString('base64'))
            })
    }
    console.log(imgData)
   // console.log(URL.createObjectURL(imgData))
    return(
        <div className="row">
        <img src={`data:image/png;base64,`+imgData} />
        <table className="table table-striped table-bordered">
            
            <thead>
                <tr>
                    <th>First Name</th> 
                    <th>Last Name</th>
                    <th>TC No</th>
                    <th>Diagnosis Title</th>
                    <th>Diagnosis Detail</th>
                    <th>Date</th>
                    <th>Report Image</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.reports.map(report => 
                        <tr key={report.id}>
                            <td>{report.firstName}</td>
                            <td>{report.lastName}</td>
                            <td>{report.tcNo}</td>
                            <td>{report.diagnosisTitle}</td>
                            <td>{report.diagnosisDetail}</td>
                            <td>{report.date}</td>
                            <td>
                                <button onClick={() => seeImage(report.id, report.imageName)} className="btn btn-info btn-dark">Click to See</button>
                            </td>
                            <td>
                                <button onClick={() => editReport(report.id)} className="btn btn-info">Update</button>
                                <button onClick={() => deleteReport(report.id)} className="btn btn-danger" style={{marginLeft: "10px"}}>Delete</button>
                            </td>
                        </tr> 
                    )
                }
            </tbody>

        </table>

    </div>
    )

}