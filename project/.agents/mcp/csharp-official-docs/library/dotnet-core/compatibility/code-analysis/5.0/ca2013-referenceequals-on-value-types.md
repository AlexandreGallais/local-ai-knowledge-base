---
title: "Breaking change: CA2013: Do not use ReferenceEquals with value types"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/code-analysis/5.0/ca2013-referenceequals-on-value-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Warning CA2013: Do not use ReferenceEquals with value types

.NET code analyzer rule CA2013 is enabled, by default, starting in .NET 5. It produces a build warning for any code where `System.Object.ReferenceEquals(System.Object,System.Object)` is used to compare one or more value types for equality.

## Change description

Starting in .NET 5, the .NET SDK includes .NET source code analyzers. Several of these rules are enabled, by default, including CA2013. If your project contains code that violates this rule and is configured to treat warnings as errors, this change could break your build.

Rule CA2013 finds instances where `System.Object.ReferenceEquals(System.Object,System.Object)` is used to compare one or more value types for equality. Comparing value types for equality in this way can lead to incorrect results, because the values are boxed before they're compared. `System.Object.ReferenceEquals(System.Object,System.Object)` will return `false` even if the compared values represent the same instance of a value type.

## Version introduced

5.0

## Recommended action

- Change the code to use an appropriate equality operator, such as `==`. You should not suppress this warning.

- To disable code analysis completely, set `EnableNETAnalyzers` to `false` in your project file. For more information, see EnableNETAnalyzers.

## Affected APIs

- `System.Object.ReferenceEquals(System.Object,System.Object)`
