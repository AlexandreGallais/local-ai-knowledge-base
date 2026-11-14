---
title: "Cross-Origin-Embedder-Policy-Report-Only (COEP) header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/cross-origin-embedder-policy-report-only/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cross-Origin-Embedder-Policy-Report-Only (COEP) header

The HTTP **`Cross-Origin-Embedder-Policy-Report-Only`** (COEP) response header configures the current document's _report-only_ policy for loading and embedding cross-origin resources that are requested in `no-cors` mode.

The header allows website administrators to report on resources that would be blocked by `Cross-Origin-Embedder-Policy`, without preventing them from being loaded.
This allows for a softer rollout of enforcement.

Violations of the policy may be reported using the Reporting API.
Reports can be observed in the page for which the policy is being set using a `ReportingObserver`, and sent to server endpoints defined in a `Reporting-Endpoints` HTTP response header, and selected using the `report-to` parameter.
For more information see `COEPViolationReport`.

       | Header type
       | Response header

## Syntax

```http
Cross-Origin-Embedder-Policy-Report-Only: <token>; <parameter>
```

### Directives

The header should only be set with just one token and a `report-to` endpoint.

Setting the header more than once or with multiple tokens is equivalent to setting `unsafe-none`.
Omitting `report-to` makes the header functionally inert.

The `<token>` value can be one of:

- `unsafe-none`
    Allows the document to load cross-origin resources requested in `no-cors` mode **without** giving explicit permission through the `Cross-Origin-Resource-Policy` header.
    This is the default value.

- `require-corp`
    A document can only load resources requested in `no-cors` mode from the same origin, or resources that have explicitly set the `Cross-Origin-Resource-Policy` header to a value that allows it to be embedded.

    Cross-origin resource loading will be blocked by COEP unless:
    - The resource is requested in `no-cors` mode and the response includes a `Cross-Origin-Resource-Policy` header that allows it to be loaded into the document origin.
    - The resource is requested in `cors` mode; for example, in HTML using the `crossorigin` attribute, or in JavaScript by making a request with `{mode="cors"}`.
      Note that requests made in `cors` mode won't be blocked by COEP or trigger COEP violations, but must still be permitted by CORS.

- `credentialless`
    A document can load cross-origin resources that are requested in `no-cors` mode **without** an explicit permission via the `Cross-Origin-Resource-Policy` header.
    In this case requests are sent without credentials: <example-value> are omitted in the request, and ignored in the response.

    The cross-origin loading behavior for other request modes is the same as for `require-corp`.
    For example, a cross-origin resource requested in `cors` mode must support (and be permitted by) CORS.

The `<parameter>` is optional, and can be one of:

- `report-to <endpoint_name>` (optional)
    The `<endpoint_name>` is the name of the endpoint to which policy violations will be sent.
    The mapping between the name and a particular endpoint is defined separately in the `Reporting-Endpoints` HTTP header.

## See also

- `Cross-Origin-Embedder-Policy`
- `Cross-Origin-Opener-Policy`
- `Window.crossOriginIsolated` and `WorkerGlobalScope.crossOriginIsolated`
- `ReportingObserver`
- `COEPViolationReport`
- Reporting API
- Cross Origin Opener Policy in _Why you need "cross-origin isolated" for powerful features_ on web.dev (2020)
- COOP and COEP explained: Artur Janc, Charlie Reis, Anne van Kesteren (2020)
