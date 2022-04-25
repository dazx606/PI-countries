import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { findAll } from "../services/countriesService";
import {useDispatch} from "react-redux"
import { getAll } from "../redux/actions";


export default function List (){

    // const [result, setResult] =useState([]);
    const countries = useSelector(state => state.countries);
    const dispatch = useDispatch();
    
    useEffect( ()=>{
        
    dispatch(getAll());
    

    //     findAll()
    //     .then((response)=>{
    //         setResult(response)
    //     })
    //     .catch((err)=>console.log(err))

     },[dispatch])
    //  console.log(countries);

    return(
        <>
            <h1>La lista</h1>
            <ul>
                {countries && countries.slice(0,10).map(e => (<li key={e.id}>{e.name}</li>))}
            </ul> 
        </>
    )
}
