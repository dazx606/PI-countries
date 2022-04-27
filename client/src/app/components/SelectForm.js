import "../style/select.css"

export default function SelectForm(props){
    return(
        <div>
            <form>
                <select name={props.select}>
                    <option>select {props.select}:</option>
                    {props.options && props.option.map(e=>(
                        <option>{e}</option>
                    ))}

                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                    <option value="4">Ford</option>
                    <option value="5">Honda</option>
                    <option value="6">Jaguar</option>
                    <option value="7">Land Rover</option>
                    <option value="8">Mercedes</option>
                    <option value="9">Mini</option>
                    <option value="10">Nissan</option>
                    <option value="11">Toyota</option>
                    <option value="12">Volvo</option>
                </select>

            </form>
            
        </div>
    )
}