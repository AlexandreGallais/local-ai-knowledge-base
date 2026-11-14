---
title: "AppDomainSetup class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/AppDomainSetup.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AppDomainSetup class

Namespace: `System`

```csharp
public sealed class AppDomainSetup
```

Represents assembly binding information that can be added to an instance of `AppDomain`.

#### Remarks
Changing the properties of an `AppDomainSetup` instance does not affect any existing `AppDomain`. It can affect only the creation of a new `AppDomain`, when the `AppDomain.CreateDomain` method is called with the `AppDomainSetup` instance as a parameter.

This class implements the `IAppDomainSetup` interface.

## AppDomainSetup.AppDomainSetup() constructor

```csharp
public AppDomainSetup ();
```

Initializes a new instance of the `AppDomainSetup` class.

To be added.

## AppDomainSetup.ApplicationBase property

```csharp
public string? ApplicationBase { get; }
```

Gets the name of the directory containing the application.

Returns: The name of the application base directory.

To be added.

## AppDomainSetup.TargetFrameworkName property

```csharp
public string? TargetFrameworkName { get; }
```

Gets a string that specifies the target framework in a format that can be parsed by the `FrameworkName.#ctor` constructor.

Returns: The target framework of the executable that started the process.

To be added.
