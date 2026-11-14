---
title: "AuthenticationSchemeSelector delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/AuthenticationSchemeSelector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AuthenticationSchemeSelector delegate

Namespace: `System.Net`

```csharp
public delegate System.Net.AuthenticationSchemes AuthenticationSchemeSelector(HttpListenerRequest httpRequest);
```

Selects the authentication scheme for an `HttpListener` instance.

Parameters:

- `httpRequest`: The `HttpListenerRequest` instance for which to select an authentication scheme.

Returns: One of the `AuthenticationSchemes` values that indicates the method of authentication to use for the specified client request.

#### Remarks
Delegates of this type are used by `HttpListener` instances to select an authentication scheme based on the characteristics of a request.

An `AuthenticationSchemeSelector` delegate is passed an `HttpListenerRequest` object for each incoming request that has not provided authentication information. The method invoked by the delegate uses the `HttpListenerRequest` object and any other available information to decide which authentication scheme to require. The delegate is specified by using the `AuthenticationSchemeSelectorDelegate` property.

#### Examples
The following example uses an instance of this type to set the `AuthenticationSchemeSelectorDelegate` property.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._

The following example shows the implementation of the method invoked by the `AuthenticationSchemeSelector` delegate in the previous example.

_Code sample not included: ~/snippets/csharp/System.Net/AuthenticationSchemes/Overview/sample.cs._
