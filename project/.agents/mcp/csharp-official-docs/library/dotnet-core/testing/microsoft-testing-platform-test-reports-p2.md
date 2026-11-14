---
title: "Microsoft.Testing.Platform (MTP) test reports (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-test-reports.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform (MTP) test reports (part 2 of 2)

## Azure DevOps reports

The Azure DevOps report extension integrates MTP test runs with Azure Pipelines. It formats errors and warnings for pipeline logs, adds annotations for failed and skipped tests, creates a Markdown job summary, and can group output by test assembly. The extension can also identify flaky or quarantined failures, upload test artifacts, and stream results to an Azure DevOps test run.

When you host your code on GitHub but run tests on Azure Pipelines agents, failure annotations can appear directly in the GitHub pull request:

This extension requires the Microsoft.Testing.Extensions.AzureDevOpsReport NuGet package.

### Manual registration

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
builder.TestHost.AddAzureDevOpsProvider();
```

### Options

| Option | MTP version | Description |
|---|---|---|
| `--report-azdo` | 1.9.0 | Enables the Azure DevOps report generator. Errors and warnings are written to the output in a format that Azure DevOps understands. |
| `--report-azdo-severity` | 1.9.0 | Severity to use for reported events. Valid values are `error` (default) and `warning`. |
| `--report-azdo-groups` | 2.4.0 | Enables or disables per-assembly log groups. When enabled, each test assembly's output appears in a collapsible section of the Azure Pipelines log. Valid values are `on` and `off`. MTP 2.4.0 preview builds default to `on`; the stable MTP 2.4.0 release defaults to `off`. Requires `--report-azdo`. |
| `--report-azdo-annotations` | 2.4.0 | Enables or disables annotations for failed and skipped tests. Valid values are `on` (default) and `off`. Requires `--report-azdo`. |
| `--report-azdo-flaky-history` | 2.3.0 | Queries Azure DevOps test result history for the past N days (1-90) and annotates reported failures with flakiness context. Requires `--report-azdo`. |
| `--report-azdo-demote-known-flaky` | 2.3.0 | Demotes failures that are flaky enough in the Azure DevOps history window (default threshold is 25%) from errors to warnings. Requires `--report-azdo` and `--report-azdo-flaky-history`. |
| `--report-azdo-slow-test-history` | 2.3.0 | Queries Azure DevOps test result history for the specified number of days and lowers the per-test still-running threshold for tests with a known short runtime. Accepts exactly one integer from 1 through 90. With enough historical samples, the threshold is the lower of 60 seconds and the historical p99 duration multiplied by the configured multiplier. Requires `--report-azdo`. |
| `--report-azdo-slow-test-history-min-sample` | 2.3.0 | Sets the minimum number of historical samples required before the extension uses a test's history to adjust its slow-test threshold or add history details to slow-test output lines. Accepts exactly one integer greater than or equal to 1. The default is 10. Requires `--report-azdo-slow-test-history`. |
| `--report-azdo-slow-test-history-multiplier` | 2.3.0 | Sets the multiplier applied to a test's historical p99 duration to calculate its slow-test threshold. Accepts exactly one invariant-culture floating-point value greater than 0 and at most 10,000. The default is 3. Requires `--report-azdo-slow-test-history`. |
| `--report-azdo-quarantine-file` | 2.3.0 | Path to a text file that lists quarantined test fully qualified names or glob patterns. Matching failures are reported as warnings. Requires `--report-azdo`. |
| `--report-azdo-summary` | 2.3.0 | Writes a Markdown job summary at the end of the test run and uploads it through `##vso[task.uploadsummary]`. An optional file path argument overrides the default location (`{testResultsDir}/azdo-summary-{assembly}-{tfm}-{arch}.md`). Requires `--report-azdo`. |
| `--report-azdo-stackframe-filter` | 2.3.0 | Adds regex patterns, matched against the fully qualified type prefix of each stack frame, that are skipped when the extension locates the user's call site to annotate. The option is repeatable, up to 16 patterns, and each pattern is compiled with a 500-ms match timeout. These patterns are additive to the extension's built-in MSTest assertion-implementation prefixes. Requires `--report-azdo`. |
| `--report-azdo-upload-artifacts` | 2.3.0 | Uploads test result files and/or adds build tags to Azure DevOps. Valid values are `off` (default), `tags-only`, `files`, and `all`. |
| `--report-azdo-upload-artifact-include` | 2.3.0 | Includes files in the Azure DevOps artifact upload using glob patterns relative to the test results directory. Defaults to `**/*`. Requires `--report-azdo-upload-artifacts` to be a value other than `off`. |
| `--report-azdo-upload-artifact-exclude` | 2.3.0 | Excludes files from the Azure DevOps artifact upload using glob patterns relative to the test results directory. Requires `--report-azdo-upload-artifacts` to be a value other than `off`. |
| `--report-azdo-upload-artifact-name` | 2.3.0 | Overrides the Azure DevOps artifact container name. Defaults to `TestResults_{assemblyName}_{tfm}`. Requires `--report-azdo-upload-artifacts` to be a value other than `off`. |
| `--publish-azdo-test-results` | 2.3.0 | Streams results to an Azure DevOps test run as tests complete. The build's **Tests** tab lists the completed run. |
| `--publish-azdo-run-name` | 2.3.0 | Sets a custom Azure DevOps test run name for live test-result publishing. Requires `--publish-azdo-test-results`. |

