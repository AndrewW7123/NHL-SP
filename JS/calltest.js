/*
async function getRecordings() {
    const response = await fetch("https://playback.sportradar.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // If Sportsradar requires an API key, you’d also add it here:
          // "Api-Key": "YOUR_API_KEY"
        },
        body: JSON.stringify({
          query: `
            query getRecordings($league: String) {
              recordings(league: $league) {
                id
                scheduled
                meta
                league
                start
                end
                title
                apis {
                  name
                  description
                  formats
                }
              }
            }
          `,
          variables: {
            league: "nhl"
          }
        })
    });

    const data = await response.json();
    console.log(data);
}

getRecordings();
*/

async function createSession(recordingId) {
  const response = await fetch("https://playback.sportradar.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Api-Key": "YOUR_API_KEY"  // add if required
    },
    body: JSON.stringify({
      query: `
        mutation CreateSession($input: CreateSessionInput!) {
          createSession(input: $input)
        }
      `,
      variables: {
        input: { recordingId }
      }
    })
  });

  const data = await response.json();
  const sessionId = data?.data?.createSession;

  if (!sessionId) {
    throw new Error("No session ID returned");
  }

  console.log("Session ID:", sessionId);
  return sessionId;
}

async function getStats(recordingId) {
  try {
    const sessionId = await createSession(recordingId);

    const url = `https://playback.sportradar.com/replay/nhl/${recordingId}?feed=game&contentType=json&sessionId=${encodeURIComponent(sessionId)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Api-Key": "YOUR_API_KEY"  // add if required
      }
    });

    const stats = await response.json();
    console.log("Statistics:", stats);
    return stats;
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
}

// 🔹 Run it
getStats("13e8dfa0-bbb8-11ef-836b-85fdd2e81ee8");