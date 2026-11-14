---
title: "Recommended XML documentation tags (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/xmldoc/recommended-tags.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Recommended XML tags for C# documentation comments

C# documentation comments use XML elements to define the structure of the output documentation. One consequence of this feature is that you can add any valid XML in your documentation comments. The C# compiler copies these elements into the output XML file. While you can use any valid XML in your comments (including any valid HTML element), documenting code is recommended for many reasons.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

What follows are some recommendations, general use case scenarios, and things that you should know when using XML documentation tags in your C# code. While you can put any tags into your documentation comments, this article describes the recommended tags for the most common language constructs. Adhere to these recommendations:

- For the sake of consistency, document all publicly visible types and their public members.
- You can also document private members by using XML comments. However, this approach exposes the inner (potentially confidential) workings of your library.
- At a bare minimum, types and their members should have a `<summary>` tag.
- Write documentation text using complete sentences that end with full stops.
- Partial classes are fully supported, and documentation information is concatenated into a single entry for each type. If both declarations of a partial member have documentation comments, the comments on the implementing declaration are written to the output XML.

XML documentation starts with `///`. When you create a new project, the templates put some starter `///` lines in for you. The processing of these comments has some restrictions:

- The documentation must be well-formed XML. If the XML isn't well formed, the compiler generates a warning. The documentation file contains a comment that says that an error was encountered.
- Some of the recommended tags have special meanings:
  - The `<param>` tag describes parameters. If you use this tag, the compiler verifies that the parameter exists and that all parameters are described in the documentation. If the verification fails, the compiler issues a warning.
  - Attach the `cref` attribute to any tag to reference a code element. The compiler verifies that this code element exists. If the verification fails, the compiler issues a warning. The compiler respects any `using` directives when it looks for a type described in the `cref` attribute.
  - IntelliSense inside Visual Studio uses the `<summary>` tag to display additional information about a type or member.
    > **Note:**
    > The XML file doesn't provide full information about the type and members (for example, it doesn't contain any type information). To get full information about a type or member, use the documentation file together with reflection on the actual type or member.
- Developers are free to create their own set of tags. The compiler copies these tags to the output file.

Some of the recommended tags can be used on any language element. Others have more specialized usage. Finally, some of the tags are used to format text in your documentation. This article describes the recommended tags organized by their use.

The compiler verifies the syntax of the elements followed by a single \* in the following list. Visual Studio provides IntelliSense for the tags verified by the compiler and all tags followed by \*\* in the following list. In addition to the tags listed here, the compiler and Visual Studio validate the ``, ``, ``, ``, and `` tags. The compiler also validates `<tt>`, which is deprecated HTML.

> **Note:**
> HTML tags like `` are useful for formatting within documentation comments. The `` tag creates line breaks, while other HTML tags provide text formatting. These tags work in IntelliSense tooltips and generated documentation.

- General Tags used for multiple elements - These tags are the minimum set for any API.
  - `<summary>`: The value of this element is displayed in IntelliSense in Visual Studio.
  - `<remarks>` \*\*
- Tags used for members - These tags are used when documenting methods and properties.
  - `<returns>`: The value of this element is displayed in IntelliSense in Visual Studio.
  - `<param>` \*: The value of this element is displayed in IntelliSense in Visual Studio.
  - `<paramref>`
  - `<exception>` \*
  - `<value>`: The value of this element is displayed in IntelliSense in Visual Studio.
- Format documentation output - These tags provide formatting directions for tools that generate documentation.
  - `<para>`
  - `<list>`
  - `<c>`
  - `<code>`
  - `<example>` \*\*
  - ``
  - ``
  - ``
  - ``
  - ``
- Reuse documentation text - These tags provide tools that make it easier to reuse XML comments.
  - `<inheritdoc>` \*\*
  - `<include>` \*
- Generate links and references - These tags generate links to other documentation.
  - `<see>` \*
  - `<seealso>` \*
  - `cref`
  - `href`
- Tags for generic types and methods - Use these tags only on generic types and methods.
  - `<typeparam>` \*: IntelliSense in Visual Studio shows the value of this element.
  - `<typeparamref>`

> **Note:**
> You can't apply documentation comments to a namespace.

If you want angle brackets to appear in the text of a documentation comment, use the HTML encoding of `<` and `>`, which is `<` and `>` respectively. The following example shows this encoding.

```csharp
/// <summary>
/// This property always returns a value &lt; 1.
/// </summary>
```

## General tags

### `<summary>`

```xml
<summary>description</summary>
```

Use the `<summary>` tag to describe a type or a type member. Use `<remarks>` to add supplemental information to a type description. Use the cref attribute to enable documentation tools such as DocFX and Sandcastle to create internal hyperlinks to documentation pages for code elements. The text for the `<summary>` tag appears in IntelliSense and in the Object Browser window.

### `<remarks>`

```xml
<remarks>
description
</remarks>
```

Use the `<remarks>` tag to add information about a type or a type member, supplementing the information specified with `<summary>`. This information appears in the Object Browser window. This tag can include more lengthy explanations. You might find that using `CDATA` sections for markdown make writing it more convenient. Tools such as docfx process the markdown text in `CDATA` sections.

## Document members

### `<returns>`

```xml
<returns>description</returns>
```

Use the `<returns>` tag in the comment for a method declaration to describe the return value.

### `<param>`

```xml
<param name="name">description</param>
```

