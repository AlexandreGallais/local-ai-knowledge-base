---
title: "Breaking change: Deserialize Version with leading/trailing whitespace"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/serialization/7.0/deserialize-version-with-whitespace.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Deserialize Version type with leading or trailing whitespace

`System.Text.Json.JsonSerializer` now throws an exception while deserializing `System.Version` types that have leading or trailing whitespace.

## Previous behavior

Prior to .NET 7, deserializing `System.Version` types that have leading or trailing whitespace was permitted.

## New behavior

Started in .NET 7, `System.Text.Json.JsonSerializer` throws a `System.FormatException` when deserializing `System.Version` types that have leading or trailing whitespace.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

.NET has optimized the implementation of the underlying `System.Version` converter. This resulted in the implementation being made to align with the behavior for other primitive types supported by `System.Text.Json`, for example, `System.DateTime` and `System.Guid`, which also disallow leading and trailing spaces.

## Recommended action

To get the old behavior back, add a custom converter for the `System.Version` type that permits whitespace:

```csharp
internal sealed class VersionConverter : JsonConverter<Version>
{
    public override Version Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string? versionString = reader.GetString();
        if (Version.TryParse(versionString, out Version? result))
        {
            return result;
        }

        ThrowHelper.ThrowJsonException();
        return null;
    }

    public override void Write(Utf8JsonWriter writer, Version value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}
```

## Affected APIs

- `System.Text.Json.JsonSerializer.Deserialize*`
- `System.Text.Json.JsonSerializer.DeserializeAsync*`
