window.addEventListener("load", function() {

  const proxy = "https://corsproxy.io/?";
  const API_URL = "https://api-web.nhle.com/v1/scoreboard/now";
  const API_scores_now = "https://api-web.nhle.com/v1/score/2025-10-14";

  /*
  async function getScoreboard() {
    const scoreboardEl = document.getElementById("scoreboard");
    scoreboardEl.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(proxy + API_URL);
      if (!response.ok) throw new Error("Failed to fetch NHL data");

      const data = await response.json();

      // No games case
      if (!data.games || data.games.length === 0) {
        scoreboardEl.innerHTML = "<p>No games found.</p>";
        return;
      }

      // Build scoreboard HTML
      scoreboardEl.innerHTML = data.games
        .map(game => {
          const away = game.awayTeam.abbrev;
          const home = game.homeTeam.abbrev;
          const awayScore = game.awayTeam.score ?? 0;
          const homeScore = game.homeTeam.score ?? 0;
          const startTime = new Date(game.startTimeUTC).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `
            <div class="game">
              <span><strong>${away}</strong> @ <strong>${home}</strong></span>
              <span>${awayScore} - ${homeScore}</span>
              <span>${startTime}</span>
            </div>
          `;
        })
        .join("");

    } catch (error) {
      scoreboardEl.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  // Run when page loads
  getScoreboard();
  */


  async function getScores() {
    const scoreboardEl = document.getElementById("scoreboard");
    scoreboardEl.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(proxy + API_scores_now);
      if (!response.ok) throw new Error("Failed to fetch NHL data");

      const data = await response.json();
      console.log(data);

      // Build scoreboard HTML
      scoreboardEl.innerHTML = "<h1>Today's scores:</h1>";
      scoreboardEl.innerHTML += data.games
        .map(game => {
          const away = game.awayTeam.abbrev;
          const home = game.homeTeam.abbrev;
          const awayScore = game.awayTeam.score ?? 0;
          const homeScore = game.homeTeam.score ?? 0;
          const startTime = new Date(game.startTimeUTC).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `
            <div class="game">
              <span><strong>${away}</strong> @ <strong>${home}</strong></span>
              <span>${awayScore} - ${homeScore}</span>
              <span>${startTime}</span>
            </div>
          `;
        })
        .join("");
    } catch (error) {
      scoreboardEl.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  getScores();
});