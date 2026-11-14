---
title: "dotnet test command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-test.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet test

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet test` - .NET test driver used to execute unit tests.

## Description

The `dotnet test` command builds the solution and runs the tests with either VSTest or Microsoft Testing Platform (MTP). The test runner you use determines the available command-line options and behavior.

> **Note:**
> Test runner selection is available starting with .NET 10 SDK. In earlier versions of .NET, tests are always executed with VSTest.

### Choose a test runner

With the .NET 10 SDK and later versions, select Microsoft.Testing.Platform (MTP) in the `global.json` file:

```json
{
    "test": {
        "runner": "Microsoft.Testing.Platform"
    }
}
```

> **Note:**
> `VSTest` is a valid value for test runner. It is the current default and can be omitted.
>
> **Important:**
> The `dotnet test` experience for MTP is only supported in `Microsoft.Testing.Platform` version 1.7 and later.

Starting with .NET 11, set the `DOTNET_TEST_RUNNER` environment variable to select the runner without changing `global.json`. The environment variable accepts `VSTest` or `Microsoft.Testing.Platform`, without regard to case, and overrides the `global.json` value:

```powershell
$env:DOTNET_TEST_RUNNER = "Microsoft.Testing.Platform"
dotnet test
```

```bash
DOTNET_TEST_RUNNER=Microsoft.Testing.Platform dotnet test
```

If the environment variable is empty or contains an unrecognized value, `dotnet test` uses the `global.json` value. If neither setting selects a runner, `dotnet test` uses VSTest.

### Test runner documentation

The available command-line options, behavior, and capabilities differ depending on which test runner you use:

- **dotnet test with VSTest** - The traditional test platform, available in .NET 6 SDK and later. This is the default and only test runner in versions earlier than .NET 10 SDK. Provides comprehensive test discovery, filtering, and result reporting capabilities.

- **dotnet test with MTP** - The modern testing platform, available in .NET 10 SDK and later. Offers faster test execution and more flexible test module selection.

> **Tip:**
> For conceptual documentation about `dotnet test`, see Testing with dotnet test.

## See also

- Testing with dotnet test
- dotnet test with VSTest
- dotnet test with MTP
- Microsoft.Testing.Platform overview
- Run tests with MSTest
- Frameworks and Targets
- .NET Runtime Identifier (RID) catalog
