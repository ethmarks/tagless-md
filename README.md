# Tagless Markdown

[![Demo](https://img.shields.io/badge/demo-live-green)](https://ethmarks.github.io/tagless-md/)
[![GitHub](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/ethmarks/tagless-md)

Markdown renderer site that doesn't use any HTML tags

[![Screenshot of Tagless Markdown](./.github/screenshot.png)](https://ethmarks.github.io/tagless-md/)

## How it Works

To create and manipulate DOM elements without using HTML tags, I mostly used `.createElement()` and `.appendChild()`.

### The page

The page elements (e.g. the header, the footer, the textarea, and the output) are assembled in the `getContainer()` function and injected into the page body.

Importing stylesheets via `<link rel="stylesheet">` isn't allowed, but I didn't want to embed all of the stylesheets directly in `index.html` because that's smelly code. So instead, I put them in CSS files and used JS to inject them using the `with { type: "css" }` [import attribute](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) and `document.adoptedStyleSheets`.
