---
title: "How to: Control Ordering in a PLINQ Query (part 2 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-control-ordering-in-a-plinq-query.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Control Ordering in a PLINQ Query (part 2 of 13)

## Example 1

 The following example preserves the ordering of the source sequence. This is sometimes necessary; for example some query operators require an ordered source sequence to produce correct results.
