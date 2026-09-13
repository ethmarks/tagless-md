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
	switch (node.type) {
		case "paragraph":
			// https://github.com/syntax-tree/mdast#link
			const paragraph = document.createElement("p");
			node.children.forEach((child) => processChild(child, paragraph));
			parent.appendChild(paragraph);
			break;
		case "text":
			// https://github.com/syntax-tree/mdast#link
			parent.appendChild(document.createTextNode(node.value));
			break;
		case "strong":
			// https://github.com/syntax-tree/mdast#link
			const bold = document.createElement("strong");
			processChild(node.children, bold);
			parent.appendChild(bold);
			break;
		case "emphasis":
			// https://github.com/syntax-tree/mdast#link
			const italic = document.createElement("em");
			node.children.forEach((child) => processChild(child, italic));
			parent.appendChild(italic);
			break;
		case "inlineCode":
			// https://github.com/syntax-tree/mdast#link
			const code = document.createElement("code");
			code.appendChild(document.createTextNode(node.value));
			parent.appendChild(code);
			break;
		case "link":
			// https://github.com/syntax-tree/mdast#link
			const link = document.createElement("a");
			link.href = node.url;
			link.title = node.title;
			node.children.forEach((child) => processChild(child, link));
			parent.appendChild(link);
			break;
		case "image":
			// https://github.com/syntax-tree/mdast#link
			const image = document.createElement("img");
			image.src = node.url;
			image.alt = node.alt;
			image.title = node.title;
			parent.appendChild(image);
			break;
	}
}