> **Warning:**
> Don't enable groups when multiple test assemblies run in parallel. Azure DevOps `##[group]` and `##[endgroup]` formatting commands are sequential and anonymous. Concurrent assembly output can interleave, cause incorrect group nesting, and put lines under the wrong assembly. If you use an MTP 2.4.0 preview build, pass `--report-azdo-groups off` to disable groups. The stable MTP 2.4.0 release disables groups by default. Pass `--report-azdo-groups on` only for a single assembly or serialized assembly execution.

> **Note:**
> The **MTP version** column lists the first MTP version that contains each option. The Azure DevOps extension itself became stable in MTP 1.9.0 with `--report-azdo` and `--report-azdo-severity`; the remaining options were added in MTP 2.3.0 or 2.4.0.

The extension automatically detects that it runs in a continuous integration (CI) environment by checking the `TF_BUILD` environment variable.

> **Important:**
> Azure DevOps history queries require `TF_BUILD=true`, `SYSTEM_COLLECTIONURI`, `SYSTEM_TEAMPROJECT`, `SYSTEM_ACCESSTOKEN`, and `BUILD_DEFINITIONID`. If any value is missing, MTP continues without history data, skips flaky-history annotations, and uses the static 60-second threshold for slow-test lines.
>
> Live publishing with `--publish-azdo-test-results` requires `TF_BUILD=true`, `SYSTEM_COLLECTIONURI`, `SYSTEM_TEAMPROJECT`, `SYSTEM_ACCESSTOKEN`, and `BUILD_BUILDID`. If any value is missing or invalid, MTP warns and doesn't publish the test run.

Starting with MTP 2.4.0, Azure DevOps Markdown summaries aggregate results across every test module in a `dotnet test` invocation. When you also enable code coverage, the summary includes covered and total counts, percentages, threshold results, and an indicator when coverage data is partial.

Starting with MTP 2.5 preview, the summary also presents pass rates, flaky-test history, duration comparisons, test dependency edges, focused failure diagnostics, and a compact deterministic layout for multi-module runs.

Starting with MTP 2.4, live publishing automatically uploads file attachments for unsuccessful results to Azure DevOps test results. Unsuccessful outcomes include failed, errored, timed-out, and canceled results.

When a result supplies standard output or standard error, the extension can attach up to 256 KiB of each inline stream. Each file-backed attachment has a 16-MiB limit.

The extension also uploads run-level `.coverage`, `.cobertura.xml`, and `.opencover.xml` files as code coverage attachments. These test-run and result attachments are separate from `--report-azdo-upload-artifacts`, which uploads selected files as Azure Pipelines build artifacts.

