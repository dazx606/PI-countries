import SelectForm from "./SelectForm";
import "../style/filterSort.css"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {  getCountriesByAct ,getAll, getContinents, getPages, setCont, setOrder, setPage, setAct } from "../redux/actions";
import { getActivities } from "../redux/actions";


export default function FilterSort() {
    const continents = ["All", ...useSelector(state => state.continents).map(e => e.continent)];
    const activities = ["All", ...useSelector(state => state.activities).map(e => e.name)];
    const dispatch = useDispatch();
    const orderBy = ["A-Z", "Z-A", "higher population", "lower population"];
    const pages = Array.from({ length: useSelector(state => state.pages) }, (_, i) => i + 1);
    const page = useSelector(state => state.page);
    const search = useSelector(state => state.search);
    const order = useSelector(state => state.ordering);
    const continent = useSelector(state => state.continent);
    const activity = useSelector(state => state.activity);
    

    useEffect(() => {
        dispatch(getContinents());
        dispatch(getActivities());
    }, [dispatch])

    function filters(e) {

        switch (e.target.id) {
            case "pages":
                dispatch(setPage(parseInt(e.target.value)));
                break;

            case "order":
                dispatch(setOrder(e.target.value));
                dispatch(setPage(1));
                if(activity===""||activity==="All"){
                    dispatch(getAll(search,e.target.value));
                } else{
                    dispatch(getCountriesByAct(activity,search ?search: undefined, e.target.value, continent?continent:undefined))
                }

                //dispatch(getAll(search, e.target.value));
                break;

            case "continents":
                dispatch(setPage(1));
                if(activity===""||activity==="All"){
                    dispatch(getAll(search,order,e.target.value));
                } else{
                    dispatch(getCountriesByAct(activity,search ?search: undefined, order ? order : undefined,e.target.value))
                }
                
                dispatch(setCont(e.target.value)); 
                break;

            case "activities":
                dispatch(setPage(1));
                dispatch(setAct(e.target.value));
                e.target.value !== "All"? 
                //console.log(e.target.value)
                dispatch(getCountriesByAct(e.target.value,search ?search: undefined, order ? order : undefined, continent? continent : undefined ))
                :
                dispatch(getAll(search,order,continent))
                break;

            default:
                break;
        }
    }
    return (
        <div className="container">
            <div className="izq">
                <div className="izq1">
                    <>Select continent:</>
                    <SelectForm id="continents" func={filters} select="continent" options={continents} value={continent} />
                </div>
                <div className="izq1">
                    <>Select activity:</>
                    <SelectForm id="activities" func={filters} select="activity" options={activities} />
                </div>
                <div className="izq1" onClick={() => dispatch(getPages())}>
                    <>Select page:</>
                    <SelectForm id="pages" select="page" options={pages} func={filters} value={page} />
                </div>
                <div className="izq1">
                    <>Sort By:</>
                    <SelectForm id="order" func={filters} select="order" options={orderBy} value={order} />
                </div>
   
            </div>

        </div>
    )
}



