// 🌙 Theme Toggle
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
}

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.remove("dark");
  }
});

// 🚀 Handle stat fetch from index.html
async function goToStats() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  try {
    const response = await fetch("https://49e5e1ae-3263-4a04-9641-0e8cfd6459df-00-1npjnd7tdbnc8.sisko.replit.dev/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    if (!data || data.error) {
      throw new Error(data.error || "Something went wrong.");
    }

    // Save data to use on stats.html
    localStorage.setItem("tiktokStats", JSON.stringify(data));
    window.location.href = "stats.html";
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to fetch stats. Please try again.");
  }
}

// 📊 Display stats on stats.html
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("stats.html")) return;

  const container = document.getElementById("stats-container");
  const data = JSON.parse(localStorage.getItem("tiktokStats"));

  if (!data) {
    container.textContent = "No TikTok stats found.";
    return;
  }

  container.innerHTML = `
    <h2>@${data.uniqueId}</h2>
    <div class="stats-grid">
      <div class="bubble">Followers: ${data.stats.followerCount.toLocaleString()}</div>
      <div class="bubble">Following: ${data.stats.followingCount.toLocaleString()}</div>
      <div class="bubble">Likes: ${data.stats.heartCount.toLocaleString()}</div>
      <div class="bubble">Comments: ${data.stats.diggCount?.toLocaleString() || "N/A"}</div>
      <div class="bubble">Videos: ${data.stats.videoCount.toLocaleString()}</div>
    </div>
  `;
});
