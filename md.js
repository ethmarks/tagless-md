import { fromMarkdown } from "https://esm.sh/mdast-util-from-markdown@2?bundle";

/**
 * Parses Markdown into an AST, then assembles an element from the AST.
 *
 * @param {string} markdown
 * @returns {HTMLElement}
 */
export function mdToEl(markdown) {
  const root = document.createElement("div");

  const ast = fromMarkdown(markdown);

  for (const child of ast.children) {
    const el = processNode(child);
    if (el) root.appendChild(el);
  }

  return root;
}

/**
 * based on {@link https://github.com/syntax-tree/mdast}
 * @typedef {"blockquote" | "break" | "code" | "definition" | "emphasis" | "heading" | "html" | "image" | "imageReference" | "inlineCode" | "link" | "linkReference" | "list" | "listItem" | "paragraph" | "root" | "strong" | "text" | "thematicBreak" } NodeType
 *
 * @typedef {{type: NodeType, children?: Node[], value?: string, url?: string, alt?: string, title?: string}} Node
 */

/**
 *
 * @param {Node} node
 * @returns {HTMLElement | undefined}
 */
function processNode(node) {
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
      // reasoning: I don't want to have to deal with references
      console.warn("definitions are not supported");
      break;

    case "emphasis":
      el = document.createElement("em");
      break;

    case "heading":
      el = document.createElement(`h${node.depth}`);
      break;

    case "html":
      // reasoning: I can't really implement this without using .innerHTML,
      // which is obviously against the rules ;)
      console.warn("inline html is not supported");
      break;

    case "image":
      el = document.createElement("img");
      el.src = node.url;
      if (node.alt) el.alt = node.alt;
      if (node.title) el.title = node.title;
      break;

    case "imageReference":
      // reasoning: I don't want to have to deal with references
      console.warn("image references are not supported");
      break;

    case "inlineCode":
      el = document.createElement("code");
      el.appendChild(document.createTextNode(node.value));
      break;

    case "link":
      el = document.createElement("a");
      el.href = node.url;
      if (node.title) el.title = node.title;
      break;

    case "linkReference":
      // reasoning: I don't want to have to deal with references
      console.warn("link references are not supported");
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
      // this should be unreachable
      console.warn(
        "how does root.children contain another root node? what did you do?!",
      );
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

  if (node.children && el) {
    for (const child of node.children) {
      el.appendChild(processNode(child));
    }
  }

  return el;
}
