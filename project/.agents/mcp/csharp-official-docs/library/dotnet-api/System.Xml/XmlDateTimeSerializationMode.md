---
title: "XmlDateTimeSerializationMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDateTimeSerializationMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDateTimeSerializationMode enum

Namespace: `System.Xml`

```csharp
public enum XmlDateTimeSerializationMode
```

Specifies how to treat the time value when converting between string and `DateTime`.

#### Remarks
This enumeration is used by the `XmlConvert.ToDateTime` and `XmlConvert.ToString` methods.

## XmlDateTimeSerializationMode.Local field

```csharp
Local
```

Treat as local time. If the `DateTime` object represents a Coordinated Universal Time (UTC), it is converted to the local time.

## XmlDateTimeSerializationMode.RoundtripKind field

```csharp
RoundtripKind
```

Time zone information should be preserved when converting.

## XmlDateTimeSerializationMode.Unspecified field

```csharp
Unspecified
```

Treat as a local time if a `DateTime` is being converted to a string. If a string is being converted to `DateTime`, convert to a local time if a time zone is specified.

## XmlDateTimeSerializationMode.Utc field

```csharp
Utc
```

Treat as a UTC. If the `DateTime` object represents a local time, it is converted to a UTC.
