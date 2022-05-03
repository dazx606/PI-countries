import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { findAll } from "../services/countriesService";
import { useDispatch } from "react-redux";
import { getAll, getOneCountry } from "../redux/actions";
import "../style/table.css"
import Card from "./Card";



export default function List() {

    // const [result, setResult] =useState([]);
    const countries = useSelector(state => state.countries);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);
    

    useEffect(() => {

        dispatch(getAll());

    }, [dispatch])

    function dot (number){
        let newNumber = number.toString().split("").reverse();
        let newN = [];
        
        for(let i=1;i<=newNumber.length;i++){
            if(i%3!==0) newN.push(newNumber[i-1])
            else if(i%3===0) newN.push("."+newNumber[i-1])
        }
        let result =newN.reverse().toString().replaceAll(",","");

        return result[0]==="." ? result.replace(".","") : result
    }
//-------------------------------------------POPUP-------------------------------------------
    function openForm() { setShow(false) };
    function closeForm() { setShow(true) };
    const [show, setShow] = useState(true);
    let country = useSelector(state=>state.country)

    function popup(e){
        openForm();
        dispatch(getOneCountry(e.id));
        //console.log(country);

    }

    return (
        <div className="A">
            <div className="BackTable">
                <table className="Table">
                    <thead>
                        <tr key={"principal"}>
                            <th>     </th>
                            <th>Flag</th>
                            <th>Country</th>
                            <th>Continent</th>
                            <th>Sub-Region</th>
                            <th>Capital</th>
                            <th>Area</th>
                            <th>Population</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                        countries.length?
                        countries && countries.slice(page <= 1 ? 0 : ((page-1)*10)-1, page <=1 ? 9 : page*10).map(e => (
                            <tr key={e.id} >
                                <th>     </th>
                                <th><img src={e.img} alt={e.img} /></th>
                                <th id={e.id}className="overname" onClick={()=>popup(e)}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</th>
                                <th>{e.continent}</th>
                                <th>{e.subregion}</th>
                                <th>{e.capital}</th>
                                <th>{dot(e.area)} km2</th>
                                <th>{dot(e.population)}</th>
                                <th>{e.id}</th>
                            </tr>
                        ))
                        :
                        <tr className="noData">
                            <th>NO DATA</th>
                        </tr>
                        }
                    </tbody>


                </table>
            </div>
            <div className="country-popup" hidden={show}>
               <Card onClose={()=>{closeForm()}} name={country.country?.name} img={country.country?.img}
               activities={country.activities} id={country.country?.id} capital={country.country?.capital}
               area={country.country && dot(country.country.area)} subregion={country.country?.subregion}
               continent={country.country?.continent} population={country.country && dot(country.country.population)}/>
            </div>
        </div>

    )
}






