addEventListener("DOMContentLoaded", async function () {
  const list = document.querySelector("#list_of_songs");
  if (!list) return;

  try {
    const response = await fetch(`${API}/api/songs`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const songs = await response.json();

    let html = "";
    for (let song of songs) {
      const songID = song._id;
      const by = song.username || "(unknown)";
      html += `<li>
        ${song.title} - ${song.artist} - ${song.username}
        - <a href="details.html?id=${songID}">Details</a>
        - <a href="edit.html?id=${songID}">Edit Song</a>
        - <a href="#" class="deleteSong" data-id="${songID}">Delete Song</a>
      </li>`;
    }

    // Delete (event delegation)
    list.addEventListener("click", async (e) => {
      if (!e.target.matches(".deleteSong")) return;
      e.preventDefault();

      const id = e.target.dataset.id;
      if (!id) return;
      if (!confirm("Delete this song?")) return;

      const r = await fetch(`${API}/api/songs/${id}`, { method: "DELETE" });

      if (r.ok || r.status === 204) {
        e.target.closest("li")?.remove();
        if (!list.children.length) list.innerHTML = "<li>No songs left</li>";
      } else {
        alert("Cannot delete song");
      }
    });
  } catch (err) {
    console.error("Fetch failed:", err);
    if (list) list.innerHTML = "<li>Failed to load songs</li>";
  }
});
