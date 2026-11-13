---
title: "Value Conversions - EF Core (part 2 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/value-conversions.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Value Conversions - EF Core (part 2 of 4)

## Built-in converters

As mentioned above, EF Core ships with a set of pre-defined `Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter`2` classes, found in the `Microsoft.EntityFrameworkCore.Storage.ValueConversion` namespace. In many cases EF will choose the appropriate built-in converter based on the type of the property in the model and the type requested in the database, as shown above for enums. For example, using `.HasConversion<int>()` on a `bool` property will cause EF Core to convert bool values to numerical zero and one values:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<User>()
        .Property(e => e.IsActive)
        .HasConversion<int>();
}
```

This is functionally the same as creating an instance of the built-in `Microsoft.EntityFrameworkCore.Storage.ValueConversion.BoolToZeroOneConverter`1` and setting it explicitly:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var converter = new BoolToZeroOneConverter<int>();

    modelBuilder
        .Entity<User>()
        .Property(e => e.IsActive)
        .HasConversion(converter);
}
```

The following table summarizes commonly-used pre-defined conversions from model/property types to database provider types. In the table `any_numeric_type` means one of `int`, `short`, `long`, `byte`, `uint`, `ushort`, `ulong`, `sbyte`, `char`, `decimal`, `float`, or `double`.

| Model/property type | Provider/database type | Conversion                                                | Usage
|:--------------------|------------------------|-----------------------------------------------------------|------
| bool                | any_numeric_type       | False/true to 0/1                                         | `.HasConversion<any_numeric_type>()`
|                     | any_numeric_type       | False/true to any two numbers                             | Use `Microsoft.EntityFrameworkCore.Storage.ValueConversion.BoolToTwoValuesConverter`1`
|                     | string                 | False/true to "N"/"Y"                                     | `.HasConversion<string>()`
|                     | string                 | False/true to any two strings                             | Use `Microsoft.EntityFrameworkCore.Storage.ValueConversion.BoolToStringConverter`
| any_numeric_type    | bool                   | 0/1 to false/true                                         | `.HasConversion<bool>()`
|                     | any_numeric_type       | Simple cast                                               | `.HasConversion<any_numeric_type>()`
|                     | string                 | The number as a string                                    | `.HasConversion<string>()`
| Enum                | any_numeric_type       | The numeric value of the enum                             | `.HasConversion<any_numeric_type>()`
|                     | string                 | The string representation of the enum value               | `.HasConversion<string>()`
| string              | bool                   | Parses the string as a bool                               | `.HasConversion<bool>()`
|                     | any_numeric_type       | Parses the string as the given numeric type               | `.HasConversion<any_numeric_type>()`
|                     | char                   | The first character of the string                         | `.HasConversion<char>()`
|                     | DateTime               | Parses the string as a DateTime                           | `.HasConversion<DateTime>()`
|                     | DateTimeOffset         | Parses the string as a DateTimeOffset                     | `.HasConversion<DateTimeOffset>()`
|                     | TimeSpan               | Parses the string as a TimeSpan                           | `.HasConversion<TimeSpan>()`
|                     | Guid                   | Parses the string as a Guid                               | `.HasConversion<Guid>()`
|                     | byte[]                 | The string as UTF8 bytes                                  | `.HasConversion<byte[]>()`
| char                | string                 | A single character string                                 | `.HasConversion<string>()`
| DateTime            | long                   | Encoded date/time preserving DateTime.Kind                | `.HasConversion<long>()`
|                     | long                   | Ticks                                                     | Use `Microsoft.EntityFrameworkCore.Storage.ValueConversion.DateTimeToTicksConverter`
|                     | string                 | Invariant culture date/time string                        | `.HasConversion<string>()`
| DateTimeOffset      | long                   | Encoded date/time with offset                             | `.HasConversion<long>()`
|                     | string                 | Invariant culture date/time string with offset            | `.HasConversion<string>()`
| TimeSpan            | long                   | Ticks                                                     | `.HasConversion<long>()`
|                     | string                 | Invariant culture time span string                        | `.HasConversion<string>()`
| Uri                 | string                 | The URI as a string                                       | `.HasConversion<string>()`
| PhysicalAddress     | string                 | The address as a string                                   | `.HasConversion<string>()`
|                     | byte[]                 | Bytes in big-endian network order                         | `.HasConversion<byte[]>()`
| IPAddress           | string                 | The address as a string                                   | `.HasConversion<string>()`
|                     | byte[]                 | Bytes in big-endian network order                         | `.HasConversion<byte[]>()`
| Guid                | string                 | The GUID in 'dddddddd-dddd-dddd-dddd-dddddddddddd' format | `.HasConversion<string>()`
|                     | byte[]                 | Bytes in .NET binary serialization order                  | `.HasConversion<byte[]>()`

Note that these conversions assume that the format of the value is appropriate for the conversion. For example, converting strings to numbers will fail if the string values cannot be parsed as numbers.

The full list of built-in converters is:

* Converting bool properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.BoolToStringConverter` - Bool to strings such as "N" and "Y"
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.BoolToTwoValuesConverter`1` - Bool to any two values
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.BoolToZeroOneConverter`1` - Bool to zero and one
* Converting byte array properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.BytesToStringConverter` - Byte array to Base64-encoded string
* Any conversion that requires only a type-cast
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.CastingConverter`2` - Conversions that require only a type cast
* Converting char properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.CharToStringConverter` - Char to single character string
* Converting `System.DateTimeOffset` properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.DateTimeOffsetToBinaryConverter` - `System.DateTimeOffset` to binary-encoded 64-bit value
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.DateTimeOffsetToBytesConverter` - `System.DateTimeOffset` to byte array
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.DateTimeOffsetToStringConverter` - `System.DateTimeOffset` to string
* Converting `System.DateTime` properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.DateTimeToBinaryConverter` - `System.DateTime` to 64-bit value including DateTimeKind
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.DateTimeToStringConverter` - `System.DateTime` to string
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.DateTimeToTicksConverter` - `System.DateTime` to ticks
* Converting enum properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.EnumToNumberConverter`2` - Enum to underlying number
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.EnumToStringConverter`1` - Enum to string
* Converting `System.Guid` properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.GuidToBytesConverter` - `System.Guid` to byte array
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.GuidToStringConverter` - `System.Guid` to string
* Converting `System.Net.IPAddress` properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.IPAddressToBytesConverter` - `System.Net.IPAddress` to byte array
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.IPAddressToStringConverter` - `System.Net.IPAddress` to string
* Converting numeric (int, double, decimal, etc.) properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.NumberToBytesConverter`1` - Any numerical value to byte array
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.NumberToStringConverter`1` - Any numerical value to string
* Converting `System.Net.NetworkInformation.PhysicalAddress` properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.PhysicalAddressToBytesConverter` - `System.Net.NetworkInformation.PhysicalAddress` to byte array
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.PhysicalAddressToStringConverter` - `System.Net.NetworkInformation.PhysicalAddress` to string
* Converting string properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToBoolConverter` - Strings such as "N" and "Y" to bool
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToBytesConverter` - String to UTF8 bytes
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToCharConverter` - String to character
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToDateTimeConverter` - String to `System.DateTime`
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToDateTimeOffsetConverter` - String to `System.DateTimeOffset`
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToEnumConverter`1` - String to enum
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToGuidConverter` - String to `System.Guid`
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToNumberConverter`1` - String to numeric type
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToTimeSpanConverter` - String to `System.TimeSpan`
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.StringToUriConverter` - String to `System.Uri`
* Converting `System.TimeSpan` properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.TimeSpanToStringConverter` - `System.TimeSpan` to string
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.TimeSpanToTicksConverter` - `System.TimeSpan` to ticks
* Converting `System.Uri` properties:
  * `Microsoft.EntityFrameworkCore.Storage.ValueConversion.UriToStringConverter` - `System.Uri` to string

