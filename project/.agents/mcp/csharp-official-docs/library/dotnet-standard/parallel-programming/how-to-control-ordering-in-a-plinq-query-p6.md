---
title: "How to: Control Ordering in a PLINQ Query (part 6 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-control-ordering-in-a-plinq-query.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Control Ordering in a PLINQ Query (part 6 of 13)

## Example 2

 The following example shows some query operators whose source sequence is probably expected to be ordered. These operators will work on unordered sequences, but they might produce unexpected results.
