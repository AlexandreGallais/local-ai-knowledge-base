---
title: "RegexRunner class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/RegexRunner.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegexRunner class

Namespace: `System.Text.RegularExpressions`

```csharp
public abstract class RegexRunner
```

Base class for source-generated regex extensibility
(and the old CompileToAssembly extensibility).
It's not intended to be used by anything else.

Provides the driver code that calls the subclass's Scan
method for either scanning or direct execution.
Also maintains memory allocation for the backtracking stack,
the grouping stack and the longjump crawlstack, and provides
methods to push new subpattern match results into (or remove
backtracked results from) the Match instance.

## RegexRunner.RegexRunner() constructor

```csharp
protected internal RegexRunner ();
```

Initializes a new instance of the `RegexRunner` class.

To be added.

## RegexRunner.Capture(Int32, Int32, Int32) method

```csharp
protected void Capture (int capnum, int start, int end);
```

Called by Go() to capture a subexpression. Note that the
capnum used here has already been mapped to a non-sparse
index (by the code generator RegexWriter).

Parameters:

- `capnum`: A capture number.
- `start`: The starting position of the capture.
- `end`: The ending position of the capture.

To be added.

## RegexRunner.CharInClass(Char, String) method

```csharp
public static bool CharInClass (char ch, string charClass);
```

Determines whether the specified character matches the given character class string.

Parameters:

- `ch`: A character to test.
- `charClass`: The internal name of a character class.

Returns: `true` if the `ch` parameter is in the character class specified by the `charClass` parameter.

To be added.

## RegexRunner.CharInSet(Char, String, String) method

```csharp
protected static bool CharInSet (char ch, string set, string category);
```

Determines whether the specified character is in the given character set and category.

Parameters:

- `ch`: A character.
- `set`: The character set.
- `category`: The character category.

Returns: Returns `Boolean`.

To be added.

## RegexRunner.CheckTimeout() method

```csharp
protected void CheckTimeout ();
```

Checks whether the operation has timed out, and throws `RegexMatchTimeoutException` if it has.

To be added.

## RegexRunner.Crawl(Int32) method

```csharp
protected void Crawl (int i);
```

Save a number on the longjump unrolling stack

Parameters:

- `i`: A number to save.

To be added.

## RegexRunner.Crawlpos() method

```csharp
protected int Crawlpos ();
```

Get the height of the stack

Returns: Returns `Int32`.

To be added.

## RegexRunner.DoubleCrawl() method

```csharp
protected void DoubleCrawl ();
```

Increases the size of the longjump unrolling stack.

To be added.

## RegexRunner.DoubleStack() method

```csharp
protected void DoubleStack ();
```

Called by the implementation of Go() to increase the size of the
grouping stack.

To be added.

## RegexRunner.DoubleTrack() method

```csharp
protected void DoubleTrack ();
```

Called by the implementation of Go() to increase the size of the
backtracking stack.

To be added.

## RegexRunner.EnsureStorage() method

```csharp
protected void EnsureStorage ();
```

Called by the implementation of Go() to increase the size of storage

To be added.

## RegexRunner.FindFirstChar() method

```csharp
protected virtual bool FindFirstChar ();
```

The responsibility of FindFirstChar() is to advance runtextpos
until it is at the next position which is a candidate for the
beginning of a successful match.

Returns: Returns `Boolean`.

To be added.

## RegexRunner.Go() method

```csharp
protected virtual void Go ();
```

The responsibility of Go() is to run the regular expression at
runtextpos and call Capture() on all the captured subexpressions,
then to leave runtextpos at the ending position. It should leave
runtextpos where it started if there was no match.

To be added.

## RegexRunner.InitTrackCount() method

```csharp
protected virtual void InitTrackCount ();
```

InitTrackCount must initialize the runtrackcount field; this is
used to know how large the initial runtrack and runstack arrays
must be.

To be added.

## RegexRunner.IsBoundary(Int32, Int32, Int32) method

