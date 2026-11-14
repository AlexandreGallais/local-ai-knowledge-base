---
title: "XmlUrlResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlUrlResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlUrlResolver class

Namespace: `System.Xml`

```csharp
public class XmlUrlResolver : System.Xml.XmlResolver
```

Resolves external XML resources named by a Uniform Resource Identifier (URI).

#### Remarks
`XmlUrlResolver` is used to resolve external XML resources such as entities, document type definitions (DTDs) or schemas. It is also used to process include and import elements found in Extensible StyleSheet Language (XSL) style sheets or XML Schema definition language (XSD) schemas.

`XmlUrlResolver` is the default resolver for all classes in the `Xml` namespace. It supports the `file://` and `http://` protocols and requests from the `WebRequest` class.

> **Important:**
>  `XmlUrlResolver` objects can contain sensitive information such as user credentials. You should be careful when you cache `XmlUrlResolver` objects and should not pass `XmlUrlResolver` objects to an untrusted component.

#### Resolving DTDs
If an XML reader (`XmlReader`) is reading an XML file that contains an external DTD, it calls the `XmlUrlResolver.GetEntityAsync` method to get a stream representation of the DTD. If the URI of the DTD is a relative URI, the XML reader calls the `XmlUrlResolver.ResolveUri` method and returns an absolute URI for the given `relativeUri` and `baseURi` parameters. If the `XmlUrlResolver` doesn't know how to resolve the URI, it returns `null`.

The `XmlUrlResolver.GetEntity` method uses the information in the `Credentials` property as appropriate to gain access to the resource. There is no `get` accessor to this property for security reasons. When overwriting `XmlResolver`, **GetEntity** is the method that utilizes the credential <example-value> in the **Credentials** property.

Resolving all other XML resources is very similar to resolving DTDs. `XmlResolver` negotiates the connection with the external resource and returns a `Stream` representation of the content. The object that is making the call to `XmlResolver` interprets the stream.

#### Extending the XmlUrlResolver class
The default behavior of the `XmlUrlResolver` class is to resolve an XML data resource from its source, not from cache. In some cases, resolving a data resource from cache can improve the performance of an application by saving a trip to the data resource's server. The performance gains here must be weighed against the need for up-to-date content.

The following example extends `XmlUrlResolver` and builds a new class, `XmlCachingResolver`, to retrieve resources from the cache. This is done by overriding the `Credentials` property and the `XmlUrlResolver.GetEntity` method.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlUrlResolver/Overview/XmlCachingResolver_ex.cs._

The caching behavior of the `XmlCachingResolver` class is implemented in the `GetEntity` method. This is done by creating new `WebRequest` and `HttpRequestCachePolicy` objects. The `HttpRequestCachePolicy` object is created using the `Default` member of the `HttpRequestCacheLevel` enumeration.

The `CachePolicy` property of the `WebRequest` object is set with the `HttpRequestCachePolicy` object.

An instance of the `XmlCachingResolver` class is created with the `Boolean` `enableHttpCaching`. When this value is set to `true`, the instance resolves a resource from the default cache if possible. When `enableHttpCaching` is set to `false`, the instance uses the default behavior and resolves resources from their source.

> **Note:**
> This example leverages the extensibility of the XML classes in .NET. Other classes can be extended and customized to suit the needs of a particular application.

#### Examples
The following example creates an `XmlReader` that uses an `XmlUrlResolver` with default credentials.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlUrlResolver/Overview/XmlResolver_Samples.cs._

## XmlUrlResolver.XmlUrlResolver() constructor

```csharp
public XmlUrlResolver ();
```

Initializes a new instance of the `XmlUrlResolver` class.

To be added.

## XmlUrlResolver.CachePolicy property

```csharp
public System.Net.Cache.RequestCachePolicy CachePolicy { set; }
```

Gets or sets the cache policy for the underlying `WebRequest` object.

Returns: The cache policy for the underlying web request.

To be added.

## XmlUrlResolver.Credentials <example-value>

```csharp
public override System.Net.ICredentials <example-value> { set; }
```

Sets credentials used to authenticate web requests.

