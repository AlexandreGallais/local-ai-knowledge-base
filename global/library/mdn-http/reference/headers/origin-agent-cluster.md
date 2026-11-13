---
title: "Origin-Agent-Cluster header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/origin-agent-cluster/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Origin-Agent-Cluster header

The HTTP **`Origin-Agent-Cluster`** response header is used to request whether the associated `Document` should be placed in an origin-keyed or site-keyed agent cluster.
When enabled, operating system resources (for example, the operating system process) used to evaluate the document should be shared only with other documents from the same origin, and not same-site, cross-origin documents.

The effect of this is that a resource-intensive document will be less likely to degrade the performance of documents from other origins.

       | Header type
       | Response header

## Syntax

```http
Origin-Agent-Cluster: <boolean>
```

### Directives

- `<boolean>`
    A structured boolean value indicating the requested agent cluster scoping:
    - `?1`
        Requests that the associated `Document` should be placed in an origin-keyed agent cluster.
    - `?0`
        Requests a site-keyed agent cluster. This enables cross-origin same-site communication, by setting `Document.domain`.

    Browsers are in the process of switching the default from `?0` to `?1`.

## Description

Modern web browsers have a multiprocess architecture in which pages from different origins can run in different operating system processes. This is important for performance, because it means that a resource-intensive page will not have as much of an impact on other pages that the user has open.

However, browsers can't as a general rule run same-site, cross-origin pages in different processes, because of certain DOM APIs that depend on same-site, cross-origin communication. For example, by default, pages from the following two origins will share the same operating system resources:

```plain
https://apples.example.org
https://oranges.example.org
```

By setting the `Origin-Agent-Cluster` header to `?1`, a page can request that the browser allocate dedicated resources to this origin that are not shared with any other origins.

The browser is not required to honor the request. If it does, the `Window.originAgentCluster` property returns `true`, and the window is not able to do the following things, which all depend on same-site, cross-origin communication:

- Set `Document.domain`.
- Send `WebAssembly.Module` objects to other same-site cross-origin pages using `postMessage()`.
- Send `SharedArrayBuffer` or `WebAssembly.Memory` objects to other same-site cross-origin pages.

Origin-keyed agent clusters should not be viewed as a security feature: browsers may ignore the request for various reasons, or choose to implement it in a way that does not provide memory protection (for example, using separate threads instead of separate processes). Instead, this feature is a hint that the user experience would be improved if this origin were allocated dedicated resources.

For example, suppose your site includes a page from one origin that embeds a same-site, cross-origin iframe which runs a resource-intensive game. By setting `Origin-Agent-Cluster` on the document in the iframe, you can prevent the game from affecting the performance of the main page.

The browser will ensure that all pages from a given origin are either origin-keyed or they are not. This means that:

- If the first page from an origin sets the header to `?0` and is made site-keyed, then no other pages from that origin will be origin-keyed, even if those other pages do set the header.
- If the first page from an origin sets the header to `?1` and is made origin-keyed, then all other pages from that origin will be origin-keyed whether they ask for it or not.

To avoid this kind of unpredictable situation, you should set this header for all pages from a given origin, or none of them.

## Examples

### Requesting origin-keying

In browser versions where the default is `?0` (historical behavior), the following is the only meaningful setting:

```http
Origin-Agent-Cluster: ?1
```

### Requesting site-keying

In browser versions where the default is `?1` (new behavior), the following is the only meaningful setting:

```http
Origin-Agent-Cluster: ?0
```

## See also

- `Window.originAgentCluster`
- Agent clusters and memory sharing in _JavaScript execution model_
- Requesting performance isolation with the Origin-Agent-Cluster header on web.dev
