import SelectForm from "./SelectForm";
import "../style/filterSort.css"

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterCont, getAll, getContinents, getPages, setCont, setOrder, setPage } from "../redux/actions";
//import { getActivities } from "../redux/actions";


export default function FilterSort() {
    const continents = ["All", ...useSelector(state => state.continents).map(e => e.continent)];
    const activities = ["All", ...useSelector(state => state.activities).map(e => e.name)];
    const dispatch = useDispatch();
    const orderBy = ["A-Z", "Z-A", "more populated", "less populated"];
    const pages = Array.from({ length: useSelector(state => state.pages) }, (_, i) => i + 1);
    const page = useSelector(state => state.page);
    const search = useSelector(state => state.search);
    const order = useSelector(state => state.ordering);
    

    useEffect(() => {

        dispatch(getContinents());
        //dispatch(getActivities());


    }, [dispatch])

    function filters(e) {

        switch (e.target.id) {
            case "pages":
                dispatch(setPage(parseInt(e.target.value)));
                break;

            case "order":
                dispatch(setOrder(e.target.value));
                dispatch(getAll(search, e.target.value));
                break;

            case "continents":
                dispatch(setCont(e.target.value))
                //console.log(e.target.value);    
                dispatch(filterCont(e.target.value))

                //dispatch(filterCont())
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
                    <SelectForm id="continents" func={filters} select="continent" options={continents} />
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

