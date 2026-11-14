---
title: "UriBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriBuilder class

Namespace: `System`

```csharp
public class UriBuilder
```

Provides a custom constructor for uniform resource identifiers (URIs) and modifies URIs for the `Uri` class.

#### Remarks
The `UriBuilder` class provides a convenient way to modify the contents of a `Uri` instance without creating a new `Uri` instance for each modification.

The `UriBuilder` properties provide read/write access to the read-only `Uri` properties so that they can be modified.

For more details about the design and security considerations of `Uri` and `UriBuilder`, review the following threat model documents:

- System.Uri threat model
- System.UriBuilder threat model

## UriBuilder.UriBuilder() constructor

```csharp
public UriBuilder ();
```

Initializes a new instance of the `UriBuilder` class.

#### Remarks
The parameterless constructor creates a new instance of the `UriBuilder` class with its properties initialized as follows.

|Property|Initial Value|
|--------------|-------------------|
|Fragment|`Empty`|
|Host|"loopback"|
|Password|`Empty`|
|Path|"/"|
|Port|-1|
|Query|`Empty`|
|Scheme|"http"|
|UserName|`Empty`|

## UriBuilder.UriBuilder(String) constructor

```csharp
public UriBuilder (string uri);
```

Initializes a new instance of the `UriBuilder` class with the specified URI.

Parameters:

- `uri`: A URI string.

Exceptions:

- `ArgumentNullException`: `uri` is `null`.
- `UriFormatException`: `uri` is a zero-length string or contains only spaces.

-or-

The parsing routine detected a scheme in an invalid form.

-or-

The parser detected more than two consecutive slashes in a URI that does not use the "file" scheme.

-or-

`uri` is not a valid URI.

#### Remarks
This constructor initializes a new instance of the `UriBuilder` class with the `Fragment`, `Host`, `Path`, `Port`, `Query`, `Scheme`, and `Uri` properties set as specified in `uri`.

If `uri` does not specify a scheme, the scheme defaults to "http:".

## UriBuilder.UriBuilder(Uri) constructor

```csharp
public UriBuilder (Uri uri);
```

Initializes a new instance of the `UriBuilder` class with the specified `Uri` instance.

Parameters:

- `uri`: An instance of the `Uri` class.

Exceptions:

- `ArgumentNullException`: `uri` is `null`.

#### Remarks
This constructor initializes a new instance of the `UriBuilder` class with the `Fragment`, `Host`, `Path`, `Port`, `Query`, `Scheme`, and `Uri` properties set as specified in `uri`.

## UriBuilder.UriBuilder(String, String) constructor

```csharp
public UriBuilder (string? schemeName, string? hostName);
```

Initializes a new instance of the `UriBuilder` class with the specified scheme and host.

Parameters:

- `schemeName`: An Internet access protocol.
- `hostName`: A DNS-style domain name or IP address.

#### Remarks
The `UriBuilder` instance is initialized with the `Scheme` property set to `schemeName` and the `Host` property set to `hostName`. `Port` is initialized to the value -1 to indicate the default port for the scheme should be used, and the `Path` property is set to the slash character (/).

#### Examples
The following example creates a `UriBuilder` instance that contains the URI `http://www.contoso.com/`.

_Code sample not included: ~/snippets/csharp/System/UriBuilder/.ctor/source.cs._

## UriBuilder.UriBuilder(String, String, Int32) constructor

```csharp
public UriBuilder (string? scheme, string? host, int portNumber);
```

Initializes a new instance of the `UriBuilder` class with the specified scheme, host, and port.

Parameters:

- `scheme`: An Internet access protocol.
- `host`: A DNS-style domain name or IP address.
- `portNumber`: An IP port number for the service.

Exceptions:

- `ArgumentOutOfRangeException`: `portNumber` is less than -1 or greater than 65,535.

#### Remarks
The `UriBuilder` instance is initialized with the `Scheme` property set to `schemeName`, the `Host` property set to `hostName`, and the `Port` property set to `portNumber`. The `Path` property is set to the slash character (/).

If the `portNumber` is set to a value of -1, this indicates that the default port value for the scheme will be used to connect to the host.

