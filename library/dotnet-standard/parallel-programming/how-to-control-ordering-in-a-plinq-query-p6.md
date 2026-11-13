---
title: "How to: Control Ordering in a PLINQ Query (part 6 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/how-to-control-ordering-in-a-plinq-query.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Control Ordering in a PLINQ Query (part 6 of 13)

## Example 2

 The following example shows some query operators whose source sequence is probably expected to be ordered. These operators will work on unordered sequences, but they might produce unexpected results.
