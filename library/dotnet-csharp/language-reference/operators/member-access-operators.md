---
title: "Member access and null-conditional operators and expressions: (part 1 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/member-access-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Member access operators and expressions - the dot, indexer, and invocation operators

You use several operators and expressions to access a type member. Member access operators include member access (`.`), array element, or indexer access (`[]`), index-from-end (`^`), range (`..`), null-conditional operators (`?.` and `?[]`), and method invocation (`()`). These operators include the *null-conditional* member access (`?.`), and indexer access (`?[]`) operators.

- `.` (member access): Access a member of a namespace or a type.
- `[]` (array element or indexer access): Access an array element or a type indexer.
- `?.` and `?[]` (null-conditional operators): Perform a member or element access operation only if an operand is non-null.
- `()` (invocation): Call an accessed method or invoke a delegate.
- `^` (index from end): Indicate that the element position is from the end of a sequence.
- `..` (range): Specify a range of indices that you can use to obtain a range of sequence elements.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.
