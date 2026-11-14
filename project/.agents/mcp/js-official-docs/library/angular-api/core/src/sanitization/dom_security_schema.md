# core/src/sanitization/dom_security_schema

## SecurityContext

```ts
export enum SecurityContext
```

A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
handled.

See DomSanitizer for more details on security in Angular applications.

@publicApi