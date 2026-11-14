---
title: "Library guidance"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/library-guidance/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Library guidance

This guidance provides recommendations for developers to create high-quality .NET libraries. This documentation focuses on the *what* and the *why* when building a .NET library, not the *how*.

Aspects of high-quality .NET libraries:

>
> * **Inclusive** - Good .NET libraries strive to support many platforms, programming languages, and applications.
> * **Stable** - Good .NET libraries coexist in the .NET ecosystem, running in applications built with many libraries.
> * **Designed to evolve** - .NET libraries should improve and evolve over time, while supporting existing users.
> * **Debuggable** - .NET libraries should use the latest tools to create a great debugging experience for users.
> * **Trusted** - .NET libraries have developers' trust by publishing to NuGet using security best practices.

> Get Started

## Types of recommendations

Each article presents four types of recommendations: **Do**, **Consider**, **Avoid**, and **Do not**. The type of recommendation indicates how strongly it should be followed.

You should almost always follow a **Do** recommendation. For example:

✔️ DO distribute your library using a NuGet package.

On the other hand, **Consider** recommendations should generally be followed, but there are legitimate exceptions to the rule and you shouldn't feel bad about not following the guidance:

✔️ CONSIDER using SemVer 2.0.0 to version your NuGet package.

**Avoid** recommendations mention things that are generally not a good idea, but breaking the rule sometimes makes sense:

❌ AVOID NuGet package references that demand an exact version.

And finally, **Do not** recommendations indicate something you should almost never do:

❌ DO NOT publish strong-named and non-strong-named versions of your library. For example, `Contoso.Api` and `Contoso.Api.StrongNamed`.

>Next
