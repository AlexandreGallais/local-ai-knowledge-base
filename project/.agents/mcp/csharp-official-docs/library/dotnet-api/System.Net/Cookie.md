---
title: "Cookie class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/Cookie.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Cookie class

Namespace: `System.Net`

```csharp
public sealed class Cookie
```

Provides a set of properties and methods that are used to manage cookies. This class cannot be inherited.

#### Remarks
The `Cookie` class is used by a client application to retrieve information about cookies that are received with HTTP responses. The following cookie formats are supported during parsing of the HTTP response headers: the original Netscape specification, RFC 2109, and RFC 2965.

For a list of initial property values for an instance of `Cookie`, see the various `Cookie` constructors.

#### Examples
The following example sends a request to a URL and displays the cookies returned in the response.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Cookie() constructor

```csharp
public Cookie ();
```

Initializes a new instance of the `Cookie` class.

#### Remarks
The parameterless constructor initializes all fields to their default values, using empty strings ("") for `name`, `value`, `path`, and `domain`. Note that at least the `Name` property must be initialized before using an instance of the `Cookie` class.

## Cookie.Cookie(String, String) constructor

```csharp
public Cookie (string name, string? value);
```

Initializes a new instance of the `Cookie` class with a specified `Cookie.Name` and `Cookie.Value`.

Parameters:

- `name`: The name of a `Cookie`. The following characters must not be used inside `name`: equal sign, semicolon, comma, newline (\n), return (\r), tab (\t), and space character. The dollar sign character ("$") cannot be the first character.
- `value`: The value of a `Cookie`. The following characters must not be used inside `value`: semicolon, comma.

Exceptions:

- `CookieException`: The `name` parameter is `null`.

-or-

The `name` parameter is of zero length.

-or-

The `name` parameter contains an invalid character.

-or-

The `value` parameter is `null` .

-or -

The `value` parameter contains a string not enclosed in quotes that contains an invalid character.

#### Remarks
The default for the `value` parameter uses the empty string ("").

The `value` parameter for a `Cookie` must not be a `null` reference (Nothing in Visual Basic). The semicolon (";") and comma (",") characters are reserved and cannot be passed in the `value` parameter unless the string passed in the `value` parameter is enclosed in double quotes. So the following example constructor would succeed, but when you try to add this `Cookie` to a `CookieContainer` instance with the `Add` or `Add` methods, the operation will fail and throw an exception:

```csharp
 System.Net.Cookie cookie = new System.Net.Cookie("contoso", "123,456");
 cookie.Domain = "contoso.com";
 new CookieContainer().Add(cookie);
```

However, the following constructor with these special characters escaped will create a `Cookie` that can be added to a `CookieContainer` instance:

```csharp
 System.Net.Cookie cookie = new System.Net.Cookie("contoso", "\"123,456\"");
 cookie.Domain = "contoso.com";
 new CookieContainer().Add(cookie);
```

The comma character is used as a delimiter between separate cookies on the same line.

## Cookie.Cookie(String, String, String) constructor

```csharp
public Cookie (string name, string? value, string? path);
```

Initializes a new instance of the `Cookie` class with a specified `Cookie.Name`, `Cookie.Value`, and `Cookie.Path`.

Parameters:

- `name`: The name of a `Cookie`. The following characters must not be used inside `name`: equal sign, semicolon, comma, newline (\n), return (\r), tab (\t), and space character. The dollar sign character ("$") cannot be the first character.
- `value`: The value of a `Cookie`. The following characters must not be used inside `value`: semicolon, comma.
- `path`: The subset of URIs on the origin server to which this `Cookie` applies. The default value is "/".

Exceptions:

- `CookieException`: The `name` parameter is `null`.

-or-

The `name` parameter is of zero length.

-or-

The `name` parameter contains an invalid character.

-or-

The `value` parameter is `null` .

-or -

The `value` parameter contains a string not enclosed in quotes that contains an invalid character.

#### Remarks
The default for the `path` parameter uses the empty string ("").

The `value` parameter for a `Cookie` must not be a `null` reference (Nothing in Visual Basic). The semicolon (";") and comma (",") characters are reserved and cannot be passed in the `value` parameter unless the string passed in the `value` parameter is enclosed in double quotes. So the following example constructor would succeed, but when you try to add this `Cookie` to a `CookieContainer` instance with the `Add` or `Add` methods, the operation will fail and throw an exception:

```csharp
 System.Net.Cookie cookie = new System.Net.Cookie("contoso", "123,456", "");
 cookie.Domain = "contoso.com";
 new CookieContainer().Add(cookie);
```

However, the following constructor with these special characters escaped will create a `Cookie` that can be added to a `CookieContainer` instance:

```csharp
 System.Net.Cookie cookie = new System.Net.Cookie("contoso", "\"123,456\"", "");
 cookie.Domain = "contoso.com";
 new CookieContainer().Add(cookie);
```

The comma character is used as a delimiter between separate cookies on the same line.

## Cookie.Cookie(String, String, String, String) constructor

```csharp
public Cookie (string name, string? value, string? path, string? domain);
```

Initializes a new instance of the `Cookie` class with a specified `Cookie.Name`, `Cookie.Value`, `Cookie.Path`, and `Cookie.Domain`.

Parameters:

- `name`: The name of a `Cookie`. The following characters must not be used inside `name`: equal sign, semicolon, comma, newline (\n), return (\r), tab (\t), and space character. The dollar sign character ("$") cannot be the first character.
- `value`: The value of a `Cookie` object. The following characters must not be used inside `value`: semicolon, comma.
- `path`: The subset of URIs on the origin server to which this `Cookie` applies. The default value is "/".
- `domain`: The optional internet domain for which this `Cookie` is valid. The default value is the host this `Cookie` has been received from.

