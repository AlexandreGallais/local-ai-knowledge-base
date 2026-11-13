---
title: "Permissions-Policy header (part 2 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy header (part 2 of 2)

## Examples

### Basic usage

#### Permissions-Policy header

To allow all origins access to geolocation, you would do this:

```http
Permissions-Policy: geolocation=*
```

Or to allow access to a subset of origins, you'd do this:

```http
Permissions-Policy: geolocation=(self "https://a.example.com" "https://b.example.com")
```

Several features can be controlled at the same time by sending the header with a comma-separated list of policies, or by sending a separate header for each policy.

For example, the following are equivalent:

```http
Permissions-Policy: picture-in-picture=(), geolocation=(self https://example.com/), camera=*

Permissions-Policy: picture-in-picture=()
Permissions-Policy: geolocation=(self https://example.com/)
Permissions-Policy: camera=*
```

#### iframes

The `Permissions-Policy` header allowlist for a feature defines the superset of origins that are potentially allowed to access the feature.
An ``'s `allow` attribute grants a feature to the origins it names, provided they are present in that superset.
Because of this inheritance behavior, it is a good idea to specify the widest acceptable support for a feature in the HTTP header, and then specify the subset of support you need in each ``.

To allow all origins access to geolocation, you would do this:

```html
<iframe src="https://example.com" allow="geolocation *"></iframe>
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

### Denying access to powerful features

SecureCorp Inc. wants to disable Microphone (for example `MediaDevices.getUserMedia()`) and `Geolocation` APIs in its application. It can do so using the following response header:

```http
Permissions-Policy: microphone=(), geolocation=()
```

By specifying `()` for the origin list, the specified features will be disabled for all browsing contexts (this includes all ``s), regardless of their origin.

### Combining HTTP header and `` policies

For example, let's say that we wanted to enable geolocation usage on our own origin, and in embedded content coming from our trusted ad network. We could set up the page-wide Permissions Policy like this:

```http
Permissions-Policy: geolocation=(self https://trusted-ad-network.com)
```

Over in our ad ``s, we could set access to the `https://trusted-ad-network.com` origin like this:

```html
<iframe src="https://trusted-ad-network.com" allow="geolocation"></iframe>
```

If a different origin ended up getting loaded into ``, it would not have access to geolocation:

```html
<iframe src="https://rogue-origin-example.com" allow="geolocation"></iframe>
```

### Reporting violations

This example shows how to configure reporting of `Permissions-Policy` violations to a server endpoint.

The response headers below block geolocation and define the reporting endpoint name for the feature as "geo_endpoint".
The `Reporting-Endpoints` HTTP response header is used to define the URL of this endpoint name.

```http
Reporting-Endpoints: geo_endpoint="https://example.com/reports"
Permissions-Policy: geolocation=();report-to=geo_endpoint
```

> **Note:**
> To send all violation reports to the same endpoint we might instead define the `"default"` reporting endpoint:
>
> ```http
> Reporting-Endpoints: default="https://example.com/reports"
> Permissions-Policy: geolocation=()
> ```

A violation occurs when a page attempts to use the blocked feature, for example:

```js
navigator.geolocation.getCurrentPosition(
  () => {},
  () => {},
);
```

The report payload sent to the endpoint might look like this:

```json
[
  {
    "age": 48512,
    "body": {
      "columnNumber": 29,
      "disposition": "enforce",
      "lineNumber": 44,
      "message": "Permissions policy violation: geolocation access has been blocked because of a permissions policy applied to the current document.",
      "featureId": "geolocation",
      "sourceFile": "https://example.com/"
    },
    "type": "permissions-policy-violation",
    "url": "https://example.com/",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
  }
]
```

> **Note:**
> Chrome's server-side serialization of violation reports uses `policyId` rather than `featureId` for the feature name in the `body` of a server report.
> The `PermissionsPolicyViolationReport` returned by a `ReportingObserver` follows the specification.

## See also

- Permissions Policy
- `Permissions-Policy-Report-Only`
- `Document.featurePolicy` and `FeaturePolicy`
- `Content-Security-Policy`
- `Referrer-Policy`
- `Reporting-Endpoints`
- `PermissionsPolicyViolationReport`
- `ReportingObserver`
- Reporting API
