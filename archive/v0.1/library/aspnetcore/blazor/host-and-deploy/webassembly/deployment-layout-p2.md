---
title: "Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/host-and-deploy/webassembly/deployment-layout.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Deployment layout for ASP.NET Core hosted Blazor WebAssembly apps (part 2 of 3)

## Customize the Blazor WebAssembly loading process via a NuGet package

> **Warning:**
> The guidance in this section with its three subsections pertains to building a NuGet package from scratch to implement your own strategy and custom loading process. The *experimental* `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle` package (NuGet.org) for .NET 6 and 7 is based on the guidance in this section. When using the provided package in a **local demonstration** of the multipart bundle download approach, you don't need to follow the guidance in this section. For guidance on how to use the provided package, see the Experimental NuGet package and sample app section.

Blazor app resources are packed into a multipart bundle file and loaded by the browser via a custom JavaScript (JS) initializer. For an app consuming the package with the JS initializer, the app only requires that the bundle file is served when requested. All of the other aspects of this approach are handled transparently.

Four customizations are required to how a default published Blazor app loads:

* An MSBuild task to transform the publish files.
* A NuGet package with MSBuild targets that hooks into the Blazor publishing process, transforms the output, and defines one or more Blazor Publish Extension files (in this case, a single bundle).
* A JS initializer to update the Blazor WebAssembly resource loader callback so that it loads the bundle and provides the app with the individual files.
* A helper on the host **:::no-loc text="Server":::** app to ensure that the bundle is served to clients on request.

### Create an MSBuild task to customize the list of published files and define new extensions

Create an MSBuild task as a public C# class that can be imported as part of an MSBuild compilation and that can interact with the build.

The following are required for the C# class:

* A new class library project.
* A project target framework of `netstandard2.0`.
* References to MSBuild packages:
  * `Microsoft.Build.Framework`
  * `Microsoft.Build.Utilities.Core`

> **Note:**
> The NuGet package for the examples in this article are named after the package provided by Microsoft, `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle`. For guidance on naming and producing your own NuGet package, see the following NuGet articles:
>
> * Package authoring best practices
> * Package ID prefix reservation

`Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks/Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks.csproj`:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <LangVersion>8.0</LangVersion>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Build.Framework" Version="{VERSION}" />
    <PackageReference Include="Microsoft.Build.Utilities.Core" Version="{VERSION}" />
  </ItemGroup>

</Project>
```

Determine the latest package versions for the `{VERSION}` placeholders at NuGet.org:

* `Microsoft.Build.Framework`
* `Microsoft.Build.Utilities.Core`

To create the MSBuild task, create a public C# class extending `Microsoft.Build.Utilities.Task` (not `System.Threading.Tasks.Task`) and declare three properties:

* `PublishBlazorBootStaticWebAsset`: The list of files to publish for the Blazor app.
* `BundlePath`: The path where the bundle is written.
* `Extension`: The new Publish Extensions to include in the build.

The following example `BundleBlazorAssets` class is a starting point for further customization:

* In the `Execute` method, the bundle is created from the following three file types:
  * JavaScript files (`dotnet.js`)
  * WebAssembly (Wasm) files (`dotnet.wasm`)
  * App DLLs (`.dll`)
* A `multipart/form-data` bundle is created. Each file is added to the bundle with its respective descriptions via the Content-Disposition header and the Content-Type header.
* After the bundle is created, the bundle is written to a file.
* The build is configured for the extension. The following code creates an extension item and adds it to the `Extension` property. Each extension item contains three pieces of data:
  * The path to the extension file.
  * The URL path relative to the root of the Blazor WebAssembly app.
  * The name of the extension, which groups the files produced by a given extension.

After accomplishing the preceding goals, the MSBuild task is created for customizing the Blazor publish output. Blazor takes care of gathering the extensions and making sure that the extensions are copied to the correct location in the publish output folder (for example, `bin\Release\net6.0\publish`). The same optimizations (for example, compression) are applied to the JavaScript, Wasm, and DLL files as Blazor applies to other files.

`Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks/BundleBlazorAssets.cs`:

```csharp
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;

