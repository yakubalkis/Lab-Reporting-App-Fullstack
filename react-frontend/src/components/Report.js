
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";

export default function(props){

    const navigate = useNavigate();
    const {laborantHospitalIdNo} = useParams();

    function editReport(id){
        navigate(`/laborant/${laborantHospitalIdNo}/${id}`);
    } 

    function deleteReport(id){
        axios.delete(LAB_API_BASE_URL + "/" + id);
        window.location.reload();
    }

    function seeImage(id){
        
    }

    return(
        <div className="row">
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
                                <button onClick={() => seeImage(report.id)} className="btn btn-info btn-dark">Click to See</button>
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