# Tagless Markdown

> _Edit me by typing in the box on the left!_

Tagless Markdown is a tool built for [Tagless YSWS](https://tagless.hackclub.com/) that renders Markdown in the browser by manipulating the DOM without ever using HTML tags.

This is the HTML source for the page you're viewing, in its entirety:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Tagless Markdown</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="text-scale" content="scale" />
    <script src="init.js" type="module"></script>
    <script src="md.js" type="module"></script>
  </head>
  <body></body>
</html>
```

`init.js` imports the stylesheets and constructs the entire page using `.createElement()`.

`md.js` handles all the functionality. It imports [mdast-util-from-markdown](https://www.npmjs.com/package/mdast-util-from-markdown) and recursively walks the AST and assembles it into an element that it injects onto the page.

> Check out the repo! <https://github.com/ethmarks/tagless-md>