#### Examples
The following example creates a `UriBuilder` instance that contains the URI `http://www.contoso.com:8080/`.

_Code sample not included: ~/snippets/csharp/System/UriBuilder/.ctor/source1.cs._

## UriBuilder.UriBuilder(String, String, Int32, String) constructor

```csharp
public UriBuilder (string? scheme, string? host, int port, string? pathValue);
```

Initializes a new instance of the `UriBuilder` class with the specified scheme, host, port number, and path.

Parameters:

- `scheme`: An Internet access protocol.
- `host`: A DNS-style domain name or IP address.
- `port`: An IP port number for the service.
- `pathValue`: The path to the Internet resource.

Exceptions:

- `ArgumentOutOfRangeException`: `port` is less than -1 or greater than 65,535.

#### Remarks
The `UriBuilder` instance is initialized with the `Scheme` property set to `schemeName`, the `Host` property set to `hostName`, the `Port` property set to `portNumber`, and the `Path` property set to `pathValue`.

If the `portNumber` is set to a value of -1, this indicates that the default port value for the scheme will be used to connect to the host.

#### Examples
The following example creates a `UriBuilder` instance that contains the URI `http://www.contoso.com:8080/index.htm`.

_Code sample not included: ~/snippets/csharp/System/UriBuilder/.ctor/source2.cs._

## UriBuilder.UriBuilder(String, String, Int32, String, String) constructor

```csharp
public UriBuilder (string? scheme, string? host, int port, string? path, string? extraValue);
```

Initializes a new instance of the `UriBuilder` class with the specified scheme, host, port number, path, and query string or fragment identifier.

Parameters:

- `scheme`: An Internet access protocol.
- `host`: A DNS-style domain name or IP address.
- `port`: An IP port number for the service.
- `path`: The path to the Internet resource.
- `extraValue`: A query string or fragment identifier.

Exceptions:

