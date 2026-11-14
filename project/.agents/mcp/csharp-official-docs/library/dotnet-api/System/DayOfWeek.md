---
title: "DayOfWeek enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DayOfWeek.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DayOfWeek enum

Namespace: `System`

```csharp
public enum DayOfWeek
```

Specifies the day of the week.

#### Remarks
The `DayOfWeek` enumeration represents the day of the week in calendars that have seven days per week. The value of the constants in this enumeration ranges from Sunday to Saturday. If cast to an integer, its value ranges from zero (which indicates Sunday) to six (which indicates Saturday).

This enumeration is useful when it is desirable to have a strongly typed specification of the day of the week. For example, this enumeration is the type of the property value for the `DateTime.DayOfWeek` and `DayOfWeek` properties.

The members of the `DayOfWeek` enumeration are not localized. To return the localized name of the day of the week, call the `ToString` or the `ToString` method with either the "ddd" or "dddd" format strings. The former format string produces the abbreviated weekday name; the latter produces the full weekday name.

#### Examples
The following example demonstrates the `DayOfWeek` property and the `DayOfWeek` enumeration.

_Code sample not included: ~/snippets/csharp/System/DateTime/DayOfWeek/dow.cs._

## DayOfWeek.Friday field

```csharp
Friday
```

Indicates Friday.

## DayOfWeek.Monday field

```csharp
Monday
```

Indicates Monday.

## DayOfWeek.Saturday field

```csharp
Saturday
```

Indicates Saturday.

## DayOfWeek.Sunday field

```csharp
Sunday
```

Indicates Sunday.

## DayOfWeek.Thursday field

```csharp
Thursday
```

Indicates Thursday.

## DayOfWeek.Tuesday field

```csharp
Tuesday
```

Indicates Tuesday.

## DayOfWeek.Wednesday field

```csharp
Wednesday
```

Indicates Wednesday.
