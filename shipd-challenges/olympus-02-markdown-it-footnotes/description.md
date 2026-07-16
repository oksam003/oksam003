# Add footnote support to markdown-it core

markdown-it renders CommonMark and GFM but has no built-in footnotes. Add first-class footnote support to the core parser and renderer (not as an external plugin), covering the reference and inline syntaxes and following the conventional footnote HTML output.

## Syntax

- Reference footnote: a marker `[^label]` in the text plus a definition line `[^label]: the footnote content`. The definition may appear before or after the marker and may contain block content (multiple paragraphs via 4-space indented continuation) and inline markdown.
- Inline footnote: `^[the footnote content]`, which needs no separate definition.

## Behaviour

- Footnotes are collected into a single list rendered at the end of the document, numbered by the document order of their first reference.
- A label may be referenced multiple times; every reference links to the definition, and the definition links back to each reference.
- A `[^label]` marker whose label has no definition is left as literal text.
- When `env.docId` is a string, it is woven into the anchor ids so several rendered documents can share a page without id collisions.

## Output format

The rendered HTML follows the widely used footnote convention (the same one the `markdown-it-footnote` package in this repo's dev-dependencies produces). For example, `Here is a footnote[^1].\n\n[^1]: Footnote **text**.` renders as:

```html
<p>Here is a footnote<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.</p>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>Footnote <strong>text</strong>. <a href="#fnref1" class="footnote-backref">BACKREF</a></p>
</li>
</ol>
</section>
```

Here `BACKREF` is the back-reference link text: the character U+21A9 immediately followed by the variation selector U+FE0E.

## Constraints

- Implement it in the core library so plain `markdownit().render(...)` supports footnotes with no plugin registration.
- Ordinary markdown that uses none of the footnote syntax must render exactly as before.
