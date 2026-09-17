import baseSheet from "./base.css" with { type: "css" };
import mainSheet from "./main.css" with { type: "css" };
import { mdToEl } from "./md.js";

// load tiny-brutalism.css
document.adoptedStyleSheets = [baseSheet, mainSheet];

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

container.appendChild(document.createElement("hr"));

const main = document.createElement("main");

const inpt = document.createElement("div");
const inptLabel = document.createElement("label");
inptLabel.appendChild(document.createTextNode("Input"));
inptLabel.htmlFor = "md-textarea";
inpt.appendChild(inptLabel);
const textarea = document.createElement("textarea");
textarea.id = "md-textarea";
textarea.rows = 20;
textarea.value =
	`
# Tagless Markdown

> Edit me by typing in the box on the left!

Tagless Markdown is a tool built for [Tagless](https://tagless.hackclub.com/) YSWS that renders Markdown in the browser using \`.createElement()\` to manipulate the DOM. The source code only contains minimal HTML boilerplate, and everything is done with JS.
	`.trim() + "\n\n";
inpt.appendChild(textarea);
main.appendChild(inpt);

const out = document.createElement("div");
const outLabel = document.createElement("label");
outLabel.appendChild(document.createTextNode("Output"));
outLabel.htmlFor = "md-out";
out.appendChild(outLabel);
const outArea = document.createElement("div");
outArea.id = "md-out";
outArea.classList.add("box");
out.appendChild(outArea);
main.appendChild(out);

container.appendChild(main);

const footer = document.createElement("footer");
footer.classList.add("text-center");
footer.appendChild(mdToEl("By [Ethan Marks](https://github.com/ethmarks)"));
container.appendChild(footer);

document.body.appendChild(container);

function render() {
	const el = mdToEl(textarea.value);
	outArea.replaceChildren(el);
}

textarea.addEventListener("input", render);

render();
