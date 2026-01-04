import * as pdfjs from "./build/pdf.mjs";

pdfjs.GlobalWorkerOptions.workerSrc = "./build/pdf.worker.mjs";
pdfjs.GlobalWorkerOptions.cMapUrl = "./web/cmaps/";
pdfjs.GlobalWorkerOptions.cMapPacked = true;

const container = document.getElementById("pdf-container");

async function renderPDF(url) {
  const pdf = await pdfjs.getDocument(url).promise;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    await renderPage(page);
  }
}

async function renderPage(page) {
  const scale = 1.5;
  const viewport = page.getViewport({ scale });

  const pageDiv = document.createElement("div");
  pageDiv.className = "page";
  pageDiv.style.width = viewport.width + "px";
  pageDiv.style.height = viewport.height + "px";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  pageDiv.appendChild(canvas);
  container.appendChild(pageDiv);

  await page.render({
    canvasContext: ctx,
    viewport
  }).promise;

  const textLayerDiv = document.createElement("div");
  textLayerDiv.className = "textLayer";
  pageDiv.appendChild(textLayerDiv);

  const textContent = await page.getTextContent();
	textContent.items.forEach(item => {
		const span = document.createElement('span');
		span.textContent = item.str;
		span.style.position = 'absolute';
		const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
		span.style.left = (tx[4]) + 'px';
		span.style.top  = (tx[5]-15) + 'px';
		span.style.fontSize = Math.hypot(tx[0]*0.9, tx[1]) + 'px';
		textLayerDiv.appendChild(span);
	});
}

const articles = [
	{
		title: "User Contraint Libraries",
		date: "04-01-2026",
		content: "notes/constraint_systems.pdf"
	},
	{
		title: "Un",
		date: "28-12-2025",
		content: "notes/un.pdf"
	},
	{
		title: "State of the System",
		date: "27-12-2025",
		content: "notes/state_year_1.pdf"
	},
	{
		title: "About this notebook",
		date: "26-12-2025",
		content: "notes/about.pdf"
	}
];

const colors = [
	"#2b2b2b",
	"#282828",
	"#1c1c1c",
	"#141414",
];

const bookshelf = document.getElementById("bookshelf");
const content = document.getElementById("content");

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
async function main(){
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

			`;
			container.innerHTML = "";
			renderPDF(article.content);
		};

		bookshelf.appendChild(book);
	});
}

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


main();
