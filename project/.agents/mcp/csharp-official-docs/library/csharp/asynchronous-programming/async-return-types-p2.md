---
title: "Async return types (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/asynchronous-programming/async-return-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Async return types (part 2 of 2)

## Async streams with IAsyncEnumerable\<T\>

An async method might return an *async stream*, represented by `System.Collections.Generic.IAsyncEnumerable`1`. An async stream provides a way to enumerate items read from a stream when elements are generated in chunks with repeated asynchronous calls. The following example shows an async method that generates an async stream:

```csharp
﻿namespace AsyncExamples;

public static class AsyncStreamExample
{
    public static async Task ReadWordsAsync()
    {
        await foreach (string word in ReadWordsFromStreamAsync())
        {
            Console.WriteLine(word);
        }
    }

    static async IAsyncEnumerable<string> ReadWordsFromStreamAsync()
    {
        string data =
            @"This is a line of text.
                  Here is the second line of text.
                  And there is one more for good measure.
                  Wait, that was the penultimate line.";

        using var readStream = new StringReader(data);

        string? line = await readStream.ReadLineAsync();
        while (line != null)
        {
            foreach (string word in line.Split(' ', StringSplitOptions.RemoveEmptyEntries))
            {
                yield return word;
            }

            line = await readStream.ReadLineAsync();
        }
    }
}
```
The preceding example reads lines from a string asynchronously. Once each line is read, the code enumerates each word in the string. Callers would enumerate each word using the `await foreach` statement. The method awaits when it needs to asynchronously read the next line from the source string.

## See also

- `System.Threading.Tasks.Task.FromResult*`
- Process asynchronous tasks as they complete
- Asynchronous programming with async and await (C#)
- async
- await
