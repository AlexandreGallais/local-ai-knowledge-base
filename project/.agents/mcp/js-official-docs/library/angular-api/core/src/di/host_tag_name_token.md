# core/src/di/host_tag_name_token

## HOST_TAG_NAME

```ts
export const HOST_TAG_NAME: InjectionToken<string> = /* @__PURE__ */ (()
```

A token that can be used to inject the tag name of the host node.

@usageNotes
### Injecting a tag name that is known to exist
```ts
@Directive()
class MyDir {
  tagName: string = inject(HOST_TAG_NAME);
}
```

### Optionally injecting a tag name
```ts
@Directive()
class MyDir {
  tagName: string | null = inject(HOST_TAG_NAME, {optional: true});
}
```
@publicApi

@see [Inject the host element's tag name](guide/di/di-in-action#inject-the-host-elements-tag-name)