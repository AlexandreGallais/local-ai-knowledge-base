# router/src/url_tree

## IsActiveMatchOptions

```ts
export interface IsActiveMatchOptions
```

A set of options which specify how to determine if a `UrlTree` is active, given the `UrlTree`
for the current router state.

@publicApi
@see {@link isActive}

## IsActiveMatchOptions.matrixParams

```ts
matrixParams: 'exact' | 'subset' | 'ignored'
```

Defines the strategy for comparing the matrix parameters of two `UrlTree`s.

The matrix parameter matching is dependent on the strategy for matching the
segments. That is, if the `paths` option is set to `'subset'`, only
the matrix parameters of the matching segments will be compared.

- `'exact'`: Requires that matching segments also have exact matrix parameter
matches.
- `'subset'`: The matching segments in the router's active `UrlTree` may contain
extra matrix parameters, but those that exist in the `UrlTree` in question must match.
- `'ignored'`: When comparing `UrlTree`s, matrix params will be ignored.

## IsActiveMatchOptions.queryParams

```ts
queryParams: 'exact' | 'subset' | 'ignored'
```

Defines the strategy for comparing the query parameters of two `UrlTree`s.

- `'exact'`: the query parameters must match exactly.
- `'subset'`: the active `UrlTree` may contain extra parameters,
but must match the key and value of any that exist in the `UrlTree` in question.
- `'ignored'`: When comparing `UrlTree`s, query params will be ignored.

## IsActiveMatchOptions.paths

```ts
paths: 'exact' | 'subset'
```

Defines the strategy for comparing the `UrlSegment`s of the `UrlTree`s.

- `'exact'`: all segments in each `UrlTree` must match.
- `'subset'`: a `UrlTree` will be determined to be active if it
is a subtree of the active route. That is, the active route may contain extra
segments, but must at least have all the segments of the `UrlTree` in question.

## IsActiveMatchOptions.fragment

```ts
fragment: 'exact' | 'ignored'
```

- `'exact'`: indicates that the `UrlTree` fragments must be equal.
- `'ignored'`: the fragments will not be compared when determining if a
`UrlTree` is active.

## isActive

```ts
export function isActive( url: string | UrlTree, router: Router, matchOptions?: Partial<IsActiveMatchOptions>, ): Signal<boolean>
```

Returns a computed signal of whether the given url is activated in the Router.

As the router state changes, the signal will update to reflect whether the url is active.

When using the `matchOptions` argument, any missing properties fall back to the following defaults:
- `paths`: 'subset'
- `queryParams`: 'subset'
- `matrixParams`: 'ignored'
- `fragment`: 'ignored'

@see [Check if a URL is active](guide/routing/read-route-state#check-if-a-url-is-active)
@publicApi 21.1

## containsTree

```ts
export function containsTree( container: UrlTree, containee: UrlTree, options?: Partial<IsActiveMatchOptions>, ): boolean
```

Determines if a `UrlTree` is contained within another `UrlTree` based on the provided matching options.

@param container The outer or reference `UrlTree`.
@param containee The target `UrlTree` to test against the container.
@param options Optional, matching options:
- `paths`: Defines how to compare URL segments ('exact' or 'subset'). Defaults to 'subset'.
- `matrixParams`: Defines how to compare matrix parameters ('exact', 'subset', or 'ignored'). Defaults to 'ignored'.
- `queryParams`: Defines how to compare query parameters ('exact', 'subset', or 'ignored'). Defaults to 'subset'.
- `fragment`: Defines how to compare URL fragments ('exact' or 'ignored'). Defaults to 'ignored'.

@publicApi

## UrlTree

```ts
export class UrlTree
```

@description

Represents the parsed URL.

Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a
serialized tree.
UrlTree is a data structure that provides a lot of affordances in dealing with URLs

@usageNotes
### Example

```ts
@Component({templateUrl:'template.html'})
class MyComponent {
  constructor(router: Router) {
    const tree: UrlTree =
      router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');
    const f = tree.fragment; // return 'fragment'
    const q = tree.queryParams; // returns {debug: 'true'}
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
    g.children[PRIMARY_OUTLET].segments; // returns 2 segments 'user' and 'victor'
    g.children['support'].segments; // return 1 segment 'help'
  }
}
```

@publicApi

## UrlTree.root

```ts
public root: UrlSegmentGroup = new UrlSegmentGroup([], {}), /** The query params of the URL */ public queryParams: Params = {}, /** The fragment of the URL */ public fragment: string | null = null, )
```

The root segment group of the URL tree

## UrlTree.queryParams

```ts
public queryParams: Params = {}, /** The fragment of the URL */ public fragment: string | null = null, )
```

The query params of the URL

## UrlTree.fragment

```ts
public fragment: string | null = null, )
```

The fragment of the URL

## UrlSegmentGroup

```ts
export class UrlSegmentGroup
```

@description

Represents the parsed URL segment group.

See `UrlTree` for more information.

@publicApi

## UrlSegmentGroup.parent

```ts
parent: UrlSegmentGroup | null = null
```

The parent node in the url tree

## UrlSegmentGroup.segments

```ts
public segments: UrlSegment[], /** The list of children of this group */ public children: {[key: string]: UrlSegmentGroup}, )
```

The URL segments of this group. See `UrlSegment` for more information

## UrlSegmentGroup.children

```ts
public children: {[key: string]: UrlSegmentGroup}, )
```

The list of children of this group

## UrlSegmentGroup.hasChildren

```ts
hasChildren(): boolean
```

Whether the segment has child segments

## UrlSegmentGroup.numberOfChildren

```ts
get numberOfChildren(): number
```

Number of child segments

## UrlSegment

```ts
export class UrlSegment
```

@description

Represents a single URL segment.

A UrlSegment is a part of a URL between the two slashes. It contains a path and the matrix
parameters associated with the segment.

@usageNotes
### Example

```ts
@Component({templateUrl:'template.html'})
class MyComponent {
  constructor(router: Router) {
    const tree: UrlTree = router.parseUrl('/team;id=33');
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    s[0].path; // returns 'team'
    s[0].parameters; // returns {id: 33}
  }
}
```

@publicApi

## UrlSegment.path

```ts
public path: string,
```

The path part of a URL segment

## UrlSegment.parameters

```ts
public parameters: {[name: string]: string}, ) {}
```

The matrix parameters associated with a segment

## UrlSegment.parse

```ts
abstract parse(url: string): UrlTree
```

Parse a url into a `UrlTree`

## UrlSegment.serialize

```ts
abstract serialize(tree: UrlTree): string
```

Converts a `UrlTree` into a url

## DefaultUrlSerializer

```ts
export class DefaultUrlSerializer implements UrlSerializer
```

@description

A default implementation of the `UrlSerializer`.

Example URLs:

```
/inbox/33(popup:compose)
/inbox/33;open=true/messages/44
```

DefaultUrlSerializer uses parentheses to serialize secondary segments (e.g., popup:compose), the
colon syntax to specify the outlet, and the ';parameter=value' syntax (e.g., open=true) to
specify route specific parameters.

@publicApi

## DefaultUrlSerializer.parse

```ts
parse(url: string): UrlTree
```

Parses a url into a `UrlTree`

## DefaultUrlSerializer.serialize

```ts
serialize(tree: UrlTree): string
```

Converts a `UrlTree` into a url