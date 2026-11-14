---
title: "XmlResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlResolver class

Namespace: `System.Xml`

```csharp
public abstract class XmlResolver
```

Resolves external XML resources named by a Uniform Resource Identifier (URI).

The `XmlResolver` type is used to resolve external XML resources, such as entities, document type definitions (DTDs), or schemas. It is also used to process include and import elements found in Extensible Stylesheet Language (XSL) style sheets or XML Schema definition language (XSD) schemas.

`XmlResolver` handles all aspects of negotiating the connection to the resources, including handling security credentials, opening the connection to the data source, and returning the resource in the form of a stream or other object type. The object that calls `XmlResolver` has the task of interpreting the stream.

The `Xml` namespace includes the following concrete implementation of the `XmlResolver` class:

- `XmlUrlResolver` is the default resolver for all classes in the `Xml` namespace. It supports the `file://` and `http://` protocols and requests from the `WebRequest` class. For examples of extending the class to improve performance, see the `XmlUrlResolver` reference page.

You can create and specify your own resolver. If you don't specify a resolver, the reader uses a default `XmlUrlResolver` with no user credentials.

You specify the `XmlResolver` to use by setting the `XmlResolver` property and passing the `XmlReaderSettings` object to the `XmlReader.Create` method.

If the resource is stored on a system that requires authentication, you use the `Credentials` property to specify the necessary credentials.

#### Supply authentication credentials

The file that contains the XML data to read may have a restricted access policy. If authentication is required to access a network resource, use the `Credentials` property to specify the necessary credentials. If the `Credentials` property is not set, credentials are set to `null`.

For example, assume that credentials are needed when requesting data from the web for authentication purposes. Unless the web virtual directory allows anonymous access, you must set the `Credentials` property to supply credentials. The following example creates an `XmlReader` object that uses an `XmlUrlResolver` with default credentials to access the `http://localhost/bookstore/inventory.xml` site.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Create/factory_rdr_cctor2.cs._

You can supply different credentials for different URIs and add them to a cache. These credentials are used to check authentication for the different URIs regardless of the original source of the XML. The following example shows how to add credentials to a cache.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlResolver/Overview/Xslt_Load_v2.cs._

#### Security considerations

Consider the following items when working with the `XmlResolver` class.

- `XmlResolver` objects can contain sensitive information such as user credentials. You should be careful when caching `XmlResolver` objects and should not pass the `XmlResolver` object to an untrusted component.

- If you are designing a class property that uses the `XmlResolver` class, the property should be defined as a write-only property. The property can be used to specify the `XmlResolver` to use, but it cannot be used to return an `XmlResolver` object.

- If your application accepts `XmlResolver` objects from untrusted code, you cannot assume that the URI passed into the `XmlResolver.GetEntity` method will be the same as that returned by the `XmlResolver.ResolveUri` method. Classes derived from the `XmlResolver` class can override the `XmlResolver.GetEntity` method and return data that is different than what was contained in the original URI.

- Your application can mitigate memory denial of service threats to the `XmlResolver.GetEntity` method by implementing an `IStream` that limits the number of bytes read. This helps guard against situations where malicious code attempts to pass an infinite stream of bytes to the `XmlResolver.GetEntity` method.

The following example creates an `XmlUrlResolver` with default credentials. A `XmlReader` is used to read and display the resulting data stream.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlResolver/Overview/XmlResolver_ex.cs._

## XmlResolver.XmlResolver() constructor

```csharp
protected XmlResolver ();
```

Initializes a new instance of the `XmlResolver` class.

#### Remarks
This constructor is called by derived class constructors to initialize state in this type.

## XmlResolver.Credentials <example-value>

```csharp
public virtual System.Net.ICredentials <example-value> { set; }
```

When overridden in a derived class, sets the credentials used to authenticate web requests.

Returns: The credentials to be used to authenticate web requests. If this property is not set, the value defaults to `null`; that is, the `XmlResolver` has no user credentials.

#### Remarks
If the virtual directory does not require authentication, this property doesn't have to be set. Otherwise, the credentials of the user must be supplied.

The following C# code sets credentials on the `XmlResolver` object.

```csharp
NetworkCredential nc = new NetworkCredential(UserName, SecurelyStoredPassword, Domain);
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = nc;
```

You can associate different credentials with different URIs and add them to a cache. You can then use the credentials to check authentication for different URIs regardless of the original source of the XML.

