---
title: "NormalizationForm enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/NormalizationForm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NormalizationForm enum

Namespace: `System.Text`

```csharp
public enum NormalizationForm
```

Defines the type of normalization to perform.

#### Remarks
Some Unicode sequences are considered equivalent because they represent the same character. For example, the following are considered equivalent because any of these can be used to represent "ắ":

-   "\u1EAF" (U+1EAF LATIN SMALL LETTER A WITH BREVE AND ACUTE)

-   "\u0103\u0301" (U+0103 LATIN SMALL LETTER A WITH BREVE + U+0301 COMBINING ACUTE ACCENT)

-   "\u0061\u0306\u0301" (U+0061 LATIN SMALL LETTER A + U+0306 COMBINING BREVE + U+0301 COMBINING ACUTE ACCENT)

However, ordinal, that is, binary, comparisons consider these sequences different because they contain different Unicode code values. Before performing ordinal comparisons, applications must normalize these strings to decompose them into their basic components.

Each composite Unicode character is mapped to a more basic <example-value> of one or more characters. The process of decomposition replaces composite characters in a string with their more basic mappings. A full decomposition recursively performs this replacement until none of the characters in the string can be decomposed further.

Unicode defines two types of decompositions: compatibility decomposition and canonical decomposition. In compatibility decomposition, formatting information might be lost. In canonical decomposition, which is a subset of compatibility decomposition, formatting information is preserved.

Two sets of characters are considered to have canonical equivalence if their full canonical decompositions are identical. Likewise, two sets of characters are considered to have compatibility equivalence if their full compatibility decompositions are identical.

For more information about normalization, decompositions and equivalence, see Unicode Standard Annex #15: Unicode Normalization Forms at unicode.org.

## NormalizationForm.FormC field

```csharp
FormC
```

Indicates that a Unicode string is normalized using full canonical decomposition, followed by the replacement of sequences with their primary composites, if possible.

## NormalizationForm.FormD field

```csharp
FormD
```

Indicates that a Unicode string is normalized using full canonical decomposition.

## NormalizationForm.FormKC field

```csharp
FormKC
```

Indicates that a Unicode string is normalized using full compatibility decomposition, followed by the replacement of sequences with their primary composites, if possible.

## NormalizationForm.FormKD field

```csharp
FormKD
```

Indicates that a Unicode string is normalized using full compatibility decomposition.