```csharp
protected bool IsBoundary (int index, int startpos, int endpos);
```

Called by the implementation of Go() to decide whether the pos
at the specified index is a boundary or not. It's just not worth
emitting inline code for this logic.

Parameters:

- `index`: The possible boundary position.
- `startpos`: The starting position.
- `endpos`: The ending position.

Returns: Returns `Boolean`.

To be added.

## RegexRunner.IsECMABoundary(Int32, Int32, Int32) method

```csharp
protected bool IsECMABoundary (int index, int startpos, int endpos);
```

Determines whether the position at the specified index is an ECMA-compatible word boundary.

Parameters:

- `index`: The possible ECMA boundary position.
- `startpos`: The starting position.
- `endpos`: The ending position.

Returns: Returns `Boolean`.

To be added.

## RegexRunner.IsMatched(Int32) method

```csharp
protected bool IsMatched (int cap);
```

Call out to runmatch to get around visibility issues

Parameters:

- `cap`: The capture number.

Returns: Returns `Boolean`.

To be added.

## RegexRunner.MatchIndex(Int32) method

```csharp
protected int MatchIndex (int cap);
```

Call out to runmatch to get around visibility issues

Parameters:

- `cap`: The capture number.

Returns: Returns `Int32`.

To be added.

## RegexRunner.MatchLength(Int32) method

```csharp
protected int MatchLength (int cap);
```

Call out to runmatch to get around visibility issues

Parameters:

- `cap`: The capture number.

Returns: Returns `Int32`.

To be added.

## RegexRunner.Popcrawl() method

```csharp
protected int Popcrawl ();
```

Remove a number from the longjump unrolling stack

Returns: Returns `Int32`.

To be added.

## RegexRunner.Scan(Char>) method

```csharp
protected internal virtual void Scan (ReadOnlySpan<char> text);
```

Used by a `Regex` object to scan the input `text` looking for the next match.

Parameters:

- `text`: The text to scan for a pattern match.

Exceptions:

- `NotSupportedException`: `ReadOnlySpan<T>`-based `Regex` methods are not supported from `Regex`-derived types
generated by Regex.CompileToAssembly.

This API supports the product infrastructure and is not intended to be used directly from your code.

## RegexRunner.Scan(Regex, String, Int32, Int32, Int32, Int32, Boolean) method

```csharp
protected internal System.Text.RegularExpressions.Match? Scan (System.Text.RegularExpressions.Regex regex, string text, int textbeg, int textend, int textstart, int prevlen, bool quick);
```

Used by a `Regex` object to scan the input `text`.

Parameters:

- `regex`: An instance of the regular expression engine.
- `text`: The text to scan for a pattern match.
- `textbeg`: The zero-based starting position in `text` at which the regular expression engine scans for a match.
- `textend`: The zero-based ending position in `text` at which the regular expression engine scans for a match.
- `textstart`: The zero-based starting position to scan for this match.
- `prevlen`: The number of characters in the previous match.
- `quick`: `true` to search for a match in quick mode; otherwise, `false`.

Returns: A match.

To be added.

## RegexRunner.Scan(Regex, String, Int32, Int32, Int32, Int32, Boolean, TimeSpan) method

```csharp
protected internal System.Text.RegularExpressions.Match? Scan (System.Text.RegularExpressions.Regex regex, string text, int textbeg, int textend, int textstart, int prevlen, bool quick, TimeSpan timeout);
```

This method's body is only kept since it is a protected member that could be called by someone outside
the assembly.

Parameters:

- `regex`: An instance of the regular expression engine.
- `text`: The text to scan for a pattern match.
- `textbeg`: The zero-based starting position in `text` at which the regular expression engine scans for a match.
- `textend`: The zero-based ending position in `text` at which the regular expression engine scans for a match.
- `textstart`: The zero-based starting position to scan for this match.
- `prevlen`: The number of characters in the previous match.
- `quick`: `true` to search for a match in quick mode; otherwise, `false`.
- `timeout`: The timeout interval.

