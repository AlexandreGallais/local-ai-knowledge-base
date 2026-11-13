---
title: "Best Practices for Regular Expressions in .NET (part 4 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/best-practices-regex.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best Practices for Regular Expressions in .NET (part 4 of 5)

## Take charge of backtracking

Ordinarily, the regular expression engine uses linear progression to move through an input string and compare it to a regular expression pattern. However, when indeterminate quantifiers such as `*`, `+`, and `?` are used in a regular expression pattern, the regular expression engine might give up a portion of successful partial matches and return to a previously saved state in order to search for a successful match for the entire pattern. This process is known as backtracking.

> **Tip:**
> For more information on backtracking, see Details of regular expression behavior and Backtracking. For detailed discussions of backtracking, see the Regular Expression Improvements in .NET 7 and Optimizing Regular Expression Performance blog posts.

Support for backtracking gives regular expressions power and flexibility. It also places the responsibility for controlling the operation of the regular expression engine in the hands of regular expression developers. Because developers are often not aware of this responsibility, their misuse of backtracking or reliance on excessive backtracking often plays the most significant role in degrading regular expression performance. In a worst-case scenario, execution time can double for each additional character in the input string. In fact, by using backtracking excessively, it's easy to create the programmatic equivalent of an endless loop if input nearly matches the regular expression pattern. The regular expression engine might take hours or even days to process a relatively short input string.

Often, applications pay a performance penalty for using backtracking even though backtracking isn't essential for a match. For example, the regular expression `\b\p{Lu}\w*\b` matches all words that begin with an uppercase character, as the following table shows:

| Pattern  | Description                           |
|----------|---------------------------------------|
| `\b`     | Begin the match at a word boundary.   |
| `\p{Lu}` | Matches an uppercase character.       |
| `\w*`    | Matches zero or more word characters. |
| `\b`     | End the match at a word boundary.     |

Because a word boundary isn't the same as, or a subset of, a word character, there's no possibility that the regular expression engine will cross a word boundary when matching word characters. Therefore for this regular expression, backtracking can never contribute to the overall success of any match. It can only degrade performance because the regular expression engine is forced to save its state for each successful preliminary match of a word character.

If you determine that backtracking isn't necessary, you can disable it in a couple of ways:

- By setting the `System.Text.RegularExpressions.RegexOptions.NonBacktracking` option (introduced in .NET 7). For more information, see Nonbacktracking mode.
- By using the `(?>subexpression)` language element, known as an atomic group. The following example parses an input string by using two regular expressions. The first, `\b\p{Lu}\w*\b`, relies on backtracking. The second, `\b\p{Lu}(?>\w*)\b`, disables backtracking. As the output from the example shows, they both produce the same result:

  ```csharp
using System;
using System.Text.RegularExpressions;

public class BackTrack2Example
{
    public static void Main()
    {
        string input = "This this word Sentence name Capital";
        string pattern = @"\b\p{Lu}\w*\b";
        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine(match.Value);

        Console.WriteLine();

        pattern = @"\b\p{Lu}(?>\w*)\b";
        foreach (Match match in Regex.Matches(input, pattern))
            Console.WriteLine(match.Value);
    }
}
// The example displays the following output:
//       This
//       Sentence
//       Capital
//
//       This
//       Sentence
//       Capital
```

In many cases, backtracking is essential for matching a regular expression pattern to input text. However, excessive backtracking can severely degrade performance and create the impression that an application has stopped responding. In particular, this problem arises when quantifiers are nested and the text that matches the outer subexpression is a subset of the text that matches the inner subexpression.

> **Warning:**
> In addition to avoiding excessive backtracking, you should use the timeout feature to ensure that excessive backtracking doesn't severely degrade regular expression performance. For more information, see the Use time-out values section.

For example, the regular expression pattern `^0-9A-Z*\$$` is intended to match a part number that consists of at least one alphanumeric character. Any additional characters can consist of an alphanumeric character, a hyphen, an underscore, or a period, though the last character must be alphanumeric. A dollar sign terminates the part number. In some cases, this regular expression pattern can exhibit poor performance because quantifiers are nested, and because the subexpression `[0-9A-Z]` is a subset of the subexpression `[-.\w]*`.

