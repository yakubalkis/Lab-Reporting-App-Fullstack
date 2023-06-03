import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import debounce from 'lodash.debounce';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Report from "../components/Report";
import getConfig from "../utils/getConfig";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";
const LAB_API_SEARCH_URL = "http://localhost:8080/api/v1/search/reports";

export default function ListReports(){

    const [reportList, setReportList] = useState([]); // list of reports
    const [filteredReportList, setFilteredReportList] = useState([]); // list of filtered reports for filtering process
    const [filterType, setFilterType] = useState("Choose Filter type"); // filter type
    const [query, setQuery] = useState(""); // value for search input
    const [isSortedAsc,setIsSortedAsc] = useState(false) // is used in function handleSortBtn, because there are 2 ways of sorting by date
    const {laborantHospitalIdNo} = useParams(); // getting from url path, used for navigating process in Link of Add Report button

    
    // get all reports
    useEffect(() => {
        const config = getConfig(); // get config(jwt) to use in http request
        
        axios.get(LAB_API_BASE_URL, config)
            .then((res) => {
                setReportList(Object.assign([], res.data)) // make deep copy to have different memory address for not being effected by change
                                                            // from filteredReportList

                setFilteredReportList(res.data) // at first, since there is no filter, filteredReportList has all data too
            }).catch(err => {
                console.log(err)
            })
    },[]);

    // get reports by user's filter 
    useEffect(() => { 
        const config = getConfig(); // get config(jwt) to use in http request

        if(query !== "" && filterType !== "Choose Filter type"){
            const fNo = getFilterNo();
            
            axios.get(LAB_API_SEARCH_URL + fNo + query, config)
                .then((res) => {
                    setFilteredReportList((prevState) => Object.assign([], res.data))
                });
        }
        else{
            // set all reports again because there is no filter to search
            setFilteredReportList((prevState) => Object.assign([], reportList));
        }
    }, [query]);

    

    function changeHandler(e){ // is used to set query value from input
        setQuery(e.target.value);
    }

    const debouncedChangeHandler = useCallback( // search input handler with debounced way
        debounce(changeHandler, 300)
    , []);

    function getFilterNo(){ // return parameter by filter type for searching request
        if(filterType === "By Patient Name/Surname"){
            return "/f1/";
        }
        else if(filterType === "By TC No"){
            return "/f2/";
        }
        else if(filterType === "By Report Creator"){
            return "/f3/";
        }
    }

    function handleFilterTypeChange(type){ // is used in dropdown component
        setFilterType(type)
    }
    

    function handleSortBtn(boolIsSortedAsc){ // is used to sort by date
       
        if(boolIsSortedAsc){
            setFilteredReportList((prevState) => prevState.sort(function(a,b){ // from past to future
                return new Date(a.date) - new Date(b.date)
            })) 
        }
        else{
            setFilteredReportList((prevState) => prevState.sort(function(a,b){ // from future to past
                return new Date(b.date) - new Date(a.date)
            })) 
        }
        setIsSortedAsc((prevState) => !prevState); // set again, because sorting type changed
    }


    function handleDisableSortBtn(){
        
        setFilteredReportList((prevState) => Object.assign([], reportList)); // sort by database, not by date (again make deep copy, pass by value not by reference!)
        setIsSortedAsc(false); // set false as default   
    }

    
    const HeadContent = reportList.length > 0 ? <></> : <h4 style={{marginLeft: "-10px", marginTop: "5px"}}>There are no report. You should add a report.</h4> ; // head content for user
    const ReportsTable = filteredReportList.length > 0 ? <Report reports={filteredReportList}  /> : <>No Reports Found.</> ; // use Report component for reusing, assign report list as prop 

    return(
        <div>

            {HeadContent}

            <div className="div-add-filter">

                <Link to={`/laborant/${laborantHospitalIdNo}/${0}`}>
                    <button style={{marginTop: "1rem", marginBottom: "0.5rem"}} className="btn btn-primary"> Add Report </button>
                </Link>
                
               
               {reportList.length > 0 &&
                <>
                    <input type="text" className="form-control" placeholder="Search after filtering..." onChange={debouncedChangeHandler} />
                    
                    <DropdownButton id="dropdown-basic-button" title={filterType} className="dropdown-filter">
                        <Dropdown.Item onClick={() => handleFilterTypeChange("By Patient Name/Surname")}>By Patient Name/Surname</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterTypeChange("By TC No")}>By TC No</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterTypeChange("By Report Creator")}>By Report Creator</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterTypeChange("Choose Filter type")}>Set No Filter</Dropdown.Item>
                    </DropdownButton>

                    
                    <button style={{marginLeft:"2rem",marginTop: "0.5rem"}} onClick={() => handleSortBtn(!isSortedAsc)}  className="btn btn-success">Sort By Date {isSortedAsc ? <>&darr;</> : <>&uarr;</>}</button>
                    <button style={{marginLeft:"1rem",marginTop: "0.5rem"}} onClick={() => handleDisableSortBtn()}  className="btn btn-secondary">Disable Sorting<>&#x21A9;</></button>
                </>
                }
            </div>

            {ReportsTable}

        </div>

    )

}