Note that all the built-in converters are stateless and so a single instance can be safely shared by multiple properties.

## Column facets and mapping hints

Some database types have facets that modify how the data is stored. These include:

* Precision and scale for decimals and date/time columns
* Size/length for binary and string columns
* Unicode for string columns

These facets can be configured in the normal way for a property that uses a value converter, and will apply to the converted database type. For example, when converting from an enum to strings, we can specify that the database column should be non-Unicode and store up to 20 characters:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion<string>()
        .HasMaxLength(20)
        .IsUnicode(false);
}
```

Or, when creating the converter explicitly:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var converter = new ValueConverter<EquineBeast, string>(
        v => v.ToString(),
        v => (EquineBeast)Enum.Parse(typeof(EquineBeast), v));

    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion(converter)
        .HasMaxLength(20)
        .IsUnicode(false);
}
```

This results in a `varchar(20)` column when using EF Core migrations against SQL Server:

```sql
CREATE TABLE [Rider] (
    [Id] int NOT NULL IDENTITY,
    [Mount] varchar(20) NOT NULL,
    CONSTRAINT [PK_Rider] PRIMARY KEY ([Id]));
```

However, if by default all `EquineBeast` columns should be `varchar(20)`, then this information can be given to the value converter as a `Microsoft.EntityFrameworkCore.Storage.ValueConversion.ConverterMappingHints`. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var converter = new ValueConverter<EquineBeast, string>(
        v => v.ToString(),
        v => (EquineBeast)Enum.Parse(typeof(EquineBeast), v),
        new ConverterMappingHints(size: 20, unicode: false));

    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion(converter);
}
```

Now any time this converter is used, the database column will be non-unicode with a max length of 20. However, these are only hints since they are overridden by any facets explicitly set on the mapped property.
