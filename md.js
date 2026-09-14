import { fromMarkdown } from "https://esm.sh/mdast-util-from-markdown@2?bundle";

/**
 * Main export
 *
 * @param {string} markdown
 * @returns {HTMLElement}
 */
export const mdToEl = mdToCreateEl;

/**
 * Parses Markdown into an AST, then assembles an element from the AST.
 *
 * @param {string} markdown
 * @returns {HTMLElement}
 */
function mdToCreateEl(markdown) {
	const root = document.createElement("div");

	const ast = fromMarkdown(markdown);

	ast.children.forEach((child) => processChild(child, root));

	return root;
}

/**
 * @typedef {"blockquote" | "break" | "code" | "definition" | "emphasis" | "heading" | "html" | "image" | "imageReference" | "inlineCode" | "link" | "linkReference" | "list" | "listItem" | "paragraph" | "root" | "strong" | "text" | "thematicBreak" } NodeType
 * @typedef {{type: NodeType, children?: Node[], value?: string, url?: string, alt?: string, title?: string}} Node
 */

/**
 *
 * @param {Node} node
 * @param {HTMLElement} parent
 * @returns {void}
 */
function processChild(node, parent) {
	/** @type {HTMLElement} */
	let el;

	switch (node.type) {
		case "blockquote":
			el = document.createElement("blockquote");
			break;

		case "break":
			el = document.createElement("br");
			break;

		case "code":
			el = document.createElement("pre");
			const code = document.createElement("code");
			if (node.lang) code.classList.add(`language-${node.lang}`);
			code.appendChild(document.createTextNode(node.value));
			el.appendChild(code);
			break;

		case "definition":
			// [TODO]
			break;

		case "emphasis":
			el = document.createElement("em");
			break;

		case "heading":
			el = document.createElement(`h${node.depth}`);
			break;

		case "html":
			// [TODO]
			break;

		case "image":
			el = document.createElement("img");
			el.src = node.url;
			el.alt = node.alt;
			el.title = node.title;
			break;

		case "imageReference":
			// [TODO]
			break;

		case "inlineCode":
			el = document.createElement("code");
			el.appendChild(document.createTextNode(node.value));
			break;

		case "link":
			el = document.createElement("a");
			el.href = node.url;
			el.title = node.title;
			break;

		case "linkReference":
			// [TODO]
			break;

		case "list":
			el = document.createElement(node.ordered ? "ol" : "ul");
			break;

		case "listItem":
			el = document.createElement("li");
			break;

		case "paragraph":
			el = document.createElement("p");
			break;

		case "root":
			// [TODO]
			break;

		case "strong":
			el = document.createElement("strong");
			break;

		case "text":
			el = document.createTextNode(node.value);
			break;

		case "thematicBreak":
			el = document.createElement("hr");
			break;
	}

	if (node.children) {
		for (const child of node.children) {
			processChild(child, el);
		}
	}

	parent.appendChild(el);
}
