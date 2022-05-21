import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
    // states
    const [movieName, setMovieName] = useState("");
    const [review, setReview] = useState("");
    const [movieReviewList, setMovieReviewList] = useState([]);

    const [newReview, setNewReview] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
            setMovieReviewList(response.data);
        });
    }, []);

    const submitReview = () => {
        Axios.post("http://localhost:3001/api/insert", {
            movieName: movieName,
            movieReview: review,
        });

        setMovieReviewList([
            ...movieReviewList,
            { movieName: movieName, movieReview: review },
        ]);
    };

    const deleteReview = (movie) => {
        Axios.delete(`http://localhost:3001/api/delete/${movie}`);
    };

    const updateReview = (movie) => {
        Axios.put(`http://localhost:3001/api/update`, {
            movieName: movie,
            movieReview: newReview,
        });
        setNewReview("");
    };

    return (
        <div className="App">
            <h1>CRUD APPLICATION</h1>
            <div className="form">
                <label htmlFor="">Movie Name:</label>
                <input
                    type="text"
                    name="movieName"
                    onChange={(e) => {
                        setMovieName(e.target.value);
                    }}
                />
                <label htmlFor="">Review:</label>

                <input
                    type="text"
                    name="review"
                    onChange={(e) => {
                        setReview(e.target.value);
                    }}
                />
                <button onClick={submitReview}>Submit</button>
            </div>
            {movieReviewList.map((val, i) => (
                <div key={i}>
                    <div>
                        <h1>Movie Name: {val.movieName}</h1> Comment:{" "}
                        <span>{val.movieReview}</span>
                        <div>
                            <input
                                type="text"
                                className="commentInput"
                                id="updateInput"
                                onChange={(e) => setNewReview(e.target.value)}
                            />
                            <div className="btn-container">
                                <button
                                    onClick={() => deleteReview(val.movieName)}
                                >
                                    delete
                                </button>
                                <button
                                    onClick={() => updateReview(val.movieName)}
                                >
                                    update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
