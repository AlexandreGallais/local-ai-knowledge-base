# common/src/directives/ng_optimized_image/preconnect_link_checker

## PRECONNECT_CHECK_BLOCKLIST

```ts
export const PRECONNECT_CHECK_BLOCKLIST = new InjectionToken<Array<string | string[]>>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'PRECONNECT_CHECK_BLOCKLIST' : '', )
```

Injection token to configure which origins should be excluded
from the preconnect checks. It can either be a single string or an array of strings
to represent a group of origins, for example:

```ts
 {provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://your-domain.com'}
```

or:

```ts
 {provide: PRECONNECT_CHECK_BLOCKLIST,
  useValue: ['https://your-domain-1.com', 'https://your-domain-2.com']}
```

@publicApi