---
title: "Generic math (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/generics/math.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Generic math (part 2 of 4)

## The interfaces

The interfaces were designed to be both fine-grained enough that users can define their own interfaces on top, while also being granular enough that they're easy to consume. To that extent, there are a few core numeric interfaces that most users will interact with, such as `System.Numerics.INumber`1` and `System.Numerics.IBinaryInteger`1`. The more fine-grained interfaces, such as `System.Numerics.IAdditionOperators`3` and `System.Numerics.ITrigonometricFunctions`1`, support these types and are available for developers who define their own domain-specific numeric interfaces.

- Numeric interfaces
- Operator interfaces
- Function interfaces
- Parsing and formatting interfaces
