import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { allCountries, getActivities, setSeason } from "../redux/actions";
import { createActivity } from "../services/activitiesService";
import "../style/popupForm.css"


import SelectPopup from "./SelectPopup";
import SelectPopupCountry from "./SelectPopupCountry";



export default function PopupForm() {

    function validate(input) {

        let errors = {};

        if (!input.activity) errors.activity = 'Activity is required';
        else if (input.activity.length < 3 || input.activity.length > 15) errors.activity = "length must be greater than 3 and lower than 15"

        if (!input.difficulty) errors.difficulty = 'Difficulty is required and must be a number between 1 and 5';
        else if (parseInt(input.difficulty) < 1 || parseInt(input.difficulty) > 5) errors.difficulty = 'Difficulty must be a number between 1 and 5';

        if (input.season === "") errors.season = 'Season is required';

        if (!input.duration) errors.duration = 'Duration is required';
        else if (input.duration < 1) errors.duration = 'Duration must be greater than 0';
        else if (input.duration > 999) errors.duration = 'Duration must be a lowe than 999 hours';

        if (input.countries?.length < 1) errors.country = "Country must be selected";

        //document.getElementById("Winter").checked || document.getElementById("Spring").checked || document.getElementById("Autumn").checked || document.getElementById("Summer").checked

        return errors;
    };

    //CHECKS--------------------------------------------------------------------------------------------------
    const [checkSeason, setCheackSeason] = useState('false');
    const seasons = [{ name: "Winter", id: 1 }, { name: "Spring", id: 2 }, { name: "Autumn", id: 3 }, { name: "Summer", id: 4 }];
    const countries = useSelector(state => state.all);
    let season = useSelector(state => state.season);
    const [countryCheck, setCountryCheck] = useState([]);
    const [wasChecked, setWasChecked] = useState([]);

    //---------------------------------------------------------------------------------------------------------
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(true);
    const [input, setInput] = useState({
        activity: '',
        difficulty: '',
        season: '',
        duration: '',
        country: '',
        countries: []
    });
    useEffect(() => {
        dispatch(allCountries())
    }, [dispatch])



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

    function handleClick(event) {
        event.preventDefault();

        createActivity(document.getElementById("activity").value, document.getElementById("duration").value
            , document.getElementById("difficulty").value, season, wasChecked)
            .then(response => {

                setInput({
                    activity: '', difficulty: '', season: '', duration: '',
                })
                dispatch(setSeason(""));
                setCheackSeason(false);
                setWasChecked([]);
                dispatch(getActivities());
                response.message && alert(response.message)

            }).catch(err => {
                console.log(err)
            })
    };

    function block() {
        if (input.activity.length < 1 || Object.keys(errors).length > 0) return true

    };
    function handleClickBtn() {
        if (show === true) { openForm() }
        else closeForm()
    }

    return (
        <div className="forms">
            <button className="open-button" onClick={handleClickBtn}>Add activity</button>


            <div className="form-popup" hidden={show}>
                <form className="form-container">
                    <h1>Add activity</h1>

                    <div className="countries">
                        <div className="countries">
                            <SelectPopupCountry name={"Select countries"} options={countries} check={wasChecked}
                                click={
                                    (e) => {
                                        let newCountries = [...countryCheck]
                                        let newChecked = [...wasChecked]
                                        if (!e.target.checked) {
                                            newCountries = countryCheck.filter(el => el !== e.target.value);
                                            newChecked = wasChecked.filter(el => el !== e.target.id);
                                        }
                                        else if (e.target.checked) {
                                            newCountries = [...countryCheck, e.target.value];
                                            newChecked = [...wasChecked, e.target.id];
                                        }
                                        setCountryCheck(newCountries);
                                        setWasChecked(newChecked);
                                        setInput({
                                            ...input,
                                            countries: newCountries
                                        })
                                        setErrors(validate({
                                            ...input,
                                            countries: newCountries
                                        }));
                                    }
                                } />


                            <div><output className="danger">{errors.country}</output></div>
                        </div>
                    </div>
                    <div className="season">
                        <SelectPopup name={"Select season"} options={seasons} check={checkSeason}
                            change={(e) => {
                                setCheackSeason(e.target.value);
                                setInput({
                                    ...input,
                                    season: e.target.value
                                })
                                setErrors(validate({
                                    ...input,
                                    season: e.target.value
                                }));
                            }} />
                        <div><output className="danger">{errors.season}</output></div>
                    </div>
                    <div>
                        <label className="label" htmlFor="activity"><b>Activity</b>
                            <input type="text" placeholder="Enter Activity" name="activity" id="activity" onChange={handleInputChange}
                                value={input.activity} />
                        </label>
                        <output className="danger">{errors.activity}</output>
                    </div>
                    <div>
                        <label className="label" htmlFor="difficulty"><b>Difficulty</b>
                            <input type="number" placeholder="Enter Difficulty" name="difficulty" id="difficulty" onChange={handleInputChange}
                                value={input.difficulty} />
                        </label>
                        <output className="danger">{errors.difficulty}</output>
                    </div>
                    <div>
                        <label className="number" htmlFor="duration"><b>Duration [hr]</b></label>
                        <input type="text" placeholder="Enter Duration" name="duration" id="duration" onChange={handleInputChange}
                            value={input.duration} />
                        <output className="danger">{errors.duration}</output>
                    </div>
                    <button type="button" className="btn" disabled={block()} onClick={(e) => handleClick(e)}>Add</button>
                    <button type="button" className="btn cancel" onClick={() => closeForm()}>Close</button>
                </form>
            </div>
        </div>
    )
}