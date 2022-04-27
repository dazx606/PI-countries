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

    useEffect(() => {

        dispatch(getAll());


        //     findAll()
        //     .then((response)=>{
        //         setResult(response)
        //     })
        //     .catch((err)=>console.log(err))

    }, [dispatch])
    //  console.log(countries);

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
                        {countries && countries.slice(0, 10).map(e => (
                            <tr key={e.id}>
                                <th>     </th>
                                <th><img src={e.img} alt={e.img} /></th>
                                <th>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</th>
                                <th>{e.continent}</th>
                                <th>{e.subregion}</th>
                                <th>{e.capital}</th>
                                <th>{e.area}</th>
                                <th>{e.population}</th>
                                <th>{e.id}</th>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </div>

    )
}
