addEventListener("DOMContentLoaded", async function () {
  document.querySelector("#updateBtn").addEventListener("click", updateSong);
  const urlparam = new URLSearchParams(window.location.search);
  const songID = urlparam.get("id");
  const response = await fetch("http://localhost:3000/api/songs/" + songID);
  if (response.ok) {
    let song = await response.json();
    document.querySelector("#songId").value = song._id;
    document.querySelector("#title").value = song.title;
    document.querySelector("#artist").value = song.artist;
    document.querySelector("#release").value = song.releaseDate.substring(
      0,
      10
    );
    document.querySelector("#popularity").value = song.popularity;
    document.querySelector("#genre").value = song.genre;
  }
});

async function updateSong() {
  //create song object from form fields
  const songID = document.querySelector("#songId").value.trim();
  const song = {
    _id: document.querySelector("#songId").value,
    title: document.querySelector("#title").value,
    artist: document.querySelector("#artist").value,
    releaseDate: document.querySelector("#release").value || undefined,
    popularity: Number(document.querySelector("#popularity").value),
    genre: document.querySelector("#genre").value
      ? document
          .querySelector("#genre")
          .value.split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
  };

  // Do not send _id in the update body
  delete song._id;

  const response = await fetch("http://localhost:3000/api/songs/" + songID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });

  if (response.ok) {
    alert("Updated Song");
  } else {
    const msg = await response.text();
    document.querySelector("#error").innerHTML = msg || "Cannot update song";
  }
}
