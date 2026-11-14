# platform-browser/src/dom/dom_renderer

## REMOVE_STYLES_ON_COMPONENT_DESTROY

```ts
export const REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken<boolean>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'RemoveStylesOnCompDestroy' : '',
```

A DI token that indicates whether styles
of destroyed components should be removed from DOM.

By default, the value is set to `true`.
@publicApi

## provideCssVarNamespacing

```ts
export function provideCssVarNamespacing(namespace?: string): EnvironmentProviders
```

Configures the application to use the given namespace for all CSS variables.

@param namespace The prefix string to use as a namespace. If not provided, it defaults
    to the `APP_ID`. An underscore is appended unconditionally.
@see [Namespacing CSS custom properties](guide/components/styling#namespacing-css-custom-properties)
@publicApi