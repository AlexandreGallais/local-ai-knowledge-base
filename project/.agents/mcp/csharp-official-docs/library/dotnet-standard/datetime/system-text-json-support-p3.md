---
title: "DateTime and DateTimeOffset support in System.Text.Json (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/system-text-json-support.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# DateTime and DateTimeOffset support in System.Text.Json (part 3 of 3)

### When using `System.Text.Json.Utf8JsonWriter`

If you want to write a custom `System.DateTime` or `System.DateTimeOffset` text representation with `System.Text.Json.Utf8JsonWriter`,
you can format your custom representation to a `System.String`, `ReadOnlySpan<Byte>`, `ReadOnlySpan<Char>`, or `System.Text.Json.JsonEncodedText`,
then pass it to the corresponding `System.Text.Json.Utf8JsonWriter.WriteStringValue*`
or `System.Text.Json.Utf8JsonWriter.WriteString*` method.

The following example shows how a custom `System.DateTime` format can be created with `System.DateTime.ToString(System.String,System.IFormatProvider)`
and then written with the `System.Text.Json.Utf8JsonWriter.WriteStringValue(System.String)` method:

```csharp
﻿using System.Globalization;
using System.Text;
using System.Text.Json;

public class Example
{
    public static void Main(string[] args)
    {
        var options = new JsonWriterOptions
        {
            Indented = true
        };

        using (var stream = new MemoryStream())
        {
            using (var writer = new Utf8JsonWriter(stream, options))
            {
                string dateStr = DateTime.UtcNow.ToString("F", CultureInfo.InvariantCulture);

                writer.WriteStartObject();
                writer.WriteString("date", dateStr);
                writer.WriteNumber("temp", 42);
                writer.WriteEndObject();
            }

            string json = Encoding.UTF8.GetString(stream.ToArray());
            Console.WriteLine(json);
        }
    }
}

// The example displays output similar to the following:
// {
//     "date": "Tuesday, 27 August 2019 19:21:44",
//     "temp": 42
// }
```
### When using `System.Text.Json.Utf8JsonReader`

If you want to read a custom `System.DateTime` or `System.DateTimeOffset` text representation with `System.Text.Json.Utf8JsonReader`,
you can get the value of the current JSON token as a `System.String` using the `System.Text.Json.Utf8JsonReader.GetString` method, then parse the value using custom logic.

The following example shows how a custom `System.DateTimeOffset` text representation can be retrieved using the `System.Text.Json.Utf8JsonReader.GetString` method,
then parsed using `System.DateTimeOffset.ParseExact(System.String,System.String,System.IFormatProvider)`:

```csharp
﻿using System.Globalization;
using System.Text;
using System.Text.Json;

public class Example
{
    public static void Main(string[] args)
    {
        byte[] utf8Data = Encoding.UTF8.GetBytes(@"""Friday, 26 July 2019 00:00:00""");

        var json = new Utf8JsonReader(utf8Data);
        while (json.Read())
        {
            if (json.TokenType == JsonTokenType.String)
            {
                string value = json.GetString();
                DateTimeOffset dto = DateTimeOffset.ParseExact(value, "F", CultureInfo.InvariantCulture);
                Console.WriteLine(dto);
            }
        }
    }
}

// The example displays output similar to the following:
// 7/26/2019 12:00:00 AM -04:00
```
## The extended ISO 8601-1:2019 profile in System.Text.Json

### Date and time components

The extended ISO 8601-1:2019 profile implemented in `System.Text.Json` defines the following components for date and time representations. These components are used to define various supported levels of granularity
when parsing and formatting `System.DateTime` and `System.DateTimeOffset` representations.

| Component       | Format                  | Description                                     |
|-----------------|-------------------------|-------------------------------------------------|
| Year            | "yyyy"                  | 0001-9999                                       |
| Month           | "MM"                    | 01-12                                           |
| Day             | "dd"                    | 01-28, 01-29, 01-30, 01-31 based on month/year. |
| Hour            | "HH"                    | 00-23                                           |
| Minute          | "mm"                    | 00-59                                           |
| Second          | "ss"                    | 00-59                                           |
| Second fraction | "FFFFFFF"               | Minimum of one digit, maximum of 16 digits.     |
| Time offset     | "K"                     | Either "Z" or "('+'/'-')HH':'mm".               |
| Partial time    | "HH':'mm':'ss[FFFFFFF]" | Time without UTC offset information.            |
| Full date       | "yyyy'-'MM'-'dd"        | Calendar date.                                  |
| Full time       | "'Partial time'K"       | UTC of day or Local time of day with the time offset between local time and UTC.|
| Date time       | "'Full date''T''Full time'" | Calendar date and time of day, for example, 2019-07-26T16:59:57-05:00. |