- `name`: The name of a method parameter. Enclose the name in quotation marks ("). The names for parameters must match the API signature. If one or more parameters aren't covered, the compiler issues a warning. The compiler also issues a warning if the value of `name` doesn't match a formal parameter in the method declaration.

Use the `<param>` tag in the comment for a method declaration to describe one of the parameters for the method. To document multiple parameters, use multiple `<param>` tags. The text for the `<param>` tag appears in IntelliSense, the Object Browser, and the Code Comment Web Report.

### `<paramref>`

```xml
<paramref name="name"/>
```

- `name`: The name of the parameter to refer to. Enclose the name in quotation marks (").

The `<paramref>` tag provides a way to indicate that a word in the code comments, such as in a `<summary>` or `<remarks>` block, refers to a parameter. You can process the XML file to format this word in a distinct way, such as by using a bold or italic font.

### `<exception>`

```xml
<exception cref="member">description</exception>
```

- cref = "`member`": A reference to an exception that's available from the current compilation environment. The compiler checks that the given exception exists and translates `member` to the canonical element name in the output XML. `member` must appear within quotation marks (").

The `<exception>` tag lets you specify which exceptions a member can throw. Apply this tag to definitions for methods, properties, events, and indexers.

### `<value>`

```xml
<value>property-description</value>
```

The `<value>` tag lets you describe the value that a property represents. When you add a property by using the code wizard in the Visual Studio .NET development environment, it adds a `<summary>` tag for the new property. You manually add a `<value>` tag to describe the value that the property represents.

### `<safety>`

```xml
<safety>description</safety>
```

Use the `<safety>` tag to document the contract that a caller of a *requires-unsafe* member must satisfy under the updated memory safety model, a preview feature in C# 15 and .NET 11. When the updated rules are enabled, marking a member `unsafe` pushes the obligation to audit safety onto the caller, and the `<safety>` block states the conditions the caller must guarantee. The updated rules can be enabled in preview with the `updated-memory-safety-rules` compiler feature; see Enable the updated memory safety rules. You can also place a `<safety>` block on an `unsafe` field to record the invariant that the enclosing type maintains.

The C# compiler doesn't recognize or process the `<safety>` tag. Like any custom tag, the compiler copies it verbatim to the output XML file. A memory safety analyzer might flag a requires-unsafe member that's missing a `<safety>` block, but the compiler itself doesn't enforce its presence or contents. For more information, see Safety documentation.

## Format documentation output

### `<para>`

```xml
<remarks>
    <para>
        This is an introductory paragraph.
    </para>
    <para>
        This paragraph contains more details.
    </para>
</remarks>
```

Use the `<para>` tag inside a tag, such as `<summary>`, `<remarks>`, or `<returns>`, to add structure to the text. The `<para>` tag creates a double spaced paragraph. Use the `` tag if you want a single spaced paragraph.

Here's an example showing the difference between `<para>` and ``:

```csharp
/// <summary>
/// Example using para tags:
/// <para>This is the first paragraph.</para>
/// <para>This is the second paragraph with double spacing.</para>
/// 
/// Example using br tags:
/// First line of text<br/>
/// Second line of text with single spacing<br/>
/// Third line of text
/// </summary>
public void FormattingExample()
{
    // This method demonstrates paragraph and line break formatting
}
```
### `<list>`

```xml
<list type="bullet|number|table">
    <listheader>
        <term>term</term>
        <description>description</description>
    </listheader>
    <item>
        <term>Assembly</term>
        <description>The library or executable built from a compilation.</description>
    </item>
    <item>
        <term>Namespace</term>
        <description>A logical grouping of related types such as classes and interfaces.</description>
    </item>
    <item>
        <term>Class</term>
        <description>A blueprint used to create objects, containing properties and methods.</description>
    </item>
</list>
```

Use the `<listheader>` block to define the heading row of either a table or definition list.

When defining a table:

* Supply an entry for `term` in the heading.
* Specify each item in the list with an `<item>` block. For each `item`, supply an entry for `description`.

When creating a definition list:

* Supply an entry for `term` in the heading.
* Specify each item in the list with an `<item>` block. Each `item` must contain both a `term` and `description`.

A list or table can have as many `<item>` blocks as needed.

### `<c>`

```xml
<c>text</c>
```

Use the `<c>` tag to mark text within a description as code. Use `<code>` to indicate multiple lines as code.

### `<code>`

```xml
<code>
    var index = 5;
    index++;
</code>
```

Use the `<code>` tag to indicate multiple lines of code. Use `<c>` to mark single-line text within a description as code.

### `<example>`

```xml
<example>
This shows how to increment an integer.
<code>
    var index = 5;
    index++;
</code>
</example>
```

Use the `<example>` tag to provide an example of how to use a method or other library member. An example commonly involves using the `<code>` tag.

### ``

```xml
<b>text</b>
```

Use the `` tag to make text bold within documentation comments. The compiler and Visual Studio validate this HTML formatting tag. The formatted text appears in IntelliSense and generated documentation.

### ``

```xml
<i>text</i>
```

Use the `` tag to make text italic within documentation comments. The compiler and Visual Studio validate this HTML formatting tag. The formatted text appears in IntelliSense and generated documentation.

### ``

```xml
<u>text</u>
```

Use the `` tag to underline text within documentation comments. The compiler and Visual Studio validate this HTML formatting tag. The formatted text appears in IntelliSense and generated documentation.

### ``

```xml
Line one<br/>Line two
```

Use the `` tag to insert a line break within documentation comments. Use this tag when you want a single spaced paragraph, as opposed to the `<para>` tag which creates double spaced paragraphs.

### ``

```xml
<a href="https://example.com">Link text</a>
```

Use the `` tag to create hyperlinks within documentation comments. The `href` attribute specifies the URL to link to. The compiler and Visual Studio validate this HTML formatting tag.

> **Note:**
> The compiler also validates the `<tt>` tag, which is deprecated HTML. Use the `<c>` tag instead for inline code formatting.
