---
title: "Microsoft.Testing.Platform (MTP) test reports (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-test-reports.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Test reports

Each report option requires the extension package named in its section. Add the package directly, or use a test SDK configuration or profile that includes it. Report extensions aren't part of MTP core, so an option such as `--report-trx` is unrecognized when the test application doesn't register its extension. Run the test application with `--help`, or run `dotnet test --help` in MTP mode, to confirm that an option is available.

> **Tip:**
> When using Microsoft.Testing.Platform.MSBuild (included transitively by MSTest, NUnit, and xUnit runners), these extensions are auto-registered when you install their NuGet packages — no code changes needed. The manual registration specified in this article is only required if you disabled the auto-generated entry point by setting `<GenerateTestingPlatformEntryPoint>false</GenerateTestingPlatformEntryPoint>`.

## Report file names

Every report extension writes its file to the test results directory, which you can set with the `--results-directory` option. To override the name, use the matching `--report-*-filename` option. Each report section lists the default name for that report.

To isolate reports with the same relative file name in a multi-module `dotnet test` run, use the SDK's `--results-directory-layout per-module` option before `--`.

A file name can include a relative path that stays within the test results directory, and it can use the following replacement items (placeholders):

| Placeholder | Description |
|---|---|
| `{asm}` | Entry assembly name, or `unknown` when it's unavailable. |
| `{tfm}` | Target framework moniker detected at runtime, such as `net9.0`. |
| `{arch}` | Process architecture, such as `x64`, `x86`, or `arm64`. |
| `{pname}` | Process name. |
| `{pid}` | Process ID. |
| `{time}` | High-precision timestamp. |

For example, `--report-trx-filename "{asm}_{tfm}_{arch}.trx"` reproduces the default TRX name.

If a default or explicit TRX, HTML, or JUnit file name already exists for a test source, the extension warns and overwrites the file. Starting with MTP 2.4, CTRF uses the same behavior. To retain report history, include `{time}`.

> **Note:**
> Placeholder names are case-sensitive and use lowercase. Placeholder support for report file names is available in MTP starting with version 2.3.0.

## Report consolidation

Starting with MTP 2.4.0, MTP automatically post-processes report artifacts after retry support runs multiple attempts. For a `dotnet test` invocation that runs multiple test modules, automatic post-processing also requires .NET 11 or later. The feature is experimental in MTP 2.4.0.

The TRX, JUnit, CTRF, and HTML extensions group compatible artifacts by report kind and write a consolidated report under the test results directory's `merged` subdirectory. CTRF consolidation combines module results and collapses retry attempts into the final test result with retry history. HTML consolidation creates a merged summary and preserves the original per-process reports.

For custom report extensions, the experimental `IArtifactPostProcessor` API exposes separate `TestModules` and `RetryAttempts` processing modes. For more information, see The `IArtifactPostProcessor` extensions.

To disable multi-module artifact post-processing, pass `--no-artifact-post-processing` to `dotnet test`.

## Visual Studio test reports (TRX)

The Visual Studio test result file (or TRX) is the default format for publishing test results. This extension requires the Microsoft.Testing.Extensions.TrxReport NuGet package.

If you author a test framework, implement `ITrxReportCapability` to supply test-class, category, failure, and output metadata. The report package alone doesn't add framework-specific data to your test nodes.

