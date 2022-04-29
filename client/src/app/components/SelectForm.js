

import "../style/select.css"

export default function SelectForm(props) {
      
    return (
        <div>
            <form>
                <select name={props.select} id={props.id} onChange={props.func} value={props.value} >
                  
                    {props.options && props.options.map(e => (
                        <option  value={e} key={e}>{e}</option>
                    ))}
                </select>
            </form>
        </div>
        
    )
}