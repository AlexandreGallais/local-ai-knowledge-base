# common/http/src/headers

## HttpHeaders

```ts
export class HttpHeaders
```

Represents the header configuration options for an HTTP request.
Instances are immutable. Modifying methods return a cloned
instance with the change. The original object is never changed.

@see [Setting request headers](guide/http/making-requests#setting-request-headers)

@publicApi

## HttpHeaders.constructor

```ts
constructor( headers?: string | {[name: string]: string | number | (string | number)[]} | Headers, )
```

Constructs a new HTTP header object with the given values.

## HttpHeaders.has

```ts
has(name: string): boolean
```

Checks for existence of a given header.

@param name The header name to check for existence.

@returns True if the header exists, false otherwise.

## HttpHeaders.get

```ts
get(name: string): string | null
```

Retrieves the first value of a given header.

@param name The header name.

@returns The value string if the header exists, null otherwise

## HttpHeaders.keys

```ts
keys(): string[]
```

Retrieves the names of the headers.

@returns A list of header names.

## HttpHeaders.getAll

```ts
getAll(name: string): string[] | null
```

Retrieves a list of values for a given header.

@param name The header name from which to retrieve values.

@returns A string of values if the header exists, null otherwise.

## HttpHeaders.append

```ts
append(name: string, value: string | string[]): HttpHeaders
```

Appends a new value to the existing set of values for a header
and returns them in a clone of the original instance.

@param name The header name for which to append the values.
@param value The value to append.

@returns A clone of the HTTP headers object with the value appended to the given header.

## HttpHeaders.set

```ts
set(name: string, value: string | string[]): HttpHeaders
```

Sets or modifies a value for a given header in a clone of the original instance.
If the header already exists, its value is replaced with the given value
in the returned object.

@param name The header name.
@param value The value or values to set or override for the given header.

@returns A clone of the HTTP headers object with the newly set header value.

## HttpHeaders.delete

```ts
delete(name: string, value?: string | string[]): HttpHeaders
```

Deletes values for a given header in a clone of the original instance.

@param name The header name.
@param value The value or values to delete for the given header.

@returns A clone of the HTTP headers object with the given value deleted.