namespace Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks
{
    public class BundleBlazorAssets : Task
    {
        [Required]
        public ITaskItem[]? PublishBlazorBootStaticWebAsset { get; set; }

        [Required]
        public string? BundlePath { get; set; }

        [Output]
        public ITaskItem[]? Extension { get; set; }

        public override bool Execute()
        {
            var bundle = new MultipartFormDataContent(
                "--0a7e8441d64b4bf89086b85e59523b7d");

            foreach (var asset in PublishBlazorBootStaticWebAsset)
            {
                var name = Path.GetFileName(asset.GetMetadata("RelativePath"));
                var fileContents = File.OpenRead(asset.ItemSpec);
                var content = new StreamContent(fileContents);
                var disposition = new ContentDispositionHeaderValue("form-data");
                disposition.Name = name;
                disposition.FileName = name;
                content.Headers.ContentDisposition = disposition;
                var contentType = Path.GetExtension(name) switch
                {
                    ".js" => "text/javascript",
                    ".wasm" => "application/wasm",
                    _ => "application/octet-stream"
                };
                content.Headers.ContentType = 
                    MediaTypeHeaderValue.Parse(contentType);
                bundle.Add(content);
            }

            using (var output = File.Open(BundlePath, FileMode.OpenOrCreate))
            {
                output.SetLength(0);
                bundle.CopyToAsync(output).ConfigureAwait(false).GetAwaiter()
                    .GetResult();
                output.Flush(true);
            }

            var bundleItem = new TaskItem(BundlePath);
            bundleItem.SetMetadata("RelativePath", "app.bundle");
            bundleItem.SetMetadata("ExtensionName", "multipart");

            Extension = new ITaskItem[] { bundleItem };

            return true;
        }
    }
}
```

### Author a NuGet package to automatically transform the publish output

Generate a NuGet package with MSBuild targets that are automatically included when the package is referenced:

* Create a new Razor class library (RCL) project.
* Create a targets file following NuGet conventions to automatically import the package in consuming projects. For example, create `build\net6.0\{PACKAGE ID}.targets`, where `{PACKAGE ID}` is the package identifier of the package.
* Collect the output from the class library containing the MSBuild task and confirm the output is packed in the right location.
* Add the necessary MSBuild code to attach to the Blazor pipeline and invoke the MSBuild task to generate the bundle.

The approach described in this section only uses the package to deliver targets and content, which is different from most packages where the package includes a library DLL.

> **Warning:**
> The sample package described in this section demonstrates how to customize the Blazor publish process. **The sample NuGet package is for use as a local demonstration only. Using this package in production is not supported.**

> **Note:**
> The NuGet package for the examples in this article are named after the package provided by Microsoft, `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle`. For guidance on naming and producing your own NuGet package, see the following NuGet articles:
>
> * Package authoring best practices
> * Package ID prefix reservation

`Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle/Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.csproj`:

```xml
<Project Sdk="Microsoft.NET.Sdk.Razor">

  <PropertyGroup>
    <NoWarn>NU5100</NoWarn>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <Description>
      Sample demonstration package showing how to customize the Blazor publish 
      process. Using this package in production is not supported!
    </Description>
    <IsPackable>true</IsPackable>
    <IsShipping>true</IsShipping>
    <IncludeBuildOutput>false</IncludeBuildOutput>
  </PropertyGroup>

  <ItemGroup>
    <None Update="build\**" 
          Pack="true" 
          PackagePath="%(Identity)" />
    <Content Include="_._" 
             Pack="true" 
             PackagePath="lib\net6.0\_._" />
  </ItemGroup>

  <Target Name="GetTasksOutputDlls" 
          BeforeTargets="CoreCompile">
    <MSBuild Projects="..\Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks\Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks.csproj" 
             Targets="Publish;PublishItemsOutputGroup" 
             Properties="Configuration=Release">
      <Output TaskParameter="TargetOutputs" 
              ItemName="_TasksProjectOutputs" />
    </MSBuild>
    <ItemGroup>
      <Content Include="@(_TasksProjectOutputs)" 
               Condition="'%(_TasksProjectOutputs.Extension)' == '.dll'" 
               Pack="true" 
               PackagePath="tasks\%(_TasksProjectOutputs.TargetPath)" 
               KeepMetadata="Pack;PackagePath" />
    </ItemGroup>
  </Target>

