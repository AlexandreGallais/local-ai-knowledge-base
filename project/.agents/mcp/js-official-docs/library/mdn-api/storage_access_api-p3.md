---
title: "Storage Access API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage_access_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage Access API (part 3 of 3)

### Request/response flow

#### JavaScript sequences

Consider the example of a library loaded in an `` that needs to be shared across a number of sites and relies on credentials <example-value> in unpartitioned cookies.

First let's look at the case where permission has not been granted:

1. The browser requests the resource without including third-party cookies.
2. The server responds with a "fallback" version of content that does not rely on credentials, and that when loaded doesn't have access to its cookies.
   - Once loaded, the resource calls `requestStorageAccess()` with transient activation to request and activate the `storage-access` permission.
   - If permission is granted, the resource will then reload itself.

3. The browser requests the resource again, this time including third-party cookies.
4. The server response includes a "credentialed" version of the resource.

The browser loads the resource, which has access to its own cookies because it has an activated `storage-access` permission.

Now consider the case where permission has been granted but not activated.
This would happen if you were to open the same URL in a new browser tab, or attempt to embed the same resource from another page in the same site.

The workflow is almost exactly the same because the resource still needs to be loaded the first time without cookies, and it then needs to call `requestStorageAccess()` to activate the permission for the context.
In this case, however, it doesn't need transient activation and can execute on load.

#### Storage access header sequences

The storage access headers enable an improved workflow that allows the server to request that the browser activate a permission that has been granted and retry the request with cookies included.
This avoids the requirement to load the resource to call `requestStorageAccess()` when the user has already granted permission.

> **Note:**
> These headers do not provide a mechanism to grant the storage access permission in the first place.
> Permission must always be requested by the embedded resource calling `requestStorageAccess()` with transient activation.

The `Sec-Fetch-Storage-Access` header is added to requests to indicate the storage access state of the current fetch context, such as whether permission has been activated, granted, or not granted.
Depending on the storage access state of the request, the server can respond with an `Activate-Storage-Access` header to request that the browser activate the permission for the context and retry the request with cookies.

First let's look at the case of attempting to load an embedded resource for a new context that already has permission granted:

1. The browser sends a request with `Sec-Fetch-Storage-Access: inactive` to indicate that the permission is granted but inactive for the context.
   - The request will also include the `Origin` header to help the server decide if it wants to activate the permission.
2. The server can then respond with `Activate-Storage-Access: retry` to indicate that the browser should activate the permission, and retry the request with cookies.
   - The response should also include the `Vary: Sec-Fetch-Storage-Access` header, as it depends on the value of `Sec-Fetch-Storage-Access`.
   - Note that the response doesn't include content.
3. If the browser retries the request, it adds `Sec-Fetch-Storage-Access: active` to the request along with the cookies.
4. The server then responds with `Activate-Storage-Access: load`, which tells the browser to load the new version of the library with access to third-party cookies.

The last state to consider is when loading an embedded resource for which permission has not been granted:

> **Note:**
> Because we can't use the headers to grant permission, we need to load the resource without cookies so that it can request the permission.
> This is the same sequence as if the headers were not applied.

1. The browser sends a request with `Sec-Fetch-Storage-Access: none` to indicate that the permission has not been granted.
2. The server then responds with the resource, which when loaded requests permission for secure access with transient activation.
   The `Activate-Storage-Access` header isn't included in the response, but the server should add `Vary: Sec-Fetch-Storage-Access`.

   After the user has granted (and thereby activated) the permission, the embed reloads itself.

3. The browser adds `Sec-Fetch-Storage-Access: active` to the request to indicate the context has an activated `storage-access` permission, and includes the third-party cookies.
4. The server responds with `Activate-Storage-Access: load`, which tells the browser to load the new version of the library with access to third-party cookies.

## Security considerations

Several different security measures could cause a `Document.requestStorageAccess()` call to fail.
Check the below list if you are having trouble getting a request to work:

1. The permission request must be associated with a user gesture (transient activation) such as a tap or click.
   This prevents embedded content on the page from spamming the browser or user with excessive access requests.
   Note that this isn't required if:
   - Permission to use the API has already been granted to another context with the same `<top-level site, embedded site>` key.
   - The caller is a top-level document or same-site to the top-level document.
     In such cases, `requestStorageAccess()` probably doesn't need to be called at all.
