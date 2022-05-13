import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading((current) => !current);
    setMovie(json.data.movie);
  }, [id]);
  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <div className={styles.img_box}>
            <img
              src={movie.medium_cover_image}
              alt={movie.medium_cover_image}
              className={styles.movie__bg_img}
            />
          </div>
          <div className={styles.movie_information}>
            <h2 className={styles.movie_title}>
              {movie.title} ({movie.year})
            </h2>
            <div className={styles.movie_rating}>
              <span>{movie.rating}점 • </span>
              <span>{movie.runtime}분</span>
              <div className={styles.movie_download}>
                download: {movie.download_count} (회)
              </div>
            </div>
            <p className={styles.movie_description}>{movie.description_full}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
