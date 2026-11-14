---
title: "API removal in .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/api-removal.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# API removal in .NET

.NET takes compatibility with existing code seriously, and rarely removes a public API that has been released. Removals are made only when there are no other reasonable alternatives. Where such breaking changes can't be avoided, mitigations are publicized in advance using the following means:

- By marking the API as obsolete or providing build diagnostics.
- By blogging about it.
- By documenting it under Breaking changes in .NET.

In most cases, an API that shipped in a long-term support (LTS) release is obsoleted in the subsequent LTS release before it's removed. In rare cases, based on business needs, exceptions are made to obsolete an API before the subsequent LTS release. All obsoletions are documented and communicated to customers.
