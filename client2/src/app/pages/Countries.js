import List from "../components/List";
import "../../App.css"
import Search from "../components/Search";
import FilterSort from "../components/FilterSort";
import PopupForm from "../components/PopupForm";


function Countries (){

    return(
        <div className="App Country">
    
            <Search/>
            <FilterSort/>
            <List/>   
            <PopupForm/>        
        </div>
    )
}
export default Countries;