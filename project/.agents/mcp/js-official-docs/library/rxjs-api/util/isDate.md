# src/internal/util/isDate

## isValidDate

```ts
export function isValidDate(value: any): value is Date
```

Checks to see if a value is not only a `Date` object,
but a *valid* `Date` object that can be converted to a
number. For example, `new Date('blah')` is indeed an
`instanceof Date`, however it cannot be converted to a
number.