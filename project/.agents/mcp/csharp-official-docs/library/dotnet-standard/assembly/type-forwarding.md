---
title: "Type forwarding in the common language runtime"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/assembly/type-forwarding.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type forwarding in the common language runtime

Type forwarding allows you to move a type to another assembly without having to recompile applications that use the original assembly.

For example, suppose an application uses the `Example` class in an assembly named _Utility.dll_. The developers of _Utility.dll_ might decide to refactor the assembly, and in the process they might move the `Example` class to another assembly. If the old version of _Utility.dll_ is replaced by the new version of _Utility.dll_ and its companion assembly, the application that uses the `Example` class fails because it cannot locate the `Example` class in the new version of _Utility.dll_.

The developers of _Utility.dll_ can avoid this by forwarding requests for the `Example` class, using the `System.Runtime.CompilerServices.TypeForwardedToAttribute` attribute. If the attribute has been applied to the new version of _Utility.dll_, requests for the `Example` class are forwarded to the assembly that now contains the class. The existing application continues to function normally, without recompilation.

## Forward a type

There are four steps to forwarding a type:

1. Move the source code for the type from the original assembly to the destination assembly.

2. In the assembly where the type used to be located, add a `System.Runtime.CompilerServices.TypeForwardedToAttribute` for the type that was moved. The following code shows the attribute for a type named `Example` that was moved.

    ```cpp
     [assembly:TypeForwardedToAttribute(Example::typeid)]
    ```

    ```csharp
     [assembly:TypeForwardedToAttribute(typeof(Example))]
    ```

3. Compile the assembly that now contains the type.

4. Recompile the assembly where the type used to be located, with a reference to the assembly that now contains the type. For example, if you are compiling a C# file from the command line, use the **References** (C# compiler options) option to specify the assembly that contains the type. In C++, use the #using directive in the source file to specify the assembly that contains the type.

## C\# type forwarding example

Continuing from the contrived example description above, imagine you're developing the _Utility.dll_, and you have an `Example` class. The _Utility.csproj_ is a basic class library:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsing>true</ImplicitUsing>
  </PropertyGroup>

</Project>
```
The `Example` class provides a few properties and overrides `System.Object.ToString*`:

```csharp
﻿using System;

namespace Common.Objects;

public class Example
{
    public string Message { get; init; } = "Hi friends!";

    public Guid Id { get; init; } = Guid.NewGuid();

    public DateOnly Date { get; init; } = DateOnly.FromDateTime(DateTime.Today);

    public sealed override string ToString() =>
        $"[{Id} - {Date}]: {Message}";
}
```
Now, imagine that there is a consuming project and it's represented in the _Consumer_ assembly. This consuming project references the _Utility_ assembly. As an example, it instantiates the `Example` object and writes it to the console in its _Program.cs_ file:

```csharp
﻿using System;
using Common.Objects;

Example example = new();

Console.WriteLine(example);
```
When the consuming app runs, it will output the state of the `Example` object. At this point, there is no type forwarding as the _Consuming.csproj_ references the _Utility.csproj_. However, the developer's of the _Utility_ assembly decide to remove the `Example` object as part of a refactoring. This type is moved to a newly created _Common.csproj_.

By removing this type from the _Utility_ assembly, the developers are introducing a breaking change. All consuming projects will break when they update to the latest _Utility_ assembly.

Instead of requiring the consuming projects to add a new reference to the _Common_ assembly, you can forward the type. Since this type was removed from the _Utility_ assembly, you'll need to have the _Utility.csproj_ reference the _Common.csproj_:

```xml
<ItemGroup>
  <ProjectReference Include="..\Common\Common.csproj" />
</ItemGroup>
```

The preceding C# project now references the newly created _Common_ assembly. This could be either a `PackageReference` or a `ProjectReference`. The _Utility_ assembly needs to provide the type forwarding information. By convention type forward declarations are usually encapsulated in a single file named `TypeForwarders`, consider the following _TypeForwarders.cs_ C# file in the _Utility_ assembly:

```csharp
using System.Runtime.CompilerServices;
using Common.Objects;

[assembly:TypeForwardedTo(typeof(Example))]
```

The _Utility_ assembly references the _Common_ assembly, and it forwards the `Example` type. If you're to compile the _Utility_ assembly with the type forwarding declarations and drop the _Utility.dll_ into the _Consuming_ bin, the consuming app will work without being compiled.

## See also

- `System.Runtime.CompilerServices.TypeForwardedToAttribute`
- Type forwarding (C++/CLI)
- #using directive
