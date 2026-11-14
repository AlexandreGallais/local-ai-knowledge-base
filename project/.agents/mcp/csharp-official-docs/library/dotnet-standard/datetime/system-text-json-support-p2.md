---
title: "DateTime and DateTimeOffset support in System.Text.Json (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/system-text-json-support.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# DateTime and DateTimeOffset support in System.Text.Json (part 2 of 3)

## Custom support for `System.DateTime` and `System.DateTimeOffset`

### When using `System.Text.Json.JsonSerializer`

If you want the serializer to perform custom parsing or formatting, you can implement custom converters. The following sections show a few examples:

- DateTime(Offset).Parse and DateTime(Offset).ToString
- Utf8Parser and Utf8Formatter
- Use DateTime(Offset).Parse as a fallback
- Use Unix epoch date format

#### DateTime(Offset).Parse and DateTime(Offset).ToString

If you can't determine the formats of your input `System.DateTime` or `System.DateTimeOffset` text representations, you can use the `DateTime(Offset).Parse` method in your converter read logic.
This method allows you to use .NET's extensive support for parsing various `System.DateTime` and `System.DateTimeOffset` text formats, including non-ISO 8601 strings and ISO 8601 formats that don't conform to the extended ISO 8601-1:2019 profile.
This approach is less performant than using the serializer's native implementation.

For serializing, you can use the `DateTime(Offset).ToString` method in your converter write logic.
This method allows you to write `System.DateTime` and `System.DateTimeOffset` values using any of the standard date and time formats, and the custom date and time formats.
This approach is also less performant than using the serializer's native implementation.

```csharp
﻿using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace DateTimeConverterExamples;

public class DateTimeConverterUsingDateTimeParse : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        Debug.Assert(typeToConvert == typeof(DateTime));
        return DateTime.Parse(reader.GetString() ?? string.Empty);
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}

class Program
{
    private static void ParseDateTimeWithDefaultOptions()
    {
        DateTime _ = JsonSerializer.Deserialize<DateTime>(@"""04-10-2008 6:30 AM""");
    }

    private static void FormatDateTimeWithDefaultOptions()
    {
        Console.WriteLine(JsonSerializer.Serialize(DateTime.Parse("04-10-2008 6:30 AM -4")));
    }

    private static void ProcessDateTimeWithCustomConverter()
    {
        JsonSerializerOptions options = new JsonSerializerOptions();
        options.Converters.Add(new DateTimeConverterUsingDateTimeParse());

        string testDateTimeStr = "04-10-2008 6:30 AM";
        string testDateTimeJson = @"""" + testDateTimeStr + @"""";

        DateTime resultDateTime = JsonSerializer.Deserialize<DateTime>(testDateTimeJson, options);
        Console.WriteLine(resultDateTime);

        string resultDateTimeJson = JsonSerializer.Serialize(DateTime.Parse(testDateTimeStr), options);
        Console.WriteLine(Regex.Unescape(resultDateTimeJson));
    }

    static void Main(string[] args)
    {
        // Parsing non-compliant format as DateTime fails by default.
        try
        {
            ParseDateTimeWithDefaultOptions();
        }
        catch (JsonException e)
        {
            Console.WriteLine(e.Message);
        }

        // Formatting with default options prints according to extended ISO 8601 profile.
        FormatDateTimeWithDefaultOptions();

        // Using converters gives you control over the serializers parsing and formatting.
        ProcessDateTimeWithCustomConverter();
    }
}

// The example displays output similar to the following:
// The JSON value could not be converted to System.DateTime. Path: $ | LineNumber: 0 | BytePositionInLine: 20.
// "2008-04-10T06:30:00-04:00"
// 4/10/2008 6:30:00 AM
// "4/10/2008 6:30:00 AM"
```
> **Note:**
> When implementing `System.Text.Json.Serialization.JsonConverter`1`, and `T` is `System.DateTime`, the `typeToConvert` parameter will always be `typeof(DateTime)`.
The parameter is useful for handling polymorphic cases and when using generics to get `typeof(T)` in a performant way.

#### `System.Buffers.Text.Utf8Parser` and `System.Buffers.Text.Utf8Formatter`

You can use fast UTF-8-based parsing and formatting methods in your converter logic if your input `System.DateTime` or `System.DateTimeOffset`
text representations are compliant with one of the "R", "l", "O", or "G"
 standard date and time format strings,
or you want to write according to one of these formats. This approach is much faster than using `DateTime(Offset).Parse` and `DateTime(Offset).ToString`.

The following example shows a custom converter that serializes and deserializes `System.DateTime` values according to
 the "R" standard format:

```csharp
﻿using System.Buffers;
using System.Buffers.Text;
using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DateTimeConverterExamples;

