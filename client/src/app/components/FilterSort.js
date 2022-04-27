import SelectForm from "./SelectForm";

import "../style/filterSort.css"

export default function FilterSort(){
    return(
        <div className="container">
            <div className="izq">
                <div className="izq1"><SelectForm/> </div>
                <div className="izq1"><SelectForm/></div>
                <div className="izq1"><SelectForm/></div>
                <div className="izq1"><SelectForm/></div>
            </div>
            
        </div>
    )
}