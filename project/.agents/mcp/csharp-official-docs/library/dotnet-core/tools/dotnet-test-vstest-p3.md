---
title: "dotnet test command with VSTest (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-test-vstest.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet test command with VSTest (part 3 of 3)

The list of possible arguments depends upon the specified behavior:
  - When you specify a project, solution, or a directory, or if you omit this argument, the call is forwarded to `msbuild`. In that case, the available arguments can be found in the dotnet msbuild documentation.
  - When you specify a *.dll* or an *.exe*, the call is forwarded to `vstest`. In that case, the available arguments can be found in the dotnet vstest documentation.

- **`RunSettings`** arguments

 Inline `RunSettings` are passed as the last arguments on the command line after "-- " (note the space after --). Inline `RunSettings` are specified as `[name]=[value]` pairs. A space is used to separate multiple `[name]=[value]` pairs.

  Example: `dotnet test -- MSTest.DeploymentEnabled=false MSTest.MapInconclusiveToFailed=True`

  Starting with the .NET 5 SDK, you can also set `TestRunParameters` from the command line, for example: `dotnet test -- TestRunParameters.Parameter(name="myParam", value="value")`. `RunSettings` arguments take precedence over values from a `.runsettings` file.

  For more information, see Passing RunSettings arguments through command line.

## Examples

- Run the tests in the project in the current directory:

  ```dotnetcli
  dotnet test
  ```

- Run the tests in the `test1` project:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj
  ```

- Run the tests using `test1.dll` assembly:

  ```dotnetcli
  dotnet test ~/projects/test1/bin/debug/test1.dll
  ```

- Run the tests in the project in the current directory, and generate a test results file in the trx format:

  ```dotnetcli
  dotnet test --logger trx
  ```

- Run the tests in the project in the current directory, and generate a code coverage file using Microsoft Code Coverage:

  ```dotnetcli
  dotnet test --collect "Code Coverage"
  ```

- Run the tests in the project in the current directory, and generate a code coverage file using Coverlet (after installing Coverlet collectors integration):

  ```dotnetcli
  dotnet test --collect:"XPlat Code Coverage"
  ```

- Run the tests in the project in the current directory, and log with detailed verbosity to the console:

  ```dotnetcli
  dotnet test --logger "console;verbosity=detailed"
  ```

- Run the tests in the project in the current directory, and log with the trx logger to *testResults.trx* in the *TestResults* folder:

  ```dotnetcli
  dotnet test --logger "trx;logfilename=testResults.trx"
  ```

  Since the log file name is specified, the same name is used for each target framework in the case of a multi-targeted project. The output for each target framework overwrites the output for preceding target frameworks. The file is created in the *TestResults* folder in the test project folder, because relative paths are relative to that folder. The following example shows how to produce a separate file for each target framework.

- Run the tests in the project in the current directory, and log with the trx logger to files in the *TestResults* folder, with file names that are unique for each target framework:

  ```dotnetcli
  dotnet test --logger:"trx;LogFilePrefix=testResults"
  ```

- Run the tests in the project in the current directory, and log with the html logger to *testResults.html* in the *TestResults* folder:

  ```dotnetcli
  dotnet test --logger "html;logfilename=testResults.html"
  ```

- Run the tests in the project in the current directory, and report tests that were in progress when the test host crashed:

  ```dotnetcli
  dotnet test --blame
  ```

- Run the tests in the `test1` project, providing the `-bl` (binary log) argument to `msbuild`:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj -bl
  ```

- Run the tests in the `test1` project, setting the MSBuild `DefineConstants` property to `DEV`:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj -p:DefineConstants="DEV"
  ```

- Run the tests in the `test1` project, setting the MSBuild `TestTfmsInParallel` property to `false`:

  ```dotnetcli
  dotnet test ~/projects/test1/test1.csproj -p:TestTfmsInParallel=false
  ```

## Filter option details

`--filter <EXPRESSION>`

`<Expression>` has the format `<property><operator><value>[|&<Expression>]`.

`<property>` is an attribute of the `Test Case`. The following are the properties supported by popular unit test frameworks:

| Test Framework | Supported properties                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| MSTest         | FullyQualifiedNameNameClassNamePriorityTestCategory |
| xUnit          | FullyQualifiedNameDisplayNameTraits                                   |
| NUnit          | FullyQualifiedNameNamePriorityTestCategoryCategoryProperty |

For xUnit, a trait defined with `[Trait("key", "value")]` is filtered by its key (for example, `[Trait("Category", "bvt")]` is matched with `--filter Category=bvt`). For NUnit, `TestCategory` and `Category` are equivalent, and a property defined with `[Property("key", "value")]` is filtered by its key.

The `<operator>` describes the relationship between the property and the value:

| Operator | Function        |
| :------: | --------------- |
| `=`      | Exact match     |
| `!=`     | Not exact match |
| `~`      | Contains        |
| `!~`     | Not contains    |

`<value>` is a string. All the lookups are case insensitive.

An expression without an `<operator>` is automatically considered as a `contains` on `FullyQualifiedName` property (for example, `dotnet test --filter xyz` is same as `dotnet test --filter FullyQualifiedName~xyz`).

Expressions can be joined with conditional operators:

| Operator            | Function |
| ------------------- | -------- |
| `&#124;` | OR       |
| `&`                 | AND      |

You can enclose expressions in parenthesis when using conditional operators (for example, `(Name~TestMethod1) | (Name~TestMethod2)`).

For more information and examples on how to use selective unit test filtering, see Running selective unit tests.

## Exit codes

When you run tests through the VSTest path, `dotnet test` reports the outcome with one of two exit codes:

| Exit code | Meaning |
| --------- | ------- |
| `0` | Success. The requested operation completed and, for a test run, all executed tests passed. |
| `1` | Failure. For example, one or more tests failed, a run error was reported, the command line was invalid, a test source couldn't be loaded, or the run was aborted or canceled. |

The underlying `vstest.console` process never returns any other value.

When discovery finds no matching tests, the run prints a warning rather than an error and still returns `0` by default. To make a run that discovers or selects zero tests return `1` instead, set `RunConfiguration.TreatNoTestsAsError` to `true` in a `.runsettings` file.

## See also

- Frameworks and Targets
- .NET Runtime Identifier (RID) catalog
- Passing runsettings arguments through commandline
- VSTest environment variables (microsoft/vstest)
- dotnet test
- dotnet test with MTP
