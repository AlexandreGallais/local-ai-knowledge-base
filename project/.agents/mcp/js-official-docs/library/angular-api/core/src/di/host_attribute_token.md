# core/src/di/host_attribute_token

## HostAttributeToken

```ts
export class HostAttributeToken
```

Creates a token that can be used to inject static attributes of the host node.

@usageNotes
### Injecting an attribute that is known to exist
```ts
@Directive()
class MyDir {
  attr: string = inject(new HostAttributeToken('some-attr'));
}
```

### Optionally injecting an attribute
```ts
@Directive()
class MyDir {
  attr: string | null = inject(new HostAttributeToken('some-attr'), {optional: true});
}
```
@see [Injecting host element attributes](guide/components/host-elements#injecting-host-element-attributes)
@publicApi