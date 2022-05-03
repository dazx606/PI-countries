import "../style/selectPop.css"

export default function SelectPopupCountry(props) {

    return (
        <>
            <div className="dropdown">
                <button className="dropbtn" onClick={(e)=>{e.preventDefault();}}>{props.name}</button>
                <div className="dropdown-content">
                    {   
                        props.options &&
                        props.options.map(e => (
                            <div key={e.id}  ><label ><input type="checkbox" 
                            onClick={props.click} id={e.id} value={e.name}/> {e.name}</label></div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}