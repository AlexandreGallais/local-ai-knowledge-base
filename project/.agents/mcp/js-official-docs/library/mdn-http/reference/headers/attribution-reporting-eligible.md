---
title: "Attribution-Reporting-Eligible header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/attribution-reporting-eligible/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Attribution-Reporting-Eligible header

The HTTP **`Attribution-Reporting-Eligible`** request header indicates that the corresponding response is eligible to register an attribution source or trigger.

This header is never set manually and is instead sent by the browser in response to various HTML element or JavaScript request settings. Depending on the allowed registrations specified in the `Attribution-Reporting-Eligible` value, the server is expected to respond with either an `Attribution-Reporting-Register-Source` or `Attribution-Reporting-Register-Trigger` header to complete the registration of an attribution source or trigger, respectively.

See the Attribution Reporting API for more details.

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
Attribution-Reporting-Eligible: <allowed-registrations>
```

## Directives

- `<allowed-registrations>`
    A structured-header dictionary representing the registrations allowed in the corresponding response. Possible keys are:
    - `event-source`
        An event-based attribution source can be registered.
    - `navigation-source`
        A navigation-based attribution source can be registered.
    - `trigger`
        An attribution trigger can be registered.

Every response in a redirect chain can register at most one source or one trigger.

## Examples

```http
Attribution-Reporting-Eligible: trigger
```

## See also

- `Attribution-Reporting-Register-Source`
- `Attribution-Reporting-Register-Trigger`
- Attribution Reporting API