In these cases, you can optimize regular expression performance by removing the nested quantifiers and replacing the outer subexpression with a zero-width lookahead or lookbehind assertion. Lookahead and lookbehind assertions are anchors. They don't move the pointer in the input string but instead look ahead or behind to check whether a specified condition is met. For example, the part number regular expression can be rewritten as `^0-9A-Z*(?<=[0-9A-Z])\$$`. This regular expression pattern is defined as shown in the following table:

| Pattern         | Description                                                                               |
|-----------------|-------------------------------------------------------------------------------------------|
| `^`             | Begin the match at the beginning of the input string.                                     |
| `[0-9A-Z]`      | Match an alphanumeric character. The part number must consist of at least this character. |
| `[-.\w]*`       | Match zero or more occurrences of any word character, hyphen, or period.                  |
| `\$`            | Match a dollar sign.                                                                      |
| `(?<=[0-9A-Z])` | Look behind the ending dollar sign to ensure that the previous character is alphanumeric. |
| `$`             | End the match at the end of the input string.                                             |

The following example illustrates the use of this regular expression to match an array containing possible part numbers:

```csharp
using System;
using System.Text.RegularExpressions;

public class BackTrack4Example
{
    public static void Main()
    {
        string pattern = @"^[0-9A-Z][-.\w]*(?<=[0-9A-Z])\$$";
        string[] partNos = { "A1C$", "A4", "A4$", "A1603D$", "A1603D#" };

        foreach (var input in partNos)
        {
            Match match = Regex.Match(input, pattern);
            if (match.Success)
                Console.WriteLine(match.Value);
            else
                Console.WriteLine("Match not found.");
        }
    }
}
// The example displays the following output:
//       A1C$
//       Match not found.
//       A4$
//       A1603D$
//       Match not found.
```

The regular expression language in .NET includes the following language elements that you can use to eliminate nested quantifiers. For more information, see Grouping constructs.

|Language element|Description|
|----------------------|-----------------|
|`(?=` `subexpression` `)`|Zero-width positive lookahead. Looks ahead of the current position to determine whether `subexpression` matches the input string.|
|`(?!` `subexpression` `)`|Zero-width negative lookahead. Looks ahead of the current position to determine whether `subexpression` doesn't match the input string.|
|`(?<=` `subexpression` `)`|Zero-width positive lookbehind. Looks behind the current position to determine whether `subexpression` matches the input string.|
|`(?<!` `subexpression` `)`|Zero-width negative lookbehind. Looks behind the current position to determine whether `subexpression` doesn't match the input string.|

## Use time-out values

If your regular expressions processes input that nearly matches the regular expression pattern, it can often rely on excessive backtracking, which impacts its performance significantly. In addition to carefully considering your use of backtracking and testing the regular expression against near-matching input, you should always set a time-out value to minimize the effect of excessive backtracking, if it occurs.

The regular expression time-out interval defines the period of time that the regular expression engine will look for a single match before it times out. Depending on the regular expression pattern and the input text, the execution time might exceed the specified time-out interval, but it won't spend more time backtracking than the specified time-out interval. The default time-out interval is `System.Text.RegularExpressions.Regex.InfiniteMatchTimeout`, which means that the regular expression won't time out. You can override this value and define a time-out interval as follows:

- Call the `System.Text.RegularExpressions.Regex.#ctor(System.String,System.Text.RegularExpressions.RegexOptions,System.TimeSpan)` constructor to provide a time-out value when you instantiate a `System.Text.RegularExpressions.Regex` object.

- Call a static pattern matching method, such as `System.Text.RegularExpressions.Regex.Match(System.String,System.String,System.Text.RegularExpressions.RegexOptions,System.TimeSpan)` or `System.Text.RegularExpressions.Regex.Replace(System.String,System.String,System.String,System.Text.RegularExpressions.RegexOptions,System.TimeSpan)`, that includes a `matchTimeout` parameter.

