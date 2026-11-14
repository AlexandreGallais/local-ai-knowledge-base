# platform-browser/src/security/dom_sanitization_service

## SafeValue

```ts
export interface SafeValue {}
```

Marker interface for a value that's safe to use in a particular context.

@publicApi

## SafeHtml

```ts
export interface SafeHtml extends SafeValue {}
```

Marker interface for a value that's safe to use as HTML.

@publicApi

## SafeStyle

```ts
export interface SafeStyle extends SafeValue {}
```

Marker interface for a value that's safe to use as style (CSS).

@publicApi

## SafeScript

```ts
export interface SafeScript extends SafeValue {}
```

Marker interface for a value that's safe to use as JavaScript.

@publicApi

## SafeUrl

```ts
export interface SafeUrl extends SafeValue {}
```

Marker interface for a value that's safe to use as a URL linking to a document.

@publicApi

## SafeResourceUrl

```ts
export interface SafeResourceUrl extends SafeValue {}
```

Marker interface for a value that's safe to use as a URL to load executable code from.

@publicApi

## SafeResourceUrl.sanitize

```ts
abstract sanitize(context: SecurityContext, value: SafeValue | string | null): string | null
```

Gets a safe value from either a known safe value or a value with unknown safety.

If the given value is already a `SafeValue`, this method returns the unwrapped value.
If the security context is HTML and the given value is a plain string, this method
sanitizes the string, removing any potentially unsafe content.
For any other security context, this method throws an error if provided
with a plain string.

## SafeResourceUrl.bypassSecurityTrustHtml

```ts
abstract bypassSecurityTrustHtml(value: string): SafeHtml
```

Bypass security and trust the given value to be safe HTML. Only use this when the bound HTML
is unsafe (e.g. contains `<script>` tags) and the code should be executed. The sanitizer will
leave safe HTML intact, so in most situations this method should not be used.

**WARNING:** calling this method with untrusted user data exposes your application to XSS
security risks!

## SafeResourceUrl.bypassSecurityTrustStyle

```ts
abstract bypassSecurityTrustStyle(value: string): SafeStyle
```

Bypass security and trust the given value to be safe style value (CSS).

**WARNING:** calling this method with untrusted user data exposes your application to XSS
security risks!

## SafeResourceUrl.bypassSecurityTrustScript

```ts
abstract bypassSecurityTrustScript(value: string): SafeScript
```

Bypass security and trust the given value to be safe JavaScript.

**WARNING:** calling this method with untrusted user data exposes your application to XSS
security risks!

## SafeResourceUrl.bypassSecurityTrustUrl

```ts
abstract bypassSecurityTrustUrl(value: string): SafeUrl
```

Bypass security and trust the given value to be a safe style URL, i.e. a value that can be used
in hyperlinks or `<img src>`.

**WARNING:** calling this method with untrusted user data exposes your application to XSS
security risks!

## SafeResourceUrl.bypassSecurityTrustResourceUrl

```ts
abstract bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl
```

Bypass security and trust the given value to be a safe resource URL, i.e. a location that may
be used to load executable code from, like `<script src>`, or `<iframe src>`.

**WARNING:** calling this method with untrusted user data exposes your application to XSS
security risks!