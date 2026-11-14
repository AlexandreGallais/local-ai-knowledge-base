---
title: "Build a test framework for Microsoft.Testing.Platform (MTP) (part 1 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-architecture-test-framework.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Build a test framework

This article explains how to create a custom test framework for Microsoft.Testing.Platform (MTP). The test framework is the only mandatory extension. It discovers and runs tests, and reports results back to the platform.

For the full extension point summary and in-process/out-of-process concepts, see Create custom extensions.

If you're migrating an existing VSTest-based test framework, implementing the `ITestFramework` interface natively is the recommended approach. The VSTest Bridge extension is available as a transitional step, but a native implementation provides the best experience.