- Set a process-wide or app domain-wide value with code such as `AppDomain.CurrentDomain.SetData("REGEX_DEFAULT_MATCH_TIMEOUT", TimeSpan.FromMilliseconds(100));`.

If you've defined a time-out interval and a match isn't found at the end of that interval, the regular expression method throws a `System.Text.RegularExpressions.RegexMatchTimeoutException` exception. In your exception handler, you can choose to retry the match with a longer time-out interval, abandon the match attempt and assume that there's no match, or abandon the match attempt and log the exception information for future analysis.

> **Warning:**
> Time-out values are not intended as a security boundary against malicious *patterns*. For more information, see Use trusted patterns.

The following example defines a `GetWordData` method that instantiates a regular expression with a time-out interval of 350 milliseconds to calculate the number of words and average number of characters in a word in a text document. If the matching operation times out, the time-out interval is increased by 350 milliseconds and the `System.Text.RegularExpressions.Regex` object is reinstantiated. If the new time-out interval exceeds one second, the method rethrows the exception to the caller.

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

public class TimeoutExample
{
    public static void Main()
    {
        RegexUtilities util = new RegexUtilities();
        string title = "Doyle - The Hound of the Baskervilles.txt";
        try
        {
            var info = util.GetWordData(title);
            Console.WriteLine($"Words:               {info.Item1:N0}");
            Console.WriteLine($"Average Word Length: {info.Item2:N2} characters");
        }
        catch (IOException e)
        {
            Console.WriteLine($"IOException reading file '{title}'");
            Console.WriteLine(e.Message);
        }
        catch (RegexMatchTimeoutException e)
        {
            Console.WriteLine($"The operation timed out after {e.MatchTimeout.TotalMilliseconds:N0} milliseconds");
        }
    }
}

public class RegexUtilities
{
    public Tuple<int, double> GetWordData(string filename)
    {
        const int MAX_TIMEOUT = 1000;   // Maximum timeout interval in milliseconds.
        const int INCREMENT = 350;      // Milliseconds increment of timeout.

        List<string> exclusions = new List<string>(new string[] { "a", "an", "the" });
        int[] wordLengths = new int[29];        // Allocate an array of more than ample size.
        string input = null;
        StreamReader sr = null;
        try
        {
            sr = new StreamReader(filename);
            input = sr.ReadToEnd();
        }
        catch (FileNotFoundException e)
        {
            string msg = String.Format("Unable to find the file '{0}'", filename);
            throw new IOException(msg, e);
        }
        catch (IOException e)
        {
            throw new IOException(e.Message, e);
        }
        finally
        {
            if (sr != null) sr.Close();
        }

        int timeoutInterval = INCREMENT;
        bool init = false;
        Regex rgx = null;
        Match m = null;
        int indexPos = 0;
        do
        {
            try
            {
                if (!init)
                {
                    rgx = new Regex(@"\b\w+\b", RegexOptions.None,
                                    TimeSpan.FromMilliseconds(timeoutInterval));
                    m = rgx.Match(input, indexPos);
                    init = true;
                }
                else
                {
                    m = m.NextMatch();
                }
                if (m.Success)
                {
                    if (!exclusions.Contains(m.Value.ToLower()))
                        wordLengths[m.Value.Length]++;

                    indexPos += m.Length + 1;
                }
            }
            catch (RegexMatchTimeoutException e)
            {
                if (e.MatchTimeout.TotalMilliseconds < MAX_TIMEOUT)
                {
                    timeoutInterval += INCREMENT;
                    init = false;
                }
                else
                {
                    // Rethrow the exception.
                    throw;
                }
            }
        } while (m.Success);

        // If regex completed successfully, calculate number of words and average length.
        int nWords = 0;
        long totalLength = 0;

        for (int ctr = wordLengths.GetLowerBound(0); ctr <= wordLengths.GetUpperBound(0); ctr++)
        {
            nWords += wordLengths[ctr];
            totalLength += ctr * wordLengths[ctr];
        }
        return new Tuple<int, double>(nWords, totalLength / nWords);
    }
}
```