// This converter reads and writes DateTime values according to the "R" standard format specifier:
// https://learn.microsoft.com/dotnet/standard/base-types/standard-date-and-time-format-strings#the-rfc1123-r-r-format-specifier.
public class DateTimeConverterForCustomStandardFormatR : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        Debug.Assert(typeToConvert == typeof(DateTime));

        if (Utf8Parser.TryParse(reader.ValueSpan, out DateTime value, out _, 'R'))
        {
            return value;
        }

        throw new FormatException();
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        // The "R" standard format will always be 29 bytes.
        Span<byte> utf8Date = stackalloc byte[29];

        bool result = Utf8Formatter.TryFormat(value, utf8Date, out _, new StandardFormat('R'));
        Debug.Assert(result);

        writer.WriteStringValue(utf8Date);
    }
}

class Program
{
    private static void ParseDateTimeWithDefaultOptions()
    {
        DateTime _ = JsonSerializer.Deserialize<DateTime>(@"""Thu, 25 Jul 2019 13:36:07 GMT""");
    }

    private static void ProcessDateTimeWithCustomConverter()
    {
        JsonSerializerOptions options = new JsonSerializerOptions();
        options.Converters.Add(new DateTimeConverterForCustomStandardFormatR());

        string testDateTimeStr = "Thu, 25 Jul 2019 13:36:07 GMT";
        string testDateTimeJson = @"""" + testDateTimeStr + @"""";

        DateTime resultDateTime = JsonSerializer.Deserialize<DateTime>(testDateTimeJson, options);
        Console.WriteLine(resultDateTime);

        Console.WriteLine(JsonSerializer.Serialize(DateTime.Parse(testDateTimeStr), options));
    }

    static void Main(string[] args)
    {
        // Parsing non-compliant format as DateTime fails by default.
        try
        {
            ParseDateTimeWithDefaultOptions();
        }
        catch (JsonException e)
        {
            Console.WriteLine(e.Message);
        }

        // Using converters gives you control over the serializers parsing and formatting.
        ProcessDateTimeWithCustomConverter();
    }
}

// The example displays output similar to the following:
// The JSON value could not be converted to System.DateTime.Path: $ | LineNumber: 0 | BytePositionInLine: 31.
// 7/25/2019 1:36:07 PM
// "Thu, 25 Jul 2019 09:36:07 GMT"
```
> **Note:**
> The "R" standard format will always be 29 characters long.
>
> The "l" (lowercase "L") format isn't documented with the other standard date and time format strings because it's supported only by the `Utf8Parser` and `Utf8Formatter` types. The format is lowercase RFC 1123 (a lowercase version of the "R" format). For example, "thu, 25 jul 2019 06:36:07 gmt".

#### Use DateTime(Offset).Parse as a fallback

If you generally expect your input `System.DateTime` or `System.DateTimeOffset` data to conform to the extended ISO 8601-1:2019 profile,
you can use the serializer's native parsing logic. You can also implement a fallback mechanism.
The following example shows that, after failing to parse a `System.DateTime` text representation using `System.Text.Json.Utf8JsonReader.TryGetDateTime(System.DateTime@)`,
the converter successfully parses the data using `System.DateTime.Parse(System.String)`:

```csharp
﻿using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace DateTimeConverterExamples;

public class DateTimeConverterUsingDateTimeParseAsFallback : JsonConverter<DateTime>
{
    public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        Debug.Assert(typeToConvert == typeof(DateTime));

        if (!reader.TryGetDateTime(out DateTime value))
        {
            value = DateTime.Parse(reader.GetString()!);
        }

        return value;
    }

    public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("dd/MM/yyyy"));
    }
}

class Program
{
    private static void ParseDateTimeWithDefaultOptions()
    {
        DateTime _ = JsonSerializer.Deserialize<DateTime>(@"""2019-07-16 16:45:27.4937872+00:00""");
    }

