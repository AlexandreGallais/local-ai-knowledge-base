---
title: "HebrewCalendar class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/HebrewCalendar.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HebrewCalendar class (part 3 of 3)

## HebrewCalendar.ToFourDigitYear(Int32) method

```csharp
public override int ToFourDigitYear (int year);
```

Converts the specified year to a 4-digit year by using the `HebrewCalendar.TwoDigitYearMax` property to determine the appropriate century.

Parameters:

- `year`: A 2-digit year from 0 through 99, or a 4-digit Hebrew calendar year from 5343 through 5999.

Returns: If the `year` parameter is a 2-digit year, the return value is the corresponding 4-digit year. If the `year` parameter is a 4-digit year, the return value is the unchanged `year` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than 0.

-or-

`year` is less than `HebrewCalendar.MinSupportedDateTime` or greater than `HebrewCalendar.MaxSupportedDateTime`.

#### Remarks
The `HebrewCalendar.ToFourDigitYear` method uses the `year` parameter, the `TwoDigitYearMax` property, and a year to calculate a 4-digit year. The century is determined by finding the sole occurrence of the `year` parameter within that 100-year range. For example, if `HebrewCalendar.TwoDigitYearMax` is set to 5729, the 100-year range is from 5630 to 5729. Therefore, a value of 30 is interpreted as 5630, while a value of 29 is interpreted as 5729.

If the `TwoDigitYearMax` property has the special value 99, the `HebrewCalendar.ToFourDigitYear` method ignores the settings in the regional and language options in Control Panel and returns the value of the `year` parameter unchanged.

`HebrewCalendar.ToFourDigitYear` supports either a two-digit year or a four-digit year. Passing a two-digit year value (less than 100) causes the method to convert the value to a four-digit value according to the `HebrewCalendar.TwoDigitYearMax` value representing the appropriate century. If the application supplies a four-digit year value that is within the supported calendar range to `HebrewCalendar.ToFourDigitYear`, the method returns the actual input value. If the application supplies a four-digit value that is outside the supported calendar range, or if it supplies a negative value, the method throws an exception.

## HebrewCalendar.HebrewEra field

```csharp
public static readonly int HebrewEra;
```

Represents the current era. This field is constant.

#### Remarks
The value of this field is 1.

The Hebrew calendar recognizes two eras: B.C.E. (before the common era) and A.M. (Latin "Anno Mundi", which means "the year of the world"). This implementation of the `HebrewCalendar` class recognizes only the current era (A.M.).
