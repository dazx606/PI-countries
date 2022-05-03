import "../style/style.css"
import "../style/card.css"

export default function Card(props) {


  return (
    <div className="card-container">
      <div className="card">
        <button onClick={props.onClose}>X</button>
        <div>
          <img src={props.img} alt="flagImg" />
        </div>
        <h3 className="">{props.name}</h3>
        <h4>ID: {props.id}</h4>
        <div className="">
          <div>
            <p>Capital: {props.capital}</p>
          </div>

          <div>
            <p>Continent: {props.continent}</p>
          </div>
          <div>
            <p>subregion: {props.subregion}</p>
          </div>
          <div>
            <p>Area: {props.area + " km2"}</p>
          </div>
          <div>
            <p>Population: {props.population}</p>
          </div>
          <div>
            {props.activities && props.activities.map(e => (
          <p>activities: {e.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}