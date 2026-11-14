---
title: "HttpHeaders class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/HttpHeaders.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpHeaders class

Namespace: `System.Net.Http.Headers`

```csharp
public abstract class HttpHeaders : System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,System.Collections.Generic.IEnumerable<string>>>
```

A collection of headers and their values as defined in RFC 2616.

To be added.

## HttpHeaders.HttpHeaders() constructor

```csharp
protected HttpHeaders ();
```

Initializes a new instance of the `HttpHeaders` class.

To be added.

## HttpHeaders.NonValidated property

```csharp
public System.Net.Http.Headers.HttpHeadersNonValidated NonValidated { get; }
```

Gets a view of the contents of this headers collection that does not parse nor validate the data upon access.

Returns: To be added.

To be added.

## HttpHeaders.Add(String, String>) method

```csharp
public void Add (string name, System.Collections.Generic.IEnumerable<string?> values);
```

Adds the specified header and its values into the `HttpHeaders` collection.

Parameters:

- `name`: The header to add to the collection.
- `values`: A list of header values to add to the collection.

Exceptions:

- `ArgumentException`: The name cannot be null or empty.
- `ArgumentNullException`: The values cannot be null or empty.
- `InvalidOperationException`: Misused header name. Make sure request headers are used with HttpRequestMessage, response headers with HttpResponseMessage, and content headers with HttpContent objects.
- `FormatException`: The header name format is invalid.

-or-

The header value format is invalid for this header name, or the header does not support multiple values.

#### Remarks
Header names are enforced to be valid HTTP tokens, where a token is defined as any set of ASCII letters, digits, or symbols from the ``"<example-value>"`` set, matching RFC9110's definition. Non-ASCII characters are not allowed in a header name.

The header `values` will be parsed and validated.

If the specified header does not exist, the `HttpHeaders.Add` method inserts a new header into the list of header name/value pairs.

If the specified header is already present, `values` are added to the comma-separated list of values associated with the header.

## HttpHeaders.Add(String, String) method

```csharp
public void Add (string name, string? value);
```

Adds the specified header and its value into the `HttpHeaders` collection.

Parameters:

- `name`: The header to add to the collection.
- `value`: The content of the header.

Exceptions:

- `ArgumentException`: The name cannot be null or empty.
- `InvalidOperationException`: Misused header name. Make sure request headers are used with HttpRequestMessage, response headers with HttpResponseMessage, and content headers with HttpContent objects.
- `FormatException`: The header name format is invalid.

-or-

The header value format is invalid for this header name, or the header does not support multiple values.

#### Remarks
Header names are enforced to be valid HTTP tokens, where a token is defined as any set of ASCII letters, digits, or symbols from the ``"<example-value>"`` set, matching RFC9110's definition. Non-ASCII characters are not allowed in a header name.

The header `values` will be parsed and validated.

If the specified header does not exist, the `HttpHeaders.Add` method inserts a new header into the list of header name/value pairs.

If the specified header is already present, `value` is added to the comma-separated list of values associated with the header.

## HttpHeaders.Clear() method

```csharp
public void Clear ();
```

Removes all headers from the `HttpHeaders` collection.

To be added.

## HttpHeaders.Contains(String) method

```csharp
public bool Contains (string name);
```

Returns if  a specific header exists in the `HttpHeaders` collection.

Parameters:

- `name`: The specific header.

Returns: `true` if the specified header exists in the collection; otherwise `false`.

To be added.

## HttpHeaders.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,System.Collections.Generic.IEnumerable<string>>> GetEnumerator ();
```

Returns an enumerator that can iterate through the `HttpHeaders` instance.

Returns: An enumerator for the `HttpHeaders`.

To be added.

## HttpHeaders.GetValues(String) method

```csharp
public System.Collections.Generic.IEnumerable<string> GetValues (string name);
```

Returns all header values for a specified header stored in the `HttpHeaders` collection.

Parameters:

- `name`: The specified header to return values for.

Returns: An array of header strings.

Exceptions:

- `InvalidOperationException`: The header cannot be found.

To be added.

## HttpHeaders.Remove(String) method

```csharp
public bool Remove (string name);
```

Removes the specified header from the `HttpHeaders` collection.

Parameters:

- `name`: The name of the header to remove from the collection.

Returns: `true` if `name` is successfully removed; otherwise, `false`.  This method also returns `false` if `name` was not found in the `HttpHeaders` collection or if `name` is `null`.

To be added.

## HttpHeaders.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Gets an enumerator that can iterate through a `HttpHeaders`.

Returns: An instance of an implementation of an `IEnumerator` that can iterate through a `HttpHeaders`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpHeaders` instance is cast to an `IEnumerable` interface.

