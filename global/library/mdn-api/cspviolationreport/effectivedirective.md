---
title: "CSPViolationReport: effectiveDirective property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cspviolationreport/effectivedirective/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSPViolationReport: effectiveDirective property

The **`effectiveDirective`** property of the `CSPViolationReport` dictionary is a string that represents the effective Content Security Policy (CSP) directive that was violated.

Note that this contains the specific directive that was effectively violated, such as `script-src-elem` for violations related to script elements, and not the policy that was specified, which may have been the (more general) `default-src`.

## Value

A string representing the effective `Content-Security-Policy` directive that was violated.

## Examples

### CSP inline script violation

This example triggers a CSP violation using an inline script, and reports the violation using a `ReportingObserver`.
In particular, it logs the `effectiveDirective` and the `originalPolicy`, making the difference clear.

#### HTML

The HTML file below uses the `<meta>` element to set the `Content-Security-Policy` `default-src` to `self`, which allows scripts and other resources to be loaded from the same domain, but does not allow inline scripts to be executed.
The document also includes an inline script, which should trigger a CSP violation.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; report-to csp-endpoint" />
    <meta
      http-equiv="Reporting-Endpoints"
      content="csp-endpoint='https://example.com/csp-reports'" />
    <script src="main.js"></script>
    <title>CSP: Violation due to inline script</title>
  </head>
  <body>
    <h1>CSP: Violation due to inline script</h1>
    <script>
      const int = 4;
    </script>
  </body>
</html>
```

#### JavaScript (main.js)

The document above also loads the external script `main.js`, which is shown below.
Because this is loaded from the same domain as the HTML, it is not blocked by the CSP.

The script creates a new `ReportingObserver` to observe content violation reports of type `"csp-violation"`.
Each time the callback function is invoked, we get the body of the first entry of the reports array, and use it to log the effectiveDirective and `originalPolicy` of the violation to the console.

```js
// main.js
const observer = new ReportingObserver(
  (reports, observer) => {
    console.log(`effectiveDirective: ${reports[0].body.effectiveDirective}`);
    // effectiveDirective: script-src-elem
    console.log(`originalPolicy: ${reports[0].body.originalPolicy}`);
    // originalPolicy: default-src 'self'; report-to csp-endpoint
  },
  {
    types: ["csp-violation"],
    buffered: true,
  },
);

observer.observe();
```

Note that while there might be multiple reports in the returned array, for brevity we only log the values of the first element.

#### Results

The console output for the above code is:

```plain
effectiveDirective: script-src-elem
originalPolicy: default-src 'self'; report-to csp-endpoint
```

Note that the `originalPolicy` matches the `<meta>` content of the `Content-Security-Policy` directive in the HTML, and specifies that the policy is `self` by default (`default-src 'self'`).

The `effectiveDirective` is `script-src-elem`, which specifies valid sources for JavaScript `<script>` elements.
This is the specific directive that has effectively been violated, even though `default-src` was set in the policy.

## See also

- `SecurityPolicyViolationEvent.effectiveDirective`
