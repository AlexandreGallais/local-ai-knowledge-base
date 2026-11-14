---
title: "How to: Extract a Protocol and Port Number from a URL"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/how-to-extract-a-protocol-and-port-number-from-a-url.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Extract a Protocol and Port Number from a URL

The following example extracts a protocol and port number from a URL.

> **Warning:**
> Unrestricted use of `System.Text.RegularExpressions` with untrusted input can subject applications to denial-of-service attacks. Consult Best practices for regular expressions in .NET for guidance on how to safely use .NET regular expressions with untrusted input.

## Example

 The example uses the `System.Text.RegularExpressions.Match.Result*` method to return the protocol followed by a colon followed by the port number.

 ```csharp
using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string url = "http://www.contoso.com:8080/letters/readme.html";

      Regex r = new Regex(@"^(?<proto>\w+)://[^/]+?(?<port>:\d+)?/",
                          RegexOptions.None, TimeSpan.FromMilliseconds(150));
      Match m = r.Match(url);
      if (m.Success)
         Console.WriteLine(m.Result("${proto}${port}"));
   }
}
// The example displays the following output:
//       http:8080
```

 The regular expression pattern `^(?<proto>\w+)://[^/]+?(?<port>:\d+)?/` can be interpreted as shown in the following table.

|Pattern|Description|
|-------------|-----------------|
|`^`|Begin the match at the start of the string.|
|`(?<proto>\w+)`|Match one or more word characters. Name this group `proto`.|
|`://`|Match a colon followed by two slash marks.|
|`[^/]+?`|Match one or more occurrences (but as few as possible) of any character other than a slash mark.|
|`(?<port>:\d+)?`|Match zero or one occurrence of a colon followed by one or more digit characters. Name this group `port`.|
|`/`|Match a slash mark.|

 The `System.Text.RegularExpressions.Match.Result*` method expands the `${proto}${port}` replacement sequence, which concatenates the value of the two named groups captured in the regular expression pattern. It is a convenient alternative to explicitly concatenating the strings retrieved from the collection object returned by the `System.Text.RegularExpressions.Match.Groups` property.

 The example uses the `System.Text.RegularExpressions.Match.Result*` method with two substitutions, `${proto}` and `${port}`, to include the captured groups in the output string. You can retrieve the captured groups from the match's `System.Text.RegularExpressions.GroupCollection` object instead, as the following code shows.

 ```csharp
﻿using System;
using System.Text.RegularExpressions;

public class Example
{
   public static void Main()
   {
      string url = "http://www.contoso.com:8080/letters/readme.html";

      Regex r = new Regex(@"^(?<proto>\w+)://[^/]+?(?<port>:\d+)?/",
                          RegexOptions.None, TimeSpan.FromMilliseconds(150));
      Match m = r.Match(url);
      if (m.Success)
         Console.WriteLine(m.Groups["proto"].Value + m.Groups["port"].Value);
   }
}
// The example displays the following output:
//       http:8080
```

## See also

- .NET Regular Expressions
