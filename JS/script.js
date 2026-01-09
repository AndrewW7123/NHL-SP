window.addEventListener("load", function() {

  const proxy = "https://corsproxy.io/?";
  const API_URL = "https://api-web.nhle.com/v1/scoreboard/now";
  const API_scores_now = "https://api-web.nhle.com/v1/score/2025-10-14";
  const API_teams = "https://api-web.nhle.com/v1/standings/now";

  /*
  async function getScoreboard() {
    const scoreboardEl = document.getElementById("scoreboard");
    scoreboardEl.innerHTML = "<p>Loading...</p>";

    try {
      const response = await fetch(proxy + API_URL);
      if (!response.ok) throw new Error("Failed to fetch scoreboard data");

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
      if (!response.ok) throw new Error("Failed to fetch score data");

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


  async function getStandings() {
    const teamsMain = document.getElementById("teams");
    teamsMain.innerHTML = "<p id='load'>Loading...</p>";

    try {
      const response = await fetch(proxy + API_teams);
      if (!response.ok) throw new Error("Failed to fetch teams data");

      const data = await response.json();
      console.log(data);

      // Build scoreboard HTML
      i = 0;
      id = 0;
      document.getElementById("teams").innerHTML += `<div class="teamsRows" id="teams${id}"></div>`;
      while (i < 32) {
        if (i == 3 || i == 6 || i == 9 || i == 12 || i == 15 || i == 18 || i == 21 || i == 24 || i == 27 || i == 30) {
          id += 1;
          document.getElementById("teams").innerHTML += `<div class="teamsRows" id="teams${id}"></div>`;
        }
        teamId = "teams" + id;
        standingsMain = data.standings[i];
        teamName = standingsMain.teamName.default;
        wins = standingsMain.regulationPlusOtWins ?? 0;
        losses = standingsMain.losses ?? 0;
        imgSrc = standingsMain.teamLogo;
        teamPage = standingsMain.teamAbbrev.default;

        // Put team divs into flexboxes in rows of 3 going down for 10 rows
        document.getElementById(teamId).innerHTML += `
          <div class="game">
            <a id="teamName" href="teamPages/${teamPage}.html"><strong>${teamName}</strong></a>
            <span style="color: #0eea12ff">Wins: ${wins}</span>
            <span style="color: #e70a0aff">Losses: ${losses}</span>
            <span><img style="width:6rem" src=${imgSrc}></span>
          </div>
        `;
        i += 1;
      }
    } catch (error) {
      teamsMain.innerHTML = `<p>Error: ${error.message}</p>`;
    }
    document.getElementById("load").remove();
  }


  async function displayTeam() {
    const teamsMain = document.getElementById("team");
    teamsMain.innerHTML = "<p id='load'>Loading...</p>";

    try {
      const response = await fetch(proxy + API_teams);
      if (!response.ok) throw new Error("Failed to fetch teams data");

      const data = await response.json();
      console.log(data);

      // Get and display team info based on page
      i = 0;
      while (i < 32) {
        
        i += 1;
      }
    } catch (error) {
      teamsMain.innerHTML = `<p>Error: ${error.message}</p>`;
    }
    document.getElementById("load").remove();
  }


  //getScores();
  //getStandings();
});