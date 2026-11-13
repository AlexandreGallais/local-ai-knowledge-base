---
title: "Custom numeric format strings (part 1 of 11)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/custom-numeric-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom numeric format strings

You can create a custom numeric format string, which consists of one or more custom numeric specifiers, to define how to format numeric data. A custom numeric format string is any format string that is not a standard numeric format string.

Custom numeric format strings are supported by some overloads of the `ToString` method of all numeric types. For example, you can supply a numeric format string to the `System.Int32.ToString(System.String)` and `System.Int32.ToString(System.String,System.IFormatProvider)` methods of the `System.Int32` type. Custom numeric format strings are also supported by the .NET composite formatting feature, which is used by some `Write` and `WriteLine` methods of the `System.Console` and `System.IO.StreamWriter` classes, the `System.String.Format*` method, and the `System.Text.StringBuilder.AppendFormat*` method. String interpolation feature also supports custom numeric format strings.

> **Tip:**
> You can download the **Formatting Utility**, a .NET Core Windows Forms application that lets you apply format strings to either numeric or date and time values and displays the result string. Source code is available for C# and Visual Basic.

 The following table describes the custom numeric format specifiers and displays sample output produced by each format specifier. See the Notes section for additional information about using custom numeric format strings, and the Example section for a comprehensive illustration of their use.

|Format specifier|Name|Description|Examples|
|----------------------|----------|-----------------|--------------|
|"0"|Zero placeholder|Replaces the zero with the corresponding digit if one is present; otherwise, zero appears in the result string. More information: The "0" Custom Specifier.|1234.5678 ("00000") -> 01235 0.45678 ("0.00", en-US) -> 0.46 0.45678 ("0.00", fr-FR) -> 0,46|
|"#"|Digit placeholder|Replaces the "#" symbol with the corresponding digit if one is present; otherwise, no digit appears in the result string. Note that no digit appears in the result string if the corresponding digit in the input string is a non-significant 0. For example, 0003 ("####") -> 3. More information: The "#" Custom Specifier.|1234.5678 ("#####") -> 1235 0.45678 ("#.##", en-US) -> .46 0.45678 ("#.##", fr-FR) -> ,46|
|"."|Decimal point|Determines the location of the decimal separator in the result string. More information: The "." Custom Specifier.|0.45678 ("0.00", en-US) -> 0.46 0.45678 ("0.00", fr-FR) -> 0,46|
|","|Group separator and number scaling|Serves as both a group separator and a number scaling specifier. As a group separator, it inserts a localized group separator character between each group. As a number scaling specifier, it divides a number by 1000 for each comma specified. More information: The "," Custom Specifier.|Group separator specifier: 2147483647 ("##,#", en-US) -> 2,147,483,647 2147483647 ("##,#", es-ES) -> 2.147.483.647 Scaling specifier: 2147483647 ("#,#,,", en-US) -> 2,147 2147483647 ("#,#,,", es-ES) -> 2.147|
|"%"|Percentage placeholder|Multiplies a number by 100 and inserts a localized percentage symbol in the result string. More information: The "%" Custom Specifier.|0.3697 ("%#0.00", en-US) -> %36.97 0.3697 ("%#0.00", el-GR) -> %36,97 0.3697 ("##.0 %", en-US) -> 37.0 % 0.3697 ("##.0 %", el-GR) -> 37,0 %|
|"‰"|Per mille placeholder|Multiplies a number by 1000 and inserts a localized per mille symbol in the result string. More information: The "‰" Custom Specifier.|0.03697 ("#0.00‰", en-US) -> 36.97‰ 0.03697 ("#0.00‰", ru-RU) -> 36,97‰|
|"E0" "E+0" "E-0" "e0" "e+0" "e-0"|Exponential notation|If followed by at least one 0 (zero), formats the result using exponential notation. The case of "E" or "e" indicates the case of the exponent symbol in the result string. The number of zeros following the "E" or "e" character determines the minimum number of digits in the exponent. A plus sign (+) indicates that a sign character always precedes the exponent. A minus sign (-) indicates that a sign character precedes only negative exponents. More information: The "E" and "e" Custom Specifiers.|987654 ("#0.0e0") -> 98.8e4 1503.92311 ("0.0##e+00") -> 1.504e+03 1.8901385E-16 ("0.0e+00") -> 1.9e-16|
|"\\"|Escape character|Causes the next character to be interpreted as a literal rather than as a custom format specifier. More information: The "\\" Escape Character.|987654 ("\\###00\\#") -> #987654#|
|'*string*' "*string*"|Literal string delimiter|Indicates that the enclosed characters should be copied to the result string unchanged.More information: Character literals.|68 ("# 'degrees'") -> 68 degrees 68 ("#' degrees'") -> 68 degrees|
|;|Section separator|Defines sections with separate format strings for positive, negative, and zero numbers. More information: The ";" Section Separator.|12.345 ("#0.0#;(#0.0#);-\0-") -> 12.35 0 ("#0.0#;(#0.0#);-\0-") -> -0- -12.345 ("#0.0#;(#0.0#);-\0-") -> (12.35) 12.345 ("#0.0#;(#0.0#)") -> 12.35 0 ("#0.0#;(#0.0#)") -> 0.0 -12.345 ("#0.0#;(#0.0#)") -> (12.35)|
|Other|All other characters|The character is copied to the result string unchanged.More information: Character literals.|68 ("# °") -> 68 °|

The following sections provide detailed information about each of the custom numeric format specifiers.
