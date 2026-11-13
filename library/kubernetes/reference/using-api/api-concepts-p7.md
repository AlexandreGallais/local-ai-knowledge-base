---
title: "Kubernetes API Concepts (part 7 of 7)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/api-concepts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes API Concepts (part 7 of 7)

### Unavailable resource versions

Servers are not required to serve unrecognized resource versions. If you request
**list** or **get** for a resource version that the API server does not recognize,
then the API server may either:

* wait briefly for the resource version to become available, then timeout with a
  `504 (Gateway Timeout)` if the provided resource versions does not become available
  in a reasonable amount of time;
* respond with a `Retry-After` response header indicating how many seconds a client
  should wait before retrying the request.

If you request a resource version that an API server does not recognize, the
kube-apiserver additionally identifies its error responses with a message
`Too large resource version`.

If you make a **watch** request for an unrecognized resource version, the API server
may wait indefinitely (until the request timeout) for the resource version to become
available.

### Watch cache initialization {#watch-cache-initialization}

To prevent control plane overload and API Priority and Fairness (APF) starvation during watch cache initialization or re-initialization, the Kubernetes API server applies two protective mechanisms:

* **Startup readiness protection**: On startup, the API server delays reporting ready (`/readyz`) until every registered watch cache completes its initial synchronization from etcd. This prevents load balancers from directing client traffic to the API server prematurely, eliminating startup thundering-herd reads that would otherwise bypass the unready cache and hit etcd directly.
* **Request rejection during cache initialization**: If requests arrive while the watch cache for a resource type is uninitialized—such as during server boot (before readiness) or after a runtime cache resync or disconnection—the API server prevents expensive queries from overwhelming etcd or hanging indefinitely:
  * **`WATCH` requests** and **unpaginated or filtered `LIST` requests** (any list query without a pagination `limit` or that specifies a label or field selector) are rejected immediately with an HTTP `429 Too Many Requests` status code and a dynamic `Retry-After` header. This avoids hung goroutines, APF seat starvation, and etcd memory exhaustion.
  * **Safe paginated reads**: Only **`GET` requests** and **paginated, unfiltered `LIST` requests** (`limit` > 0 with no label or field selector) are delegated directly to etcd as a safe fallback.

Clients (including custom controllers and operators) should be designed to handle HTTP `429 Too Many Requests` responses gracefully by respecting `Retry-After` headers and implementing exponential backoff.
