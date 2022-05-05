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
                            <div key={e.id} 
                            className={props.check?.includes(e.id)?"check":""} 
                            ><label ><input type="checkbox" checked={props.check?.includes(e.id)} 
                            onChange={props.click} id={e.id} value={e.name}/> {e.name && e.name[0].toUpperCase() + e.name.slice(1)}</label></div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}