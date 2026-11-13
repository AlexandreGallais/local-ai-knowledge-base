---
title: "NEL header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/nel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NEL header

The HTTP **`NEL`** response header is used to configure network request logging.

       | Header type
       | Response header

## Syntax

```http
NEL: { "report_to": "name_of_reporting_group", "max_age": 12345, "include_subdomains": false, "success_fraction": 0.0, "failure_fraction": 1.0 }
```

## See also

- Network Error Logging (NEL) explainer
