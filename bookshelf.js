const articles = [
	{
		title: "State of the System",
		date: "26-12-2025",
		content: ".".repeat(200000)
	},

	{
		title: "State of the System",
		date: "26-12-2025",
		content: ".".repeat(20000)
	},
	{
		title: "State of the System",
		date: "26-12-2025",
		content: ".".repeat(2000)
	},
	{
		title: "State of the System",
		date: "26-12-2025",
		content: ".".repeat(200)
	},
	{
		title: "State of the System",
		date: "26-12-2025",
		content: ".".repeat(20)
	},
	{
		title: "State of the System",
		date: "26-12-2025",
		content: ".".repeat(2)
	},

];

const bookshelf = document.getElementById("bookshelf");
const content = document.getElementById("content");

const lengths = articles.map(a => a.content.length);
const minLen = Math.min(...lengths);
const maxLen = Math.max(...lengths);

function bookWidth(len) {
  const minW = 20;
  const maxW = 280;
  if (maxLen === minLen) return minW;
  return (
    minW +
    (len - minLen) / (maxLen - minLen) * (maxW - minW)
  );
}

articles.forEach(article => {
  const book = document.createElement("div");
  book.className = "book";
  book.style.width = bookWidth(article.content.length) + "px";
  book.style.height= "100px";

  const title = document.createElement("div");
  title.className = "book-title";
  title.textContent = article.title;

  const date = document.createElement("div");
  date.className = "book-date";
  date.textContent = article.date;

  book.appendChild(title);
  book.appendChild(date);

  book.onclick = () => {
    content.innerHTML = `
      <h1>${article.title}</h1>
      <p><em>${article.date}</em></p>
      <p>${article.content}</p>
    `;
  };

  bookshelf.appendChild(book);
});

