---
title: "Migration guide from VSTest to Microsoft.Testing.Platform (MTP) (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/migrating-vstest-microsoft-testing-platform.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Migration guide from VSTest to Microsoft.Testing.Platform (MTP) (part 2 of 2)

## Behavioral differences between VSTest and MTP

### Running zero tests

If a test assembly ran zero tests, VSTest tolerates that and exits with success. However, MTP fails with exit code 8. There are multiple ways to work around this:

- Pass `--ignore-exit-code 8` when running your tests.
- If you want to ignore that exit code for a specific test project, add the following in the project file:

  ```xml
  <PropertyGroup>
    <TestingPlatformCommandLineArguments>$(TestingPlatformCommandLineArguments) --ignore-exit-code 8</TestingPlatformCommandLineArguments>
  </PropertyGroup>
  ```

- Use the `TESTINGPLATFORM_EXITCODE_IGNORE` environment variable.

### Console.InputEncoding preservation

If you run your tests in a console where the codepage was explicitly changed (for example, in Azure DevOps, the codepage is set to 65001 which corresponds to UTF8), the behavior can be different between VSTest and MTP.

- With MTP, that encoding is always preserved.
- With VSTest not running in isolation mode (the default behavior of vstest.console), that encoding is preserved, similar to MTP.
- With VSTest running in isolation mode (the default behavior of `dotnet test`), that encoding isn't preserved in the testhost, which is the process that runs the tests.

> **Tip:**
> The reason the encoding isn't preserved with VSTest isolation mode is that the testhost process is started with `CreateNoWindow = true`. So it's not attached to the original console.

If you have a test that starts yet another child process and redirects its standard output, you might face issues if all the following apply:

- The console codepage is set to 65001 (UTF8). This can be the case on CI but generally not locally. To get a local behavior similar to in CI, run `chcp 65001` before running the tests.
- The child process is started with non-UTF8 encoding. This can also happen if your own test also sets `CreateNoWindow = true`.

This is especially problematic when the child process doesn't expect to see the UTF8 BOM (Byte-Order-Mark) byte, which it might get in the previous scenario on .NET Framework.

As this behavior difference is likely to be problematic specifically for the BOM byte, a workaround is to set InputEncoding during assembly initialization to UTF8 without BOM:

```csharp
Console.InputEncoding = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false);
```

A different workaround for that is to not use `CreateNoWindow = true` for child processes that redirect standard input.
