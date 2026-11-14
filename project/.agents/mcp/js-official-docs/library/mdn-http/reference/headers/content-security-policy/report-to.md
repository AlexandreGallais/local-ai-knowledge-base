---
title: "Content-Security-Policy: report-to directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/report-to/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy: report-to directive

The `Content-Security-Policy` **`report-to`** directive indicates the name of the endpoint that the browser should use for reporting CSP violations.

If a CSP violation occurs, a report is generated that contains a serialized `CSPViolationReport` object instance.
This report is sent to the URL that corresponds to the endpoint name, using the generic mechanisms defined in the Reporting API.

The server must separately provide the mapping between endpoint names and their corresponding URLs in the `Reporting-Endpoints` HTTP response header.

       | CSP version
       | 3

       | Directive type
       | Reporting directive

       |
        This directive is not supported in the `<meta>` element.

## Syntax

```http
Content-Security-Policy: …; report-to <endpoint_name>
```

`<endpoint_name>` is the name of an endpoint provided by the `Reporting-Endpoints` HTTP response header.
It can also be the name of a group that is provided by the server in the `Report-To` (deprecated) HTTP response header.

### Violation report syntax

A CSP violation report is a JSON-serialized `CSPViolationReport` object, with a `type` property that has a value of `"csp-violation"`.
Reports are sent to the target endpoint(s) via a `POST` operation with a `Content-Type` of `application/reports+json`.

The JSON for a single report might look like this:

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

## Usage notes

The `report-to` directive is intended to replace `report-uri`, and browsers that support `report-to` ignore the `report-uri` directive.
However, until `report-to` is broadly supported you can specify both directives as shown:

```http
Content-Security-Policy: …; report-uri https://endpoint.example.com; report-to endpoint_name
```

Note that other examples in this topic do not show `report-uri`.

## Examples

### Setting a CSP violation report endpoint

A server can define the mapping between endpoint names and URLs using the `Reporting-Endpoints` header in the HTTP response.
Any name can be used: here we've chosen `name-of-endpoint`.

```http
Reporting-Endpoints: name-of-endpoint="https://example.com/csp-reports"
```

The server can set this endpoint name as the target for sending CSP violation reports to using the `report-to` directive:

```http
Content-Security-Policy: default-src 'self'; report-to name-of-endpoint
```

## See also

- `Reporting-Endpoints`
- `Content-Security-Policy`
- `Content-Security-Policy-Report-Only`
- Reporting API
