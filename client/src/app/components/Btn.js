import {useDispatch} from "react-redux"
import { log } from "../redux/actions"

export default function Btn(){
    const dispatch = useDispatch()

    return(
        <>
            <button onClick={()=>{dispatch(log())}}>Log HOLA</button>
        </>
    )
}