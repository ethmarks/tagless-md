import { parse, render } from "https://esm.sh/@croct/md-lite@0.3.1";

/**
 * Main export
 *
 * @todo Switch from mdToHTML to mdToCreateEl
 *
 * @param {string} markdown
 * @returns {HTMLElement}
 *
 */
export const mdToEl = mdToCreateEl;

/**
 * Renders Markdown to an HTML string, then uses innerHTML to turn it into an
 * element.
 *
 * Definitely not allowed in the ship.
 *
 * @todo Delete
 *
 * @see {@link https://github.com/croct-tech/md-lite-js/blob/16a25261b28a4bd6a5beaebe2f089d207a9565f6/README.md?plain=1#L83-L93|Source}
 *
 * @param {string} markdown
 * @returns {HTMLElement}
 */
function mdToHTML(markdown) {
	const root = document.createElement("div");

	const html = render(markdown, {
		fragment: (node) => node.children.join(""),
		text: (node) => node.content,
		bold: (node) => `<b>${node.children}</b>`,
		italic: (node) => `<i>${node.children}</i>`,
		strike: (node) => `<s>${node.children}</s>`,
		code: (node) => `<code>${node.content}</code>`,
		link: (node) => `<a href="${node.href}">${node.children}</a>`,
		image: (node) => `<img src="${node.src}" alt="${node.alt}">`,
		paragraph: (node) => `<p>${node.children.join("")}</p>`,
	});

	root.innerHTML = html;

	return root;
}

/**
 * Parses Markdown into an AST, then assembles an element based on the AST.
 *
 * @todo Implement
 *
 * @param {string} markdown
 * @returns {HTMLElement}
 */
function mdToCreateEl(markdown) {
	const root = document.createElement("div");

	const ast = parse(markdown);

	ast.children.forEach((child) => processChild(child, root));

	return root;
}

/**
 *
 * @param {*} node
 * @param {HTMlElement} parent
 * @returns void
 */
function processChild(node, parent) {
	switch (node.type) {
		case "text":
			parent.appendChild(document.createTextNode(node.content));
			break;
		case "bold":
			const bold = document.createElement("strong");
			processChild(node.children, bold);
			parent.appendChild(bold);
			break;
		case "italic":
			const italic = document.createElement("em");
			processChild(node.children, italic);
			parent.appendChild(italic);
			break;
		case "strike":
			const strike = document.createElement("s");
			processChild(node.children, strike);
			parent.appendChild(strike);
			break;
		case "code":
			const code = document.createElement("code");
			code.appendChild(document.createTextNode(node.content));
			parent.appendChild(code);
			break;
		case "link":
			const link = document.createElement("a");
			link.href = node.href;
			processChild(node.children, link);
			parent.appendChild(link);
			break;
		case "image":
			const image = document.createElement("img");
			image.src = node.src;
			image.alt = node.alt;
			parent.appendChild(image);
			break;
		case "paragraph":
			const paragraph = document.createElement("p");
			node.children.forEach((child) => processChild(child, paragraph));
			parent.appendChild(paragraph);
			break;
		case "fragment":
			node.children.forEach((child) => processChild(child, parent));
			break;
	}
}
