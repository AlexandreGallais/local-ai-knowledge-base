---
title: "Test a .NET class library (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tutorials/test-class-library.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Test a .NET class library (part 3 of 3)

## Test the Release version of the library

Now that the tests have all passed when running the Debug build of the library, run the tests an additional time against the Release build of the library. A number of factors, including compiler optimizations, can sometimes produce different behavior between Debug and Release builds.

**visualstudio:**

To test the Release build:

1. In the Visual Studio toolbar, change the build configuration from **Debug** to **Release**.

1. In **Solution Explorer**, right-click the **StringLibrary** project and select **Build** from the context menu to recompile the library.

1. Run the unit tests by choosing **Test** > **Run All Tests** from the menu bar. The tests pass.

**vscode:**

Run the tests with the Release build configuration:

```dotnetcli
dotnet test StringLibraryTest/StringLibraryTest.csproj --configuration Release
```

The tests pass.

**codespaces:**

Run the tests with the Release build configuration:

```dotnetcli
dotnet test --configuration Release
```

The tests pass.

## Debug tests

**visualstudio:**

If you're using Visual Studio as your IDE, you can use the same process shown in Tutorial: Debug a .NET console application to debug code using your unit test project. Instead of starting the *ShowCase* app project, right-click the **StringLibraryTests** project, and select **Debug Tests** from the context menu.

Visual Studio starts the test project with the debugger attached. Execution stops at any breakpoint you've added to the test project or the underlying library code.

**vscode,codespaces:**

If you're using Visual Studio Code as your IDE, you can use the same process shown in Debug a .NET console application to debug code using your unit test project. Instead of starting the *ShowCase* app project, open *StringLibraryTest/Test1.cs*, and select **Debug Tests in current file** between lines 7 and 8. If you're unable to find it, press `Ctrl`+`Shift`+`P` to open the command palette and enter **Reload Window**.

Visual Studio Code starts the test project with the debugger attached. Execution will stop at any breakpoint you've added to the test project or the underlying library code.

## Additional resources

**visualstudio:**

- Unit test basics - Visual Studio
- Unit testing in .NET

**vscode,codespaces:**

- Unit testing in .NET

**codespaces:**

## Cleanup resources

GitHub automatically deletes your Codespace after 30 days of inactivity. If you plan to explore more tutorials in this series, you can leave your Codespace provisioned. If you're ready to visit the .NET site to download the .NET SDK, you can delete your Codespace. To delete your Codespace, open a browser window and navigate to your Codespaces. You see a list of your codespaces in the window. Select the three dots (`...`) in the entry for the learn tutorial codespace. Then select "Delete".

## Next steps

In this tutorial, you unit tested a class library. You can make the library available to others by publishing it to NuGet as a package. To learn how, follow a NuGet tutorial:

> Create and publish a package using the dotnet CLI

If you publish a library as a NuGet package, others can install and use it. To learn how, follow a NuGet tutorial:

> Install and use a package using the dotnet CLI

A library doesn't have to be distributed as a package. It can be bundled with a console app that uses it. To learn how to publish a console app, see the earlier tutorial in this series:

> Publish a .NET console application
