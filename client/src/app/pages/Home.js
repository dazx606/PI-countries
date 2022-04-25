import "../style/style.css"
import { Link } from 'react-router-dom'

function Home(){
    return(
        <div className="bg App">
            <Link to="/countries"><button type="button" className="homeBtn">Simple</button></Link>
            
        </div>
    )
};

export default Home;