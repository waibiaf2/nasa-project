const API_URL = 'http://localhost:8000/v1'

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch((`${API_URL}/launches`))
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

//Load Aborted Launches
async function httpGetAbortedLaunches() {
  const response = await fetch((`${API_URL}/launches`))
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'post',
      body: JSON.stringify(launch),
      headers:{
        "Content-Type": "application/json"
      }
    })
  }catch (e) {
    return {
      ok: false
    }
  }
}


// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete',
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false
    }
  }
}

export {
    httpGetPlanets,
    httpGetLaunches,
    httpGetAbortedLaunches,
    httpSubmitLaunch,
    httpAbortLaunch,
};
