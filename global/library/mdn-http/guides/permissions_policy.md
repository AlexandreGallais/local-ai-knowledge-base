---
title: "Permissions Policy"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/permissions_policy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions Policy

**Permissions Policy** provides mechanisms for web developers to explicitly declare what functionality can and cannot be used on a website. You define a set of "policies" that restrict what APIs the site's code can access or modify the browser's default behavior for certain features. This allows you to enforce best practices, even as the codebase evolves — as well as more safely compose third-party content.

Permissions Policy is similar to Content Security Policy but controls features instead of security behavior.

Examples of what you can do with Permissions Policy:

- Change the default behavior of autoplay on mobile and third-party videos.
- Restrict a site from using sensitive devices like the camera, microphone, or speakers.
- Allow iframes to use the Fullscreen API.
- Stop items from being scripted if they are not visible in the viewport, to improve performance.

> **Note:**
> Permissions Policy used to be called Feature Policy. The name has changed, and so has the HTTP header syntax, so bear this in mind if you have used Feature Policy in the past, and check the browser support tables. The `` syntax has stayed the same.

## Concepts and usage

The web provides functionality and APIs that may have privacy or security risks if abused. In such cases, you may wish to strictly limit how functionality is used on a website. In each case, there should be an intuitive or non-breaking way for web developers to detect and handle cases where a feature is disabled.

Some approaches include:

- "Permission denied" is returned for JavaScript APIs that require user permission grants.
- JavaScript APIs that provide access to features return `false` values or throw an error.
- APIs are not even exposed, as though they don't exist.
- Options that control the feature behavior have different default values.

> **Note:**
> Newly-introduced features may have an explicit API to signal the state. Existing features that later integrate with Permissions Policy will typically use existing mechanisms.

Permissions Policy allows you to control which origins can use which features, both on the top-level page and in embedded ``s. The aim is to enforce best practices for good user experiences and provide granular control over _sensitive_ or _powerful_ features (meaning features that a user is required to give express permission for usage of, before related code can be executed).

Permissions Policy provides two ways to specify policies:

- The `Permissions-Policy` HTTP header, to control feature usage in received responses and any embedded content within the page (which includes ``s).
- The `` `allow` attribute, to control feature usage only in specific ``s.

These are separate but related — see Inheritance of policies for embedded content for details.

> **Note:**
> Scripts can programmatically query information about the permission policy via the `FeaturePolicy` object located at either `Document.featurePolicy` or `HTMLIFrameElement.featurePolicy`.

To control each feature, you write a policy that consists of:

- A **directive** that identifies the name of the feature to control. See the list of the different available directives.
- An **allowlist**, which is a list of origins that the feature should be controlled in. You can enable a feature for all or specific origins, or block its usage in all origins.

See below for multiple examples.

## Relationship with the Permissions API

Permissions Policy and the `Permissions API` are closely-related, but different. The features that have their permissions controlled by both these technologies overlap.

- Permissions Policy allows a server to set whether a feature can be used in a particular document (or embedded `<frame>`s within it). These are referred to as **policy-controlled** features — see the list of Permissions Policy directives.
- The Permissions API gates access to features based on user-granted permissions. These features are recorded in the Permissions Registry.

The identifying string used for each feature is kept consistent across both, for example, `geolocation` for the `Geolocation API`. Most of the API features in the Permissions Registry also have a corresponding Permissions Policy directive. One exception is the `Notifications API`.

Generally when a Permissions Policy blocks the use of a powerful feature, the user won't even be asked for permission to use it, and the Permissions API `query()` method will return a `state` value of `denied`.

See also Permissions > Relationship to the Permissions Policy specification.

## Allowlists

An allowlist is a list of origins that takes one or more of the following values contained in parentheses, separated by spaces:

- `*`: The feature will be allowed in this document, and all nested browsing contexts (``s) regardless of their origin.
- `()` (empty allowlist): The feature is disabled in top-level and nested browsing contexts. The equivalent for `` `allow` attribute is `'none'`.
- `self`: The feature will be allowed in this document, and in all nested browsing contexts (``s) in the same origin only. The feature is not allowed in cross-origin documents in nested browsing contexts. `self` can be considered shorthand for `https://your-site.example.com`. The equivalent for `` `allow` attribute is `'self'`.
- `'src'`: The feature will be allowed in this ``, as long as the document loaded into it comes from the same origin as the URL in its `<src>` attribute. This value is only used in the `` `allow` attribute, and is the _default_ value for a feature listed without an explicit allowlist value — for example, `allow="geolocation"` is equivalent to `allow="geolocation 'src'"`.
- `"<origin>"`: The feature is allowed for specific origins (for example, `"https://a.example.com"`). Origins should be separated by spaces. Note that origins in `` allow attributes are not quoted.

The values `*` and `()` may only be used on their own, while `self` and `src` may be used in combination with one or more origins.

Where supported, you can include wildcards in Permissions Policy origins. This means that instead of having to explicitly specify several different subdomains in an allowlist, you can specify them all in a single origin with a wildcard.

So instead of

```http
("https://example.com" "https://a.example.com" "https://b.example.com" "https://c.example.com")
```

You can specify

```http
("https://example.com" "https://*.example.com")
```

> **Note:**
> `"https://*.example.com"` does not match `"https://example.com"`.

Allowlist examples:

- `*`
- `()`
- `(self)`
- `(src)`
- `("https://a.example.com")`
- `("https://a.example.com" "https://b.example.com")`
- `(self "https://a.example.com" "https://b.example.com")`
- `(src "https://a.example.com" "https://b.example.com")`
- `("https://*.example.com")`

### Default allowlists

`Permissions-Policy` HTTP header directives have a default allowlist, which is either `*` or `self`. The specific default for each directive is given on its directive reference page.

