import "../style/style.css"
import "../style/card.css"
import { useDispatch } from "react-redux"
import { clear } from "../redux/actions";
import Loader from "./Loader";

export default function Card(props) {

  const dispatch = useDispatch();

  return (
    <div className="card-container">
      <div className="card">
        <button onClick={()=>{props.onClose(); dispatch(clear())}}>X</button>
          <div>
          {
            props.img?<img src={props.img} alt="flagImg" className="hola"/>:<Loader/>
          }
          </div>
        <h3 className="">{props.name&& props.name[0].toUpperCase() + props.name.slice(1)}</h3>
        <h4>ID: {props.id}</h4>
        <div className="">
          <div>
            <p><b>Capital:</b> {props.capital}</p>
          </div>

          <div>
            <p><b>Continent:</b> {props.continent}</p>
          </div>
          <div>
            <p><b>Subregion:</b> {props.subregion}</p>
          </div>
          <div>
            <p><b>Area:</b> {props.area + " km2"}</p>
          </div>
          <div>
            <p><b>Population:</b> {props.population}</p>
          </div>
          <div>
           <p><b>Activities:</b> </p>
            {props.activities && props.activities.length>0? props.activities.map(e => (
          <p key={e.name}>{e.name}</p>
            )):<p>No activities</p>}
          </div>
        </div>
      </div>
    </div>
  )
}