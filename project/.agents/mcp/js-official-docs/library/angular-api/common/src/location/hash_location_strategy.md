# common/src/location/hash_location_strategy

## HashLocationStrategy

```ts
export class HashLocationStrategy extends LocationStrategy implements OnDestroy
```

@description
A {@link LocationStrategy} used to configure the {@link Location} service to
represent its state in the
[hash fragment](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)
of the browser's URL.

For instance, if you call `location.go('/foo')`, the browser's URL will become
`example.com#/foo`.

@usageNotes

### Example

{@example common/location/ts/hash_location_component.ts region='LocationComponent'}

@publicApi