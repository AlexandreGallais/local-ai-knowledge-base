# core/testing/src/defer

## DeferBlockFixture

```ts
export class DeferBlockFixture
```

Represents an individual defer block for testing purposes.

@publicApi

## DeferBlockFixture.render

```ts
async render(state: DeferBlockState): Promise<void>
```

Renders the specified state of the defer fixture.
@param state the defer state to render

## DeferBlockFixture.getDeferBlocks

```ts
getDeferBlocks(): Promise<DeferBlockFixture[]>
```

Retrieves all nested child defer block fixtures
in a given defer block.