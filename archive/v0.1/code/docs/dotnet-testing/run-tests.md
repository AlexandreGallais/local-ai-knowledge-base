---
id: dotnet-testing-run-tests
title: Run .NET tests with dotnet test
topic: dotnet-testing
summary: Read the test runner in global.json, then run only your tests with the short output, in VSTest or MTP mode.
tool: dotnet
version: "11"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7, S14]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Run .NET tests with dotnet test

Contents: 1. Read the runner first · 2. Commands · 3. Exit codes · 4. Frameworks on the platform · Sources

## 1. Read the runner first (global.json)

`dotnet test` has two modes. The project chooses; you never change it. [S1] [S2]

| Point | VSTest mode | Microsoft.Testing.Platform (MTP) mode |
| --- | --- | --- |
| When | Default, every SDK | SDK .NET 10 and later, when `global.json` holds `"test": { "runner": "Microsoft.Testing.Platform" }` |
| Projects | VSTest projects; MTP projects through a legacy bridge | MTP projects only; a VSTest project is an error |
| Framework options | After `--` | Directly |
| TRX report | `--logger trx` | `--report-trx`, with `Microsoft.Testing.Extensions.TrxReport` |
| Coverage | `--collect:"XPlat Code Coverage"` | `--coverage` or `--coverlet`, through an extension of the project |

1. Read `global.json`. Look for `"runner"`.
2. Read the test project: the framework package (`xunit.v3`, `MSTest.Sdk`, `NUnit`, `TUnit`) and `OutputType`.
3. In MTP mode, the options depend on the extensions the test project references. An unknown option exits with code 5. [S2] [S3]

## 2. Commands (short output)

Run only the tests you wrote, then the whole test project. Keep the output in a file and read its end.

| Case | Command |
| --- | --- |
| MTP, one xUnit v3 class | `dotnet test --project <tests.csproj> --no-restore --no-progress --no-ansi --filter-class "<Namespace.Class>" > /tmp/test.log 2>&1; echo "exit=$?"` |
| MTP, one MSTest or NUnit class | Same, with `--filter "FullyQualifiedName~<Class>"` |
| MTP 2.4 and later | Add `--output Minimal`: failures only |
| VSTest | `dotnet test <tests.csproj> --no-restore --filter "FullyQualifiedName~<Class>" -v q > /tmp/test.log 2>&1; echo "exit=$?"` |
| Read the result | `tail -n 40 /tmp/test.log` |
| List the tests without running them | `--list-tests` |
| Stop after N failures (MTP) | `--maximum-failed-tests <N>` |

- xUnit v3 filters in MTP mode: `--filter-class`, `--filter-method`, `--filter-namespace`, `--filter-trait`. With SDK .NET 8 or 9, put them after `--`: `dotnet test -- --filter-class <Class>`. [S7]
- Since MTP 2.3, when the platform detects an AI tool, it drops the banner and shows the standard output of failed tests only. [S4]
- `--no-progress` is deprecated in MTP 2.3 for `--progress off`; both still work. [S3]

## 3. Exit codes (MTP mode)

| Code | Meaning | What to do |
| --- | --- | --- |
| 0 | Every test passed | Run the whole test project once |
| 2 | At least one test failed | Read the failure, fix the code under test |
| 3 | Timeout or interruption | Run fewer tests |
| 5 | Unknown option | Remove the option; the project lacks its extension |
| 8 | No test ran | Check the filter |
| 9 | Fewer tests than `--minimum-expected-tests` | Check the filter |
| 13 | `--maximum-failed-tests` reached | Read the first failures |

[S2]

## 4. Frameworks on the platform (2026-11)

| Framework | State | Project |
| --- | --- | --- |
| xUnit v3 | 4.0 (2026-08-14): MTP v2 by default | Package `xunit.v3` (or `xunit.v3.mtp-v2`), `OutputType` `Exe`; template `dotnet new xunit3` after `dotnet new install xunit.v3.templates` |
| MSTest 4 | MTP by default with `MSTest.Sdk` | `<Project Sdk="MSTest.Sdk/<version>">`; `<UseVSTest>true</UseVSTest>` goes back to VSTest |
| NUnit 4 and 5 | 5.0 (2026-09-27) | `NUnit3TestAdapter` 5.0 or later with `EnableNUnitRunner` for MTP |
| TUnit | MTP only | One package; assertions are all `await Assert.That(...)` |

[S5] [S6] [S14]

## Sources

- [S1] Microsoft, "Testing with 'dotnet test'", Microsoft Learn, updated 2026-09-12, <https://learn.microsoft.com/dotnet/core/testing/unit-testing-with-dotnet-test>, read 2026-11-13, CC BY 4.0, summarized.
- [S2] Microsoft, "dotnet test with Microsoft.Testing.Platform (MTP)", Microsoft Learn, updated 2026-09-21, <https://learn.microsoft.com/dotnet/core/tools/dotnet-test-mtp>, read 2026-11-13, CC BY 4.0, summarized.
- [S3] Microsoft, "Microsoft.Testing.Platform CLI options reference", Microsoft Learn, updated 2026-11-06, <https://learn.microsoft.com/dotnet/core/testing/microsoft-testing-platform-cli-options>, read 2026-11-13, CC BY 4.0, summarized.
- [S4] Microsoft, "Microsoft.Testing.Platform terminal output", Microsoft Learn, updated 2026-10-28, <https://learn.microsoft.com/dotnet/core/testing/microsoft-testing-platform-terminal-output>, read 2026-11-13, CC BY 4.0, summarized.
- [S5] xUnit.net, "Core Framework v3 4.0.0", release notes, 2026-08-14, <https://xunit.net/releases/v3/4.0.0>, read 2026-11-13, summarized.
- [S6] xUnit.net, "Getting Started with xUnit.net v3", <https://xunit.net/docs/getting-started/v3/getting-started>, read 2026-11-13, summarized.
- [S7] xUnit.net, "Microsoft Testing Platform support in xUnit.net v3", <https://xunit.net/docs/getting-started/v3/microsoft-testing-platform>, read 2026-11-13, summarized.
- [S14] Microsoft, "Microsoft.Testing.Platform support in NUnit (NUnit runner)", Microsoft Learn, <https://learn.microsoft.com/dotnet/core/testing/unit-testing-nunit-runner-intro>, read 2026-11-13, CC BY 4.0, summarized.
