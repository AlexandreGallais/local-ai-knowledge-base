---
title: "XML API documentation comments comments - document APIs using /// comments (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/xmldoc/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Generate XML API documentation comments

C# source files can include structured comments that produce API documentation for the types defined in those files. The C# compiler produces an *XML* file that contains structured data representing the comments and the API signatures. Other tools can process that XML output to create human-readable documentation in the form of web pages or PDF files, for example.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

This process provides many advantages for you to add API documentation in your code:

- The C# compiler combines the structure of the C# code with the text of the comments into a single XML document.
- The C# compiler verifies that the comments match the API signatures for relevant tags.
- Tools that process the XML documentation files can define XML elements and attributes specific to those tools.

Tools like Visual Studio provide IntelliSense for many common XML elements used in documentation comments.

This article covers these topics:

- Documentation comments and XML file generation
- Tags validated by the C# compiler and Visual Studio
- Format of the generated XML file

## Create XML documentation output

You create documentation for your code by writing special comment fields indicated by triple slashes. The comment fields include XML elements that describe the code block that follows the comments. For example:

```csharp
/// <summary>
/// This class performs an important function.
/// </summary>
public class MyClass { }
```

You set either the **GenerateDocumentationFile** or **DocumentationFile** option. The compiler finds all comment fields with XML tags in the source code and creates an XML documentation file from those comments. When you enable this option, the compiler generates the CS1591 warning for any publicly visible member declared in your project without XML documentation comments.

## XML comment formats

Using XML doc comments requires delimiters that indicate where a documentation comment begins and ends. Use the following delimiters with the XML documentation tags:

- `///` Single-line delimiter: The documentation examples and C# project templates use this form. If white space follows the delimiter, it isn't included in the XML output.
  > **Note:**
  > Visual Studio automatically inserts the `**` and `**` tags and positions your cursor within these tags after you type the `///` delimiter in the code editor. You can turn this feature on or off in the Options dialog box.
- `/** */` Multiline delimiters: The `/** */` delimiters have the following formatting rules:
  - On the line that contains the `/**` delimiter, if the rest of the line is white space, the line isn't processed for comments. If the first character after the `/**` delimiter is white space, that white-space character is ignored and the rest of the line is processed. Otherwise, the entire text of the line after the `/**` delimiter is processed as part of the comment.
  - On the line that contains the `*/` delimiter, if there's only white space up to the `*/` delimiter, that line is ignored. Otherwise, the text on the line up to the `*/` delimiter is processed as part of the comment.
  - For the lines after the one that begins with the `/**` delimiter, the compiler looks for a common pattern at the beginning of each line. The pattern can consist of optional white space and/or an asterisk (`*`), followed by more optional white space. If the compiler finds a common pattern at the beginning of each line that doesn't begin with the `/**` delimiter or end with the `*/` delimiter, it ignores that pattern for each line.
  - The only part of the following comment processed is the line that begins with `<summary>`. The three tag formats produce the same comments.

    ```csharp
    /** <summary>text</summary> */

    /**
    <summary>text</summary>
    */

    /**
     * <summary>text</summary>
    */
    ```

  - The compiler identifies a common pattern of " \* " at the beginning of the second and third lines. The pattern isn't included in the output.

    ```csharp
    /**
     * <summary>
     * text </summary>*/
    ```

  - The compiler finds no common pattern in the following comment because the second character on the third line isn't an asterisk. All text on the second and third lines is processed as part of the comment.

    ```csharp
    /**
     * <summary>
       text </summary>
    */
    ```

  - The compiler finds no pattern in the following comment for two reasons. First, the number of spaces before the asterisk isn't consistent. Second, the fifth line begins with a tab, which doesn't match spaces. All text from lines two through five is processed as part of the comment.

    ```csharp
    /**
      * <summary>
      * text
     *  text2
     	*  </summary>
    */
    ```

To refer to XML elements (for example, your function processes specific XML elements that you want to describe in an XML documentation comment), use the standard quoting mechanism (`<` and `>`). To refer to generic identifiers in code reference (`cref`) elements, use either the escape characters (for example, `cref="List<T>"`) or braces (`cref="List{T}"`). As a special case, the compiler parses the braces as angle brackets to make the documentation comment less cumbersome to the author when referring to generic identifiers.

> **Note:**
> If you write comments by using the single line XML comment delimiter, `///`, but don't include any tags, the compiler adds the text of those comments to the XML output file. However, the output doesn't include XML elements such as `<summary>`. Most tools that consume XML comments (including Visual Studio IntelliSense) don't read these comments.
