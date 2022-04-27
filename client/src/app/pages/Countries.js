import List from "../components/List";
import "../../App.css"
import Search from "../components/Search";
import FilterSort from "../components/FilterSort";


function Countries (){

    return(
        <div className="App Country">
            <container></container>
            <Search/>
            <FilterSort/>
            <List/>           
        </div>
    )
}
export default Countries;