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
    const [isSorted,setIsSorted] = useState(false)
    const {laborantHospitalIdNo} = useParams();

    
    

    useEffect(() => {
        axios.get(LAB_API_BASE_URL+"/reports")
            .then((res) => {
                setReportList(Object.assign([], res.data)) // make deep copy to have different memory address for not being effected by change
                                                            // from filteredReportList
                                                            
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
    
    function handleSortBtn(boolIsSorted){
        if(boolIsSorted){
            setFilteredReportList((prevState) => prevState.sort(function(a,b){
                return new Date(a.date) - new Date(b.date)
            })) 
        }
        else{
            setFilteredReportList((prevState) => prevState.sort(function(a,b){
                return new Date(b.date) - new Date(a.date)
            })) 
        }
        setIsSorted((prevState) => !prevState);
    }

    function handleDisableSortBtn(){
        
        setFilteredReportList((prevState) => reportList);
        setIsSorted(false);
       
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
                    <Dropdown.Item onClick={() => handleChange("Choose Filter type")}>Set No Filter</Dropdown.Item>
                </DropdownButton>

                
                <button style={{marginLeft:"1.5rem",marginTop: "0.5rem"}} onClick={() => handleSortBtn(!isSorted)}  className="btn btn-success">Sort By Date {isSorted ? <>&darr;</> : <>&uarr;</>}</button>
                <button style={{marginLeft:"1.5rem",marginTop: "0.5rem"}} onClick={() => handleDisableSortBtn()}  className="btn btn-secondary">Disable Sorting<>&#x21A9;</></button>
            </div>

            {ReportsTable}

        </div>

    )

}