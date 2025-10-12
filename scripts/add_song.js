addEventListener("DOMContentLoaded", function () {
  document.querySelector("#addBtn").addEventListener("click", addSong);
});

async function addSong() {
  const song = {
    title: document.querySelector("#title").value,
    artist: document.querySelector("#artist").value,
    releaseDate: document.querySelector("#release").value,
    popularity: document.querySelector("#popularity").value,
    genre: document.querySelector("#genre").value
      ? document.querySelector("#genre").value.split(",")
      : [],
    username: localStorage.getItem("uname"),
  };

  const response = await fetch(`${API}/api/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       // add this if you want server to stamp username from token:
     "x-auth": localStorage.getItem("token") || ""
    },
    body: JSON.stringify(song),
  });

  if (response.ok) {
    const results = await response.json();
    alert("Added song with ID of" + results._id);

    // Reset the form after song is successfully added
    document.querySelector("form").reset();
    document.querySelector("#error").innerHTML = "Cannot add song";
  }
}
