---
title: "XmlSecureResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlSecureResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSecureResolver class

Namespace: `System.Xml`

```csharp
public class XmlSecureResolver : System.Xml.XmlResolver
```

Helps to secure another implementation of `XmlResolver` by wrapping the `XmlResolver` object and restricting the resources that the underlying `XmlResolver` has access to.

To be added.

## XmlSecureResolver.XmlSecureResolver(XmlResolver, String) constructor

```csharp
public XmlSecureResolver (System.Xml.XmlResolver resolver, string? securityUrl);
```

Initializes a new instance of the `XmlSecureResolver` class with the `XmlResolver` and URL provided.

Parameters:

- `resolver`: The XML resolver that is wrapped by the `XmlSecureResolver`.
- `securityUrl`: The URL used to create the `PermissionSet` that will be applied to the underlying `XmlResolver`. The `XmlSecureResolver` calls `PermissionSet.PermitOnly` on the created `PermissionSet` before calling `XmlSecureResolver.GetEntity` on the underlying `XmlResolver`.

To be added.

## XmlSecureResolver.Credentials <example-value>

```csharp
public override System.Net.ICredentials <example-value> { set; }
```

Sets credentials used to authenticate web requests.

Returns: The credentials to be used to authenticate web requests. The `XmlSecureResolver` sets the given credentials on the underlying `XmlResolver`. If this property is not set, the value defaults to `null`; that is, the `XmlSecureResolver` has no user credentials.

To be added.

## XmlSecureResolver.GetEntity(Uri, String, Type) method

```csharp
public override object? GetEntity (Uri absoluteUri, string? role, Type? ofObjectToReturn);
```

Maps a URI to an object that contains the actual resource. This method temporarily sets the `PermissionSet` created in the constructor by calling `PermissionSet.PermitOnly` before calling `GetEntity` on the underlying `XmlResolver` to open the resource.

Parameters:

- `absoluteUri`: The URI that is returned from `XmlSecureResolver.ResolveUri`.
- `role`: Currently not used.
- `ofObjectToReturn`: The type of object to return. The current version only returns `Stream` objects.

Returns: The stream returned by calling `GetEntity` on the underlying `XmlResolver`. If a type other than `Stream` is specified, the method returns `null`.

Exceptions:

- `XmlException`: In all cases.
- `UriFormatException`: The specified URI is not an absolute URI.
- `NullReferenceException`: `absoluteUri` is `null`.
- `Exception`: There is a run-time error (for example, an interrupted server connection).

To be added.

## XmlSecureResolver.GetEntityAsync(Uri, String, Type) method

```csharp
public override System.Threading.Tasks.Task<object> GetEntityAsync (Uri absoluteUri, string? role, Type? ofObjectToReturn);
```

Asynchronously maps a URI to an object that contains the actual resource.

Parameters:

- `absoluteUri`: The URI returned from `XmlSecureResolver.ResolveUri`.
- `role`: Currently not used.
- `ofObjectToReturn`: The type of object to return. The current version only returns `Stream` objects.

Returns: The stream returned by calling `GetEntity` on the underlying `XmlResolver`. If a type other than `Stream` is specified, the method returns `null`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XmlSecureResolver.GetEntity`.

## XmlSecureResolver.ResolveUri(Uri, String) method

```csharp
public override Uri ResolveUri (Uri? baseUri, string? relativeUri);
```

Resolves the absolute URI from the base and relative URIs by calling `ResolveUri` on the underlying `XmlResolver`.

Parameters:

- `baseUri`: The base URI used to resolve the relative URI.
- `relativeUri`: The URI to resolve. The URI can be absolute or relative. If absolute, this value effectively replaces the `baseUri` value. If relative, it combines with the `baseUri` to make an absolute URI.

Returns: The absolute URI or `null` if the relative URI cannot be resolved (returned by calling `ResolveUri` on the underlying `XmlResolver`).

Exceptions:

- `ArgumentException`: `relativeUri` is `null`.

To be added.
