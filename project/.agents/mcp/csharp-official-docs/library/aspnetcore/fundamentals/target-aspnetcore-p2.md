---
title: "Use ASP.NET Core APIs in a class library (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/target-aspnetcore.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use ASP.NET Core APIs in a class library (part 2 of 2)

## Use an API introduced in 3.1

Imagine that you want to use an ASP.NET Core API that was introduced in ASP.NET Core 3.1. Consider the following questions:

1. Does the library functionally require the new API?
1. Can the library implement this feature in a different way?

If the library functionally requires the API and there's no way to implement it down-level:

* Target .NET Core 3.x only.
* Add a `<FrameworkReference>` element for the shared framework.

If the library can implement the feature in a different way:

* Add .NET Core 3.x as a target framework.
* Add a `<FrameworkReference>` element for the shared framework.
* Use the #if preprocessor directive with the appropriate target framework symbol to conditionally compile code.

For example, the following Tag Helper uses the `Microsoft.AspNetCore.Hosting.IWebHostEnvironment` interface introduced in ASP.NET Core 3.1. Consumers targeting .NET Core 3.1 execute the code path defined by the `NETCOREAPP3_1` target framework symbol. The Tag Helper's constructor parameter type changes to `Microsoft.AspNetCore.Hosting.IHostingEnvironment` for .NET Core 2.1 and .NET Framework 4.6.1 consumers. This change was necessary because ASP.NET Core 3.1 marked `IHostingEnvironment` as obsolete and recommended `IWebHostEnvironment` as the replacement.

```csharp
[HtmlTargetElement("script", Attributes = "asp-inline")]
public class ScriptInliningTagHelper : TagHelper
{
    private readonly IFileProvider _wwwroot;

#if NETCOREAPP3_1
    public ScriptInliningTagHelper(IWebHostEnvironment env)
#else
    public ScriptInliningTagHelper(IHostingEnvironment env)
#endif
    {
        _wwwroot = env.WebRootFileProvider;
    }

    // code omitted for brevity
}
```

The following multi-targeted project file supports this Tag Helper scenario:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  
  <PropertyGroup>
    <TargetFrameworks>netcoreapp2.1;netcoreapp3.1;net461</TargetFrameworks>
  </PropertyGroup>
  
  <ItemGroup>
    <PackageReference Include="Markdig" Version="0.16.0" />
  </ItemGroup>
  
  <ItemGroup Condition="'$(TargetFramework)' != 'netcoreapp3.1'">
    <PackageReference Include="Microsoft.AspNetCore.Mvc.Razor" Version="2.1.0" />
  </ItemGroup>

  <ItemGroup Condition="'$(TargetFramework)' == 'netcoreapp3.1'">
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>
</Project>
```

## Use an API removed from the shared framework

To use an ASP.NET Core assembly that was removed from the shared framework, add the appropriate package reference. For a list of packages removed from the shared framework in ASP.NET Core 3.1, see Remove obsolete package references.

For example, to add the web API client:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNet.WebApi.Client" Version="5.2.7" />
  </ItemGroup>

</Project>
```

## Related content

* Reusable Razor UI in class libraries with ASP.NET Core
* Consume ASP.NET Core Razor components from a Razor class library (RCL)
* .NET implementation support
* .NET support policies