```csharp
NetworkCredential <example-value> = new NetworkCredential(UserName, SecurelyStoredPassword, Domain);
CredentialCache myCache = new CredentialCache();
myCache.Add(new Uri("http://www.contoso.com/"), "Basic", myCred);
myCache.Add(new Uri("http://app.contoso.com/"), "Basic", myCred);
XmlUrlResolver resolver = new XmlUrlResolver();
resolver.Credentials = <example-value>;
```

#### Examples
See `Credentials` for an example that uses this property.

## XmlResolver.FileSystemResolver property

```csharp
public static System.Xml.XmlResolver FileSystemResolver { get; }
```

Gets an XML resolver that resolves only file system URIs.

Returns: An XML resolver that resolves only file system URIs.

Calling `XmlResolver.GetEntity` or `XmlResolver.GetEntityAsync` on the `XmlResolver` instance returned by this property resolves only URIs whose scheme is file.

## XmlResolver.ThrowingResolver property

```csharp
public static System.Xml.XmlResolver ThrowingResolver { get; }
```

Gets an XML resolver that forbids entity resolution.

Returns: An XML resolver that forbids entity resolution.

Calling `XmlResolver.GetEntity` or `XmlResolver.GetEntityAsync` on the `XmlResolver` instance returned by this property is forbidden and will result in an `XmlException` being thrown.

Use `XmlResolver.ThrowingResolver` when external entity resolution must be prohibited, even when Document Type Definition (DTD) processing is otherwise enabled.

## XmlResolver.GetEntity(Uri, String, Type) method

```csharp
public abstract object? GetEntity (Uri absoluteUri, string? role, Type? ofObjectToReturn);
```

When overridden in a derived class, maps a URI to an object that contains the actual resource.

Parameters:

- `absoluteUri`: The URI returned from `XmlResolver.ResolveUri`.
- `role`: Currently not used.
- `ofObjectToReturn`: The type of object to return. The current version only returns System.IO.Stream objects.

Returns: A stream object or `null` if a type other than stream is specified.

Exceptions:

- `XmlException`: `ofObjectToReturn` is not a `Stream` type.
- `UriFormatException`: The specified URI is not an absolute URI.
- `ArgumentNullException`: `absoluteUri` is `null`.
- `Exception`: There is a runtime error (for example, an interrupted server connection).

#### Remarks
This method is used when the caller wants to map a given URI into the object containing the actual resource that the URI represents. The type of object returned is negotiable; however, the implementation must always support `Stream`.

For the asynchronous version of this method, see `XmlResolver.GetEntityAsync`.

> **Important:**
> Your application can mitigate memory denial of service threats to the `XmlResolver.GetEntity` method by implementing an `IStream` that limits the number of bytes read. This helps guard against situations where malicious code attempts to pass an infinite stream of bytes to the `XmlResolver.GetEntity` method.

#### Examples
See `XmlUrlResolver.GetEntity` for an example using this method.

## XmlResolver.GetEntityAsync(Uri, String, Type) method

```csharp
public virtual System.Threading.Tasks.Task<object> GetEntityAsync (Uri absoluteUri, string? role, Type? ofObjectToReturn);
```

Asynchronously maps a URI to an object that contains the actual resource.

Parameters:

- `absoluteUri`: The URI returned from `XmlResolver.ResolveUri`.
- `role`: Currently not used.
- `ofObjectToReturn`: The type of object to return. The current version only returns `Stream` objects.

Returns: A stream object or `null` if a type other than stream is specified.

#### Remarks
This is the asynchronous version of `XmlResolver.GetEntity`, with the same functionality. To use this method, you must set the `Async` flag to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `GetEntity`.

## XmlResolver.ResolveUri(Uri, String) method

```csharp
public virtual Uri ResolveUri (Uri? baseUri, string? relativeUri);
```

When overridden in a derived class, resolves the absolute URI from the base and relative URIs.

Parameters:

- `baseUri`: The base URI used to resolve the relative URI.
- `relativeUri`: The URI to resolve. The URI can be absolute or relative. If absolute, this value effectively replaces the `baseUri` value. If relative, it combines with the `baseUri` to make an absolute URI.

Returns: The absolute URI or `null` if the relative URI cannot be resolved.

Exceptions:

- `ArgumentException`: `relativeUri` is `null`.

#### Remarks
The absolute URI may be used as the base URI for any subsequent requests for entities that are relative to this URI.

#### Examples
See `XmlUrlResolver.GetEntity` for an example that uses this method.

## XmlResolver.SupportsType(Uri, Type) method

```csharp
public virtual bool SupportsType (Uri absoluteUri, Type? type);
```

Enables the resolver to return types other than `Stream`.

Parameters:

- `absoluteUri`: The URI.
- `type`: The type to return.

Returns: `true` if the `type` is supported; otherwise, `false`.

To be added.