For the top-level document, a default of `self` or `*` enables the feature, because the document's own origin always matches both.
The only exception is Chrome's non-standard `unload` directive, which defaults to `()`, so the feature is disabled unless a policy enables it.

The default allowlist also applies to an `` whose `allow` attribute doesn't name the feature, whether or not the parent's header does: `self` grants the feature to a same-origin ``, `*` grants it regardless of origin, and `()` doesn't grant it.
See Inheritance of policies for embedded content for how the header, the `allow` attribute, and the default allowlist combine to determine whether an `` gets a feature.

## Permissions-Policy header syntax

The general syntax looks like this:

```http
Permissions-Policy: <directive>=<allowlist>
```

So for example to block all access to geolocation, you would do this:

```http
Permissions-Policy: geolocation=()
```

Or to allow access to a subset of origins, you'd do this:

```http
Permissions-Policy: geolocation=(self "https://a.example.com" "https://b.example.com")
```

Several features can be controlled at the same time by sending the header with a comma-separated list of policies, or by sending a separate header for each policy.

For example, the following are equivalent:

```http
Permissions-Policy: picture-in-picture=(), geolocation=(self "https://example.com"), camera=*;

Permissions-Policy: picture-in-picture=()
Permissions-Policy: geolocation=(self "https://example.com")
Permissions-Policy: camera=*
```

## Embedded frame syntax

The `Permissions-Policy` header allowlist for a feature defines the superset of origins that are potentially allowed to access the feature.
An ``'s `allow` attribute grants a feature to the origins it names, provided they are present in that superset.
Because of this inheritance behavior, it is a good idea to specify the widest acceptable support for a feature in the HTTP header, and then specify the subset of support you need in each ``.

The general syntax looks like this:

```html
<iframe src="<origin>" allow="<directive> <allowlist>"></iframe>
```

So for example to block all access to geolocation, you would do this:

```html
<iframe src="https://example.com" allow="geolocation 'none'"></iframe>
```

To apply a policy to the current origin and others, you'd do this:

```html
<iframe
  src="https://example.com"
  allow="geolocation 'self' https://a.example.com https://b.example.com"></iframe>
```

This is important: By default, if an `` navigates to another origin, the policy is not applied to the origin that the `` navigates to. By listing the origin that the `` navigates to in the `allow` attribute, the Permissions Policy that was applied to the original `` will be applied to the origin the `` navigates to.

Several features can be controlled at the same time by including a semi-colon-separated list of policy directives inside the `allow` attribute.

```html
<iframe
  src="https://example.com"
  allow="geolocation 'self' https://a.example.com https://b.example.com; fullscreen 'none'"></iframe>
```

It is worth giving the `src` value a special mention. We mentioned above that using this allowlist value will mean that the associated feature will be allowed in this ``, as long as the document loaded into it comes from the same origin as the URL in its `<src>` attribute. This value is the _default_ `allowlist` value for features listed in `allow`, so the following are equivalent:

```html
<iframe src="https://example.com" allow="geolocation 'src'"></iframe>
<iframe src="https://example.com" allow="geolocation"></iframe>
```

> **Note:**
> As you'll have noticed, the syntax for `` policies is a bit different to the syntax for `Permissions-Policy` headers. The former still uses the same syntax as the older Feature Policy specification, which was superseded by Permissions Policy.

### Fenced frames and permissions policy

`<fencedframe>`s interact with permissions policies in the same way as ``s, but in a much more restricted capacity. Only specific features designed to be used in `<fencedframe>`s can be enabled via permissions policies set on them; other policy-controlled features are not available in this context.

See Permissions policies available to fenced frames for more details.

## Inheritance of policies for embedded content

Scripts inherit the policy of their browsing context, regardless of their origin. That means that top-level scripts inherit the policy from the main document.

An ``'s inherited policy is determined by combining its parent page's policy with the `allow` attribute set on the `` element itself.

If the parent page's `Permissions-Policy` header names a feature, its allowlist defines the superset of origins that are potentially permitted to inherit the feature.
For an `` to actually inherit the feature, its origin must be covered by that allowlist, and the origin must also be granted the feature.
The feature can be granted explicitly, by listing it in the `allow` attribute with an allowlist that matches the origin, or automatically if the `allow` attribute doesn't list the feature and the origin is covered by the default allowlist.

If no `Permissions-Policy` is provided for a feature, _no restrictions are placed on the origins to which the feature can be delegated_.
Therefore, the `allow` attribute can be used to explicitly delegate the feature to any origin; if the `allow` attribute doesn't list the feature, it's delegated to the origins in the feature's default allowlist.
Note that the parent document can still only delegate features that are enabled in it.

Disabling a feature in a policy is a one-way toggle. If a feature has been disabled for a child frame by its parent frame, the child cannot re-enable it, and neither can any of the child's descendants.

## Examples

### Combining HTTP header and `` policies

For example, let's say that we wanted to enable geolocation usage on our own origin, and in embedded content coming from our trusted ad network. We could set up the page-wide Permissions Policy like this:

```http
Permissions-Policy: geolocation=(self "https://trusted-ad-network.com")
```

Over in our ad ``s, we could set access to the `https://trusted-ad-network.com` origin like this:

```html
<iframe src="https://trusted-ad-network.com" allow="geolocation"></iframe>
```

If a different origin ended up getting loaded into ``, it would not have access to geolocation:

```html
<iframe src="https://rogue-origin-example.com" allow="geolocation"></iframe>
```

## See also

- `Permissions-Policy` HTTP header
- `<allow>` attribute on iframes
- Controlling browser features with Permissions Policy: use guide that also contains several demo links.
- Permissions/Feature policies on chromestatus.com
- Privacy, permissions, and information security
