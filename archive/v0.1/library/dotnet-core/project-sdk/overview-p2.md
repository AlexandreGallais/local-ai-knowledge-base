---
title: ".NET project SDK overview (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/project-sdk/overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET project SDK overview (part 2 of 2)

## Customize the build

There are various ways to customize a build. You might want to override a property by passing it as an argument to the msbuild or dotnet command. You can also add the property to the project file or to a *Directory.Build.props* file. For a list of useful properties for .NET projects, see MSBuild reference for .NET SDK projects.

> **Tip:**
> An easy way to create a new *Directory.Build.props* file from the command line is by using the command `dotnet new buildprops` at the root of your repository.

### Custom targets

.NET projects can package custom MSBuild targets and properties for use by projects that consume the package. Use this type of extensibility when you want to:

- Extend the build process.
- Access artifacts of the build process, such as generated files.
- Inspect the configuration under which the build is invoked.

You add custom build targets or properties by placing files in the form `<package_id>.targets` or `<package_id>.props` (for example, `Contoso.Utility.UsefulStuff.targets`) in the *build* folder of the project.

The following XML is a snippet from a *.csproj* file that instructs the `dotnet pack` command what to package. The `<ItemGroup Label="dotnet pack instructions">` element places the targets files into the *build* folder inside the package. The `<Target Name="CollectRuntimeOutputs" BeforeTargets="_GetPackageFiles">` element places the assemblies and *.json* files into the *build* folder.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  ...
  <ItemGroup Label="dotnet pack instructions">
    <Content Include="build\*.targets">
      <Pack>true</Pack>
      <PackagePath>build\</PackagePath>
    </Content>
  </ItemGroup>
  <Target Name="CollectRuntimeOutputs" BeforeTargets="_GetPackageFiles">
    <!-- Collect these items inside a target that runs after build but before packaging. -->
    <ItemGroup>
      <Content Include="$(OutputPath)\*.dll;$(OutputPath)\*.json">
        <Pack>true</Pack>
        <PackagePath>build\</PackagePath>
      </Content>
    </ItemGroup>
  </Target>
  ...

</Project>
```

To consume a custom target in your project, add a `PackageReference` element that points to the package and its version. Unlike the tools, the custom targets package is included in the consuming project's dependency closure.

You can configure how to use the custom target. Since it's an MSBuild target, it can depend on a given target, run after another target, or be manually invoked by using the `dotnet msbuild -t:<target-name>` command. However, to provide a better user experience, you can combine per-project tools and custom targets. In this scenario, the per-project tool accepts whatever parameters are needed and translates that into the required `dotnet msbuild` invocation that executes the target. You can see a sample of this kind of synergy on the MVP Summit 2016 Hackathon samples repo in the `dotnet-packer` project.

## See also

- Customize your build (MSBuild)
- How to use MSBuild project SDKs
- Package custom MSBuild targets and props with NuGet
