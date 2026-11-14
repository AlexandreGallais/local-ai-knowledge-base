# platform-browser/src/dom/css_var_namespacer

## CssVarNamespacer

```ts
export class CssVarNamespacer
```

A service that can be used to manually namespace CSS variable names at runtime.
This is useful when reading or setting CSS variables dynamically in JavaScript that
were transformed by the compiler during the build.

@see [Using namespaced properties in TypeScript](guide/components/styling#using-namespaced-properties-in-typescript)
@publicApi 22.1

## CssVarNamespacer.namespace

```ts
namespace(name: string): string
```

Prepends the namespace prefix to a CSS variable name.

@param name The CSS variable name to namespace, including the leading `--`.
@returns The namespaced CSS variable name, including the leading `--`. Returns the input
    unchanged if no namespace is configured.