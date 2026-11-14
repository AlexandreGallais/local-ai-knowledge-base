# common/http/src/params

## HttpParameterCodec

```ts
export interface HttpParameterCodec
```

A codec for encoding and decoding parameters in URLs.

Used by `HttpParams`.

@see [Custom parameter encoding](guide/http/making-requests#custom-parameter-encoding)

@publicApi

## HttpUrlEncodingCodec

```ts
export class HttpUrlEncodingCodec implements HttpParameterCodec
```

Provides encoding and decoding of URL parameter and query-string values.

Serializes and parses URL parameter keys and values to encode and decode them.
If you pass URL query parameters without encoding,
the query parameters can be misinterpreted at the receiving end.


@publicApi

## HttpUrlEncodingCodec.encodeKey

```ts
encodeKey(key: string): string
```

Encodes a key name for a URL parameter or query-string.
@param key The key name.
@returns The encoded key name.

## HttpUrlEncodingCodec.encodeValue

```ts
encodeValue(value: string): string
```

Encodes the value of a URL parameter or query-string.
@param value The value.
@returns The encoded value.

## HttpUrlEncodingCodec.decodeKey

```ts
decodeKey(key: string): string
```

Decodes an encoded URL parameter or query-string key.
@param key The encoded key name.
@returns The decoded key name.

## HttpUrlEncodingCodec.decodeValue

```ts
decodeValue(value: string)
```

Decodes an encoded URL parameter or query-string value.
@param value The encoded value.
@returns The decoded value.

## HttpParamsOptions

```ts
export interface HttpParamsOptions
```

Options used to construct an `HttpParams` instance.

@see [Setting URL parameters](guide/http/making-requests#setting-url-parameters)
@see [Custom parameter encoding](guide/http/making-requests#custom-parameter-encoding)

@publicApi

## HttpParamsOptions.fromString

```ts
fromString?: string
```

String representation of the HTTP parameters in URL-query-string format.
Mutually exclusive with `fromObject`.

## HttpParamsOptions.fromObject

```ts
fromObject?:
```

Object map of the HTTP parameters. Mutually exclusive with `fromString`.

## HttpParamsOptions.encoder

```ts
encoder?: HttpParameterCodec
```

Encoding codec used to parse and serialize the parameters.

## HttpParams

```ts
export class HttpParams
```

An HTTP request/response body that represents serialized parameters,
per the MIME type `application/x-www-form-urlencoded`.

This class is immutable; all mutation operations return a new instance.

@see [Setting URL parameters](guide/http/making-requests#setting-url-parameters)

@publicApi

## HttpParams.has

```ts
has(param: string): boolean
```

Reports whether the body includes one or more values for a given parameter.
@param param The parameter name.
@returns True if the parameter has one or more values,
false if it has no value or is not present.

## HttpParams.get

```ts
get(param: string): string | null
```

Retrieves the first value for a parameter.
@param param The parameter name.
@returns The first value of the given parameter,
or `null` if the parameter is not present.

## HttpParams.getAll

```ts
getAll(param: string): string[] | null
```

Retrieves all values for a  parameter.
@param param The parameter name.
@returns All values in a string array,
or `null` if the parameter not present.

## HttpParams.keys

```ts
keys(): string[]
```

Retrieves all the parameters for this body.
@returns The parameter names in a string array.

## HttpParams.append

```ts
append(param: string, value: string | number | boolean): HttpParams
```

Appends a new value to existing values for a parameter.
@param param The parameter name.
@param value The new value to add.
@return A new body with the appended value.

## HttpParams.appendAll

```ts
appendAll(params:
```

Constructs a new body with appended values for the given parameter name.
@param params parameters and values
@return A new body with the new value.

## HttpParams.set

```ts
set(param: string, value: string | number | boolean): HttpParams
```

Replaces the value for a parameter.
@param param The parameter name.
@param value The new value.
@return A new body with the new value.

## HttpParams.delete

```ts
delete(param: string, value?: string | number | boolean): HttpParams
```

Removes a given value or all values from a parameter.
@param param The parameter name.
@param value The value to remove, if provided.
@return A new body with the given value removed, or with all values
removed if no value is specified.

## HttpParams.toString

```ts
toString(): string
```

Serializes the body to an encoded string, where key-value pairs (separated by `=`) are
separated by `&`s.