# core/src/util/default_export

## DefaultExport

```ts
export interface DefaultExport<T>
```

An ES Module object with a default export of the given type.

@see [injectAsync](/api/core/injectAsync)
@see [Route#loadComponent](/api/router/Route#loadComponent)
@see [LoadChildrenCallback](/api/router/LoadChildrenCallback)

@publicApi

## DefaultExport.default

```ts
default: T
```

Default exports are bound under the name `"default"`, per the ES Module spec:
https://tc39.es/ecma262/#table-export-forms-mapping-to-exportentry-records