import { useState } from "react"
import "../style/Search.css"
import { useDispatch } from "react-redux";
import { getAll, setCont, setOrder, setPage, setSch } from "../redux/actions";




export default function Search() {
    const dispatch=useDispatch();    
    const [search,setSearch] = useState("");
    const reg = /^[A-Za-z]*$/


    function handleChange(event){
        setSearch(event.target.value)
    }
    function hide(){
        return reg.test(search)
    }



    return (

        <div>
            
            <div className="search">
                <input type="text" value={search} onChange={handleChange} className="searchTerm" placeholder="What country are you looking for?" />
                <button type="submit" disabled={!hide()} onClick={()=>{
           
                        dispatch(getAll(search.toLowerCase()));
                        dispatch(setSch(search.toLowerCase()));
                        dispatch(setPage(1));
                        dispatch(setOrder("A-Z"));
                        dispatch(setCont("All"));
                        //if(!countries.length) alert("No matches")
                    
                    
                }} 
                    className="searchButton" >
                    search
                </button>    
            </div>
            <p className="error" hidden={hide()}>numbers and special characters are not allowed</p>
            
        </div>

    )
};


