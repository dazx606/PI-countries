import { useState } from "react"
import "../style/popupForm.css"

function validate(input) {
    
    let errors = {};

    if (!input.activity) errors.activity = 'Activity is required';
    else if (!/^[A-Za-z]*$/.test(input.activity)) errors.activity = 'Numbers and special characters are not allowed';
    else if (input.activity.length < 4) errors.activity = "length must be greater than 4"

    if (!input.dificulty) errors.dificulty = 'Dificulty is required';
    else if (!/^[A-Za-z]*$/.test(input.dificulty)) errors.dificulty = 'Numbers and special characters are not allowed';
    else if (input.dificulty.length < 4) errors.dificulty = "length must be greater than 4"

    if (!input.season) errors.season = 'Season is required';
    else if (!/^[A-Za-z]*$/.test(input.season)) errors.season = 'Numbers and special characters are not allowed';
    else if (input.season.length < 4) errors.season = "length must be greater than 4"

    if (!input.duration) errors.duration = 'Duration is required';
    else if (!/^[0-9]*$/.test(input.duration)) errors.duration = 'Only numbers are allowed';


    return errors;
};

export default function PopupForm() {

    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(true);
    const [input, setInput] = useState({
        activity: '',
        dificulty: '',
        season: '',
        duration: '',
    });

    function openForm() { setShow(false) };

    function closeForm() { setShow(true) };

    let handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }));

    };

    function handleClick (event){
        event.preventDefault();
        console.log("SI");
    };

    function block(){
        if(input.activity.length<1 || Object.keys(errors).length>0) return true
        
    }

    return (
        <div className="forms">
            <button className="open-button" onClick={() => openForm()}>Add activity</button>

            <div className="form-popup" hidden={show}>
                <form className="form-container">
                    <h1>Add activity</h1>
                    <div>
                        <label className="label" htmlFor="activity"><b>Activity</b></label>
                        <input type="text" placeholder="Enter Activity" name="activity" onChange={handleInputChange} />
                        <output className="danger">{errors.activity}</output>
                    </div>
                    <div>
                        <label className="label" htmlFor="dificulty"><b>Dificulty</b></label>
                        <input type="text" placeholder="Enter Dificulty" name="dificulty" onChange={handleInputChange} />
                        <output className="danger">{errors.dificulty}</output>
                    </div>
                    <div>
                        <label className="label" htmlFor="season"><b>Season</b></label>
                        <input type="text" placeholder="Enter Season" name="season" onChange={handleInputChange} />
                        <output className="danger">{errors.season}</output>
                    </div>
                    <div>
                        <label className="label" htmlFor="duration"><b>Duration</b></label>
                        <input type="text" placeholder="Enter Duration" name="duration" onChange={handleInputChange} />
                        <output className="danger">{errors.duration}</output>
                    </div>
                    <button type="button" className="btn" disabled={block()} onClick={(e)=>handleClick(e)}>Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeForm()}>Close</button>
                </form>
            </div>
        </div>
    )
}