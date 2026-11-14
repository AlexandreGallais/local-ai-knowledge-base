---
title: "test-class-rules"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/mstest-analyzers/includes/test-class-rules.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# test-class-rules

The declaring type supplies the test fixture that owns these callbacks:

- Use a `class` so MSTest can associate the callbacks with a test-class hierarchy.
- Use a `public` class, or an `internal` class with `[assembly: DiscoverInternals]`, to meet MSTest's type-discovery contract.
- Use a non-static class for these fixtures. Test methods need a test-class instance, even when a class-level lifecycle callback is static.
- Mark a sealed class with `[TestClass]` or a derived attribute. A sealed class can't supply inherited callbacks to another test class, so it must identify itself as the test container.
