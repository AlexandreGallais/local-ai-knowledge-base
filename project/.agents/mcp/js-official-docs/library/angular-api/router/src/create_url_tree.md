# router/src/create_url_tree

## createUrlTreeFromSnapshot

```ts
export function createUrlTreeFromSnapshot( relativeTo: ActivatedRouteSnapshot, commands: readonly any[], queryParams: Params | null = null, fragment: string | null = null, urlSerializer = new DefaultUrlSerializer(), ): UrlTree
```

Creates a `UrlTree` relative to an `ActivatedRouteSnapshot`.

@publicApi


@param relativeTo The `ActivatedRouteSnapshot` to apply the commands to
@param commands An array of URL fragments with which to construct the new URL tree.
If the path is static, can be the literal URL string. For a dynamic path, pass an array of path
segments, followed by the parameters for each segment.
The fragments are applied to the one provided in the `relativeTo` parameter.
@param queryParams The query parameters for the `UrlTree`. `null` if the `UrlTree` does not have
    any query parameters.
@param fragment The fragment for the `UrlTree`. `null` if the `UrlTree` does not have a fragment.
@param urlSerializer The `UrlSerializer` to use for handling query parameter normalization.
You should provide your application's custom `UrlSerializer` if one is configured to parse and
serialize query parameter values to and from objects other than strings/string arrays.

@usageNotes

```ts
// create /team/33/user/11
createUrlTreeFromSnapshot(snapshot, ['/team', 33, 'user', 11]);

// create /team/33;expand=true/user/11
createUrlTreeFromSnapshot(snapshot, ['/team', 33, {expand: true}, 'user', 11]);

// you can collapse static segments like this (this works only with the first passed-in value):
createUrlTreeFromSnapshot(snapshot, ['/team/33/user', userId]);

// If the first segment can contain slashes, and you do not want the router to split it,
// you can do the following:
createUrlTreeFromSnapshot(snapshot, [{segmentPath: '/one/two'}]);

// create /team/33/(user/11//right:chat)
createUrlTreeFromSnapshot(snapshot, ['/team', 33, {outlets: {primary: 'user/11', right:
'chat'}}], null, null);

// remove the right secondary node
createUrlTreeFromSnapshot(snapshot, ['/team', 33, {outlets: {primary: 'user/11', right: null}}]);

// For the examples below, assume the current URL is for the `/team/33/user/11` and the
`ActivatedRouteSnapshot` points to `user/11`:

// navigate to /team/33/user/11/details
createUrlTreeFromSnapshot(snapshot, ['details']);

// navigate to /team/33/user/22
createUrlTreeFromSnapshot(snapshot, ['../22']);

// navigate to /team/44/user/22
createUrlTreeFromSnapshot(snapshot, ['../../team/44/user/22']);
```