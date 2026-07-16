Add abbreviation support to markdown-it's core parser, wrapping defined terms in `<abbr>` tags.

## Syntax

A definition line `*[LABEL]: title text` defines an abbreviation. It may appear anywhere in the document, before or after the term is used. Every whole-word occurrence of `LABEL` in ordinary text is then wrapped in an `<abbr>` tag carrying the title.

## Behaviour

- Only whole-word matches are wrapped: `HTML` is matched, but the `HTML` inside `HTML5` is not.
- Wrapping applies to plain text only, not to code spans.
- A term with no definition is left unchanged.
- The title is HTML-escaped in the output.

## Output format

`The HTML spec.\n\n*[HTML]: HyperText Markup Language` renders as:

```html
<p>The <abbr title="HyperText Markup Language">HTML</abbr> spec.</p>
```

## Constraints

- Implement it in the core library so plain `markdownit().render(...)` wraps abbreviations with no plugin registration.
