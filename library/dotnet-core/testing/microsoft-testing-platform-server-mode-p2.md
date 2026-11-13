---
title: "Microsoft.Testing.Platform (MTP) server mode (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-server-mode.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform (MTP) server mode (part 2 of 2)

## Negotiate protocol compatibility

Starting with MTP 2.4, server-mode protocol negotiation is independent from the MTP NuGet package version. A client declares the protocol versions that it supports, and the server selects a common version. When no supported version overlaps, the test application exits with the `ProtocolError` exit code (`12`) instead of continuing with an incompatible wire contract.

Use the versioned server-mode 1.0 JSON schema to validate messages. The System.Text.Json and Jsonite serializers follow the same schema and error envelope.

## See also

- Run and debug tests with MTP
- Programmatic test discovery and execution
- Discover tests as JSON
- Build a test framework for MTP
- MTP JSON-RPC protocol
