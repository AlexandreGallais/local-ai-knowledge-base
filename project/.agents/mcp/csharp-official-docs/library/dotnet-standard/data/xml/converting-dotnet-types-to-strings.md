---
title: "Converting .NET Types to Strings"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/converting-dotnet-types-to-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Convert .NET types to strings

If you want to convert a .NET type to a string, use the **ToString** method. The **ToString** method returns a string representation of the type passed in. The following table lists the .NET types that return a string in a format that maps to the XML Schema (XSD) specifications.

|.NET type|String type returned|
|-------------------------|--------------------------|
|Boolean|"true", "false"|
|Single.PositiveInfinity|"INF"|
|Single.NegativeInfinity|"-INF"|
|Double.PositiveInfinity|"INF"|
|Double.NegativeInfinity|"-INF"|
|DateTime|Format is yyyy-MM-ddTHH:mm:sszzzzzz and its subsets.|
|Timespan|Format is PnYnMnTnHnMnS, for example, `P2Y10M15DT10H30M20S` is a duration of 2 years, 10 months, 15 days, 10hours, 30 minutes and 20 seconds.|

## See also

- Conversion of XML Data Types
- Converting Strings to .NET Data Types