Returns: A match.

To be added.

## RegexRunner.TransferCapture(Int32, Int32, Int32, Int32) method

```csharp
protected void TransferCapture (int capnum, int uncapnum, int start, int end);
```

Called by Go() to capture a subexpression. Note that the
capnum used here has already been mapped to a non-sparse
index (by the code generator RegexWriter).

Parameters:

- `capnum`: A capture number.
- `uncapnum`: A saved capture number.
- `start`: The starting position.
- `end`: The ending position.

To be added.

## RegexRunner.Uncapture() method

```csharp
protected void Uncapture ();
```

Called by `RegexRunner.Go` to revert the last capture.

To be added.

## RegexRunner.runcrawl field

```csharp
protected internal int[]? runcrawl;
```

Crawl stack

Every time a group has a capture, we push its group number onto the runcrawl stack.
In the case of a balanced match, we push BOTH groups onto the stack.

## RegexRunner.runcrawlpos field

```csharp
protected internal int runcrawlpos;
```

Crawl stack position

To be added.

## RegexRunner.runmatch field

```csharp
protected internal System.Text.RegularExpressions.Match? runmatch;
```

Result object

To be added.

## RegexRunner.runregex field

```csharp
protected internal System.Text.RegularExpressions.Regex? runregex;
```

Regex object

To be added.

## RegexRunner.runstack field

```csharp
protected internal int[]? runstack;
```

Utility stack

This stack is used to track text positions across different opcodes.
For example, in /(a*b)+/, the parentheses result in a SetMark/CaptureMark
pair. SetMark records the text position before we match a*b.  Then
CaptureMark uses that position to figure out where the capture starts.
Opcodes which push onto this stack are always paired with other opcodes
which will pop the value from it later.  A successful match should mean
that this stack is empty.

## RegexRunner.runstackpos field

```csharp
protected internal int runstackpos;
```

Utility stack position

To be added.

## RegexRunner.runtext field

```csharp
protected internal string? runtext;
```

Text to search. May be null if the input was supplied as a span.

To be added.

## RegexRunner.runtextbeg field

```csharp
protected internal int runtextbeg;
```

Index of the first character to search

We now always use a sliced span of the input
from runtextbeg to runtextend, which means that runtextbeg is now always 0 except
for CompiledToAssembly scenario which works over the original input.

## RegexRunner.runtextend field

```csharp
protected internal int runtextend;
```

Index just past the last character to search

Because we now pass in a sliced span of the input into Scan,
the runtextend will always match the length of that passed in span except for CompileToAssembly
scenario, which still works over the original input.

## RegexRunner.runtextpos field

```csharp
protected internal int runtextpos;
```

Current position in text

To be added.

## RegexRunner.runtextstart field

```csharp
protected internal int runtextstart;
```

Index of the starting character for the search.

The differs from `RegexRunner.runtextbeg` in that lookbehinds will be able to see text before
`RegexRunner.runtextstart` but not before `RegexRunner.runtextbeg`.

## RegexRunner.runtrack field

```csharp
protected internal int[]? runtrack;
```

Backtracking stack

Opcodes use this to store data regarding
what they have matched and where to backtrack to.  Each "frame" on
the stack takes the form of [CodePosition Data1 Data2...], where
CodePosition is the position of the current opcode and
the data values are all optional.  The CodePosition can be negative, and
these values (also called "back2") are used by the BranchMark family of opcodes
to indicate whether they are backtracking after a successful or failed
match.
When we backtrack, we pop the CodePosition off the stack, set the current
instruction pointer to that code position, and mark the opcode
with a backtracking flag ("Back").  Each opcode then knows how to
handle its own data.

## RegexRunner.runtrackcount field

```csharp
protected internal int runtrackcount;
```

Count of states that may do backtracking

To be added.

## RegexRunner.runtrackpos field

```csharp
protected internal int runtrackpos;
```

Backtracking stack position

To be added.
