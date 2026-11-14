---
title: "testAppsTopLevel"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-10/includes/testAppsTopLevel.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# testAppsTopLevel

### Better support for testing apps with top-level statements

.NET 10 now has better support for testing apps that use top-level statements. Previously developers had to manually add `public partial class Program` to the `Program.cs` file so that the test project could reference the `Program class`. `public partial class Program` was required because the top-level statement feature in C# 9 generated a `Program class` that was declared as internal.

In .NET 10, a source generator is used to generate the `public partial class Program` declaration if the programmer didn't declare it explicitly. Additionally, an analyzer was added to detect when `public partial class Program` is declared explicitly and advise the developer to remove it.

The following PRs contribited to this feature:

* PR 58199
* PR 58482
