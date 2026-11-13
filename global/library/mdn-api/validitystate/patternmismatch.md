---
title: "ValidityState: patternMismatch property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/patternmismatch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: patternMismatch property

The read-only **`patternMismatch`** property of the `ValidityState` interface indicates if the value of an ``, after having been edited by the user, does not conform to the constraints set by the element's `pattern` attribute.

The `patternMismatch` property will be true if and only if the following conditions are all true:

- the field supports the `pattern` attribute — which means the `` is of `type` `<text>`, `<tel>`, `<email>`, `<url>`, `<password>`, or `<search>`
- the `pattern` attribute contains a valid regular expression
- the `` value doesn't conform to the constraints set by the `pattern` value.

## Value

A boolean that is `true` if the `ValidityState` object does not conform to the constraints.

## Examples

Given the following:

```html
<p>
  <label
    >Enter your phone number in the format (123)456-7890 (<input
      name="tel1"
      type="tel"
      pattern="[0-9]{3}"
      placeholder="###"
      aria-label="3-digit area code"
      size="2" />)-
    <input
      name="tel2"
      type="tel"
      pattern="[0-9]{3}"
      placeholder="###"
      aria-label="3-digit prefix"
      size="2" />
    -
    <input
      name="tel3"
      type="tel"
      pattern="[0-9]{4}"
      placeholder="####"
      aria-label="4-digit number"
      size="3" />
  </label>
</p>
```

Here we have 3 sections for a North American phone number with an implicit label encompassing all three components of the phone number, expecting 3-digits, 3-digits and 4-digits respectively, as defined by the `pattern` attribute set on each.

If the values are too long or too short, or contain characters that aren't digits, `patternMismatch` will be true. When `true`, the element matches the `:invalid` CSS pseudo-classes.

```css
input:invalid {
  border: red solid 3px;
}
```

Note, in this case, we get a `patternMismatch` not a `validityState.tooLong` or `validityState.tooShort` if the values are too long or too short because it is the pattern that is dictating the length of the value. Had we used `minlength` and `maxlength` attributes instead, we may have seen `validityState.tooLong` or `validityState.tooShort` being true.

> **Note:**
> The ``<email>`` input type requires, at minimum, a match of `x@y` and the ``<url>`` type requires, at minimum, a match to x:, with no pattern attribute present. When invalid, the `validityState.typeMismatch` will be true, if there is no pattern attribute (or if the pattern attribute is not valid for that input type).

## See also

- Constraint validation
- Forms: Data form validation
- Regular Expressions
