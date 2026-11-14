---
title: "ICustomFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ICustomFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICustomFactory interface

Namespace: `System.Runtime.InteropServices`

```csharp
public interface ICustomFactory
```

Enables users to write activation code for managed objects that extend `MarshalByRefObject`.

#### Remarks
You can enable custom activation by providing a proxy class that implements `ICustomFactory` and attributing the `MarshalByRefObject` class with the `ProxyAttribute`. When the class is activated, the proxy's `ICustomFactory.CreateInstance` method is called by the common language runtime to activate the class.

## ICustomFactory.CreateInstance(Type) method

```csharp
public MarshalByRefObject CreateInstance (Type serverType);
```

Creates a new instance of the specified type.

Parameters:

- `serverType`: The type to activate.

Returns: A `MarshalByRefObject` associated with the specified type.

#### Remarks
`CreateInstance` is called by the common language runtime when a new object of the specified type needs to be created. Override this method to provide your own custom class factory.