    private static void ProcessDateTimeWithCustomConverter()
    {
        JsonSerializerOptions options = new JsonSerializerOptions();
        options.Converters.Add(new DateTimeConverterUsingDateTimeParseAsFallback());

        string testDateTimeStr = "2019-07-16 16:45:27.4937872+00:00";
        string testDateTimeJson = @"""" + testDateTimeStr + @"""";

        DateTime resultDateTime = JsonSerializer.Deserialize<DateTime>(testDateTimeJson, options);
        Console.WriteLine(resultDateTime);

        string resultDateTimeJson = JsonSerializer.Serialize(DateTime.Parse(testDateTimeStr), options);
        Console.WriteLine(Regex.Unescape(resultDateTimeJson));
    }

    static void Main(string[] args)
    {
        // Parsing non-compliant format as DateTime fails by default.
        try
        {
            ParseDateTimeWithDefaultOptions();
        }
        catch (JsonException e)
        {
            Console.WriteLine(e.Message);
        }

        // Using converters gives you control over the serializers parsing and formatting.
        ProcessDateTimeWithCustomConverter();
    }
}

// The example displays output similar to the following:
// The JSON value could not be converted to System.DateTime.Path: $ | LineNumber: 0 | BytePositionInLine: 35.
// 7/16/2019 4:45:27 PM
// "16/07/2019"
```
#### Use Unix epoch date format

The following converters handle Unix epoch format with or without a time zone offset (values such as `/Date(1590863400000-0700)/` or `/Date(1590863400000)/`):

```csharp
sealed class UnixEpochDateTimeOffsetConverter : System.Text.Json.Serialization.JsonConverter<DateTimeOffset>
{
    static readonly DateTimeOffset s_epoch = new(1970, 1, 1, 0, 0, 0, TimeSpan.Zero);
    static readonly Regex s_regex = new(
        "^/Date\\(([+-]*\\d+)([+-])(\\d{2})(\\d{2})\\)/$",
        RegexOptions.CultureInvariant);

    public override DateTimeOffset Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        string formatted = reader.GetString()!;
        Match match = s_regex.Match(formatted);

        if (
                !match.Success
                || !long.TryParse(match.Groups[1].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out long unixTime)
                || !int.TryParse(match.Groups[3].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out int hours)
                || !int.TryParse(match.Groups[4].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out int minutes))
        {
            throw new System.Text.Json.JsonException();
        }

        int sign = match.Groups[2].Value[0] == '+' ? 1 : -1;
        TimeSpan utcOffset = new(hours * sign, minutes * sign, 0);

        return s_epoch.AddMilliseconds(unixTime).ToOffset(utcOffset);
    }

    public override void Write(
        Utf8JsonWriter writer,
        DateTimeOffset value,
        JsonSerializerOptions options)
    {
        long unixTime = value.ToUnixTimeMilliseconds();

        TimeSpan utcOffset = value.Offset;

        string formatted = string.Create(
            CultureInfo.InvariantCulture,
            $"/Date({unixTime}{(utcOffset >= TimeSpan.Zero ? "+" : "-")}{utcOffset:hhmm})/");

        writer.WriteStringValue(formatted);
    }
}
```
```csharp
sealed class UnixEpochDateTimeConverter : System.Text.Json.Serialization.JsonConverter<DateTime>
{
    static readonly DateTime s_epoch = new(1970, 1, 1, 0, 0, 0);
    static readonly Regex s_regex = new(
        "^/Date\\(([+-]*\\d+)\\)/$",
        RegexOptions.CultureInvariant);

    public override DateTime Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        string formatted = reader.GetString()!;
        Match match = s_regex.Match(formatted);

        if (
            !match.Success
            || !long.TryParse(match.Groups[1].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out long unixTime))
        {
            throw new System.Text.Json.JsonException();
        }

        return s_epoch.AddMilliseconds(unixTime);
    }

    public override void Write(
        Utf8JsonWriter writer,
        DateTime value,
        JsonSerializerOptions options)
    {
        long unixTime = (value - s_epoch).Ticks / TimeSpan.TicksPerMillisecond;

        string formatted = string.Create(CultureInfo.InvariantCulture, $"/Date({unixTime})/");
        writer.WriteStringValue(formatted);
    }
}
```
