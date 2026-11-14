---
title: "Quantifiers in Regular Expressions (part 1 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/quantifiers-in-regular-expressions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Quantifiers in Regular Expressions

Quantifiers specify how many instances of a character, group, or character class must be present in the input for a match to be found. The following table lists the quantifiers supported by .NET:

|Greedy quantifier|Lazy quantifier|Description|
|-----------------------|---------------------|-----------------|
|`*`|`*?`|Matches zero or more times.|
|`+`|`+?`|Matches one or more times.|
|`?`|`??`|Matches zero or one time.|
|`{` *n* `}`|`{` *n* `}?`|Matches exactly *n* times.|
|`{` *n* `,}`|`{` *n* `,}?`|Matches at least *n* times.|
|`{` *n* `,` *m* `}`|`{` *n* `,` *m* `}?`|Matches from *n* to *m* times.|

 The quantities `n` and `m` are integer constants. Ordinarily, quantifiers are greedy. They cause the regular expression engine to match as many occurrences of particular patterns as possible. Appending the `?` character to a quantifier makes it lazy. It causes the regular expression engine to match as few occurrences as possible. For a complete description of the difference between greedy and lazy quantifiers, see the section Greedy and Lazy Quantifiers later in this article.

> **Important:**
> Nesting quantifiers, such as the regular expression pattern `(a*)*`, can increase the number of comparisons that the regular expression engine must perform. The number of comparisons can increase as an exponential function of the number of characters in the input string. For more information about this behavior and its workarounds, see Backtracking.
