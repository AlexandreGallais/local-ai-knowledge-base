---
title: "Querying - Azure Cosmos DB Provider - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/cosmos/querying.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Querying - Azure Cosmos DB Provider - EF Core (part 2 of 2)

## Function mappings

This section shows which .NET methods and members are translated into which SQL functions when querying with the Azure Cosmos DB provider.

### Date and time functions

.NET                                       | SQL                                                                               | Added in
------------------------------------------ | --------------------------------------------------------------------------------- | --------
DateTime.UtcNow                            | GetCurrentDateTime()
DateTimeOffset.UtcNow                      | GetCurrentDateTime()
dateTime.Year1                  | DateTimePart("yyyy", dateTime)       | EF 9
dateTimeOffset.Year1            | DateTimePart("yyyy", dateTimeOffset) | EF 9
dateTime.AddYears(years)1       | DateTimeAdd("yyyy", dateTime)         | EF 9
dateTimeOffset.AddYears(years)1 | DateTimeAdd("yyyy", dateTimeOffset)   | EF 9

1 The other component members are translated as well (Month, Day...).

### Numeric functions

.NET                       | SQL
-------------------------- | ---------------------------------------------------
double.DegreesToRadians(x) | RADIANS(@x)
double.RadiansToDegrees(x) | DEGREES(@x)
EF.Functions.Random()      | RAND()
Math.Abs(value)            | ABS(@value)
Math.Acos(d)               | ACOS(@d)
Math.Asin(d)               | ASIN(@d)
Math.Atan(d)               | ATAN(@d)
Math.Atan2(y, x)           | ATN2(@y, @x)
Math.Ceiling(d)            | CEILING(@d)
Math.Cos(d)                | COS(@d)
Math.Exp(d)                | EXP(@d)
Math.Floor(d)              | FLOOR(@d)
Math.Log(a, newBase)       | LOG(@a, @newBase)
Math.Log(d)                | LOG(@d)
Math.Log10(d)              | LOG10(@d)
Math.Pow(x, y)             | POWER(@x, @y)
Math.Round(d)              | ROUND(@d)
Math.Sign(value)           | SIGN(@value)
Math.Sin(a)                | SIN(@a)
Math.Sqrt(d)               | SQRT(@d)
Math.Tan(a)                | TAN(@a)
Math.Truncate(d)           | TRUNC(@d)

> **Tip:**
> In addition to the methods listed here, corresponding generic math implementations
> and MathF methods are also translated. For example, `Math.Sin`, `MathF.Sin`, `double.Sin`,
> and `float.Sin` all map to the `SIN` function in SQL.

### String functions

.NET                                                              | SQL                                                                                | Added in
----------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------
Regex.IsMatch(input, pattern)                                     | RegexMatch(@pattern, @input)
Regex.IsMatch(input, pattern, options)                            | RegexMatch(@input, @pattern, @options)
string.Concat(str0, str1)                                         | @str0 + @str1
string.Equals(a, b, StringComparison.Ordinal)                     | STRINGEQUALS(@a, @b)
string.Equals(a, b, StringComparison.OrdinalIgnoreCase)           | STRINGEQUALS(@a, @b, true)
stringValue.Contains(value)                                       | CONTAINS(@stringValue, @value)
stringValue.Contains(value, StringComparison.Ordinal)             | CONTAINS(@stringValue, @value, false)     | EF 9
stringValue.Contains(value, StringComparison.OrdinalIgnoreCase)   | CONTAINS(@stringValue, @value, true)      | EF 9
stringValue.EndsWith(value)                                       | ENDSWITH(@stringValue, @value)
stringValue.EndsWith(value, StringComparison.Ordinal)             | ENDSWITH(@stringValue, @value, false)     | EF 9
stringValue.EndsWith(value, StringComparison.OrdinalIgnoreCase)   | ENDSWITH(@stringValue, @value, true)      | EF 9
stringValue.Equals(value, StringComparison.Ordinal)               | STRINGEQUALS(@stringValue, @value)
stringValue.Equals(value, StringComparison.OrdinalIgnoreCase)     | STRINGEQUALS(@stringValue, @value, true)
stringValue.FirstOrDefault()                                      | LEFT(@stringValue, 1)
stringValue.IndexOf(value)                                        | INDEX_OF(@stringValue, @value)
stringValue.IndexOf(value, startIndex)                            | INDEX_OF(@stringValue, @value, @startIndex)
stringValue.LastOrDefault()                                       | RIGHT(@stringValue, 1)
stringValue.Length                                                | LENGTH(@stringValue)
stringValue.Replace(oldValue, newValue)                           | REPLACE(@stringValue, @oldValue, @newValue)
stringValue.StartsWith(value)                                     | STARTSWITH(@stringValue, @value)
stringValue.StartsWith(value, StringComparison.Ordinal)           | STARTSWITH(@stringValue, @value, false) | EF 9
stringValue.StartsWith(value, StringComparison.OrdinalIgnoreCase) | STARTSWITH(@stringValue, @value, true)  | EF 9
stringValue.Substring(startIndex)                                 | SUBSTRING(@stringValue, @startIndex, LENGTH(@stringValue))
stringValue.Substring(startIndex, length)                         | SUBSTRING(@stringValue, @startIndex, @length)
stringValue.ToLower()                                             | LOWER(@stringValue)
stringValue.ToUpper()                                             | UPPER(@stringValue)
stringValue.Trim()                                                | TRIM(@stringValue)
stringValue.TrimEnd()                                             | RTRIM(@stringValue)
stringValue.TrimStart()                                           | LTRIM(@stringValue)

### Vector and full-text search

.NET                                                                        | SQL                                                                                                           | Added in
--------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -----
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.VectorDistance*`(vector1, vector2).                              | VectorDistance(vector1, vector2)                               | EF 9
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.VectorDistance*`(vector1, vector2, bruteForce)                   | VectorDistance(vector1, vector2, bruteForce)                   | EF 9
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.VectorDistance*`(vector1, vector2, bruteForce, distanceFunction) | VectorDistance(vector1, vector2, bruteForce, distanceFunction) | EF 9
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextContains*`(property, keyword)                            | FullTextContains(property, keyword)                          | EF 10
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextContainsAll*`(property, keyword1, keyword2)              | FullTextContainsAll(property, keyword1, keyword2)         | EF 10
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextContainsAny*`(property, keyword1, keyword2)              | FullTextContainsAny(property, keyword1, keyword2)         | EF 10
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.FullTextScore*`(property, keyword1, keyword2)                    | FullTextScore(property, keyword1, keyword2)                     | EF 10
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.Rrf*`(search1, search2)                                          | RRF(property, search1, search2).                                          | EF 10
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.Rrf*`(new[] { search1, search2 }, weights)                       | RRF(property, search1, search2, weights)                                  | EF 10

For more information on vector search, see the documentation. For more information on full-text search, see the documentation.

### Miscellaneous functions

.NET                                                                                    | SQL                                                                                                           | Added in
--------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -----
collection.Contains(item)                                                               | @item IN @collection
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.CoalesceUndefined*`(x, y)1                                        | x ?? y                           | EF 9
`Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.IsDefined*`(x)                                                               | IS_DEFINED(x)                                                      | EF 9

1 Note that `Microsoft.EntityFrameworkCore.CosmosDbFunctionsExtensions.CoalesceUndefined*` coalesces `undefined`, not `null`. To coalesce `null`, use the regular C# `??` operator.
