import "../style/style.css"
import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAll } from "../redux/actions";


function Home(){
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAll());
    },[dispatch])
    return(
        <div className="bg App">
            <Link to="/countries"><button type="button" className="homeBtn">EXPLORE</button></Link>
            
        </div>
    )
};

export default Home;