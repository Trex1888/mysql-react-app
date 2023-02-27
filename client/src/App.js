import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3005/api/get").then((response) => {
      console.log(response);
      console.log(response.data);
      setMovieReviewList(response.data);
    });
  }, []);

  const addReview = () => {
    axios
      .post("http://localhost:3005/api/insert", {
        movieName: movieName,
        movieReview: review,
      })
      .then(() => {
        console.log("review added");
        setMovieReviewList([
          ...movieReviewList,
          {
            movieName: movieName,
            movieReview: review,
          },
        ]);
      });

    // setMovieReviewList([
    //   ...movieReviewList,
    //   { movieName: movieName, movieReview: review },
    // ]);
    setMovieName("");
  };

  const updateReview = (id) => {
    axios
      .put("http://localhost:3005/api/update", {
        movieReview: newReview,
        id: id,
      })
      .then((response) => {
        setMovieReviewList(
          movieReviewList.map((review) => {
            return review.id === id
              ? {
                  id: review.id,
                  movieName: review.movieName,
                  movieReview: newReview,
                }
              : review;
          })
        );
      });
  };

  const deleteReview = (id) => {
    axios.delete(`http://localhost:3005/api/delete/${id}`).then((response) => {
      setMovieReviewList(
        movieReviewList.filter((review) => {
          return review.id !== id;
        })
      );
    });
  };

  return (
    <div className="app">
      <h2>Movie Review</h2>
      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Movie Review:</label>
        <input
          type="text"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={addReview}>Add</button>
        {movieReviewList.map((review, i) => {
          return (
            <div key={i} className="card">
              <h1>{review.movieName}</h1>
              <p>{review.movieReview}</p>

              <div className="card1">
                <button
                  onClick={() => {
                    deleteReview(review.id);
                  }}
                >
                  Delete
                </button>
                <input
                  type="text"
                  id="updateInput"
                  onChange={(e) => {
                    setNewReview(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateReview(review.id);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
        {/* {movieReviewList.map((review, i) => (
          <div key={i} className="card">
            <h1>{review.movieName}</h1>
            <p>{review.movieName}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default App;
