---
title: "CSPViolationReport: disposition property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cspviolationreport/disposition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSPViolationReport: disposition property

The **`disposition`** property of the `CSPViolationReport` dictionary indicates whether the user agent is configured to enforce Content Security Policy (CSP) violations or only report them.

## Value

Possible values are:

- `"enforce"`
    The policy is enforced and the resource request is blocked.
    This is used for violations of policies set with `Content-Security-Policy`.
- `"report"`
    The violation is reported but the resource request is not blocked.
    This is used for violations of policies set with `Content-Security-Policy-Report-Only`.

## Examples

### CSP inline script violation showing the disposition

This example triggers a CSP violation using an inline script, and reports the violation using a `ReportingObserver`.
The `disposition` is logged.

#### HTML

The HTML file below uses the `<meta>` element to set the `Content-Security-Policy` `default-src` to `self`, which allows scripts and other resources to be loaded from the same domain, but does not allow inline scripts to be executed.
The document also includes an inline script, which should therefore trigger a CSP violation.

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
Each time the callback function is invoked, we get the body of the first entry of the reports array, and use it to log the file, line, and column of the violation to the console.

```js
// main.js
const observer = new ReportingObserver(
  (reports, observer) => {
    const cspViolationBody = reports[0].body;
    console.log(`disposition: ${cspViolationBody.disposition}`);
    // For example: "enforce"
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

If serving the above code, the log output would be:

```plain
disposition: enforce
```

> **Note:**
> If `Content-Security-Policy-Reporting-Only` was enabled the disposition would be `report`.
> Note however, that `Content-Security-Policy-Reporting-Only` must be served: it can't be set in the `<meta>` element as we have done above.

## See also

- `SecurityPolicyViolationEvent.disposition`
