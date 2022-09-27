import "./movie.scss"
import { useEffect, useState } from "react"
import axios from "axios"

// API key: 1c269897
const API_URL = "http://www.omdbapi.com/?apikey=1c269897"


const Movie = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [movieData, setMovieData] = useState([])

    const searchMovie = async (title) => {
        const res = await axios.get(`${API_URL}&s=${title}`)
        if (res && res.data) {
            setMovieData(res.data.Search)
        }
    }


    const handleKeyDownSearch = (e) => {
        if (e.key === "Enter") {
            searchMovie(searchTerm)
        }
    }

    useEffect(() => {
        searchMovie('avenger')
    }, [])

    // const movie1 = {
    //     "Title": "Captain America: The First Avenger",
    //     "Year": "2011",
    //     "imdbID": "tt0458339",
    //     "Type": "movie",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg"
    // }

    return (
        <div className="movie-app">
            <div className="movie-header">
                <h3>Movie Theater</h3>
                <input className="movie-search"
                    placeholder="Search Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => { handleKeyDownSearch(e) }}
                />
            </div>
            <div className="movie-container">

                {/* <div className="card">
                    <img className="card-img"
                        src={movie1.Poster !== 'N/A' ? movie1.Poster : 'https://via.placeholder.com/400'} alt={movie1.Poster}
                    />
                    <div className="card-des">
                        <h3 className="card-title">{movie1.Title}</h3>

                    </div>
                </div> */}

                {movieData && movieData.length > 0 &&
                    movieData.map(movie => {
                        return (
                            <div className="card">
                                <img className="card-img"
                                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Poster}
                                />
                                <div className="card-des">
                                    <h3 className="card-title">{movie.Title}</h3>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Movie;