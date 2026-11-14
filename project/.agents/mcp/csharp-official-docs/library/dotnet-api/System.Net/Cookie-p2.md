---
title: "Cookie class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/Cookie.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Cookie class (part 2 of 2)

## Cookie.Secure property

```csharp
public bool Secure { get; set; }
```

Gets or sets the security level of a `Cookie`.

Returns: `true` if the client is only to return the cookie in subsequent requests if those requests use Secure Hypertext Transfer Protocol (HTTPS); otherwise, `false`. The default is `false`.

#### Remarks
In effect, when this property is `true` this cookie may be sent only with https:// requests.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.TimeStamp property

```csharp
public DateTime TimeStamp { get; }
```

Gets the time when the cookie was issued as a `DateTime`.

Returns: The time when the cookie was issued as a `DateTime`.

#### Remarks
This is a read-only property.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Value property

```csharp
public string Value { get; set; }
```

Gets or sets the `Cookie.Value` for the `Cookie`.

Returns: The `Cookie.Value` for the `Cookie`.

#### Remarks
The `Cookie.Value` of a `Cookie` must not be `null`. If a `null` value is assigned to this property, it's replaced with an empty string.

Semicolons and commas are reserved characters that cannot be used in the value of this property. Assigning invalid characters to this property doesn't throw an exception; but when you try to add this `Cookie` to a `CookieContainer` instance with the `CookieContainer.Add` method, the operation will fail and throw an exception.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Version property

```csharp
public int Version { get; set; }
```

Gets or sets the version of HTTP state maintenance to which the cookie conforms.

Returns: The version of HTTP state maintenance to which the cookie conforms.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for a version is not allowed.

#### Remarks
The default value for the `Version` property is 0, complying with the original Netscape specification. If the value is explicitly set to 1, then this `Cookie` must conform to RFC 2109. Note that if a `Cookie` was created automatically by receiving a Set-Cookie2 HTTP response header, the conformance is set to RFC 2965.

An attempt to set the `Version` property to a value less than zero will throw an exception.

#### Examples
The following example displays the properties of cookies returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._

## Cookie.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Overrides the `Object.Equals` method.

Parameters:

- `comparand`: A reference to a `Cookie`.

Returns: Returns `true` if the `Cookie` is equal to `comparand`. Two `Cookie` instances are equal if their `Cookie.Name`, `Cookie.Value`, `Cookie.Path`, `Cookie.Domain`, and `Cookie.Version` properties are equal. `Cookie.Name` and `Cookie.Domain` string comparisons are case-insensitive.

To be added.

## Cookie.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Overrides the `Object.GetHashCode` method.

Returns: The 32-bit signed integer hash code for this instance.

#### Remarks
Classes that might be used as a key in a hash table must provide this override, because objects that are used as keys in a hash table are required to generate their own hash code through this method.

## Cookie.ToString() method

```csharp
public override string ToString ();
```

Overrides the `Object.ToString` method.

Returns: Returns a string representation of this `Cookie` object that is suitable for including in a HTTP Cookie: request header.

#### Remarks
The exact format of the string depends on the RFC that this cookie conforms to.

#### Examples
The following example displays the string value of a cookie returned in a response. For the complete example, see the `Cookie` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/Cookie/Overview/cookiessnippets.cs._
