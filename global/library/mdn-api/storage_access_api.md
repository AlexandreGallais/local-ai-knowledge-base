---
title: "Storage Access API (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storage_access_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Storage Access API

The Storage Access API provides a way for cross-site content loaded in a third-party context (i.e., embedded in an ``) to gain access to third-party cookies and unpartitioned state that it would typically only have access to in a first-party context (i.e., when loaded directly in a browser tab).

The Storage Access API is relevant to user agents that, by default, block access to third-party cookies and unpartitioned state to improve privacy (for example, to prevent tracking). There are legitimate uses for third-party cookies and unpartitioned state that we still want to enable, even with these default restrictions in place. Examples include single sign-on (SSO) with federated identity providers (IdPs), or persisting user details such as location data or viewing preferences across different sites.

The API provides methods that allow embedded resources to check whether they currently have access to third-party cookies and, if not, to request access from the user agent.
