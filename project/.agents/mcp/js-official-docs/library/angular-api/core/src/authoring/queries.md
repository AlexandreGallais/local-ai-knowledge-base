# core/src/authoring/queries

## ViewChildFunction

```ts
export interface ViewChildFunction
```

Type of the `viewChild` function. The viewChild function creates a singular view query.

It is a special function that also provides access to required query results via the `.required`
property.

@publicApi
@docsPrivate Ignored because `viewChild` is the canonical API entry.

## ViewChildFunction.required

```ts
required:
```

Initializes a view child query that is expected to always match an element.

@publicAPI

## viewChild

```ts
export const viewChild: ViewChildFunction = (()
```

Initializes a view child query.

Consider using `viewChild.required` for queries that should always match.

@usageNotes
Create a child query in your component by declaring a
class field and initializing it with the `viewChild()` function.

```angular-ts
@Component({template: '<div #el></div><my-component #cmp />'})
export class Card {
  divEl = viewChild<ElementRef>('el');                   // Signal<ElementRef|undefined>
  divElRequired = viewChild.required<ElementRef>('el');  // Signal<ElementRef>
  cmp = viewChild(MyComponent);                          // Signal<MyComponent|undefined>
  cmpRequired = viewChild.required(MyComponent);         // Signal<MyComponent>
}
```

@publicApi 19.0
@initializerApiFunction
@see [Referencing component children with queries](guide/components/queries)
@see [Required queries](guide/components/queries#required-queries)

## viewChildren

```ts
export function viewChildren<LocatorT, ReadT>( locator: ProviderToken<LocatorT> | string, opts?:
```

Initializes a view children query.

Query results are represented as a signal of a read-only collection containing all matched
elements.

@usageNotes
Create a children query in your component by declaring a
class field and initializing it with the `viewChildren()` function.

```ts
@Component({...})
export class TestComponent {
  divEls = viewChildren<ElementRef>('el');   // Signal<ReadonlyArray<ElementRef>>
}
```

@initializerApiFunction
@publicApi 19.0
@see [Referencing component children with queries](guide/components/queries)
@see [Required queries](guide/components/queries#required-queries)

## ContentChildFunction

```ts
export interface ContentChildFunction
```

Type of the `contentChild` function.

The contentChild function creates a singular content query. It is a special function that also
provides access to required query results via the `.required` property.

@publicApi 19.0
@docsPrivate Ignored because `contentChild` is the canonical API entry.

## ContentChildFunction.required

```ts
required:
```

Initializes a content child query that is always expected to match.

## contentChild

```ts
export const contentChild: ContentChildFunction = (()
```

Initializes a content child query. Consider using `contentChild.required` for queries that should
always match.

@usageNotes
Create a child query in your component by declaring a
class field and initializing it with the `contentChild()` function.

```ts
@Component({...})
export class Card {
  headerEl = contentChild<ElementRef>('h');                    // Signal<ElementRef|undefined>
  headerElElRequired = contentChild.required<ElementRef>('h'); // Signal<ElementRef>
  header = contentChild(MyHeader);                             // Signal<MyHeader|undefined>
  headerRequired = contentChild.required(MyHeader);            // Signal<MyHeader>
}
```

NOTE: By default `descendants` is `true` which means the query will traverse all descendants in the same template.

@initializerApiFunction
@publicApi 19.0

@See [Content queries](guide/components/queries#content-queries)

## contentChildren

```ts
export function contentChildren<LocatorT, ReadT>( locator: ProviderToken<LocatorT> | string, opts?:
```

Initializes a content children query.

Query results are represented as a signal of a read-only collection containing all matched
elements.

@usageNotes
Create a children query in your component by declaring a
class field and initializing it with the `contentChildren()` function.

```ts
@Component({...})
export class TestComponent {
  headerEl = contentChildren<ElementRef>('h');   // Signal<ReadonlyArray<ElementRef>>
}
```

Note: By default `descendants` is `false` which means the query will not traverse all descendants in the same template.

@initializerApiFunction
@publicApi 19.0
@see [Referencing component children with queries](guide/components/queries)
@see [Content queries](guide/components/queries#content-queries)