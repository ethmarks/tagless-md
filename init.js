import sheet from "https://cdn.jsdelivr.net/gh/pruger/tiny-brutalism-css/tiny-brutalism.css" with { type: "css" };

// load tiny-brutalism.css
document.adoptedStyleSheets = [sheet];

// construct the page content
const container = document.createElement("div");
container.classList.add("container");

const title = document.createElement("h1");
title.appendChild(document.createTextNode("Tagless Markdown"));
title.classList.add("text-center");
container.appendChild(title);

const tagline = document.createElement("div");
tagline.appendChild(
	document.createTextNode("A Markdown renderer without a single HTML tag"),
);
tagline.classList.add("box");
tagline.classList.add("text-center");
tagline.id = "tagline";
container.appendChild(tagline);

const description = document.createElement("p");
description.appendChild(
	document.createTextNode("Tagless Markdown is a tool built for "),
);
const taglessLink = document.createElement("a");
taglessLink.href = "https://tagless.hackclub.com/";
taglessLink.appendChild(document.createTextNode("Tagless"));
description.appendChild(taglessLink);
description.appendChild(
	document.createTextNode(" YSWS that renders Markdown in the browser using "),
);
const createElCode = document.createElement("code");
createElCode.appendChild(document.createTextNode(".createElement()"));
description.appendChild(createElCode);
description.appendChild(
	document.createTextNode(
		" to manipulate the DOM. The source code only contains minimal HTML boilerplate, and everything is done with JS.",
	),
);
container.appendChild(description);

const footer = document.createElement("footer");
footer.classList.add("text-center");
footer.appendChild(document.createTextNode("By "));
const meLink = document.createElement("a");
meLink.href = "https://github.com/ethmarks";
meLink.appendChild(document.createTextNode("Ethan Marks"));
footer.appendChild(meLink);
container.appendChild(footer);

document.body.appendChild(container);
