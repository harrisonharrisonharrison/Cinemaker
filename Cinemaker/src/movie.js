const apiKey = 'eaa20b84ad2e09a53cc08ce61510dd69';
const apiURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

document.addEventListener('DOMContentLoaded', function () {
  const moviesContainer = document.getElementById("movies");

  async function fetchMovies() {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();

      for (const media of data.results) {
        const videoKey = await fetchVideoKey(media.id, media.media_type);
        const movieCard = createMovieCard(media, videoKey);
        moviesContainer.appendChild(movieCard);
      }
    } catch (error) {
      console.error("error fetching data ", error);
    }
  }

  async function fetchVideoKey(id, mediaType) {
    try {
      const videoResponse = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`);
      const videoData = await videoResponse.json();

      // Get the first video that is a YouTube trailer
      const trailer = videoData.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );

      return trailer ? trailer.key : null;
    } catch (error) {
      console.error("error fetching video key", error);
      return null;
    }
  }

  function createMovieCard(media, videoKey) {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const title = media.title || media.name || "Untitled";
    const videoURL = videoKey ? `https://www.youtube.com/embed/${videoKey}` : "";

    card.innerHTML = `
      <h3>${title}</h3>
      ${videoKey ? `<iframe width="300" height="200" src="${videoURL}" allowfullscreen></iframe>` : `<p>No trailer available</p>`}
    `;

    return card;
  }

  fetchMovies();
});
