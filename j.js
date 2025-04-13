const client_id = "5l2xW_0rKMr6UHYk72WIm9T7p20-kLoyJfIm82QlNHk";

function displayImages(results) {
  const imagesDiv = document.getElementById('images');
  imagesDiv.innerHTML = '';
  results.forEach(img => {
    const image = document.createElement('img');
    image.src = img.urls.small;
    imagesDiv.appendChild(image);
  });
}

function searchXHR() {
  const keyword = document.getElementById("searchInput").value;
  const xhr = new XMLHttpRequest();
  const params = `client_id=${client_id}&per_page=8&query=${encodeURIComponent(keyword)}`;
  xhr.open("GET", `https://api.unsplash.com/search/photos?${params}`, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayImages(data.results);
    } else {
      alert("XHR Error!");
    }
  };
  xhr.send();
}

function searchFetch() {
  const keyword = document.getElementById("searchInput").value;
  const params = `client_id=${client_id}&per_page=8&query=${encodeURIComponent(keyword)}`;
  fetch(`https://api.unsplash.com/search/photos?${params}`)
    .then(response => response.json())
    .then(data => displayImages(data.results))
    .catch(error => alert("Fetch error: " + error));
}

async function searchAsync() {
  const keyword = document.getElementById("searchInput").value;
  const params = `client_id=${client_id}&per_page=8&query=${encodeURIComponent(keyword)}`;
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?${params}`);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    alert("Async/Await Error: " + error);
  }
}
