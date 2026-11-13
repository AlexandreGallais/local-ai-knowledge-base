---
title: "Content-Security-Policy (CSP) header (part 1 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy (CSP) header

The HTTP **`Content-Security-Policy`** response header allows website administrators to control resources the user agent is allowed to load for a given page.
With a few exceptions, policies mostly involve specifying server origins and script endpoints.
This helps guard against cross-site scripting attacks.

Violations may be reported using the Reporting API.
Reports can be observed in the page for which the policy is being enforced, using a `ReportingObserver`, and sent to server endpoints defined in a `Reporting-Endpoints` HTTP response header and selected using the CSP  directive.
For more information see `CSPViolationReport`.

See the Content Security Policy (CSP) guide for details about how a CSP is delivered to the browser, what it looks like, along with use cases and deployment strategies.

       | Header type
       | Response header

## Syntax

```http
Content-Security-Policy: <policy-directive>; <policy-directive>
```

where `<policy-directive>` consists of:
`<directive> <value>` with no internal punctuation.

## Directives

### Fetch directives

Fetch directives control the locations from which certain resource types may be loaded.

-
    Defines the valid sources for web workers and nested browsing contexts loaded using elements such as
    `<frame>` and ``.

    Fallback for `frame-src` and `worker-src`.

-
    Restricts the URLs which can be loaded using script interfaces.
-
    Serves as a fallback for the other fetch directives.

    Fallback for all other fetch directives.

-  (experimental)
    Specifies valid sources for nested browsing contexts loaded into `<fencedframe>` elements.
-
    Specifies valid sources for fonts loaded using `@font-face`.
-
    Specifies valid sources for nested browsing contexts loaded into elements such as
    `<frame>` and ``.
-
    Specifies valid sources of images and favicons.
-
    Specifies valid sources of application manifest files.
-
    Specifies valid sources for loading media using the `<audio>`,
    `` and `<track>` elements.
-
    Specifies valid sources for the `<object>` and `` elements.
-  (deprecated) (non-standard)
    Specifies valid sources to be prefetched or prerendered.
-
    Specifies valid sources for JavaScript and WebAssembly resources.

    Fallback for `script-src-elem` and `script-src-attr`.

-
    Specifies valid sources for JavaScript `<script>` elements.
-
    Specifies valid sources for JavaScript inline event handlers.
-
    Specifies valid sources for stylesheets.

    Fallback for `style-src-elem` and `style-src-attr`.

-
    Specifies valid sources for stylesheets `<style>` elements and
    `<link>` elements with `rel="stylesheet"`.
-
    Specifies valid sources for inline styles applied to individual DOM elements.
-
    Specifies valid sources for `Worker`, `SharedWorker`, or
    `ServiceWorker` scripts.

All fetch directives may be specified the single value `'none'`, indicating that the specific resource type should be completely blocked, or as one or more _source expression_ values, indicating valid sources for that resource type. See Fetch directive syntax for more details.

#### Fallbacks

Some fetch directives function as fallbacks for other more granular directives. This means that if the more granular directive is not specified, then the fallback is used to provide a policy for that resource type.

- `default-src` is a fallback for all other fetch directives.
- `script-src` is a fallback for `script-src-attr` and `script-src-elem`.
- `style-src` is a fallback for `style-src-attr` and `style-src-elem`.
- `child-src` is a fallback for `frame-src` and `worker-src`.

For example:

- If `img-src` is omitted but `default-src` is included, then the policy defined by `default-src` will be applied to images.
- If `script-src-elem` is omitted but `script-src` is included, then the policy defined by `script-src` will be applied to `<script>` elements.
- If `script-src-elem` and `script-src` are both omitted, but `default-src` is included, then the policy defined by `default-src` will be applied to `<script>` elements.

### Document directives

Document directives govern the properties of a document or worker environment to which a policy
applies.

-
    Restricts the URLs which can be used in a document's `<base>`
    element.
-
    Enables a sandbox for the requested resource similar to the
    `` `sandbox` attribute.

### Navigation directives

Navigation directives govern to which locations a user can navigate or submit a form,
for example.

-
    Restricts the URLs which can be used as the target of a form submissions from a
    given context.
-
    Specifies valid parents that may embed a page using `<frame>`,
    ``, `<object>`, or ``.

### Reporting directives

Reporting directives control the destination URL for CSP violation reports in `Content-Security-Policy` and `Content-Security-Policy-Report-Only`.

-
    Provides the browser with a token <example-value> the reporting endpoint or group of endpoints to send CSP violation information to.
    The endpoints that the token <example-value> are provided through other HTTP headers, such as `Reporting-Endpoints` and `Report-To` (deprecated).

    > **Warning:**
    > This directive is intended to replace `report-uri`; in browsers that support `report-to`, the `report-uri` directive is ignored.
    > However until `report-to` is broadly supported you should specify both headers as shown (where `endpoint_name` is the name of a separately provided endpoint):
    >
    > ```http
    > Content-Security-Policy: …; report-uri https://endpoint.example.com; report-to endpoint_name
    > ```

### Other directives

-
    Enforces Trusted Types at the DOM XSS injection sinks.
-
    Used to specify an allowlist of Trusted Types policies.
    Trusted Types allows applications to lock down DOM XSS injection sinks to only accept non-spoofable, typed values in place of strings.
-
    Instructs user agents to treat all of a site's insecure URLs (those served over HTTP) as though they have been replaced with secure URLs (those served over HTTPS).
    This directive is intended for websites with large numbers of insecure legacy URLs that need to be rewritten.

### Deprecated directives

-  (deprecated)
    Prevents loading any assets using HTTP when the page is loaded using HTTPS.

-  (deprecated)
    Provides the browser with a URL where CSP violation reports should be sent.
    This has been superseded by the `report-to` directive.
