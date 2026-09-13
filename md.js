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
 * @typedef {"blockquote" | "break" | "code" | "definition" | "emphasis" | "heading" | "html" | "image" | "imageReference" | "inlineCode" | "link" | "linkReference" | "list" | "listItem" | "paragraph" | "strong" | "text" | "thematicBreak" } NodeType
 * @typedef {{type: NodeType, children?: Node[], value?: string, url?: string, alt?: string, title?: string}} Node
 */

/**
 *
 * @param {Node} node
 * @param {HTMLElement} parent
 * @returns {void}
 */
function processChild(node, parent) {
	let el;

	switch (node.type) {
		case "paragraph":
			el = document.createElement("p");
			break;
		case "text":
			parent.appendChild(document.createTextNode(node.value));
			return;
		case "strong":
			el = document.createElement("strong");
			break;
		case "emphasis":
			el = document.createElement("em");
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
		case "image":
			el = document.createElement("img");
			el.src = node.url;
			el.alt = node.alt;
			el.title = node.title;
			break;
	}

	if (node.children) {
		for (const child of node.children) {
			processChild(child, el);
		}
	}

	parent.appendChild(el);
}
