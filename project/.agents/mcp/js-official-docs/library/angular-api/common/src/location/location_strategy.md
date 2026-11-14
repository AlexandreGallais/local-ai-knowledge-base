# common/src/location/location_strategy

## APP_BASE_HREF

```ts
export const APP_BASE_HREF = new InjectionToken<string>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'appBaseHref' : '', )
```

A predefined DI token for the base href
to be used with the `PathLocationStrategy`.
The base href is the URL prefix that should be preserved when generating
and recognizing URLs.

@usageNotes

The following example shows how to use this token to configure the root app injector
with a base href value, so that the DI framework can supply the dependency anywhere in the app.

```ts
import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
})
class AppModule {}
```

@publicApi

## PathLocationStrategy

```ts
export class PathLocationStrategy extends LocationStrategy implements OnDestroy
```

@description
A {@link LocationStrategy} used to configure the {@link Location} service to
represent its state in the
[path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
browser's URL.

If you're using `PathLocationStrategy`, you may provide a {@link APP_BASE_HREF}
or add a `<base href>` element to the document to override the default.

For instance, if you provide an `APP_BASE_HREF` of `'/my/app/'` and call
`location.go('/foo')`, the browser's URL will become
`example.com/my/app/foo`. To ensure all relative URIs resolve correctly,
the `<base href>` and/or `APP_BASE_HREF` should end with a `/`.

Similarly, if you add `<base href='/my/app/'/>` to the document and call
`location.go('/foo')`, the browser's URL will become
`example.com/my/app/foo`.

Note that when using `PathLocationStrategy`, neither the query nor
the fragment in the `<base href>` will be preserved, as outlined
by the [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2).

To ensure that trailing slashes are always present or never present in the URL, use
{@link TrailingSlashPathLocationStrategy} or {@link NoTrailingSlashPathLocationStrategy}.

@usageNotes

### Example

{@example common/location/ts/path_location_component.ts region='LocationComponent'}

@publicApi

## NoTrailingSlashPathLocationStrategy

```ts
export class NoTrailingSlashPathLocationStrategy extends PathLocationStrategy
```

A `LocationStrategy` that ensures URLs never have a trailing slash.
This strategy only affects the URL written to the browser.
`Location.path()` and `Location.normalize()` will continue to strip trailing slashes when reading the URL.

@publicApi

## TrailingSlashPathLocationStrategy

```ts
export class TrailingSlashPathLocationStrategy extends PathLocationStrategy
```

A `LocationStrategy` that ensures URLs always have a trailing slash.
This strategy only affects the URL written to the browser.
`Location.path()` and `Location.normalize()` will continue to strip trailing slashes when reading the URL.

@publicApi