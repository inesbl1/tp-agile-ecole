let articles = [];
let defaultCategory = "sport"; 
let categoryEmojis = {
  "art": "🎨",
  "scientific clubs": "🧪",
  "school trip": "🚌",
  "competition": "🏆",
  "education": "📘",
  "sport": "⚽"
};


 fetch("article.json")
  .then(response => response.json())
  .then(data => {
    articles = data.articles; 
    showArticles(defaultCategory); 
  })
  .catch(err => console.error(err));


function showArticles(selectedCategory) {
  const displayTitle = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  document.getElementById("pageTitle").textContent = `${categoryEmojis[selectedCategory]} ${displayTitle}`;

  const container = document.getElementById("articlesContainer");
  container.innerHTML = "";

  const filteredArticles = articles.filter(article => article.category === selectedCategory);

  filteredArticles.forEach(article => {
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const img = document.createElement("img");
    img.className = "image";
    img.src = article.image;
    img.alt = article.title;
    cardContent.appendChild(img);

    const info = document.createElement("div");
    info.className = "info-categorie";

    const title = document.createElement("h3");
    title.textContent = article.title;
    info.appendChild(title);

    const excerpt = document.createElement("p");
    excerpt.textContent = article.excerpt;
    info.appendChild(excerpt);

    const butRead = document.createElement("div");
    butRead.className = "but-read";
    butRead.style.textAlign = "right"; 

    const readMore = document.createElement("a");
    readMore.className = "readmore";
    readMore.href = "#";
    readMore.textContent = "Read More";

    butRead.appendChild(readMore);
    info.appendChild(butRead);

    cardContent.appendChild(info);
    container.appendChild(cardContent);
  });
}

document.querySelectorAll(".categorie-card").forEach(card => {
  card.addEventListener("click", () => {
    const selectedCategory = card.dataset.category;
    showArticles(selectedCategory);
    document.querySelector(".categorie").scrollIntoView({ behavior: 'smooth' });
  });
});
