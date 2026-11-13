---
title: "How to: Control Ordering in a PLINQ Query (part 2 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-control-ordering-in-a-plinq-query.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Control Ordering in a PLINQ Query (part 2 of 13)

## Example 1

 The following example preserves the ordering of the source sequence. This is sometimes necessary; for example some query operators require an ordered source sequence to produce correct results.
