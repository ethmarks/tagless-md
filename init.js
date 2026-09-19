// the stylesheets
import baseSheet from "./base.css" with { type: "css" };
import mainSheet from "./main.css" with { type: "css" };

// the main markdown processing logic
import { mdToEl } from "./md.js";

// the initial content of the textarea
// chromium doesn't support `with { type: "text" }` so I had to change it
const initialMdResponse = await fetch("./initial.md");
const initialMd = await initialMdResponse.text();

// actually add the stylesheets to the page
document.adoptedStyleSheets = [baseSheet, mainSheet];

// create all the page elements
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
inpt.appendChild(inptLabel);
const textarea = document.createElement("textarea");
textarea.rows = 20;
textarea.value = initialMd;
inpt.appendChild(textarea);
main.appendChild(inpt);

const out = document.createElement("div");
const outLabel = document.createElement("label");
outLabel.appendChild(document.createTextNode("Output"));
out.appendChild(outLabel);
const article = document.createElement("article");
out.appendChild(article);
main.appendChild(out);

container.appendChild(main);

const footer = document.createElement("footer");
footer.classList.add("text-center");
footer.appendChild(mdToEl("By [Ethan Marks](https://github.com/ethmarks)"));
container.appendChild(footer);

document.body.appendChild(container);

/**
 * Renders the textarea's content and injects it into the article
 */
function render() {
  const el = mdToEl(textarea.value);
  article.replaceChildren(el);
}

// calls render every time the textarea is updated
textarea.addEventListener("input", render);

// renders the initial markdown content
render();
