---
title: "Integrity-Policy-Report-Only header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/integrity-policy-report-only/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Integrity-Policy-Report-Only header

The HTTP **`Integrity-Policy-Report-Only`** response header allows website administrators to report on resources that the user agent loads that would violate Subresource Integrity guarantees if the integrity policy was enforced (using the `Integrity-Policy` header).

Violations of the policy may be reported using the Reporting API.
Reports can be observed in the page for which the policy is being enforced, using a `ReportingObserver`, and sent to server endpoints defined in a `Reporting-Endpoints` HTTP response header and selected using the `endpoints` field.
For more information see `IntegrityViolationReport`.

The header allows developers to test integrity policies and fix any content issues before eventually deploying an `Integrity-Policy` header to enforce the policy.

       | Header type
       | Response header

## Syntax

```http
Integrity-Policy-Report-Only: blocked-destinations=(<destination>),sources=(<source>),endpoints=(<endpoint>)
```

The header values are defined as structured field dictionaries with the following keys:

- `blocked-destinations`
    A list of request destinations that must include valid integrity metadata.
    Allowed values are:
    - `script`
        Script resources.
    - `style`
        Stylesheet resources.

- `sources` (optional)
    A list of integrity sources that must include integrity metadata.
    Allowed values are:
    - `inline`
        The integrity metadata source is inline to the content, such as the integrity attribute.
        This is the default.

        As this is the default and only value, omitting `sources` is equivalent to specifying `sources=(inline)`.

- `endpoints` (optional)
    A list of reporting endpoint names that indicate where reports will be sent.
    The reporting endpoints must be defined in a `Reporting-Endpoints` header.

## Examples

### Reporting when scripts lack integrity metadata

This example shows a document that reports to a server endpoint when any `<script>` (or `HTMLScriptElement`) does not specify an `integrity` attribute, or when a script resource is requested in no-cors mode.

Note that the `integrity-endpoint` used in `Integrity-Policy-Report-Only` is defined in the `Reporting-Endpoints` header.

```http
Reporting-Endpoints: integrity-endpoint=https://example.com/integrity, backup-integrity-endpoint=https://report-provider.example/integrity
Integrity-Policy-Report-Only: blocked-destinations=(script), endpoints=(integrity-endpoint backup-integrity-endpoint)
```

The report payload might look like this.
Note that the `body.reportOnly` property is `true`, because this report was triggered by a violation of `Integrity-Policy-Report-Only`.

```json
{
  "age": "176279",
  "type": "integrity-violation",
  "url": "https://example.com",
  "body": {
    "documentURL": "https://example.com",
    "blockedURL": "https://example.com/main.js",
    "destination": "script",
    "reportOnly": "true"
  },
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36"
}
```

## See also

- `Integrity-Policy`
- `Reporting-Endpoints`
- `ReportingObserver`
- `IntegrityViolationReport`
- Integrity Policy in Subresource Integrity
- Reporting API