### Support for parsing

The following levels of granularity are defined for parsing:

1. 'Full date'
    1. "yyyy'-'MM'-'dd"

1. "'Full date''T''Hour'':''Minute'"
    1. "yyyy'-'MM'-'dd'T'HH':'mm"

1. "'Full date''T''Partial time'"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
    (The Sortable ("s") Format Specifier)
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF"

1. "'Full date''T''Time hour'':''Minute''Time offset'"
    1. "yyyy'-'MM'-'dd'T'HH':'mmZ"
    1. "yyyy'-'MM'-'dd'T'HH':'mm('+'/'-')HH':'mm"

1. 'Date time'
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ssZ"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFFZ"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss('+'/'-')HH':'mm"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF('+'/'-')HH':'mm"

    This level of granularity is compliant with RFC 3339, a widely adopted profile of ISO 8601 used for interchanging date and time information. However, there are a few restrictions in the `System.Text.Json` implementation.

    - RFC 3339 doesn't specify a maximum number of fractional-second digits, but specifies that at least one digit must follow the period, if a fractional-second section is present. The implementation in `System.Text.Json` allows up to 16 digits (to support interop with other programming languages and frameworks), but parses only the first seven. A `System.Text.Json.JsonException` will be thrown if there are more than 16 fractional second digits when reading `DateTime` and `DateTimeOffset` instances.
    - RFC 3339 allows the "T" and "Z" characters to be "t" or "z" respectively, but allows applications to limit support to just the upper-case variants. The implementation in `System.Text.Json` requires them to be "T" and "Z". A `System.Text.Json.JsonException` will be thrown if input payloads contain "t" or "z" when reading `DateTime` and `DateTimeOffset` instances.
    - RFC 3339 specifies that the date and time sections are separated by "T", but allows applications to separate them by a space (" ") instead. `System.Text.Json` requires date and time sections to be separated with "T". A `System.Text.Json.JsonException` will be thrown if input payloads contain a space (" ") when reading `DateTime` and `DateTimeOffset` instances.

If there are decimal fractions for seconds, there must be at least one digit. `2019-07-26T00:00:00.` isn't allowed.
While up to 16 fractional digits are allowed, only the first seven are parsed. Anything beyond that is considered a zero.
For example, `2019-07-26T00:00:00.1234567890` will be parsed as if it's `2019-07-26T00:00:00.1234567`.
This approach maintains compatibility with the `System.DateTime` implementation, which is limited to this resolution.

Leap seconds aren't supported.

### Support for formatting

The following levels of granularity are defined for formatting:

1. "'Full date''T''Partial time'"
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss"
        (The Sortable ("s") Format Specifier)

        Used to format a `System.DateTime` without fractional seconds and without offset information.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF"

        Used to format a `System.DateTime` with fractional seconds but without offset information.

1. 'Date time'
    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ssZ"

        Used to format a `System.DateTime` without fractional seconds but with a UTC offset.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFFZ"

        Used to format a `System.DateTime` with fractional seconds and with a UTC offset.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss('+'/'-')HH':'mm"

        Used to format a `System.DateTime` or `System.DateTimeOffset` without fractional seconds but with a local offset.

    1. "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'FFFFFFF('+'/'-')HH':'mm"

        Used to format a `System.DateTime` or `System.DateTimeOffset` with fractional seconds and with a local offset.

    This level of granularity is compliant with RFC 3339.

If the round-trip format representation of a
`System.DateTime` or `System.DateTimeOffset` instance has trailing zeros in its fractional seconds, then `System.Text.Json.JsonSerializer`
and `System.Text.Json.Utf8JsonWriter` will format a representation of the instance without trailing zeros.
For example, a `System.DateTime` instance whose round-trip format
representation is `2019-04-24T14:50:17.1010000Z`, will be formatted as `2019-04-24T14:50:17.101Z` by `System.Text.Json.JsonSerializer`
and `System.Text.Json.Utf8JsonWriter`.

If the round-trip format representation of a
`System.DateTime` or `System.DateTimeOffset` instance has all zeros in its fractional seconds, then `System.Text.Json.JsonSerializer`
and `System.Text.Json.Utf8JsonWriter` will format a representation of the instance without fractional seconds.
For example, a `System.DateTime` instance whose round-trip format
representation is `2019-04-24T14:50:17.0000000+02:00`, will be formatted as `2019-04-24T14:50:17+02:00` by `System.Text.Json.JsonSerializer`
and `System.Text.Json.Utf8JsonWriter`.

Truncating zeros in fractional-second digits allows the smallest output needed to preserve information on a round trip to be written.

A maximum of seven fractional-second digits are written. This maximum aligns with the `System.DateTime` implementation, which is limited to this resolution.
