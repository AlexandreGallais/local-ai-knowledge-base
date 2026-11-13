---
title: "Use code coverage for unit testing (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-code-coverage.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use code coverage for unit testing (part 2 of 2)

## Code coverage with Microsoft.Testing.Platform

Microsoft.Testing.Platform (MTP) is a lightweight and portable alternative to VSTest for running tests. MSTest, NUnit, and xUnit.net support MTP through their runners, and TUnit supports only MTP. Projects that run on MTP collect code coverage with an MTP extension instead of a VSTest data collector. This section uses the Microsoft code coverage extension. For Coverlet, see Code coverage.

### Add the code coverage extension

Add the Microsoft.Testing.Extensions.CodeCoverage package to your test project:

```dotnetcli
dotnet add package Microsoft.Testing.Extensions.CodeCoverage
```

> **Note:**
> The `TUnit` package already references Microsoft.Testing.Extensions.CodeCoverage, so TUnit projects can skip this step.

### Enable the MTP mode of `dotnet test`

The `--coverage` option is an MTP option, so `dotnet test` must run in its MTP mode. With the .NET 10 SDK or later, add the following configuration to the *global.json* file in your solution root:

```json
{
    "test": {
        "runner": "Microsoft.Testing.Platform"
    }
}
```

This configuration applies to every MTP-based framework, not only TUnit. Without it, `dotnet test` runs in VSTest mode and doesn't recognize `--coverage`. For more information, including how to run MTP projects with earlier SDKs, see Testing with dotnet test.

### Collect code coverage

Run the tests with the `--coverage` option:

```dotnetcli
dotnet test --coverage
```

The extension writes a binary *.coverage* file to the *TestResults* directory. To produce a different format, use the `--coverage-output-format` option. Supported values are `coverage` (default), `xml`, and `cobertura`. For example, the following command produces a Cobertura XML file that you can pass to ReportGenerator, as described in Generate reports:

```dotnetcli
dotnet test --coverage --coverage-output-format cobertura
```

For all options, see Code coverage.

## See also

- Visual Studio unit test code coverage
- GitHub - Coverlet repository
- GitHub - ReportGenerator repository
- ReportGenerator project site
- Azure: Publish code coverage results
- Azure: Review code coverage results
- .NET CLI test command
- dotnet-coverage
- Sample source code

## Next Steps

> Unit testing best practices
