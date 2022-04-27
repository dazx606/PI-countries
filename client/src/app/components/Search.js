import "../style/Search.css"

export default function Search() {

    return (

        <div>
            <div className="search">
                <input type="text" className="searchTerm" placeholder="What are you looking for?" />
                <button type="submit" className="searchButton">
                    search
                </button>
            </div>
        </div>

    )
}