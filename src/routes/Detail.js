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
    setLoading(false);
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
        <div>
          <div className={styles.movie}>
            <img
              src={movie.background_image_original}
              alt={movie.background_image_original}
              className={styles.movie__bg_img}
            />
          </div>
          <div className={styles.movie__header}>
            <img
              src={movie.medium_cover_image}
              alt={movie.medium_cover_image}
              className={styles.movie__img}
            />
          </div>
          <div>
            <h1 className={styles.movie__title}>{movie.title}</h1>
            <div className={styles.movie__year}>
              <span>{movie.year}년</span>
              <span>{movie.runtime}분</span>
            </div>
          </div>
          <div className={styles.movie__content}>{movie.description_full}</div>
        </div>
      )}
    </div>
  );
}

export default Detail;
