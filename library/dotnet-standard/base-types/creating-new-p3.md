---
title: "Creating New Strings (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/creating-new.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Creating New Strings (part 3 of 3)

### `String.Create`

The `System.String.Create*` method lets you programmatically fill a new string's characters using a callback. The callback receives a writable `System.Span`1` of characters and a caller-supplied state object, so you can build the string's content without allocating intermediate character buffers. The callback itself might still allocate, for example if it captures local variables or calls other allocation-heavy APIs.

The following example uses `String.Create` to build a five-character string from consecutive alphabet characters:

```csharp
string result = string.Create(5, 'a', (span, firstChar) =>
{
    for (int i = 0; i < span.Length; i++)
    {
        span[i] = (char)(firstChar + i);
    }
});

Console.WriteLine(result); // abcde
```
```vb
Module Program
    Sub Main()
        Dim result As String = String.Create(5, "a"c, Sub(span, firstChar)
                                                           For i As Integer = 0 To span.Length - 1
                                                               span(i) = ChrW(AscW(firstChar) + i)
                                                           Next
                                                       End Sub)

        Console.WriteLine(result) ' abcde
    End Sub
End Module
```
`String.Create` is designed for performance-sensitive scenarios where you know the final string length in advance and want to avoid allocating intermediate character buffers. The runtime allocates a new string, passes its backing buffer directly to your callback as a `Span<char>`, and returns the immutable string once the callback returns. No copy of the data occurs after the callback completes.

#### `String.Create` vs. `new String(Span<char>)`

Another option for building strings efficiently is to allocate a character buffer with `stackalloc`, fill it, and pass it to the `String(ReadOnlySpan<char>)` constructor:

```csharp
static string CreateStringFromSpan()
{
    Span<char> span = stackalloc char[5];
    for (int i = 0; i < 5; i++)
    {
        span[i] = (char)('a' + i);
    }
    return new string(span);
}

Console.WriteLine(CreateStringFromSpan()); // abcde
```
Both approaches allocate the final string exactly once. The key <example-value> are:

- **`stackalloc` + `new string(span)`** places the working buffer on the stack. This is fastest for *small, fixed-size* buffers, but the stack is a finite resource; large or deeply nested allocations can cause a `StackOverflowException`. This example shows the C# `stackalloc` pattern; Visual Basic doesn't support `stackalloc`, but it can still call the `String(ReadOnlySpan<char>)` constructor when you have a `ReadOnlySpan<char>`.
- **`String.Create`** allocates the working buffer on the heap as part of the string object itself, so there's no stack pressure. It also accepts a typed state parameter that the runtime passes to your callback without boxing, avoiding boxing allocations when the state is a reference type or a non-captured struct.
In general, prefer `stackalloc` + `new String(span)` for small strings (typically fewer than a few hundred characters) with a known, bounded size. Use `String.Create` when the size might be large, when you want to avoid stack pressure, or when passing state into the callback without boxing.

## See also

- Composite Formatting
