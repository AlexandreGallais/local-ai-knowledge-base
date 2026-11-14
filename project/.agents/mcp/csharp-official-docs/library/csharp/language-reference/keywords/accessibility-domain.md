---
title: "Accessibility Domain (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/accessibility-domain.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Accessibility domain (C# reference)

The accessibility domain of a member specifies the program sections where you can reference that member. If the member is nested within another type, both the accessibility level of the member and the accessibility domain of the immediately containing type determine its accessibility domain.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The accessibility domain of a top-level type always includes at least the program text of the project where you declare it. In other words, the domain includes all source files in the project. The accessibility domain of a nested type always includes at least the program text of the type where you declare it. In other words, the domain is the type body, which includes all nested types. The accessibility domain of a nested type never exceeds that of the containing type. The following example demonstrates these concepts.

This example contains a top-level type, `T1`, and two nested classes, `M1` and `M2`. The classes contain fields that have different declared accessibilities. In the `Main` method, a comment follows each statement to indicate the accessibility domain of each member. The statements that try to reference the inaccessible members are commented out. If you want to see the compiler errors caused by referencing an inaccessible member, remove the comments one at a time.
