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
export const mdToEl = mdToHTML;

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
function mdToCreateEl(markdown) {}