- `ArgumentException`: `extraValue` is neither `null` nor `String.Empty`, nor does a valid fragment identifier begin with a number sign (#), nor a valid query string begin with a question mark (?).
- `ArgumentOutOfRangeException`: `port` is less than -1 or greater than 65,535.

#### Remarks
The `UriBuilder` instance is initialized with the `Scheme` property set to `schemeName`, the `Host` property set to `hostName`, the `Port` property set to `portNumber`, and the `Path` property set to `pathValue`. If `extraValue` begins with a number sign (#), then `Fragment` is set to `extraValue`. If `extraValue` begins with a question mark (?), then `Query` is set to `extraValue`.

If the `portNumber` is set to a value of -1, this indicates that the default port value for the scheme will be used to connect to the host.

#### Examples
The following example creates a `UriBuilder` instance that contains the URI `http://www.contoso.com:8080/index.htm#top`.

_Code sample not included: ~/snippets/csharp/System/UriBuilder/.ctor/source3.cs._

## UriBuilder.Fragment property

```csharp
public string Fragment { get; set; }
```

Gets or sets the fragment portion of the URI, including the leading '#' character if not empty.

Returns: The fragment portion of the URI.

#### Remarks

The `Fragment` property contains any text following a fragment marker (#) in the URI, including the marker itself. When setting the `Fragment` property, the fragment marker is prepended to the string if it's not already present.

#### Examples
The following example creates the URI `"http://www.contoso.com/index.htm#main"`.

_Code sample not included: ~/snippets/csharp/System/UriBuilder/Fragment/source.cs._

## UriBuilder.Host property

```csharp
public string Host { get; set; }
```

Gets or sets the Domain Name System (DNS) host name or IP address of a server.

Returns: The DNS host name or IP address of the server.

#### Remarks
The `Host` property contains the fully qualified DNS host name or IP address of the server.

## UriBuilder.Password <example-value>

```csharp
public string Password { get; set; }
```

Gets or sets the password <example-value> with the user that accesses the URI.

Returns: The password of the user that accesses the URI.

To be added.

## UriBuilder.Path property

```csharp
public string Path { get; set; }
```

Gets or sets the path to the resource referenced by the URI.

Returns: The path to the resource referenced by the URI.

#### Remarks
The `Path` property contains the path information that the server uses to resolve requests for information. Typically, this is the path to the desired information on the server's file system. It can also indicate the application or script that the server must run to provide the information.

The path information does not include the scheme, host name, or query portion of the URI. The `Path` property always returns at least a slash (/).

## UriBuilder.Port property

```csharp
public int Port { get; set; }
```

Gets or sets the port number of the URI.

Returns: The port number of the URI.

Exceptions:

- `ArgumentOutOfRangeException`: The port cannot be set to a value less than -1 or greater than 65,535.

#### Remarks
The port number defines the protocol port for contacting the host referenced in the URI. If a port is not specified as part of the URI, the `Port` property returns the value of -1 to indicate that the default port value for the protocol scheme will be used to connect to the host. If the `Port` property is set to a value of -1, this indicates that the default port value for the protocol scheme will be used to connect to the host.

## UriBuilder.Query property

```csharp
public string Query { get; set; }
```

Gets or sets any query information included in the URI, including the leading '?' character if not empty.

Returns: The query information included in the URI.

#### Remarks

The `Query` property contains any query information included in the URI. Query information is separated from the path information by a question mark (?) and continues to the end of the URI. The query information that's returned includes the leading question mark. When setting the `Query` property, a question mark is prepended to the string if it's not already present.

The query information is escaped according to RFC 2396.

#### Examples

The following example sets the `Query` property.

_Code sample not included: ~/snippets/csharp/System/UriBuilder/Query/main.cs._

## UriBuilder.Scheme property

```csharp
public string Scheme { get; set; }
```

Gets or sets the scheme name of the URI.

Returns: The scheme of the URI.

Exceptions:

- `ArgumentException`: The scheme cannot be set to an invalid scheme name.

#### Remarks

The set accessor validates the scheme name for validity according to RFC 2396. The scheme name must begin with a letter and must contain only letters, digits, and the characters ".", "+", or "-".

## UriBuilder.Uri property

```csharp
public Uri Uri { get; }
```

Gets the `Uri` instance constructed by the specified `UriBuilder` instance.

Returns: The URI constructed by the `UriBuilder`.

Exceptions:

- `UriFormatException`: The URI constructed by the `UriBuilder` properties is invalid.

#### Remarks
The `Uri` property contains the `Uri` created by the `UriBuilder`. Any changes made to the `UriBuilder` properties are reflected in the `Uri` property.

## UriBuilder.UserName property

```csharp
public string UserName { get; set; }
```

Gets or sets the user name associated with the user that accesses the URI.

Returns: The name of the user that accesses the URI.

To be added.

## UriBuilder.Equals(Object) method

```csharp
public override bool Equals (object? rparam);
```

Compares an existing `Uri` instance with the contents of the `UriBuilder` for equality.

Parameters:

- `rparam`: The object to compare with the current instance.

Returns: `true` if `rparam` represents the same `Uri` as the `Uri` constructed by this `UriBuilder` instance; otherwise, `false`.

#### Remarks
The `UriBuilder.Equals` method compares a specified `Uri` instance with the `Uri` instance built by the `UriBuilder` instance. If the two are the same, the `UriBuilder.Equals` method returns `true`.

## UriBuilder.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the URI.

Returns: The hash code generated for the URI.

#### Remarks
The hash code is generated without including any fragment. The URIs `http://www.contoso.com/index.htm#search` and `http://www.contoso.com/index.htm` generate the same hash code.

The hash codes for `Uri` A and B are guaranteed to be the same when A.Equals(B) is `true`.

This method implements `Object.GetHashCode`.

## UriBuilder.ToString() method

```csharp
public override string ToString ();
```

Returns the display string for the specified `UriBuilder` instance.

Returns: The string that contains the unescaped display string of the `UriBuilder`.

Exceptions:

- `UriFormatException`: The `UriBuilder` instance has a bad password.

#### Remarks

The display string contains the `Port` property value if one of the following conditions is true:

- The `Port` property was set.
- The port was specified when the `UriBuilder` was constructed using one of the `UriBuilder.%23ctor` constructors that accept a port number parameter.

In either case, the display string does not contain the `Port` property value if the port number was set to a value of -1 (for the default port).
