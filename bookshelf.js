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

const colors = [
	"#2b2b2b",
	"#282828",
	"#1c1c1c",
	"#141414",
];

const bookshelf = document.getElementById("bookshelf");
const content = document.getElementById("content");

const lengths = articles.map(a => a.content.length);
const minLen = Math.min(...lengths);
const maxLen = Math.max(...lengths);

function bookWidth(len) {
  const minW = 20;
  const maxW = 80;
  if (maxLen === minLen) return minW;
  return (
    minW +
    (len - minLen) / (maxLen - minLen) * (maxW - minW)
  );
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

articles.forEach(article => {
	const book = document.createElement("div");
	book.className = "book";
	book.style.width = bookWidth(article.content.length) + "px";
	book.style.height= "80px";
	book.style.background = colors[randInt(0, colors.length-1)];


	const title = document.createElement("div");
	title.className = "book-title";
	title.textContent = article.date;

	book.appendChild(title);
	book.addEventListener("mouseenter", e => {
	  showTooltipAtMouse(e, article.title);
	});

	book.addEventListener("mousemove", e => {
	  showTooltipAtMouse(e, article.title);
	});

	book.addEventListener("mouseleave", hideTooltip);

	book.onclick = () => {
		content.innerHTML = `
		  <h1>${article.title}</h1>
		  <p>${article.content}</p>
		`;
	};

	bookshelf.appendChild(book);
});


const tooltip = document.getElementById("tooltip");
const OFFSET = 12;

function showTooltipAtMouse(e, text) {
  tooltip.textContent = text;
  tooltip.style.opacity = "1";

  tooltip.style.left = (e.clientX + OFFSET) + "px";
  tooltip.style.top  = (e.clientY+ OFFSET) + "px";
}

function hideTooltip() {
  tooltip.style.opacity = "0";
}