2. The document and top-level document must not have a `null` origin.
3. Origins that have never been interacted with as a first party do not have a notion of first-party storage. From the user's perspective, they only have a third-party relationship with that origin. Access requests are automatically denied if the browser detects that the user hasn't interacted with the embedded content in a first-party context recently (in Firefox, "recently" means within 30 days).
4. The document's window must be a secure context.
5. Sandboxed ``s cannot be granted storage access by default for security reasons.
   To handle this, the API provides the `allow-storage-access-by-user-activation` sandbox token.
   The `` needs to include this to enable storage access requests, along with `allow-scripts` and `allow-same-origin` to allow it to execute a script to call the API and execute it in an origin that can have cookies/state:

   ```html
   <iframe
     sandbox="allow-storage-access-by-user-activation
                   allow-scripts
                   allow-same-origin">
     …
   </iframe>
   ```

6. Usage of this feature may be blocked by a `storage-access` Permissions Policy set on your server.

> **Note:**
> The document may also be required to pass <example-value> browser-specific checks. Examples: allowlists, blocklists, on-device classification, user settings, anti-clickjacking heuristics, or prompting the user for explicit permission.

## Browser-specific variations

Although the API surface is the same, websites using the Storage Access API should expect differences in the level and extent of third-party cookie access they receive between different browsers, due to differences in their storage access policies.

### Chrome

- Cookies must have `SameSite=None` explicitly set on them, because the default value for Chrome is `SameSite=Lax` (`SameSite=None` is the default in Firefox and Safari).
- Cookies must have the `Secure` attribute set on them.
- The storage access grants are phased out after 30 days of browser usage passed without user interaction. Interaction with the embedded content extends this limit by another 30 days. This doesn't occur when `Document.requestStorageAccessFor()` is called because the user is already on the page.

### Firefox

- If the embedded origin `tracker.example` has already obtained third-party cookie access on the top-level origin `foo.example`, and the user visits a page from `foo.example` embedding a page from `tracker.example` again in less than 30 days, the embedded origin will have third-party cookie access immediately when loading.
- The storage access grants are phased out after 30 calendar days have passed.

Documentation for Firefox's new storage access policy for blocking tracking cookies includes a detailed description of the scope of storage access grants.

### Safari

- The storage access grants are phased out after 30 days of browser usage passed without user interaction. Successful use of the Storage Access API resets this counter.
- After an embed has activated the storage-access permission and its content has been re-requested, third-party cookies are sent with requests to the embedded resource's _site_ rather than origin. Safari still uses an older design that does not follow the same-origin policy.

## Examples

- See Using the Storage Access API for an implementation guide with code examples.

## API methods

- `Document.hasStorageAccess()`
    Returns a `Promise` that resolves with a boolean value indicating whether the document has access to third-party cookies.
- `Document.hasUnpartitionedCookieAccess()`
    New name for `Document.hasStorageAccess()`.
- `Document.requestStorageAccess()`
    Allows content loaded in a third-party context (i.e., embedded in an ``) to request access to third-party cookies and unpartitioned state; returns a `Promise` that resolves if the access was granted, and rejects if access was denied.
- `Document.requestStorageAccessFor()` (deprecated)
    A non-standard deprecated extension to the Storage Access API that allows top-level sites to request third-party cookie access on behalf of embedded content originating from another site in the same related website set. Returns a `Promise` that resolves if the access was granted, and rejects if access was denied.

> **Note:**
> User interaction propagates to the promise returned by these methods, allowing the callers to take actions requiring user interaction without requiring a second click. For example, a caller could open a pop-up window from the resolved promise without triggering Firefox's pop-up blocker.

### Additions to other APIs

- `Permissions.query()`, the `"storage-access"` feature name
    In supporting browsers, this can query whether third-party cookie access has been granted in general, that is, to another same-site embed. If so, you can call `requestStorageAccess()` without user interaction, and the promise will resolve automatically.
- `Permissions.query()`, the `"top-level-storage-access"` feature name (experimental)
    A separate feature name used to query whether permission to access third-party cookies has already been granted via `requestStorageAccessFor()`. If so, you don't need to call `requestStorageAccessFor()` again.

### Additions to HTTP

#### Permissions-Policy

- `Permissions-Policy: storage-access`
    The `storage-access` `Permissions-Policy` directive controls whether a document loaded in a third-party context (i.e., embedded in an ``) is allowed to use the storage access API to request access to unpartitioned cookies.

#### Storage access headers

- `Sec-Fetch-Storage-Access`
    Indicates the "storage access status" for the current request context, which will be one of `none`, `inactive`, or `active`.
- `Activate-Storage-Access`
    Used in response to `Sec-Fetch-Storage-Access` to indicate that the browser can activate an existing permission for secure access and retry the request with cookies, or load a resource with cookie access if it already has an activated permission.

## See also

- Using the Storage Access API
- Introducing Storage Access API (WebKit blog)
