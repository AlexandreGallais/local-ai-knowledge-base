---
title: "Function Mappings - Microsoft SQL Server Database Provider - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/providers/sql-server/functions.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Function Mappings - Microsoft SQL Server Database Provider - EF Core (part 2 of 2)

## Numeric functions

.NET                       | SQL                  | Added in
-------------------------- | -------------------- | --------
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
Math.Log(d)                | LOG(@d)
Math.Log(a, newBase)       | LOG(@a, @newBase)
Math.Log10(d)              | LOG10(@d)
Math.Max(x, y)             | GREATEST(@x, @y)    | EF Core 9.0
Math.Min(x, y)             | LEAST(@x, @y)       | EF Core 9.0
Math.Pow(x, y)             | POWER(@x, @y)
Math.Round(d)              | ROUND(@d, 0)
Math.Round(d, decimals)    | ROUND(@d, @decimals)
Math.Sign(value)           | SIGN(@value)
Math.Sin(a)                | SIN(@a)
Math.Sqrt(d)               | SQRT(@d)
Math.Tan(a)                | TAN(@a)
Math.Truncate(d)           | ROUND(@d, 0, 1)

> **Tip:**
> In addition to the methods listed here, corresponding generic math implementations
> and MathF methods are also translated. For example, `Math.Sin`, `MathF.Sin`, `double.Sin`,
> and `float.Sin` all map to the `SIN` function in SQL.

## String functions

.NET                                                                    | SQL                                                                    | Added in
----------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------
EF.Functions.Collate(operand, collation)                                | @operand COLLATE @collation
EF.Functions.Contains(propertyReference, searchCondition)               | CONTAINS(@propertyReference, @searchCondition)
EF.Functions.Contains(propertyReference, searchCondition, languageTerm) | CONTAINS(@propertyReference, @searchCondition, LANGUAGE @languageTerm)
EF.Functions.FreeText(propertyReference, freeText)                      | FREETEXT(@propertyReference, @freeText)
EF.Functions.FreeText(propertyReference, freeText, languageTerm)        | FREETEXT(@propertyReference, @freeText, LANGUAGE @languageTerm)
EF.Functions.IsNumeric(expression)                                      | ISNUMERIC(@expression)
EF.Functions.Like(matchExpression, pattern)                             | @matchExpression LIKE @pattern
EF.Functions.Like(matchExpression, pattern, escapeCharacter)            | @matchExpression LIKE @pattern ESCAPE @escapeCharacter
string.Compare(strA, strB)                                              | CASE WHEN @strA = @strB THEN 0 ... END
string.Concat(str0, str1)                                               | @str0 + @str1
string.IsNullOrEmpty(value)                                             | @value IS NULL OR @value LIKE N''
string.IsNullOrWhiteSpace(value)                                        | @value IS NULL OR @value = N''
string.Join(", ", new [] { x, y, z})                                    | CONCAT_WS(N', ', @x, @y, @z)                                           | EF Core 9.0
stringValue.CompareTo(strB)                                             | CASE WHEN @stringValue = @strB THEN 0 ... END
stringValue.Contains(value)                                             | @stringValue LIKE N'%' + @value + N'%'
stringValue.EndsWith(value)                                             | @stringValue LIKE N'%' + @value
stringValue.FirstOrDefault()                                            | SUBSTRING(@stringValue, 1, 1)
stringValue.IndexOf(value)                                              | CHARINDEX(@value, @stringValue) - 1
stringValue.IndexOf(value, startIndex)                                  | CHARINDEX(@value, @stringValue, @startIndex) - 1
stringValue.LastOrDefault()                                             | SUBSTRING(@stringValue, LEN(@stringValue), 1)
stringValue.Length                                                      | LEN(@stringValue)
stringValue.Replace(@oldValue, @newValue)                               | REPLACE(@stringValue, @oldValue, @newValue)
stringValue.StartsWith(value)                                           | @stringValue LIKE @value + N'%'
stringValue.Substring(startIndex)                                       | SUBSTRING(@stringValue, @startIndex + 1, LEN(@stringValue))
stringValue.Substring(startIndex, length)                               | SUBSTRING(@stringValue, @startIndex + 1, @length)
stringValue.ToLower()                                                   | LOWER(@stringValue)
stringValue.ToUpper()                                                   | UPPER(@stringValue)
stringValue.Trim()                                                      | LTRIM(RTRIM(@stringValue))
stringValue.TrimEnd()                                                   | RTRIM(@stringValue)
stringValue.TrimStart()                                                 | LTRIM(@stringValue)

## JSON functions

.NET                                                              | SQL                                                       | Added in
----------------------------------------------------------------- | --------------------------------------------------------- | --------
EF.Functions.JsonContains(json, searchValue, path?, searchMode?)  | JSON_CONTAINS(@json, @searchValue, @path?, @searchMode?)  | EF 11.0
EF.Functions.JsonPathExists(json, path)                           | JSON_PATH_EXISTS(@json, @path)                            | EF 11.0

## Miscellaneous functions

.NET                                     | SQL                                 | Added in
---------------------------------------- | ----------------------------------- | --------
enumValue.HasFlag(flag)                  | @enumValue & @flag = @flag
Guid.NewGuid()                           | NEWID()
nullable.GetValueOrDefault()             | COALESCE(@nullable, 0)
nullable.GetValueOrDefault(defaultValue) | COALESCE(@nullable, @defaultValue)

> **Note:**
> Some SQL translations have been simplified for illustration purposes. The actual SQL is more complex to handle a wider range of values.

## See also

* Vector Search Function Mappings
* Full-Text Search Function Mappings
* Spatial Function Mappings
* HierarchyId Function Mappings
