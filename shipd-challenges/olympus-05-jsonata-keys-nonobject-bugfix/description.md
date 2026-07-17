Several of JSONata's built-in functions enumerate an object's keys. When one of them is given `undefined` instead of an object, it throws a TypeError instead of treating the value as having no keys and returning `undefined`.

## Expected

When the argument is `undefined`, a function that enumerates an object's keys should behave as if it had no keys and evaluate to `undefined` rather than throwing. Restore this behaviour everywhere object keys are enumerated, not just in one place.
