---
title: "IConfigurationManager interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/IConfigurationManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfigurationManager interface

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public interface IConfigurationManager : Microsoft.Extensions.Configuration.IConfiguration, Microsoft.Extensions.Configuration.IConfigurationBuilder
```

Represents a mutable configuration object.

It is both an `IConfigurationBuilder` and an `IConfiguration`.
As sources are added, it updates its current view of configuration.
