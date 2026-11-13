---
id: dotnet-testing-old-to-new
title: .NET tests, old to new
topic: dotnet-testing
summary: Replace old C# test code for xUnit v3, MSTest 4, NUnit 4 and 5, paid packages and coverage.
tool: dotnet
version: "11"
checked: 2026-11-13
sources: [S1, S8, S10, S12, S13, S18, S19, S20, S21, S27, S28, S33, S34, S35]
license: MIT, written for this base from CC BY 4.0 sources; this is not legal advice
variant: files
---

# .NET tests, old to new

Contents: 1. The rule · 2. Frameworks · 3. Packages and tools · Sources

## 1. The rule (old to new in .NET tests)

- Keep the framework, the runner and the libraries the project already has. Use the "New" column only in a project at the "Since" version or later.
- Never add FluentAssertions 8 or later, or Verify 33 or later, without the user's agreement. Say their license first. In a new project, use the `Assert` of the framework.
- Never add an assertion or mocking library the project does not reference.

## 2. Frameworks (old to new)

| Old | New | Since | Status of the old | Sources |
| --- | --- | --- | --- | --- |
| Packages `xunit` 2.x, `xunit.runner.visualstudio` | `xunit.v3` and `OutputType` `Exe` | xUnit v3 | Keep them in a project still on v2 | [S8] |
| `using Xunit.Abstractions;` | `using Xunit;` | xUnit v3 | Does not compile | [S8] |
| `IAsyncLifetime` with `Task` | `ValueTask` | xUnit v3 | Does not compile | [S8] |
| `async void` test | `async Task` test | xUnit v3 | Fails at run time | [S8] |
| Async call without a token | `TestContext.Current.CancellationToken` | xUnit v3 | Warning xUnit1051 | [S8] |
| `[ExpectedException(typeof(T))]` | `Assert.ThrowsExactly<T>(() => ...)` | MSTest 4 | Removed | [S10] |
| `Assert.ThrowsException<T>(...)` | `Assert.ThrowsExactly<T>(...)` | MSTest 4 | Removed | [S10] |
| `[TestMethod("name")]` | `[TestMethod(DisplayName = "name")]` | MSTest 4 | Does not compile | [S10] |
| `[ClassCleanup(ClassCleanupBehavior.EndOfClass)]` | `[ClassCleanup]` | MSTest 4 | Removed | [S10] |
| NUnit `Assert.AreEqual(expected, actual)` | `Assert.That(actual, Is.EqualTo(expected))` | NUnit 4 | Moved to `ClassicAssert` in `NUnit.Framework.Legacy` | [S13] |
| `Assert.ThrowsAsync(...)` not awaited | `await Assert.ThrowsAsync(...)` | NUnit 5 | Returns a task | [S12] |
| `--logger trx --collect:"XPlat Code Coverage"` | `--report-trx`, `--coverage` | SDK .NET 10, MTP mode | Still right in VSTest mode | [S1] |

## 3. Packages and tools (old to new)

| Old | New | Since | Status of the old | Sources |
| --- | --- | --- | --- | --- |
| FluentAssertions, latest version | `Assert` of the framework; else AwesomeAssertions or Shouldly | FluentAssertions 8 | Paid for commercial use; 7.x stays free | [S18] [S19] [S20] |
| Verify, latest version | Ask first; stay below 33 | Verify 33 | Sponsorship checked at build time; fee for versions after 2026-09-01 | [S33] |
| Moq "became paid" | Moq 4.21, BSD-3-Clause | Moq 4.20.2 | The SponsorLink episode ended in 4.20.2 | [S21] |
| `UseInMemoryDatabase("...")` | SQLite in memory with an open connection, or the real database | EF Core 7 (docs of 2023) | Discouraged: fewer queries, no transactions | [S27] |
| `DateTime.UtcNow` or a real wait in a test | `TimeProvider` injected, `FakeTimeProvider.Advance(...)` | .NET 8 | Slow or flaky test | [S28] |
| `coverlet.collector` | `coverlet.MTP` or `Microsoft.Testing.Extensions.CodeCoverage` | SDK .NET 10, MTP mode | Does not work with MTP | [S34] [S35] |

## Sources

- [S1] Microsoft, "Testing with 'dotnet test'", Microsoft Learn, updated 2026-09-12, <https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test>, read 2026-11-13, CC BY 4.0, summarized.
- [S8] xUnit.net, "Migrating from v2 to v3", <https://xunit.net/docs/getting-started/v3/migration>, read 2026-11-13, summarized.
- [S10] Microsoft, "Migrate from MSTest v3 to v4", Microsoft Learn, updated 2026-04-27, <https://learn.microsoft.com/dotnet/core/testing/unit-testing-mstest-migration-v3-v4>, read 2026-11-13, CC BY 4.0, summarized.
- [S12] NUnit, "Framework Release" notes, NUnit 5.0.0 of 2026-09-27, <https://docs.nunit.org/articles/nunit/release-notes/framework.html>, read 2026-11-13, summarized.
- [S13] NUnit, "Breaking changes", <https://docs.nunit.org/articles/nunit/release-notes/breaking-changes.html>, read 2026-11-13, summarized.
- [S18] Fluent Assertions, README of the repository, <https://github.com/fluentassertions/fluentassertions>, read 2026-11-13, summarized.
- [S19] NuGet Gallery, "AwesomeAssertions 9.6.0", 2026-08-20, <https://www.nuget.org/packages/AwesomeAssertions>, read 2026-11-13, summarized.
- [S20] NuGet Gallery, "Shouldly 4.3.0", <https://packages.nuget.org/packages/Shouldly>, read 2026-11-13, summarized.
- [S21] NuGet Gallery, "Moq 4.21.0", 2026-09-24, <https://www.nuget.org/packages/Moq>, read 2026-11-13, summarized.
- [S27] Microsoft, "Choosing a testing strategy", EF Core docs, updated 2023-01-30, <https://learn.microsoft.com/ef/core/testing/choosing-a-testing-strategy>, read 2026-11-13, CC BY 4.0, summarized.
- [S28] Microsoft, "Testing with FakeTimeProvider", Microsoft Learn, updated 2026-03-02, <https://learn.microsoft.com/dotnet/core/extensions/timeprovider-testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S33] VerifyTests, "Verify", README of the repository, <https://github.com/VerifyTests/Verify>, read 2026-11-13, summarized.
- [S34] coverlet-coverage, "coverlet", README of the repository, <https://github.com/coverlet-coverage/coverlet>, read 2026-11-13, summarized.
- [S35] Microsoft, "Code coverage extension of Microsoft.Testing.Platform", Microsoft Learn, updated 2026-11-06, <https://learn.microsoft.com/dotnet/core/testing/microsoft-testing-platform-extensions-code-coverage>, read 2026-11-13, CC BY 4.0, summarized.
