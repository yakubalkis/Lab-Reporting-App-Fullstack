import { useEffect, useState } from "react"
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Report from "./Report";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1";

export default function ListReports(){

    const [reportList, setReportList] = useState([]);
    const [filteredReportList, setFilteredReportList] = useState([]);
    const [filterType, setFilterType] = useState("Choose Filter type");
    const {laborantHospitalIdNo} = useParams();
    
    

    useEffect(() => {
        axios.get(LAB_API_BASE_URL+"/reports")
            .then((res) => {
                setReportList(res.data)
                setFilteredReportList(res.data) // at first, since there is no filter, filteredReportList has all data too
            })
    },[]);

    function handleChange(type){
        setFilterType(type)
    }

    function handleSearchInput(e){
        
        const inputSearch = e.target.value;
       
        if(filterType==="By Patient Name/Surname"){
            
            setFilteredReportList(reportList.filter((report) => report.firstName.toLowerCase().includes(inputSearch.toLowerCase())))
                if(filteredReportList.length===0){ // if not found by name, try by surname
                    setFilteredReportList(reportList.filter((report) => report.lastName.toLowerCase().includes(inputSearch.toLowerCase())))
                }
        }
        else if(filterType==="By TC No"){
            setFilteredReportList(reportList.filter((report) => report.tcNo.includes(inputSearch)))
        }
        else{ // if there is no filter type, as default, filter by name
            setFilteredReportList(reportList.filter((report) => report.firstName.toLowerCase().includes(inputSearch.toLowerCase())))
        }
    }
    
    
    const HeadContent = reportList.length > 0 ? <></> : <h4 style={{marginLeft: "-10px", marginTop: "5px"}}>There are no report. You should add a report.</h4> ; 
    const ReportsTable = filteredReportList.length > 0 ? <Report reports={filteredReportList}  /> : <></> ;

    return(
        <div>

            {HeadContent}
            <div className="div-add-filter">

                <Link to={`/laborant/${laborantHospitalIdNo}/${0}`}><button style={{marginTop: "1rem", marginBottom: "0.5rem"}} className="btn btn-primary" > Add Report </button></Link>
                
                <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchInput} />

                <DropdownButton id="dropdown-basic-button" title={filterType} className="dropdown-filter">
                    <Dropdown.Item onClick={() => handleChange("By Patient Name/Surname")}>By Patient Name/Surname</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange("By TC No")}>By TC No</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange("By Lab. Name/Surname")}>By Lab. Name/Surname</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleChange("Choose Filter type")}>Set No Filter</Dropdown.Item>
                </DropdownButton>

            </div>

            {ReportsTable}

        </div>

    )

}