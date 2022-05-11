import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setMovie(json.data.movie);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <div>
            <img
              src={movie.background_image_original}
              alt={movie.background_image_original}
            />
          </div>
          <div>
            <img
              src={movie.medium_cover_image}
              alt={movie.medium_cover_image}
            />
          </div>
          <div>
            <h1>{movie.title}</h1>
            <div>
              <span>{movie.year}</span>
              <span>{movie.runtime}</span>
            </div>
          </div>
          <div>{movie.description_full}</div>
        </div>
      )}
    </div>
  );
}

export default Detail;
