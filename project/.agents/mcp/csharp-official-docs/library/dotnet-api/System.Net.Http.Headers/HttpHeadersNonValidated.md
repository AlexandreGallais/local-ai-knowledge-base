---
title: "HttpHeadersNonValidated struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/HttpHeadersNonValidated.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpHeadersNonValidated struct

Namespace: `System.Net.Http.Headers`

```csharp
public readonly struct HttpHeadersNonValidated : System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,System.Net.Http.Headers.HeaderStringValues>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<string,System.Net.Http.Headers.HeaderStringValues>>, System.Collections.Generic.IReadOnlyDictionary<string,System.Net.Http.Headers.HeaderStringValues>
```

Provides a view on top of a `HttpHeaders` collection that avoids forcing validation or parsing on its contents.

#### Remarks

The view surfaces data as it's stored in the headers collection.  Any header values that have not yet been parsed / validated won't be
as part of any accesses from this view, e.g. a raw header value of "one, two" that hasn't yet been parsed due to other operations
on the `HttpHeaders` will be surfaced as a single header value rather than two.  For any header values that have already
been parsed and validated, that value will be converted to a string to be returned from operations on this view.

## HttpHeadersNonValidated.Count property

```csharp
public int Count { get; }
```

Gets the number of headers stored in the collection.

Returns: The number of elements in the collection.

#### Remarks

Multiple header values associated with the same header name are considered to be one header as far as this count is concerned.

## HttpHeadersNonValidated.Item property

```csharp
public System.Net.Http.Headers.HeaderStringValues this[string headerName] { get; }
```

Gets the values for the specified header name.

Parameters:

- `headerName`: The name of the header.

Returns: The values for the specified header.

Exceptions:

- `KeyNotFoundException`: The header was not contained in the collection.

To be added.

## HttpHeadersNonValidated.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Net.Http.Headers.HeaderStringValues>.Keys property

```csharp
System.Collections.Generic.IEnumerable<string> System.Collections.Generic.IReadOnlyDictionary<System.String,System.Net.Http.Headers.HeaderStringValues>.Keys { get; }
```

Gets an enumerable collection that contains the keys in the read-only dictionary.

Returns: An enumerable collection that contains the keys in the read-only dictionary.

To be added.

## HttpHeadersNonValidated.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Net.Http.Headers.HeaderStringValues>.Values property

```csharp
System.Collections.Generic.IEnumerable<System.Net.Http.Headers.HeaderStringValues> System.Collections.Generic.IReadOnlyDictionary<System.String,System.Net.Http.Headers.HeaderStringValues>.Values { get; }
```

Gets an enumerable collection that contains the values in the read-only dictionary.

Returns: An enumerable collection that contains the values in the read-only dictionary.

To be added.

## HttpHeadersNonValidated.Contains(String) method

```csharp
public bool Contains (string headerName);
```

Gets whether the collection contains the specified header.

Parameters:

- `headerName`: The name of the header.

Returns: `true` if the collection contains the header; otherwise, `false`.

To be added.

## HttpHeadersNonValidated.GetEnumerator() method

```csharp
public System.Net.Http.Headers.HttpHeadersNonValidated.Enumerator GetEnumerator ();
```

Gets an enumerator that iterates through the `HttpHeadersNonValidated`.

Returns: An enumerator that iterates through the `HttpHeadersNonValidated`.

To be added.

## HttpHeadersNonValidated.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<System.String,System.Net.Http.Headers.HeaderStringValues>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,System.Net.Http.Headers.HeaderStringValues>> IEnumerable<KeyValuePair<string,HeaderStringValues>>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## HttpHeadersNonValidated.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Net.Http.Headers.HeaderStringValues>.ContainsKey(String) method

```csharp
bool IReadOnlyDictionary<string,HeaderStringValues>.ContainsKey (string key);
```

Determines whether the read-only dictionary contains an element that has the specified key.

Parameters:

- `key`: The key to locate.

Returns: `true` if the read-only dictionary contains an element that has the specified key; otherwise, `false`.

To be added.

## HttpHeadersNonValidated.System.Collections.Generic.IReadOnlyDictionary<System.String,System.Net.Http.Headers.HeaderStringValues>.TryGetValue(String, HeaderStringValues) method

```csharp
bool IReadOnlyDictionary<string,HeaderStringValues>.TryGetValue (string key, out System.Net.Http.Headers.HeaderStringValues value);
```

Gets the value that is associated with the specified key.

Parameters:

- `key`: The key to locate.
- `value`: When this method returns, contains the value associated with the specified key, if the key is found; otherwise, contains the default value of `HeaderStringValues`. This parameter is passed uninitialized.

Returns: `true` if the collection contains the specified header; otherwise, `false`.

To be added.

## HttpHeadersNonValidated.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `HttpHeadersNonValidated` instance is cast to an `IEnumerable` interface.

## HttpHeadersNonValidated.TryGetValues(String, HeaderStringValues) method

```csharp
public bool TryGetValues (string headerName, out System.Net.Http.Headers.HeaderStringValues values);
```

Attempts to retrieve the values associated with the specified header name.

Parameters:

- `headerName`: The name of the header.
- `values`: The retrieved header values.

Returns: `true` if the collection contains the specified header; otherwise, `false`.

To be added.
