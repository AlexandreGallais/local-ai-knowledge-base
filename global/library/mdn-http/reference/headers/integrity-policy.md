---
title: "Integrity-Policy header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/integrity-policy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Integrity-Policy header

The HTTP **`Integrity-Policy`** response header allows website administrators to ensure that all resources the user agent loads (of a certain type) have Subresource Integrity guarantees.

When set the user agent will block requests on specified request destinations that omit integrity metadata, and will also block requests in no-cors mode from ever being made.
This helps guard against content manipulation of fetched subresources.

Violations of the policy may be reported using the Reporting API.
Reports can be observed in the page for which the policy is being enforced, using a `ReportingObserver`, and sent to server endpoints defined in a `Reporting-Endpoints` HTTP response header and selected using the `endpoints` field.
For more information see `IntegrityViolationReport`.

       | Header type
       | Response header

## Syntax

```http
Integrity-Policy: blocked-destinations=(<destination>),sources=(<source>),endpoints=(<endpoint>)
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

### Blocking and reporting when scripts lack integrity metadata

This example shows a document that blocks and reports to a server endpoint when any `<script>` (or `HTMLScriptElement`) does not specify an `integrity` attribute, or when a script resource is requested in no-cors mode.

Note that the `integrity-endpoint` used in `Integrity-Policy` is defined in the `Reporting-Endpoints` header.

```http
Reporting-Endpoints: integrity-endpoint="https://example.com/integrity", backup-integrity-endpoint="https://report-provider.example/integrity"
Integrity-Policy: blocked-destinations=(script), endpoints=(integrity-endpoint backup-integrity-endpoint)
```

The report payload might look like this.

```json
{
  "type": "integrity-violation",
  "url": "https://example.com",
  "body": {
    "documentURL": "https://example.com",
    "blockedURL": "https://example.com/main.js",
    "destination": "script",
    "reportOnly": false
  }
}
```

## See also

- `Integrity-Policy-Report-Only`
- `Reporting-Endpoints`
- `ReportingObserver`
- `IntegrityViolationReport`
- Integrity Policy in Subresource Integrity
- Reporting API