</Project>
```

> **Note:**
> The `<NoWarn>NU5100</NoWarn>` property in the preceding example suppresses the warning about the assemblies placed in the `tasks` folder. For more information, see NuGet Warning NU5100.

Add a `.targets` file to wire up the MSBuild task to the build pipeline. In this file, the following goals are accomplished:

* Import the task into the build process. Note that the path to the DLL is relative to the ultimate location of the file in the package.
* The `ComputeBlazorExtensionsDependsOn` property attaches the custom target to the Blazor WebAssembly pipeline.
* Capture the `Extension` property on the task output and add it to `BlazorPublishExtension` to tell Blazor about the extension. Invoking the task in the target produces the bundle. The list of published files is provided by the Blazor WebAssembly pipeline in the `PublishBlazorBootStaticWebAsset` item group. The bundle path is defined using the `IntermediateOutputPath` (typically inside the `obj` folder). Ultimately, the bundle is copied automatically to the correct location in the publish output folder (for example, `bin\Release\net6.0\publish`).

When the package is referenced, it generates a bundle of the Blazor files during publish.

`Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle/build/net6.0/Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.targets`:

```xml
<Project>
  <UsingTask 
    TaskName="Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks.BundleBlazorAssets" 
    AssemblyFile="$(MSBuildThisProjectFileDirectory)..\..\tasks\Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.Tasks.dll" />

  <PropertyGroup>
    <ComputeBlazorExtensionsDependsOn>
      $(ComputeBlazorExtensionsDependsOn);_BundleBlazorDlls
    </ComputeBlazorExtensionsDependsOn>
  </PropertyGroup>

  <Target Name="_BundleBlazorDlls">
    <BundleBlazorAssets
      PublishBlazorBootStaticWebAsset="@(PublishBlazorBootStaticWebAsset)"
      BundlePath="$(IntermediateOutputPath)bundle.multipart">
      <Output TaskParameter="Extension" 
              ItemName="BlazorPublishExtension"/>
    </BundleBlazorAssets>
  </Target>

</Project>
```

### Automatically bootstrap Blazor from the bundle

The NuGet package leverages JavaScript (JS) initializers to automatically bootstrap a Blazor WebAssembly app from the bundle instead of using individual DLL files. JS initializers are used to change the Blazor boot resource loader and use the bundle.

To create a JS initializer, add a JS file with the name `{NAME}.lib.module.js` to the `wwwroot` folder of the package project, where the `{NAME}` placeholder is the package identifier. For example, the file for the Microsoft package is named `Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.lib.module.js`. The exported functions `beforeWebAssemblyStart` and `afterWebAssemblyStarted` handle loading.

The JS initializers:

* Detect if the Publish Extension is available by checking for `extensions.multipart`, which is the extension name (`ExtensionName`) provided in the Create an MSBuild task to customize the list of published files and define new extensions section.
* Download the bundle and parse the contents into a resources map using generated object URLs.
* Update the boot resource loader (`options.loadBootResource`) with a custom function that resolves the resources using the object URLs.
* After the app has started, revoke the object URLs to release memory in the `afterWebAssemblyStarted` function.

`Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle/wwwroot/Microsoft.AspNetCore.Components.WebAssembly.MultipartBundle.lib.module.js`:

```javascript
const resources = new Map();

export async function beforeWebAssemblyStart(options, extensions) {
  if (!extensions || !extensions.multipart) {
    return;
  }

  try {
    const integrity = extensions.multipart['app.bundle'];
    const bundleResponse = 
      await fetch('app.bundle', { integrity: integrity, cache: 'no-cache' });
    const bundleFromData = await bundleResponse.formData();
    for (let value of bundleFromData.values()) {
      resources.set(value, URL.createObjectURL(value));
    }
    options.loadBootResource = function (type, name, defaultUri, integrity) {
      return resources.get(name) ?? null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function afterWebAssemblyStarted(blazor) {
  for (const [_, url] of resources) {
    URL.revokeObjectURL(url);
  }
}
```
