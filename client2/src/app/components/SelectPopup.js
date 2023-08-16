import { useDispatch } from "react-redux";
import { setSeason } from "../redux/actions";
import "../style/selectPop.css"

export default function SelectPopup(props) {

    const dispatch = useDispatch();

    return (
        <>
            <div className="dropdown">
                <button className="dropbtn" onClick={(e)=>{e.preventDefault();}}>{props.name} </button>
                <div className="dropdown-content">
                    {   
                        props.options &&
                        props.options.map(e => (
                            <div key={e.id}  onClick={()=>dispatch(setSeason(e.name))}><label><input type="checkbox" checked={props.check === e.name} 
                            onChange={props.change} id={e.name} value={e.name}/> {e.name}</label></div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}