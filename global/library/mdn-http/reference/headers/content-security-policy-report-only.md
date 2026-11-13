---
title: "Content-Security-Policy-Report-Only header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy-report-only/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy-Report-Only header

The HTTP **`Content-Security-Policy-Report-Only`** response header helps to monitor Content Security Policy (CSP) violations and their effects without enforcing the security policies.
This header allows you to test or repair violations before a specific `Content-Security-Policy` is applied and enforced.

The CSP  directive must be specified for reports to be sent: if not, the operation won't have any effect.

Violations of the policy may be reported using the Reporting API.
Reports can be observed in the page for which the policy is being enforced, using a `ReportingObserver`, and sent to server endpoints defined in a `Reporting-Endpoints` HTTP response header and selected using the CSP  directive.
For more information see `CSPViolationReport`.

For more information, see our Content Security Policy (CSP) guide.

> **Note:**
> The header can also be used with the deprecated  directive (this is being replaced by ).
> The usage and resulting report syntax is slightly different; see the  topic for more details.

       | Header type
       | Response header

       |
        This header is not supported inside a `<meta>` element.

## Syntax

```http
Content-Security-Policy-Report-Only: <policy-directive>; …; <policy-directive>; report-to <endpoint-name>
```

## Directives

The `Content-Security-Policy-Report-Only` header supports all `Content-Security-Policy` directives except `sandbox`, which is ignored.

> **Note:**
> The CSP  directive should be used with this header or it will have no effect.

## Examples

### Using Content-Security-Policy-Report-Only to send CSP reports

To use the  directive, you first need to define a corresponding endpoint using the `Reporting-Endpoints` response header.
In the example below, we define a single endpoint named `csp-endpoint`.

```http
Reporting-Endpoints: csp-endpoint="https://example.com/csp-reports"
```

We can then define the destination of the report using  and , as shown below.
Note that this particular report would be triggered if the page loaded resources insecurely, or from inline code.

```http
Content-Security-Policy-Report-Only: default-src https:;
  report-uri /csp-report-url/;
  report-to csp-endpoint;
```

> **Note:**
> The `report-to` directive is preferred over the deprecated `report-uri`, but we declare both because `report-to` does not yet have full cross-browser support.

## See also

- `Content-Security-Policy`
- CSP  directive
- `Reporting-Endpoints`
- `CSPViolationReport`
- CSP  directive (deprecated)
- Reporting API.
