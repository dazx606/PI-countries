import { useState } from "react"
import "../style/Search.css"
import { useDispatch } from "react-redux";
import { getAll, setOrder, setPage, setSch } from "../redux/actions";



export default function Search() {
    const dispatch=useDispatch();    
    const [search,setSearch] = useState("");

    function handleChange(event){
        setSearch(event.target.value)
    }

    return (

        <div>
            <div className="search">
                <input type="text" value={search} onChange={handleChange} className="searchTerm" placeholder="What country are you looking for?" />
                <button type="submit" onClick={()=>{
                    dispatch(getAll(search));
                    dispatch(setSch(search));
                    dispatch(setPage(1));
                    dispatch(setOrder("A-Z"))
                }} 
                    className="searchButton" >
                    search
                </button>
            </div>
        </div>

    )
}