Returns: The credentials to be used to authenticate web requests. If this property is not set, the value defaults to `null`; that is, the `XmlUrlResolver` has no user credentials.

#### Remarks
If the virtual directory does not require authentication, this property does not need to be set. Otherwise, the credentials of the user must be supplied.

You can associate different credentials with different URIs and add them to a cache. You can then use the credentials to check authentication for different URIs, regardless of the original source of the XML.

The following C# code shows how to set the `Credentials` property to a credential cache.

```csharp
NetworkCredential <example-value> = new NetworkCredential(UserName,SecurelyStoredPassword,Domain);
CredentialCache myCache = new CredentialCache();
myCache.Add(new Uri("http://www.contoso.com/"), "Basic", myCred);
myCache.Add(new Uri("http://app.contoso.com/"), "Basic", myCred);
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = <example-value>;
```

#### Examples
The following example creates an `XmlUrlResolver` object with credentials. The `XmlReader` uses the credentials on the `XmlUrlResolver` object to access a network resource.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlUrlResolver/Overview/XmlResolver_Samples.cs._

## XmlUrlResolver.Proxy property

```csharp
public System.Net.IWebProxy Proxy { set; }
```

Gets or sets the network proxy for the underlying `WebRequest` object.

Returns: The `IWebProxy` to use to access the Internet resource.

To be added.

## XmlUrlResolver.GetEntity(Uri, String, Type) method

```csharp
public override object? GetEntity (Uri absoluteUri, string? role, Type? ofObjectToReturn);
```

Maps a URI to an object that contains the actual resource.

Parameters:

- `absoluteUri`: The URI returned from `XmlResolver.ResolveUri`.
- `role`: Currently not used.
- `ofObjectToReturn`: The type of object to return. The current implementation only returns `Stream` objects.

Returns: A stream object or `null` if a type other than stream is specified.

Exceptions:

- `XmlException`: `ofObjectToReturn` is neither `null` nor a `Stream` type.
- `UriFormatException`: The specified URI is not an absolute URI.
- `ArgumentNullException`: `absoluteUri` is `null`.
- `Exception`: There is a runtime error (for example, an interrupted server connection).

#### Remarks
This method is used when the caller wants to map a given URI to an object that contains the resource that the URI represents.

For the asynchronous version of this method, see `XmlUrlResolver.GetEntityAsync`.

> **Important:**
> Your application can mitigate memory denial of service threats to the `XmlUrlResolver.GetEntity` method by implementing IStream `IStream` to limit the number of bytes read. This helps guard against situations where malicious code attempts to pass an infinite stream of bytes to the `XmlUrlResolver.GetEntity` method.

#### Examples
The following example demonstrates the `GetEntity` and `XmlResolver.ResolveUri` methods.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlUrlResolver/GetEntity/source.cs._

## XmlUrlResolver.GetEntityAsync(Uri, String, Type) method

```csharp
public override System.Threading.Tasks.Task<object> GetEntityAsync (Uri absoluteUri, string? role, Type? ofObjectToReturn);
```

Asynchronously maps a URI to an object that contains the actual resource.

Parameters:

- `absoluteUri`: The URI returned from `XmlResolver.ResolveUri`.
- `role`: Currently not used.
- `ofObjectToReturn`: The type of object to return. The current implementation only returns `Stream` objects.

Returns: A stream object or `null` if a type other than stream is specified.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XmlUrlResolver.GetEntity`.

## XmlUrlResolver.ResolveUri(Uri, String) method

```csharp
public override Uri ResolveUri (Uri? baseUri, string? relativeUri);
```

Resolves the absolute URI from the base and relative URIs.

Parameters:

- `baseUri`: The base URI used to resolve the relative URI.
- `relativeUri`: The URI to resolve. The URI can be absolute or relative. If absolute, this value effectively replaces the `baseUri` value. If relative, it combines with the `baseUri` to make an absolute URI.

Returns: The absolute URI, or `null` if the relative URI cannot be resolved.

Exceptions:

- `ArgumentNullException`: `baseUri` is `null` or `relativeUri` is `null`.

#### Remarks
The absolute URI can be used as the base URI for any subsequent requests for entities that are relative to this URI.
