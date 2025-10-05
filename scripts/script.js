addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("https://sdev255-m06-tutorial-backend.onrender.com/api/songs");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const songs = await response.json();

    let html = "";
    for (let song of songs) {
      let songID = song._id;
      html += `<li>
        ${song.title} - ${song.artist}
        - <a href="details.html?id=${songID}">Details</a>
        - <a href="edit.html?id=${songID}">Edit Song</a>
        - <a href="#" class="deleteSong" data-id="${songID}">Delete Song</a>
      </li>`;
    }

    const list = document.querySelector("#list_of_songs");
    list.innerHTML = html || "<li>No songs found</li>";

    // Delete (simple event delegation)
    list.addEventListener("click", async (e) => {
      if (!e.target.matches(".deleteSong")) return;
      e.preventDefault();

      const id = e.target.dataset.id;
      if (!confirm("Delete this song?")) return;

      const r = await fetch(`https://sdev255-m06-tutorial-backend.onrender.com/api/songs/${id}`, {
        method: "DELETE",
      });

      if (r.ok) {
        e.target.closest("li").remove();
      } else {
        alert("Cannot delete song");
      }
    });
  } catch (err) {
    console.error("Fetch failed:", err);
    document.querySelector("#list_of_songs").innerHTML =
      "<li>Failed to load songs</li>";
  }
});
