---
title: "HttpVersion class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpVersion.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpVersion class

Namespace: `System.Net`

```csharp
public static class HttpVersion
```

Defines the HTTP version numbers that are supported by the `HttpWebRequest` and `HttpWebResponse` classes.

#### Remarks
The `HttpVersion` class defines the HTTP versions that are supported by the `HttpClient` class. The HTTP version number is used to control version-specific features of HTTP, such as pipelining and chunking.

#### Examples
The following example demonstrates the use of `HttpVersion`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpVersion/Overview/httpversion_version10.cs._

## HttpVersion.Unknown field

```csharp
public static readonly Version Unknown;
```

Defines a `Version` instance for an unknown HTTP version.

To be added.

## HttpVersion.Version10 field

```csharp
public static readonly Version Version10;
```

Defines a `Version` instance for HTTP 1.0.

To be added.

## HttpVersion.Version11 field

```csharp
public static readonly Version Version11;
```

Defines a `Version` instance for HTTP 1.1.

To be added.

## HttpVersion.Version20 field

```csharp
public static readonly Version Version20;
```

Defines a `Version` instance for HTTP 2.0.

To be added.

## HttpVersion.Version30 field

```csharp
public static readonly Version Version30;
```

Defines a `Version` instance for HTTP 3.0.

To be added.
