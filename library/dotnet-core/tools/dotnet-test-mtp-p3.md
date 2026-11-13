---
title: "dotnet test command with Microsoft.Testing.Platform (MTP) (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-test-mtp.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet test command with Microsoft.Testing.Platform (MTP) (part 3 of 3)

## Forward arguments to the test application

`dotnet test` forwards any token it doesn't recognize to the test application. When a recognized option appears between an unrecognized option name and its value, removing the recognized option can change how the leftover tokens bind to options in the test application. To avoid this ambiguity, place test application arguments after a literal `--`:

```dotnetcli
dotnet test --results-directory TestResults -- --report-trx --report-trx-filename A.trx
```

The preceding example requires the `Microsoft.Testing.Extensions.TrxReport` package, either as a direct package reference or through a test SDK configuration that includes it.

The same parser behavior applies to `dotnet run` and `dotnet build`. For a detailed example, see Forward arguments to the application in the `dotnet run` reference.

## Whole-run and per-module minimums

For `--minimum-expected-tests`, the `--` separator determines the option's scope:

- Arguments *before* `--` are global. The `dotnet test` orchestrator interprets them for the whole run.
- Arguments *after* `--` are local. `dotnet test` forwards them to each test module, so each module applies them independently.

Because `--minimum-expected-tests` is available in both scopes, you can require a minimum for the whole run, for each module, or both:

```dotnetcli
dotnet test --minimum-expected-tests 5 -- --minimum-expected-tests 2
```

The preceding command requires at least 5 tests across the whole run and at least 2 tests in each test module.

The two scopes count skipped tests differently:

| Scope | Do skipped tests count toward the minimum? |
| --- | --- |
| Global | Yes. The `dotnet test` aggregated total includes skipped tests. |
| Per module | No. MTP excludes skipped tests from the number of tests that ran. |

Starting with the .NET 11 SDK, the zero-tests verdict for the whole run is decided once from the aggregated results. A module that matches no tests, for example because of `--test-modules` or a global `--filter`, exits with code 8 (`ZeroTests`), but that code is normalized to success before the results are aggregated. As a result, a single empty module doesn't fail the whole run, although the module keeps its `Exit code: 8` diagnostic in the output for visibility.

MTP 2.3.0 and later versions provide `--zero-tests-policy <allow-skipped|strict>`. The default value, `allow-skipped`, lets an all-skipped module succeed. The `strict` value treats skipped tests as not run, so an all-skipped module exits with code 8. Pass the option after `--` to forward it to each test module:

```dotnetcli
dotnet test -- --zero-tests-policy strict
```

When you don't set a global minimum, the .NET 11 SDK determines the whole-run zero-tests verdict separately. An all-skipped whole run exits with code 8 regardless of the per-module `--zero-tests-policy` value.

When you specify `--minimum-expected-tests` and the minimum isn't met, the run fails with exit code 9 (`MinimumExpectedTestsPolicyViolation`). This code is distinct from 8 so that a stricter global or per-module minimum isn't confused with an empty module. For a per-module minimum to return code 9 when the module runs zero tests, the test module must use MTP 2.3.0 or a later version.

> **Note:**
> `--minimum-expected-tests 0` is invalid. To suppress the zero-tests exit code, use `--ignore-exit-code 8`.

Starting with .NET 11, `--tl`, `--terminallogger`, and `--tlp` are forwarded to MSBuild instead of the test application. Starting with .NET 12 Preview 1, the recognized `-mt` and `-multiThreaded` forms are also forwarded to MSBuild. To pass an application option with one of these names, place it after `--`.

Pass <example-value> options such as `--help` and `--list-tests` directly to `dotnet test`. Starting with .NET 11, the SDK validates the execution mode negotiated with the test application. If a launch profile or `TestingPlatformCommandLineArguments` injects one of these options, the requested SDK operation and the application operation don't match, and the run fails with a diagnostic.

## Examples

- Run the tests in the project or solution in the current directory:

  ```dotnetcli
  dotnet test
  ```

- Run the tests in the `TestProject` project:

  ```dotnetcli
  dotnet test --project ./TestProject/TestProject.csproj
  ```

- Run the tests in the `TestProjects` solution:

  ```dotnetcli
  dotnet test --solution ./TestProjects/TestProjects.sln
  ```

- Run the tests using `TestProject.dll` assembly:

  ```dotnetcli
  dotnet test --test-modules "**/bin/**/Debug/net10.0/TestProject.dll"
  ```

- Run the tests using `TestProject.dll` assembly with the root directory:

  ```dotnetcli
  dotnet test --test-modules "**/bin/**/Debug/net10.0/TestProject.dll" --root-directory "c:\code"
  ```

- Run all test projects referenced by a traversal project with .NET 11 or later:

  ```dotnetcli
  dotnet test dirs.proj
  ```

- List tests as JSON with .NET 11 or later:

  ```dotnetcli
  dotnet test --list-tests json
  ```

- Run a C# file-based MTP test app with .NET 12 Preview 1 or later:

  ```dotnetcli
  dotnet test App.Tests.cs
  ```

- Run the tests in the current directory with the Microsoft Code Coverage extension. The test application must reference `Microsoft.Testing.Extensions.CodeCoverage`, either directly or through a test SDK configuration that includes it:

  ```dotnetcli
  dotnet test --coverage
  ```

- Run the tests and store results in a specific directory:

  ```dotnetcli
  dotnet test --results-directory ./TestResults
  ```

- Run the tests with diagnostic output in a specific directory:

  ```dotnetcli
  dotnet test --diagnostic-output-directory ./Diagnostics
  ```

- Run the tests ensuring at least 10 tests are executed:

  ```dotnetcli
  dotnet test --minimum-expected-tests 10
  ```

- Require at least 5 tests across the whole run and at least 2 tests in each test module:

  ```dotnetcli
  dotnet test --minimum-expected-tests 5 -- --minimum-expected-tests 2
  ```

- Run the tests in the `TestProject` project, providing the `-bl` (binary log) argument to `msbuild`:

  ```dotnetcli
  dotnet test --project ./TestProject/TestProject.csproj -bl
  ```

- Run the tests in the `TestProject` project, setting the MSBuild `DefineConstants` property to `DEV`:

  ```dotnetcli
  dotnet test --project ./TestProject/TestProject.csproj -p:DefineConstants="DEV"
  ```

## See also

- Frameworks and Targets
- .NET Runtime Identifier (RID) catalog
- MTP
- MTP features
- MTP CLI options
- Run and debug MTP tests
- Run tests with MSTest
- MSTest SDK configuration
- dotnet test
- dotnet test with VSTest
