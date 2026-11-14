---
title: "Value Conversions - EF Core (part 1 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/modeling/value-conversions.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Value Conversions

Value converters allow property values to be converted when reading from or writing to the database. This conversion can be from one value to another of the same type (for example, encrypting strings) or from a value of one type to a value of another type (for example, converting enum values to and from strings in the database.)

> **Tip:**
> You can run and debug into all the code in this document by downloading the sample code from GitHub.

## Overview

Value converters are specified in terms of a `ModelClrType` and a `ProviderClrType`. The model type is the .NET type of the property in the entity type. The provider type is the .NET type understood by the database provider. For example, to save enums as strings in the database, the model type is the type of the enum, and the provider type is `String`. These two types can be the same.

Conversions are defined using two `Func` expression trees: one from `ModelClrType` to `ProviderClrType` and the other from `ProviderClrType` to `ModelClrType`. Expression trees are used so that they can be compiled into the database access delegate for efficient conversions. The expression tree may contain a simple call to a conversion method for complex conversions.

> **Note:**
> A property that has been configured for value conversion may also need to specify a `Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer`1`. See the examples below, and the Value Comparers documentation for more information.

## Configuring a value converter

Value conversions are configured in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`. For example, consider an enum and entity type defined as:

```csharp
public class Rider
{
    public int Id { get; set; }
    public EquineBeast Mount { get; set; }
}

public enum EquineBeast
{
    Donkey,
    Mule,
    Horse,
    Unicorn
}
```

Conversions can be configured in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*` to store the enum values as strings such as "Donkey", "Mule", etc. in the database; you simply need to provide one function which converts from the `ModelClrType` to the `ProviderClrType`, and another for the opposite conversion:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion(
            v => v.ToString(),
            v => (EquineBeast)Enum.Parse(typeof(EquineBeast), v));
}
```

> **Note:**
> A `null` value will never be passed to a value converter. A null in a database column is always a null in the entity instance, and vice-versa. This makes the implementation of conversions easier and allows them to be shared amongst nullable and non-nullable properties. See GitHub issue #13850 for more information.

### Bulk-configuring a value converter

It's common for the same value converter to be configured for every property that uses the relevant CLR type. Rather than doing this manually for each property, you can use pre-convention model configuration to do this once for your entire model. To do this, define your value converter as a class:

```csharp
public class CurrencyConverter : ValueConverter<Currency, decimal>
{
    public CurrencyConverter()
        : base(
            v => v.Amount,
            v => new Currency(v))
    {
    }
}
```

Then, override `Microsoft.EntityFrameworkCore.DbContext.ConfigureConventions*` in your context type and configure the converter as follows:

```csharp
protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
{
    configurationBuilder
        .Properties<Currency>()
        .HaveConversion<CurrencyConverter>();
}
```

## Pre-defined conversions

EF Core contains many pre-defined conversions that avoid the need to write conversion functions manually. Instead, EF Core will pick the conversion to use based on the property type in the model and the requested database provider type.

For example, enum to string conversions are used as an example above, but EF Core will actually do this automatically when the provider type is configured as `string` using the generic type of `Microsoft.EntityFrameworkCore.Metadata.Builders.PropertyBuilder.HasConversion*`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion<string>();
}
```

The same thing can be achieved by explicitly specifying the database column type. For example, if the entity type is defined like so:

### Data Annotations

```csharp
public class Rider2
{
    public int Id { get; set; }

    [Column(TypeName = "nvarchar(24)")]
    public EquineBeast Mount { get; set; }
}
```

### Fluent API

```csharp
modelBuilder
    .Entity<Rider2>()
    .Property(e => e.Mount)
    .HasColumnType("nvarchar(24)");
```

***

Then the enum values will be saved as strings in the database without any further configuration in `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`.

## The ValueConverter class

Calling `Microsoft.EntityFrameworkCore.Metadata.Builders.PropertyBuilder.HasConversion*` as shown above will create a `Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter`2` instance and set it on the property. The `ValueConverter` can instead be created explicitly. For example:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var converter = new ValueConverter<EquineBeast, string>(
        v => v.ToString(),
        v => (EquineBeast)Enum.Parse(typeof(EquineBeast), v));

    modelBuilder
        .Entity<Rider>()
        .Property(e => e.Mount)
        .HasConversion(converter);
}
```

This can be useful when multiple properties use the same conversion.
