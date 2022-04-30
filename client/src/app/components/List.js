import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { findAll } from "../services/countriesService";
import { useDispatch } from "react-redux";
import { getAll } from "../redux/actions";
import "../style/table.css"



export default function List() {

    // const [result, setResult] =useState([]);
    const countries = useSelector(state => state.countries);
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);

    useEffect(() => {

        dispatch(getAll());

    }, [dispatch])

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
                        
                        countries && countries.slice(page <= 1 ? 0 : ((page-1)*10)-1, page <=1 ? 9 : page*10).map(e => (
                            <tr key={e.id}>
                                <th>     </th>
                                <th><img src={e.img} alt={e.img} /></th>
                                <th>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</th>
                                <th>{e.continent}</th>
                                <th>{e.subregion}</th>
                                <th>{e.capital}</th>
                                <th>{e.area} km2</th>
                                <th>{e.population}</th>
                                <th>{e.id}</th>
                            </tr>
                        ))
                        }
                    </tbody>


                </table>
            </div>
        </div>

    )
}


console.log(Math.ceil((49 - 9) / 10)+1);



