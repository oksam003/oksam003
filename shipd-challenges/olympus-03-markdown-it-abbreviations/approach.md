# Reference solution approach

Abbreviations are handled in two stages that live in different subsystems: a block rule captures the definitions, and a core rule rewrites the already-parsed inline token stream to insert the tags.

## New rule files

- `lib/rules_block/abbr_def.mjs` - a block rule that recognises a `*[LABEL]: title` line, extracts the label (honouring backslash escapes) and the trimmed title, and records it in `state.env.abbreviations` under a `:`-prefixed key (to avoid clashing with `Object.prototype` members). It consumes only its own line.
- `lib/rules_core/abbr_replace.mjs` - a core rule that runs after `linkify`. It builds a single alternation regexp from the defined labels (longest first), then walks every `inline` token's `text` children from the end. For each text token containing a whole-word match (bounded by start/end, Unicode punctuation/space, or a small set of other characters) it splits the text and inserts `abbr_open` / `text` / `abbr_close` tokens, using `arrayReplaceAt` to substitute the node in place.

## Registry wiring

- `lib/parser_block.mjs` - register `abbr_def` before `reference`, with `paragraph` and `reference` as terminatable rules (a definition line otherwise looks like the start of a paragraph).
- `lib/parser_core.mjs` - register `abbr_replace` after `linkify`, so linkification has finished before the text tokens are rewritten.

## Rendering

No renderer change is needed: the `abbr_open` token carries tag `abbr` and a `title` attribute, so markdown-it's default token renderer emits `<abbr title="...">...</abbr>`, with the title HTML-escaped through the standard attribute rendering.

## Robustness

`abbr_def` guards against a missing `state.env` before storing a definition, and `abbr_replace` returns early when there is no `state.env` or no abbreviations, so parses that pass no env (used internally) are unaffected. The full pre-existing suite still passes: 293 markdown-it tests and 652 CommonMark spec tests.
