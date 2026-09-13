import { parse } from "https://esm.sh/@croct/md-lite@0.3.1";

/**
 * Main export
 *
 * @param {string} markdown
 * @returns {HTMLElement}
 */
export const mdToEl = mdToCreateEl;

/**
 * Parses Markdown into an AST, then assembles an element based on the AST.
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
