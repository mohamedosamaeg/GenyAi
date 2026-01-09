const inp = document.getElementById("inp");
const images = document.querySelector(".images");

async function getImage() {
  images.innerHTML = "";

  const res = await fetch("/api/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: inp.value }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data?.error?.message || "Request failed");
    return;
  }

  (data.data || []).forEach((photo) => {
    const container = document.createElement("div");
    const img = document.createElement("img");
    img.src = photo.url;
    container.appendChild(img);
    images.appendChild(container);
  });
}

window.getImage = getImage;
