---
title: "Storage Access API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage_access_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage Access API (part 2 of 3)

## Concepts and usage

Browsers implement several storage access features and policies restricting access to third-party cookies and unpartitioned state. These range from giving embedded resources under each top-level origin a unique cookie storage space (partitioned cookies) to outright blocking of cookie access when resources are loaded in a third-party context.

The semantics around third-party cookie and unpartitioned state blocking features and policies differ from browser to browser, but the core functionality is similar. Cross-site resources embedded in a third-party context are not given access to the same state that they would have access to when loaded in a first-party context. This is done with good intent — browser vendors want to take steps to better protect their user's privacy and security. Examples include leaving them less open to having their activity tracked across different sites, and less vulnerable to exploits such as cross-site request forgery (CSRF).

However, there are legitimate uses for embedded cross-site content accessing third-party cookies and unpartitioned state, which the above features and policies are known to break. Let's say you've got a series of different sites that provide access to different products — `heads-example.com`, `shoulders-example.com`, `knees-example.com`, and `toes-example.com`.

Alternatively, you might separate your content or services into different country domains for localization purposes — `example.com`, `example.ua`, `example.br`, etc. — or in some other way.

You might have accompanying utility sites with components embedded in all the other sites, for example, to provide SSO (`sso-example.com`) or general personalization services (`services-example.com`). These utility sites will want to share their state with the sites they are embedded in via cookies. They cannot share first-party cookies because they are on different domains, and third-party cookies will no longer work in browsers that block them.

In such situations, site owners often encourage users to add their site as an exception or to disable third-party cookie-blocking policies entirely. Users who wish to continue interacting with their content must significantly relax their blocking policy for resources loaded from all embedded origins and possibly across all websites.

The Storage Access API is intended to solve this problem; embedded cross-site content can request unrestricted access to third-party cookies and unpartitioned state on a frame-by-frame basis via the `Document.requestStorageAccess()` method.
It can also check whether it already has access via the `Document.hasStorageAccess()` method.

> **Note:**
> The storage access headers are an HTTP extension to the API that enables a more efficient storage API workflow, and can also be used to activate a previously granted storage access permission for passive resources, such as images.

### Unpartitioned versus partitioned cookies

The Storage Access API is only needed to provide access to _unpartitioned_ third-party cookies!
Unpartitioned cookies are those where all cookies set on the same site are stored in the same cookie jar — the traditional way since the early web.
Because there is a risk of exposing data intended for one site to other sites, browsers commonly block sending unpartitioned third-party cookies in requests, and don't allow access to them in embedded contexts.

This is in contrast to _partitioned_ cookies, where embedded resources under each top-level site are given a unique cookie storage space, isolated from those of other sites.
Since there is no privacy risk, because it is not possible to track users across sites via partitioned cookies, browsers send partitioned cookies in requests and make them available to embedded resources.
Note however that, because the cookies aren't shared between sites, they are also not automatically synchronized across sites.
Browsers have various mechanisms to partition third-party cookie access, for example Firefox Total Cookie Protection and Cookies Having Independent Partitioned State (CHIPS).

When we talk about third-party cookies in the context of the Storage Access API, we implicitly mean _unpartitioned_ third-party cookies.

### How it works

Third-party content embedded in an `` that needs to access cookie or other unpartitioned state can request access using the Storage Access API as follows:

1. `Document.hasStorageAccess()` can be called to check if the embedded content already has access to unpartitioned cookies.
2. If not, `Document.requestStorageAccess()` can be called with transient activation to request the `storage-access` permission.

   Depending on the browser, the user will be asked whether to grant permission to the requesting embed in slightly different ways.
   - Safari shows prompts for all embedded content that has not previously received storage access.
   - Firefox only prompts users after an origin has requested storage access on more than a threshold number of sites.
   - Chrome shows prompts for all embedded content that has not previously received storage access.
     It will however automatically grant access and skip prompts if the embedded content and embedding site are part of the same related website set.

3. Permission is granted or denied based on whether the content meets all the security requirements — see Security considerations for general requirements, and Browser-specific variations for some browser-specific security requirements.
   The `Promise`-based nature of `requestStorageAccess()` allows you to run code to handle success and failure cases.

   Once permission is granted, a permission key is stored in the browser with the structure `<top-level site, embedded site>`.
   For example, if the embedding site is `embedder.com`, and the embed is `locator.example.com`, the key would be `<embedder.com, example.com>`.

   This means that permission is granted for unpartitioned cookie access to any page on the `example.com` site or any of its subdomains embedded in any page on the `embedder.com` site.
   For example, `docs.example.com`, `profile.example.com`, can now call `requestStorageAccess()` and the promise would fulfill automatically.

   > **Note:**
   > Older spec versions used the more specific permission key <example-value> `<top-level site, embedded origin>`, which meant that same-site, cross-origin embeds didn't match the permission key and had to go through the whole process separately.

4. Permission must be explicitly activated for each _context_.

   When an embed is granted permission, that permission is also activated for the current context.
   However, other contexts, such as new browser tabs or content in other `` elements in the page, have their third-party cookie access blocked by default.
   That means that even if permission is granted, the page will need to load and call `requestStorageAccess()` to activate the permission.
   If permission has already been granted then a call to `requestStorageAccess()` will not require transient activation and the promise will fulfill automatically.

   The only exception to the "blocked by default" behavior is if an embed performs a same-origin navigation to reload itself after being granted permission or activating a permission.
   In such cases, the storage access is carried over from the previous navigation.
   This allows the embedded resource to reload itself and gain access to its cookies.

   > **Note:**
   > In older spec versions, the access was _per-page_ (Safari is the only browser still using this model). When one embed received third-party cookie access via `requestStorageAccess()`, all other same-site embeds would automatically receive access.
   > This was not desirable behavior from a security standpoint — for example, if `shop.example.com` embedded `locator.users.com` to allow users to use their location info while shopping, and `locator.users.com` called `requestStorageAccess()`, `shop.example.com` and any other sites it embeds would be able to access its cookies, but also access cookies from `private.users.com`, which is not intended to be embedded. Read more about the motivations behind this change.

5. After an embed has activated the storage-access permission it should reload itself.
   The browser will re-request the resource with third-party cookies included, and make them available to the embedded resource once it has loaded. The embed's cross-origin requests follow the same-origin policy, therefore third-party cookies are sent only with requests to the embedded resource's exact origin. Other origins within the same site wishing to access third-party cookies will need to activate the storage-access permission separately.

### Storage access headers

The API requires that a resource must call `requestStorageAccess()` for each new context to opt-in to activating the storage-access permission, which must already have been granted.
This in turn means that the embedded resource must first be requested without cookies and loaded so it can call the method.

The storage access headers enable a workflow where the server can request that the permission is activated for the context, avoiding an unnecessary additional load of the embedded resource if permission has already been granted.
The resource must still be loaded in order to request permission the first time.

There are two headers:

- The browser adds the `Sec-Fetch-Storage-Access` header to requests to indicate the storage access state of the current fetch context, such as whether permission has been activated, granted, or not granted.
- Depending on the storage access state of the request, the server can respond with an `Activate-Storage-Access` header to request that the browser activate the permission for the context and retry the request with cookies (avoiding it having to load the resource so it can call `requestStorageAccess()` to achieve the same thing), or activate the permission and load the returned resource.

The storage access headers can also be used to activate permission for passive resources, such as images, provided the context has already been granted permission.
This might be used, for example, to serve different images for different users, demographics, or locales.

The workflows are shown in the Storage access header sequences section.
