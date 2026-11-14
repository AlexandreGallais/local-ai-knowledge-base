---
title: "Group class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Group.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Group class

Namespace: `System.Text.RegularExpressions`

```csharp
public class Group : System.Text.RegularExpressions.Capture
```

Represents the results from a single capturing group.

A capturing group can capture zero, one, or more strings in a single match because of
quantifiers. (For more information, see
Quantifiers.)
All the substrings matched by a single capturing group are available from the
`Group.Captures` property. Information about the last substring captured can be accessed
directly from the `Value` and `Index` properties. (That is, the `Group`
instance is equivalent to the last item of the collection returned by the `Group.Captures`
property, which reflects the last capture made by the capturing group.)

## Group.Captures property

```csharp
public System.Text.RegularExpressions.CaptureCollection Captures { get; }
```

Gets a collection of all the captures matched by the capturing group, in
innermost-leftmost-first order (or innermost-rightmost-first order if the regular expression
is modified with the `RegexOptions.RightToLeft` option). The collection may have
zero or more items.

Returns: The collection of substrings matched by the group.

If a quantifier is not applied to a capturing group, the collection returned by the
`Group.Captures` property contains a single `Capture` object that provides
information about the same substring as the `Group` object.

The real utility of the `Group.Captures` property occurs when a quantifier is applied
to a capturing group so that the group captures multiple substrings in a single regular
expression. In this case, the `Group` object contains information about the last
captured substring, whereas the `Group.Captures` property contains information about
all the substrings captured by the group.

## Group.Name property

```csharp
public string Name { get; }
```

Returns the name of the capturing group represented by the current instance.

Returns: The name of the capturing group represented by the current instance.

To be added.

## Group.Success property

```csharp
public bool Success { get; }
```

Gets a value indicating whether the match is successful.

Returns: `true` if the match is successful; otherwise, `false`.

The `Success` property is `true` if at least one substring was captured
by this group. It is equivalent to the Boolean expression
`Group.Captures.Count > 0`.

## Group.Synchronized(Group) method

```csharp
public static System.Text.RegularExpressions.Group Synchronized (System.Text.RegularExpressions.Group inner);
```

Returns a `Group` object equivalent to the one supplied that is safe to share
between multiple threads.

Parameters:

- `inner`: The input `Group` object.

Returns: A regular expression `Group` object.

Exceptions:

- `ArgumentNullException`: `inner` is `null`.

To be added.