Exceptions:

- `CookieException`: The `name` parameter is `null`.

-or-

The `name` parameter is of zero length.

-or-

The `name` parameter contains an invalid character.

-or-

The `value` parameter is `null` .

-or -

The `value` parameter contains a string not enclosed in quotes that contains an invalid character.

#### Remarks
The default for the `domain` and `path` parameters uses the empty string ("").

The `value` parameter for a `Cookie` must not be a `null` reference (Nothing in Visual Basic). The semicolon (";") and comma (",") characters are reserved and cannot be passed in the `value` parameter unless the string passed in the `value` parameter is enclosed in double quotes. So the following example constructor would succeed, but when you try to add this `Cookie` to a `CookieContainer` instance with the `Add` or `Add` methods, the operation will fail and throw an exception:

```csharp
 System.Net.Cookie cookie = new System.Net.Cookie("contoso", "123,456", "", "contoso.com");
 new CookieContainer().Add(cookie);
```

However, the following constructor with these special characters escaped will create a `Cookie` that can be added to a `CookieContainer` instance:

```csharp
 System.Net.Cookie cookie = new System.Net.Cookie("contoso", "\"123,456\"", "", "contoso.com");
 new CookieContainer().Add(cookie);
```

The comma character is used as a delimiter between separate cookies on the same line.

## Cookie.Comment property

```csharp
public string Comment { get; set; }
```

Gets or sets a comment that the server can add to a `Cookie`.

Returns: An optional comment to document intended usage for this `Cookie`.

#### Remarks
The client can inspect this optional comment for information added by the server. For example, the server could include information about issues like the privacy policy or intended usage.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.CommentUri property

```csharp
public Uri? CommentUri { get; set; }
```

Gets or sets a URI comment that the server can provide with a `Cookie`.

Returns: An optional comment that represents the intended usage of the URI reference for this `Cookie`. The value must conform to URI format.

#### Remarks
The URI can provide optional information, such as how the server uses the `Cookie`.

#### Examples
The following example displays the properties of cookies that are returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Discard property

```csharp
public bool Discard { get; set; }
```

Gets or sets the discard flag set by the server.

Returns: `true` if the client is to discard the `Cookie` at the end of the current session; otherwise, `false`. The default is `false`.

#### Remarks
When `true`, this property instructs the client application not to save the `Cookie` on the user's hard disk when a session ends.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Domain property

```csharp
public string Domain { get; set; }
```

Gets or sets the URI for which the `Cookie` is valid.

Returns: The URI for which the `Cookie` is valid.

#### Remarks
A server cannot indicate a domain other than its own URI. However, it can indicate more than one server in the domain. The default value is the host that this cookie has been received from.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Expired property

```csharp
public bool Expired { get; set; }
```

Gets or sets the current state of the `Cookie`.

Returns: `true` if the `Cookie` has expired; otherwise, `false`. The default is `false`.

#### Remarks
Expired cookies, if received, should be destroyed by the client application.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Expires property

```csharp
public DateTime Expires { get; set; }
```

Gets or sets the expiration date and time for the `Cookie` as a `DateTime`.

Returns: The expiration date and time for the `Cookie` as a `DateTime` instance.

#### Remarks
Setting the `Expires` property to `MinValue` makes this a session cookie, which is its default value.

The `Kind` property of `Cookie.Expires` is used to determine if the cookie is set to `Local` or `Utc`. If the `Kind` property is set to `Unspecified`, then `Utc` is assumed.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.HttpOnly property

```csharp
public bool HttpOnly { get; set; }
```

Determines whether a page script or other active content can access this cookie.

Returns: Boolean value that determines whether a page script or other active content can access this cookie.

#### Remarks
When this property is set to `true`, a page script or other active content cannot access this cookie.

## Cookie.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the name for the `Cookie`.

Returns: The name for the `Cookie`.

Exceptions:

- `CookieException`: The value specified for a set operation is `null` or the empty string

-or-

The value specified for a set operation contained an illegal character. The following characters must not be used inside the `Cookie.Name` property: equal sign, semicolon, comma, newline (\n), return (\r), tab (\t), and space character. The dollar sign character ("$") cannot be the first character.

#### Remarks
The `Name` property must be initialized before using an instance of the `Cookie` class.

The following characters are reserved and cannot be used for this attribute value: equal sign, semicolon, comma, new line (\n), return (\r), tab (\t), and space character. The dollar sign ($) character cannot be the first character.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Path property

```csharp
public string Path { get; set; }
```

Gets or sets the URIs to which the `Cookie` applies.

Returns: The URIs to which the `Cookie` applies.

#### Remarks
The `Path` property specifies the subset of URIs on the origin server to which this `Cookie` applies. If this property is not specified, then this `Cookie` will be sent to all pages on the origin server or servers.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Port property

```csharp
public string Port { get; set; }
```

Gets or sets a list of TCP ports that the `Cookie` applies to.

Returns: The list of TCP ports that the `Cookie` applies to.

Exceptions:

- `CookieException`: The value specified for a set operation could not be parsed or is not enclosed in double quotes.

#### Remarks
This attribute restricts the ports to which this `Cookie` may be sent. The default value means no restriction. Setting this to the empty string ("") will restrict the port to the one used in the HTTP response. Otherwise, the value must be a double-quoted string that contains port values delimited with commas.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._
