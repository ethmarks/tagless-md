import sheet from "https://cdn.jsdelivr.net/gh/pruger/tiny-brutalism-css/tiny-brutalism.css" with { type: "css" };
import { mdToEl } from "./md.js";

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

container.appendChild(
	mdToEl(
		"Tagless Markdown is a tool built for [Tagless](https://tagless.hackclub.com/) YSWS that renders Markdown in the browser using `.createElement()` to manipulate the DOM. The source code only contains minimal HTML boilerplate, and everything is done with JS.",
	),
);

container.appendChild(
	mdToEl(
		`
---

This is a test.

**Bolded** text. _Italic_ text. [Link text](#).

> Blockquote

\`\`\`js
console.log("testing code blocks");
console.log("this one is multi-line!");
\`\`\`

- item a
	- nested item i
	- nested item ii
	- nested item iii
- item b

1. item 1
2. item 2

![cat](https://cataas.com/cat)

---
		`,
	),
);

const footer = document.createElement("footer");
footer.classList.add("text-center");
footer.appendChild(mdToEl("By [Ethan Marks](https://github.com/ethmarks)"));
container.appendChild(footer);

document.body.appendChild(container);