For retried tests, Azure DevOps publishes prior attempts as subresults and attaches each attempt's artifacts to the subresult that produced them. If safe retry correlation isn't available, the extension publishes a separate result instead of dropping it.

When live publishing creates the run, it prints the run URL so you can follow results before completion. It also sends `pipelineReference` and the start date when the pipeline environment provides them. The build's **Tests** tab doesn't list an in-progress run; it lists the run after completion.

## GitHub Actions reports

The GitHub Actions report emits GitHub Actions-native workflow commands so test runs produce a first-class experience on the runner: per-assembly log groups, failed and skipped test annotations (surfaced in the workflow **Annotations** tab and, when the source location resolves, on the pull request's **Files changed** diff), a Markdown job summary appended to the file referenced by `GITHUB_STEP_SUMMARY`, and slow-test notices.

This extension requires the Microsoft.Testing.Extensions.GitHubActionsReport NuGet package.

The extension activates only when the run is on GitHub Actions (the `GITHUB_ACTIONS` environment variable is `true`) and the `--report-gh` switch is set; otherwise it does nothing. When active, each feature is enabled by default and can be turned off individually with its `--report-gh-*` option.

> **Important:**
> The `--report-gh` option belongs to `Microsoft.Testing.Extensions.GitHubActionsReport`. The GitHubActionsTestLogger package provides a different option, `--report-github`. The options aren't aliases and work only when the test project registers the package that owns the option.

> **Note:**
> The extension is available starting with MTP 2.3.0. Starting with MTP 2.4.0, its public entry points are no longer experimental.

### Manual registration

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);
builder.AddGitHubActionsProvider();
```

### Options

| Option | MTP version | Description |
|---|---|---|
| `--report-gh` | 2.3.0 | Enables the GitHub Actions report generator so test runs emit workflow commands. Requires the run to be on GitHub Actions. |
| `--report-gh-groups` | 2.3.0 | Enables or disables per-assembly log groups. Valid values are `on` (default) and `off`. Requires `--report-gh`. |
| `--report-gh-annotations` | 2.3.0 | Enables or disables annotations for failed and skipped tests. Valid values are `on` (default) and `off`. Requires `--report-gh`. |
| `--report-gh-step-summary` | 2.3.0 | Controls whether the extension writes a Markdown job summary to the file referenced by `GITHUB_STEP_SUMMARY`. Valid values are `on` (default), `off`, and, starting with MTP 2.4.0, `on-failure`. Requires `--report-gh`. |
| `--report-gh-step-summary-sections` | 2.4.0 | Selects summary content. Valid values are `test-results`, `slow-tests`, `coverage`, and `all` (default). Requires `--report-gh` and a summary mode other than `off`. |
| `--report-gh-failure-details` | 2.4.0 | Enables or disables bounded failure details in the job summary. Use `on` (default) or `off`. Details include the message, exception type, source location, and stack trace when available. Requires `--report-gh`. |
| `--report-gh-history` | 2.4.0 | Reads and updates a bounded local test-history snapshot at the specified file path. The workflow must download the previous snapshot before the run and upload the updated file afterward. Requires `--report-gh`. |
| `--report-gh-history-window` | 2.4.0 | Sets the retained history window from 1 through 90 days. The default is 30 days. Requires `--report-gh-history`. |
| `--report-gh-slow-test-notices` | 2.3.0 | Enables or disables slow-test notices. Valid values are `on` (default) and `off`. Requires `--report-gh`. |
| `--report-gh-slow-test-threshold` | 2.3.0 | The duration a test can run before a slow-test notice is emitted. Accepts a bare number of seconds or a value with a unit suffix such as `90s`, `2m`, or `1.5h`. The default is `60s`. Requires `--report-gh`. |

Starting with MTP 2.4.0, GitHub Actions Markdown summaries aggregate results across every test module in a `dotnet test` invocation. When you also enable code coverage, select `coverage` or `all` to include covered and total counts, percentages, threshold results, and an indicator when coverage data is partial.

Failure details stay within bounded message, stack, failure-count, and whole-summary budgets. When content exceeds a limit, the report truncates or condenses it and states that reduction in the summary.
