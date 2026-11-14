# core/src/render3/def_getters

## isStandalone

```ts
export function isStandalone(type: Type<unknown>): boolean
```

Checks whether a given Component, Directive or Pipe is marked as standalone.
This will return false if passed anything other than a Component, Directive, or Pipe class

@param type A reference to a Component, Directive or Pipe.
@publicApi