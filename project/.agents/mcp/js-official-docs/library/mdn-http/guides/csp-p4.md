---
title: "Content Security Policy (CSP) (part 4 of 4)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/csp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content Security Policy (CSP) (part 4 of 4)

## Testing your policy

To ease deployment, CSP can be deployed in report-only mode.
The policy is not enforced, but any violations are sent to the reporting endpoint specified in the policy. Additionally, a report-only header can be used to test a future revision to a policy without actually deploying it.

You can use the `Content-Security-Policy-Report-Only` HTTP header to specify your policy, like this:

```http
Content-Security-Policy-Report-Only: policy
```

If both a `Content-Security-Policy-Report-Only` header and a `Content-Security-Policy` header are present in the same response, both policies are honored.
The policy specified in `Content-Security-Policy` headers is enforced while the `Content-Security-Policy-Report-Only` policy generates reports but is not enforced.

Note that unlike a normal content security policy, a report-only policy cannot be delivered in a `<meta>` element.

### Violation reporting

The recommended method for reporting CSP violations is to use the Reporting API, declaring endpoints in `Reporting-Endpoints` and specifying one of them as the CSP reporting target using the `Content-Security-Policy` header's  directive.

> **Warning:**
> You can also use the CSP  directive to specify a target URL for CSP violation reports.
> This sends a slightly different JSON report format via a `POST` operation with a `Content-Type` of `application/csp-report`.
> This approach is deprecated, but you should declare both until  is supported in all browsers.
> For more information about the approach see the  topic.

A server can inform clients where to send reports using the `Reporting-Endpoints` HTTP response header.
This header defines one or more endpoint URLs as a comma-separated list.
For example, to define a reporting endpoint named `csp-endpoint` which accepts reports at `https://example.com/csp-reports`, the server's response header could look like this:

```http
Reporting-Endpoints: csp-endpoint="https://example.com/csp-reports"
```

If you want to have multiple endpoints that handle different types of reports, you would specify them like this:

```http
Reporting-Endpoints: csp-endpoint="https://example.com/csp-reports",
                     hpkp-endpoint="https://example.com/hpkp-reports"
```

You can then use the `Content-Security-Policy` header's  directive to specify that a particular defined endpoint should be used for reporting.
For example, to send CSP violation reports to `https://example.com/csp-reports` for the `default-src`, you might send response headers that look like the following:

```http
Reporting-Endpoints: csp-endpoint="https://example.com/csp-reports"
Content-Security-Policy: default-src 'self'; report-to csp-endpoint
```

When a CSP violation occurs, the browser sends the report as a JSON object to the specified endpoint via an HTTP `POST` operation, with a `Content-Type` of `application/reports+json`.
The report is a serialized form of the `CSPViolationReport` object containing a `type` property with a value of `"csp-violation"`.

A typical object might look like this:

```json
{
  "age": 53531,
  "body": {
    "blockedURL": "inline",
    "columnNumber": 39,
    "disposition": "enforce",
    "documentURL": "https://example.com/csp-report",
    "effectiveDirective": "script-src-elem",
    "lineNumber": 121,
    "originalPolicy": "default-src 'self'; report-to csp-endpoint-name",
    "referrer": "https://www.google.com/",
    "sample": "console.log(\"lo\")",
    "sourceFile": "https://example.com/csp-report",
    "statusCode": 200
  },
  "type": "csp-violation",
  "url": "https://example.com/csp-report",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
}
```

You need to set up a server to receive reports with the given JSON format and content type.
The server handling these requests can then store or process the incoming reports in a way that best suits your needs.

## See also

- CSP errors and warnings
- Mitigate cross-site scripting with a strict Content Security Policy on web.dev (2024)
- Content Security Policy: A successful mess between hardening and mitigation
- Content Security Policy Cheat Sheet on owasp.org
- CSP Evaluator