## HttpHeaders.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `HttpHeaders` object.

Returns: A string that represents the current object.

To be added.

## HttpHeaders.TryAddWithoutValidation(String, String>) method

```csharp
public bool TryAddWithoutValidation (string name, System.Collections.Generic.IEnumerable<string?> values);
```

Returns a value that indicates whether the specified header and its values were added to the `HttpHeaders` collection without validating the provided information.

Parameters:

- `name`: The header to add to the collection.
- `values`: The values of the header.

Returns: `true` if the specified header `name` and `values` could be added to the collection; otherwise `false`.

#### Remarks

This method performs header name validation, returning `false` for invalid names. Header names are enforced to be valid HTTP tokens, where a token is defined as any set of ASCII letters, digits, or symbols from the ``"<example-value>"`` set, matching RFC9110'<example-value>'t allowed in a header name.

This method doesn't perform any header value validation. Values added via this method are assumed to be trusted, and other application logic, such as `HttpClient`, might misbehave if they're not well formed.

Values added without validation might be observed when enumerating the collection or querying for the specific header name, even when the caller isn't using the `NonValidated` view of the collection.

> **Caution:**
> This method must never be used with untrusted values, unless they were otherwise sufficiently validated.
>
> What constitutes "sufficient" validation can vary by use case. At a minimum, prohibit newline characters for protocol correctness, for example, `if (value.ContainsAny('\r', '\n', '\0')) throw ...`. This validation should ensure that the server application sees values in the same way as the client application, with the server now being responsible for properly sanitizing its own inputs.
>
> To guard against attacks such as request smuggling, callers are highly encouraged to validate that these values don't contain newline characters.

## HttpHeaders.TryAddWithoutValidation(String, String) method

```csharp
public bool TryAddWithoutValidation (string name, string? value);
```

Returns a value that indicates whether the specified header and its value were added to the `HttpHeaders` collection without validating the provided information.

Parameters:

- `name`: The header to add to the collection.
- `value`: The content of the header.

Returns: `true` if the specified header `name` and `value` could be added to the collection; otherwise `false`.

#### Remarks

This method performs header name validation, returning `false` for invalid names. Header names are enforced to be valid HTTP tokens, where a token is defined as any set of ASCII letters, digits, or symbols from the ``"<example-value>"`` set, matching RFC9110'<example-value>'t allowed in a header name.

This method doesn't perform any header value validation. Values added via this method are assumed to be trusted, and other application logic, such as `HttpClient`, might misbehave if they're not well formed.

Values added without validation might be observed when enumerating the collection or querying for the specific header name, even when the caller isn't using the `NonValidated` view of the collection.

> **Caution:**
> This method must never be used with untrusted values, unless they were otherwise sufficiently validated.
>
> What constitutes "sufficient" validation can vary by use case. At a minimum, prohibit newline characters for protocol correctness, for example, `if (value.ContainsAny('\r', '\n', '\0')) throw ...`. This validation should ensure that the server application sees values in the same way as the client application, with the server now being responsible for properly sanitizing its own inputs.
>
> To guard against attacks such as request smuggling, callers are highly encouraged to validate that these values don't contain newline characters.

## HttpHeaders.TryGetValues(String, String>) method

```csharp
public bool TryGetValues (string name, out System.Collections.Generic.IEnumerable<string>? values);
```

Returns a value that indicates whether a specified header and specified values are stored in the `HttpHeaders` collection.

Parameters:

- `name`: The specified header.
- `values`: The specified header values.

Returns: `true` if the specified header `name` and `values` are stored in the collection; otherwise `false`.

To be added.
