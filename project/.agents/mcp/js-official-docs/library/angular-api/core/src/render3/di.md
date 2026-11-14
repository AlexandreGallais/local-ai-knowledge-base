# core/src/render3/di

## injectAttributeImpl

```ts
export function injectAttributeImpl(tNode: TNode, attrNameToInject: string): string | null
```

Inject static attribute value into directive constructor.

This method is used with `factory` functions which are generated as part of
`defineDirective` or `defineComponent`. The method retrieves the static value
of an attribute. (Dynamic attributes are not supported since they are not resolved
 at the time of injection and can change over time.)

# Example
Given:
```ts
@Component(...)
class MyComponent {
  constructor(@Attribute('title') title: string) { ... }
}
```
When instantiated with
```html
<my-component title="Hello"></my-component>
```

Then factory method generated is:
```ts
MyComponent.ɵcmp = defineComponent({
  factory: () => new MyComponent(injectAttribute('title'))
  ...
})
```

@publicApi