### Manual registration

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
builder.AddTrxReportProvider();
```

> **Note:**
> When using manual registration, register the TRX report provider last. The current implementation depends on registration order, so registering it after all other extensions ensures it captures all test data.

> **Note:**
> Available in MTP starting with version 1.9.0, the TRX report includes the test `Description` field.

> **Note:**
> Available in MTP starting with version 2.3.0, TRX results stream to disk as the run progresses. If the test host crashes, the TRX file keeps the results collected before the crash.
>
> Starting with MTP 2.4, TRX uses controller-backed recovery by default when the platform has a test-host controller. Browser, WASI, iOS, and tvOS use the in-process compatibility path.
>
> Starting with MTP 2.4, an MTP-generated TRX preserves MSTest `[WorkItem]` and `[GitHubWorkItem]` metadata.

### Options

| Option | Description |
|---|---|
| `--report-trx` | Generates the TRX report. |
| `--report-trx-filename` | The name of the generated TRX report. Starting with MTP 2.3.0, the default is the deterministic `{asm}_{tfm}_{arch}.trx` form; before MTP 2.3.0, the default was `<UserName>_<MachineName>_<yyyy-MM-dd_HH_mm_ss.fffffff>.trx`. To customize the name, see Report file names. |

The report is saved inside the default _TestResults_ folder that can be specified through the `--results-directory` command line argument.

### Merge TRX files manually

The TRX extension also registers non-test commands. The following commands are available in version 2.5.1; run your test application's `--info` option to discover the commands in your installed version.

To combine existing reports without another test run, pass `merge-trx` as the first positional argument to the test application:

```dotnetcli
dotnet exec Tests.dll merge-trx --input first.trx second.trx --output-trx combined.trx
```

`--input` requires at least two existing `.trx` files. `--output-trx` specifies the output path, which must end in `.trx`. Use absolute paths or paths relative to the current directory. A successful merge returns exit code `0`.

This command is separate from automatic report consolidation. It doesn't execute tests or require `--report-trx`. Don't combine the tool command with test-run options such as `--list-tests`.

### Compare TRX results

To compare test names and outcomes from two existing reports, use `ms-trxcompare`:

```dotnetcli
dotnet exec Tests.dll ms-trxcompare --baseline-trx baseline.trx --trx-to-compare current.trx
```

Both file options are required and must identify existing `.trx` files. The command returns `0` when the test names and outcomes match. Missing tests, duplicate test-name matches, or different outcomes cause comparison failure and exit code `1`. The comparison isn't a byte-for-byte comparison of report files and doesn't establish that durations, attachments, or other metadata match.

To inspect registered command names and their option providers, run `dotnet exec Tests.dll --info`. Invoke these commands through the test application, not through `dotnet tool`.

> **Note:**
> The public `ITool` authoring API and artifact post-processing APIs remain experimental and use the `TPEXP` diagnostic ID. The commands don't require you to implement or reference the internal TRX tool classes.

## HTML reports

The HTML report creates an interactive, self-contained HTML file for a test session. This extension requires the Microsoft.Testing.Extensions.HtmlReport NuGet package.

> **Note:**
> Available in MTP starting with version 2.3.0. This extension is experimental, and its options and output format might change in a future version.

### Manual registration

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
builder.AddHtmlReportProvider();
```

### Options

| Option | Description |
|---|---|
| `--report-html` | Generates the HTML report. |
| `--report-html-filename` | The name of the generated HTML report. The value must end with `.html`. The default is `{asm}_{tfm}_{arch}.html`. To customize the name, see Report file names. Requires `--report-html`. |

## JUnit reports

The JUnit report creates a JUnit-compatible XML file for a test session. This extension requires the Microsoft.Testing.Extensions.JUnitReport NuGet package.

> **Note:**
> Available in MTP starting with version 2.3.0. This extension is experimental, and its options and output format might change in a future version.
>
> Starting with MSTest.Sdk 4.3, enable this extension with `<EnableMicrosoftTestingExtensionsJUnitReport>true</EnableMicrosoftTestingExtensionsJUnitReport>`. The extension isn't part of the `Default` or `AllMicrosoft` MSTest.Sdk profiles.

### Manual registration

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
builder.AddJUnitReportProvider();
```

### Options

| Option | Description |
|---|---|
| `--report-junit` | Generates the JUnit XML report. |
| `--report-junit-filename` | The name of the generated JUnit XML report. The value must end with `.xml`. The default is `{asm}_{tfm}_{arch}.xml`. To customize the name, see Report file names. Requires `--report-junit`. |

## CTRF reports

The CTRF report creates a JSON file that uses the Common Test Report Format for a test session. This extension requires the Microsoft.Testing.Extensions.CtrfReport NuGet package.

> **Note:**
> Available in MTP starting with version 2.3.0. This extension is experimental, and its options and output format might change in a future version.

### Manual registration

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
builder.AddCtrfReportProvider();
```

### Options

| Option | Description |
|---|---|
| `--report-ctrf` | Generates the CTRF JSON report. |
| `--report-ctrf-filename` | The name of the generated CTRF JSON report. The value must end with `.json`. The default is `<UserName>_<MachineName>_<assembly>_<tfm>_<timestamp>.ctrf.json`. To customize the name, see Report file names. Requires `--report-ctrf`. |

Starting with MTP 2.4, CTRF preserves every result when multiple tests use the same UID. It also includes per-test and prior-attempt attachments and infers their MIME types from file names.

For retried tests, CTRF correlates attempts only when the relationship is unambiguous. It then records earlier attempts in `retryAttempts`, sets `retries`, and marks a later successful result as `flaky: true`. Ambiguous same-UID results remain separate so the report doesn't associate diagnostics with the wrong test.

Starting with MTP 2.5 preview, `testId` derives from the framework's complete MTP test node UID. The reporter escapes values in its reserved identity namespaces and uses a deterministic SHA-256 identity for long UIDs instead of truncating them. Each reported execution receives a new UUID in `executionId`, and earlier retry attempts receive their own `attemptId`. The compatibility field `extra.uid` retains the original MTP UID. Attachment paths remain opaque values and can point to local files that a remote consumer can't access.

The terminal summary identifies flaky and retried tests. TRX and JUnit reports keep one final result per test instead of recording every attempt.
