import { useState } from "react"
import "../style/Search.css"
import { useDispatch, useSelector } from "react-redux";
import { getAll, setOrder, setPage, setSch } from "../redux/actions";
import { getCountriesByAct } from "../redux/actions";




export default function Search() {
    const dispatch=useDispatch();    
    const [search,setSearch] = useState("");
    const reg = /^[A-Za-z]*$/
    let order = useSelector(state=>state.order);
    let continent = useSelector(state=>state.continent);
    let activity = useSelector(state=>state.activity);


    function handleChange(event){
        setSearch(event.target.value)
    };
    function hide(){
        return reg.test(search)
    };

    function handleSearch(){
        if(activity===""||activity==="All"){
         
            dispatch(getAll(document.getElementById("search").value!==""?search.toLowerCase():undefined,order?order:undefined,(continent && continent!=="All")?continent:undefined));
        } else{
            dispatch(getCountriesByAct(activity,document.getElementById("search")!==""?search.toLowerCase():undefined, order?order:undefined, continent?continent:undefined))
        }
        dispatch(setSch(search.toLowerCase()));
        dispatch(setPage(1));
        dispatch(setOrder("A-Z"));
        //dispatch(setCont("All"));
    };

    return (

        <div>
            
            <div className="search">
                <input id="search" type="text" value={search} onChange={handleChange}
                onKeyDown={(e)=>{if(e.key==="Enter") handleSearch()}}
                className="searchTerm" placeholder="Which country are you looking for?" />
                <button type="submit" disabled={!hide()} onClick={handleSearch} 
                    className="searchButton" >
                    search
                </button>    
            </div>
            <p className="error" hidden={hide()}>numbers and special characters are not allowed</p>
            
        </div>

    )
};


