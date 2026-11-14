---
title: "AuthenticationHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/AuthenticationHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AuthenticationHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class AuthenticationHeaderValue : ICloneable
```

Represents authentication information in Authorization, ProxyAuthorization, WWW-Authenticate, and Proxy-Authenticate header values.

#### Remarks
The `AuthenticationHeaderValue` class provides support for the Authorization, ProxyAuthorization, WWW-Authenticate, and Proxy-Authenticate HTTP header values as defined in RFC 2616 by the IETF.

## AuthenticationHeaderValue.AuthenticationHeaderValue(String) constructor

```csharp
public AuthenticationHeaderValue (string scheme);
```

Initializes a new instance of the `AuthenticationHeaderValue` class.

Parameters:

- `scheme`: The scheme to use for authorization.

Example:

```csharp
HttpClient client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(ACCESS_TOKEN);
```

```vb
Dim client = New HttpClient()
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(ACCESS_TOKEN)
```

Will produce the following header:

```txt
Authorization: ACCESS_TOKEN
```

## AuthenticationHeaderValue.AuthenticationHeaderValue(String, String) constructor

```csharp
public AuthenticationHeaderValue (string scheme, string? parameter);
```

Initializes a new instance of the `AuthenticationHeaderValue` class.

Parameters:

- `scheme`: The scheme to use for authorization.
- `parameter`: The credentials <example-value> the authentication information of the user agent for the resource being requested.

Example:

```csharp
HttpClient client = new HttpClient();
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("<example-value>", ACCESS_TOKEN);
```

```vb
Dim client = new HttpClient()
client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("<example-value>", ACCESS_TOKEN)
```

Will produce the following header:

```txt
Authorization: Bearer <example-value>
```

## AuthenticationHeaderValue.Parameter property

```csharp
public string? Parameter { get; }
```

Gets the credentials <example-value> the authentication information of the user agent for the resource being requested.

Returns: The credentials <example-value> the authentication information.

To be added.

## AuthenticationHeaderValue.Scheme property

```csharp
public string Scheme { get; }
```

Gets the scheme to use for authorization.

Returns: The scheme to use for authorization.

To be added.

## AuthenticationHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `AuthenticationHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## AuthenticationHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an  `AuthenticationHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `AuthenticationHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## AuthenticationHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.AuthenticationHeaderValue Parse (string input);
```

Converts a string to an `AuthenticationHeaderValue` instance.

Parameters:

- `input`: A string that represents authentication header value information.

Returns: An `AuthenticationHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid authentication header value information.

To be added.

## AuthenticationHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `AuthenticationHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `AuthenticationHeaderValue` instance is cast to an `ICloneable` interface.

## AuthenticationHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `AuthenticationHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## AuthenticationHeaderValue.TryParse(String, AuthenticationHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.AuthenticationHeaderValue? parsedValue);
```

Determines whether a string is valid `AuthenticationHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `AuthenticationHeaderValue` version of the string.

Returns: `true` if `input` is valid `AuthenticationHeaderValue` information; otherwise, `false`.

To be added.
