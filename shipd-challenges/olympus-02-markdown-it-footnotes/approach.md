# Reference solution approach

Footnotes touch every stage of the markdown-it pipeline, so the solution adds rules to the block parser, the inline parser, and the core chain, plus render rules, and registers each in the corresponding parser registry.

## New rule files

- `lib/rules_block/footnote_def.mjs` - a block rule that recognises a `[^label]: ...` line, records the label in `state.env.footnotes.refs`, and tokenizes the indented definition body as block content between `footnote_reference_open` / `footnote_reference_close` tokens.
- `lib/rules_inline/footnote_ref.mjs` - an inline rule that recognises `[^label]` markers, assigns each label an id on first use and a sub-id per repeat, and pushes a `footnote_ref` token.
- `lib/rules_inline/footnote_inline.mjs` - an inline rule for `^[...]`, which parses the bracketed content immediately and stores it in the footnote list.
- `lib/rules_core/footnote_tail.mjs` - a core rule that runs after inline parsing. It pulls the buffered definition tokens out of the stream, then appends the footnote block: `footnote_block_open`, one `footnote_open` / content / `footnote_anchor` (one backref per reference) / `footnote_close` per footnote, and `footnote_block_close`.

## Registry wiring

- `lib/parser_block.mjs` - register `footnote_def` before `reference` (a footnote definition looks like a link reference), with `paragraph` and `reference` as terminatable rules.
- `lib/parser_inline.mjs` - register `footnote_inline` then `footnote_ref` after `image`.
- `lib/parser_core.mjs` - register `footnote_tail` after `inline`.

## Rendering

`lib/renderer.mjs` gains the render rules `footnote_ref`, `footnote_block_open`, `footnote_block_close`, `footnote_open`, `footnote_close`, `footnote_anchor`, plus two internal helpers `footnote_anchor_name` (which applies the `env.docId` prefix) and `footnote_caption`. They emit the conventional `footnote-ref` / `footnotes` / `footnote-item` / `footnote-backref` markup with `fn{n}` and `fnref{n}` anchors.

## Robustness

Core rules run on every parse, including internal calls made with no `env`. Each footnote rule therefore guards against a missing `state.env` before reading or writing `state.env.footnotes`, so adding the feature does not break existing behaviour. The full pre-existing suite still passes: 293 markdown-it tests and 652 CommonMark spec tests.
