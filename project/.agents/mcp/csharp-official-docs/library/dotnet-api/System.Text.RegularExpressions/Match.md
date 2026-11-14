---
title: "Match class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/Match.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Match class

Namespace: `System.Text.RegularExpressions`

```csharp
public class Match : System.Text.RegularExpressions.Group
```

Represents the results from a single regular expression match.

The `Match` class is immutable and has no public constructor. An instance of the
`Match` class is returned by the `Regex.Match` method and
represents the first pattern match in a string. Subsequent matches are represented by
`Match` objects returned by the `Match.NextMatch` method. In addition, a
`MatchCollection` object that consists of zero, one, or more `Match`
objects is returned by the `Regex.Matches` method.

If the `Regex.Matches` method fails to match a regular expression pattern in
an input string, it returns an empty `MatchCollection` object. You can then use a
`foreach` construct to iterate over the collection.

If the `Regex.Match` method fails to match the regular expression pattern, it
returns a `Match` object that is equal to `Match.Empty`. You can use the
`Group.Success` property to determine whether the match was successful.

If a pattern match is successful, the `Capture.Value` property contains the matched
substring, the `Capture.Index` property indicates the zero-based starting position of
the matched substring in the input string, and the `Capture.Length` property indicates
the length of the matched substring in the input string.

Because a single match can involve multiple capturing groups, `Match` has a
`Match.Groups` property that returns the `GroupCollection`. The
`Match` instance itself is equivalent to the first object in the collection, at
`Match.Groups[0]`, which represents the entire match.

## Match.Empty property

```csharp
public static System.Text.RegularExpressions.Match Empty { get; }
```

Gets the empty match. All failed matches return this empty match.

Returns: An empty match.

This property should not be used to determine if a match is successful. Instead, use the
`Group.Success` property.

## Match.Groups property

```csharp
public virtual System.Text.RegularExpressions.GroupCollection Groups { get; }
```

Gets a collection of groups matched by the regular expression.

Returns: The character groups matched by the pattern.

A regular expression pattern can include subexpressions, which are defined by enclosing a
portion of the regular expression pattern in parentheses. Every such subexpression forms a
group. The `Match.Groups` property provides access to information about those
subexpression matches. For example, the regular expression pattern `(\d{3})-(\d{3}-\d{4})`,
which matches North American telephone numbers, has two subexpressions. The first consists of
the area code, which composes the first three digits of the telephone number. This group is
captured by the first set of parentheses, `(\d{3})`. The second consists of the
individual telephone number, which composes the last seven digits of the telephone number.
This group is captured by the second set of parentheses, `(\d{3}-\d{4})`.

The `GroupCollection` object returned by the `Match.Groups` property always
has at least one member. If the regular expression engine cannot find any matches in a
particular input string, the single `Group` object in the collection has its
`Group.Success` property set to `false` and its `Group.Value`
property set to `String.Empty`.

If the collection has more than one member, the first item in the collection is the same as
the `Match` object (the entire match). Each subsequent member represents a
captured group, if the regular expression includes capturing groups. Groups can be accessed by
their integer index or, for named groups, by name.

## Match.NextMatch() method

```csharp
public System.Text.RegularExpressions.Match NextMatch ();
```

Returns a new `Match` object with the results for the next match, starting at the
position at which the last match ended (at the character after the last matched character).

Returns: The next regular expression match.

Exceptions:

- `RegexMatchTimeoutException`: A time-out occurred.

This method is similar to calling `Regex.Match` again and passing
`Index + Length` as the new starting position.

This method does not modify the current instance. Instead, it returns a new
`Match` object that contains information about the next match.

Attempting to retrieve the next match may throw a `RegexMatchTimeoutException` if
a time-out value for matching operations is in effect and the attempt to find the next match
exceeds that time-out interval.

When attempting to match a regular expression pattern against an empty match, the regular
expression engine will advance one character in the input string before retrying the match, to
avoid an infinite loop. Callers should not assume that each match will advance by at least one
position, since zero-width matches are possible.

## Match.Result(String) method

```csharp
public virtual string Result (string replacement);
```

Returns the expansion of the passed replacement pattern. For example, if the replacement
pattern is `$1$2`, `Match.Result` returns the concatenation of
`Groups[1].Value` and `Groups[2].Value`.

Parameters:

- `replacement`: The replacement pattern to use.

Returns: The expanded version of the `replacement` parameter.

Exceptions:

- `ArgumentNullException`: `replacement` is `null`.
- `NotSupportedException`: Expansion is not allowed for this pattern.

Whereas the `Regex.Replace` method replaces all matches in an
input string with a specified replacement pattern, the `Match.Result` method replaces a
single match with a specified replacement pattern. Because it operates on an individual match,
it is also possible to perform processing on the matched string before you call the
`Match.Result` method.

The `replacement` parameter is a standard regular expression replacement
pattern. It can consist of literal characters and regular expression substitutions. For more
information, see
Substitutions.

## Match.Synchronized(Match) method

```csharp
public static System.Text.RegularExpressions.Match Synchronized (System.Text.RegularExpressions.Match inner);
```

Returns a `Match` instance equivalent to the one supplied that is safe to share
between multiple threads.

Parameters:

- `inner`: The input `Match` object.

Returns: A regular expression `Match` object.

Exceptions:

- `ArgumentNullException`: `inner` is `null`.

To be added.
