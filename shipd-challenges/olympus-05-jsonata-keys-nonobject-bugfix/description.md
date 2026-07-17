Several JSONata functions that iterate over an object's keys throw a TypeError when their argument is a non-object (for example `undefined`), instead of treating it as having no keys and returning `undefined`.

## Reproduce

Evaluating

```
$each($missing, function($v, $k){ $v })
```

against any input throws:

```
Cannot convert undefined or null to object
```

`$sift` throws the same way when its first argument is undefined.

## Expected

When the argument is a non-object (undefined or null), the functions that walk an object's keys should behave as if it had no keys: the expression evaluates to `undefined` rather than throwing. Evaluating against a real object must keep working exactly as before.

## Notes

The regression came from replacing `for (var prop in obj)` loops with `Object.keys(obj)` in several places; `Object.keys` throws when given a non-object. The fix should restore the tolerant behaviour everywhere object keys are enumerated, not only in one function.
