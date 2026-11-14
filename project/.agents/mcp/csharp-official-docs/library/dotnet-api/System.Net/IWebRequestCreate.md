---
title: "IWebRequestCreate interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IWebRequestCreate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IWebRequestCreate interface

Namespace: `System.Net`

```csharp
public interface IWebRequestCreate
```

Provides the base interface for creating `WebRequest` instances.

#### Remarks
The `IWebRequestCreate` interface defines the method that `WebRequest` descendants must use to register with the `WebRequest.Create` method.

Classes that implement the `IWebRequestCreate` interface can be registered with the `WebRequest` class and associated with a specific URI scheme so that the `WebRequest` calls the class's `IWebRequestCreate.Create` method when a URI that matches that scheme is requested.

## IWebRequestCreate.Create(Uri) method

```csharp
public System.Net.WebRequest Create (Uri uri);
```

Creates a `WebRequest` instance.

Parameters:

- `uri`: The uniform resource identifier (URI) of the Web resource.

Returns: A `WebRequest` instance.

Exceptions:

- `NotSupportedException`: The request scheme specified in `uri` is not supported by this `IWebRequestCreate` instance.
- `ArgumentNullException`: `uri` is `null`.
- `UriFormatException`: The URI specified in `uri` is not a valid URI.

#### Remarks
The `IWebRequestCreate.Create` method must return an initialized instance of the `WebRequest` descendant that is capable of performing a standard request/response transaction for the protocol without needing any protocol-specific fields modified.
