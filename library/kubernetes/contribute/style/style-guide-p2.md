---
title: "Documentation Style Guide (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/style/style-guide.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Documentation Style Guide (part 2 of 2)

## Shortcodes

Hugo Shortcodes help create
different rhetorical appeal levels. Our documentation supports three variants of
the Docsy `alert`
shortcode in this category: **Note**, **Caution**, and **Warning**.

1. Surround the text with an opening and closing `alert` shortcode, choosing the
   `color` and `title` attributes for the variant you need.

2. Use the following syntax to apply a style:

   ```none
   {{</* alert color="info" title="Note" */>}}
   The shortcode renders the title as a heading, so do not repeat it inside the body.
   {{</* /alert */>}}
   ```

   The output is:

   The shortcode renders the title as a heading, so do not repeat it inside the body.

Many existing pages still use the legacy `{{</* note */>}}`, `{{</* caution */>}}`,
and `{{</* warning */>}}` shortcodes. These still work — prefer the `alert`
shortcode for new content and when editing existing pages.

### Note

Use `{{</* alert color="info" title="Note" */>}}` to highlight a tip or a piece of information that may be helpful to know.

For example:

```
{{</* alert color="info" title="Note" */>}}
You can _still_ use Markdown inside these callouts.
{{</* /alert */>}}
```

The output is:

You can _still_ use Markdown inside these callouts.

You can use an `alert` shortcode in a list:

```
1. Use the alert shortcode in a list

1. A second item with an embedded note

   {{</* alert color="info" title="Note" */>}}
   Warning, Caution, and Note shortcodes, embedded in lists, need to be indented four spaces. See [Common Shortcode Issues](#common-shortcode-issues).
   {{</* /alert */>}}

1. A third item in a list

1. A fourth item in a list
```

The output is:

1. Use the alert shortcode in a list

1. A second item with an embedded note

    Warning, Caution, and Note shortcodes, embedded in lists, need to be indented four spaces. See Common Shortcode Issues.

1. A third item in a list

1. A fourth item in a list

### Caution

Use `{{</* alert color="caution" title="Caution" */>}}` to call attention to an important piece of information to avoid pitfalls.

For example:

```
{{</* alert color="caution" title="Caution" */>}}
The callout style only applies to the line directly above the tag.
{{</* /alert */>}}
```

The output is:

The callout style only applies to the line directly above the tag.

### Warning

Use `{{</* alert color="danger" title="Warning" */>}}` to indicate danger or a piece of information that is crucial to follow.

For example:

```
{{</* alert color="danger" title="Warning" */>}}
Beware.
{{</* /alert */>}}
```

The output is:

Beware.

## Common Shortcode Issues

### Ordered Lists

Shortcodes will interrupt numbered lists unless you indent four spaces before the notice and the tag.

For example:

    1. Preheat oven to 350˚F

    1. Prepare the batter, and pour into springform pan.
       {{</* alert color="info" title="Note" */>}}Grease the pan for best results.{{</* /alert */>}}

    1. Bake for 20-25 minutes or until set.

The output is:

1. Preheat oven to 350˚F

1. Prepare the batter, and pour into springform pan.

   Grease the pan for best results.

1. Bake for 20-25 minutes or until set.

### Include Statements

Shortcodes inside include statements will break the build. You must insert them
in the parent document, before and after you call the include. For example:

```
{{</* alert color="info" title="Note" */>}}
{{</* include "task-tutorial-prereqs.md" */>}}
{{</* /alert */>}}
```

## Markdown elements

### Line breaks

Use a single newline to separate block-level content like headings, lists, images,
code blocks, and others. The exception is second-level headings, where it should
be two newlines. Second-level headings follow the first-level (or the title) without
any preceding paragraphs or texts. A two line spacing helps visualize the overall
structure of content in a code editor better.

Manually wrap paragraphs in the Markdown source when appropriate. Since the git
tool and the GitHub website generate file diffs on a line-by-line basis,
manually wrapping long lines helps the reviewers to easily find out the changes
made in a PR and provide feedback. It also helps the downstream localization
teams where people track the upstream changes on a per-line basis.  Line
wrapping can happen at the end of a sentence or a punctuation character, for
example. One exception to this is that a Markdown link or a shortcode is
expected to be in a single line.

### Headings and titles {#headings}

People accessing this documentation may use a screen reader or other assistive technology (AT).
Screen readers are linear output devices,
they output items on a page one at a time. If there is a lot of content on a page, you can
use headings to give the page an internal structure. A good page structure helps all readers
to easily navigate the page or filter topics of interest.

Do | Don't
:--| :-----
Update the title in the front matter of the page or blog post. | Use first level heading, as Hugo automatically converts the title in the front matter of the page into a first-level heading.
Use ordered headings to provide a meaningful high-level outline of your content. | Use headings level 4 through 6, unless it is absolutely necessary. If your content is that detailed, it may need to be broken into separate articles.
Use pound or hash signs (`#`) for non-blog post content. | Use underlines (`---` or `===`) to designate first-level headings.
Use sentence case for headings in the page body. For example, **Extend kubectl with plugins** | Use title case for headings in the page body. For example, **Extend Kubectl With Plugins**
Use title case for the page title in the front matter. For example, `title: Kubernetes API Server Bypass Risks` | Use sentence case for page titles in the front matter. For example, don't use `title: Kubernetes API server bypass risks`
Place relevant links in the body copy. | Include hyperlinks (``) in headings.
Use pound or hash signs (`#`) to indicate headings. | Use **bold** text or other indicators to split paragraphs.

### Paragraphs

Do | Don't
:--| :-----
Try to keep paragraphs under 6 sentences. | Indent the first paragraph with space characters. For example, ⋅⋅⋅Three spaces before a paragraph will indent it.
Use three hyphens (`---`) to create a horizontal rule. Use horizontal rules for breaks in paragraph content. For example, a change of scene in a story, or a shift of topic within a section. | Use horizontal rules for decoration.

### Links

Do | Don't
:--| :-----
Write hyperlinks that give you context for the content they link to. For example: Certain ports are open on your machines. See Check required ports for more details. | Use ambiguous terms such as "click here". For example: Certain ports are open on your machines. See here for more details.
Write Markdown-style links: `link text`. For example: `Hugo shortcodes` and the output is Hugo shortcodes. | Write HTML-style links: `Visit our tutorial!`, or create links that open in new tabs or windows. For example: `example website{target="_blank"}`

### Lists

Group items in a list that are related to each other and need to appear in a specific
order or to indicate a correlation between multiple items. When a screen reader comes
across a list—whether it is an ordered or unordered list—it will be announced to the
user that there is a group of list items. The user can then use the arrow keys to move
up and down between the various items in the list. Website navigation links can also be
marked up as list items; after all they are nothing but a group of related links.

- End each item in a list with a period if one or more items in the list are complete
  sentences. For the sake of consistency, normally either all items or none should be complete sentences.

  Ordered lists that are part of an incomplete introductory sentence can be in lowercase
  and punctuated as if each item was a part of the introductory sentence.

- Use the number one (`1.`) for ordered lists.

- Use (`+`), (`*`), or (`-`) for unordered lists.

- Leave a blank line after each list.

- Indent nested lists with four spaces (for example, ⋅⋅⋅⋅).

- List items may consist of multiple paragraphs. Each subsequent paragraph in a list
  item must be indented by either four spaces or one tab.

### Tables

The semantic purpose of a data table is to present tabular data. Sighted users can
quickly scan the table but a screen reader goes through line by line. A table caption
is used to create a descriptive title for a data table. Assistive technologies (AT)
use the HTML table caption element to identify the table contents to the user within the page structure.

- Add table captions using Hugo shortcodes for tables.

## Content best practices

This section contains suggested best practices for clear, concise, and consistent content.

### Use present tense

Do | Don't
:--| :-----
This command starts a proxy. | This command will start a proxy.

Exception: Use future or past tense if it is required to convey the correct
meaning.

### Use active voice

Do | Don't
:--| :-----
You can explore the API using a browser. | The API can be explored using a browser.
The YAML file specifies the replica count. | The replica count is specified in the YAML file.

Exception: Use passive voice if active voice leads to an awkward construction.

### Use simple and direct language

Use simple and direct language. Avoid using unnecessary phrases, such as saying "please."

Do | Don't
:--| :-----
To create a ReplicaSet, ... | In order to create a ReplicaSet, ...
See the configuration file. | Please see the configuration file.
View the pods. | With this next command, we'll view the pods.

### Address the reader as "you"

Do | Don't
:--| :-----
You can create a Deployment by ... | We'll create a Deployment by ...
In the preceding output, you can see... | In the preceding output, we can see ...

### Avoid Latin phrases

Prefer English terms over Latin abbreviations.

Do | Don't
:--| :-----
For example, ... | e.g., ...
That is, ...| i.e., ...

Exception: Use "etc." for et cetera.

## Patterns to avoid

### Avoid using "we"

Using "we" in a sentence can be confusing, because the reader might not know
whether they're part of the "we" you're describing.

Do | Don't
:--| :-----
Version 1.4 includes ... | In version 1.4, we have added ...
Kubernetes provides a new feature for ... | We provide a new feature ...
This page teaches you how to use pods. | In this page, we are going to learn about pods.

### Avoid jargon and idioms

Some readers speak English as a second language. Avoid jargon and idioms to help them understand better.

Do | Don't
:--| :-----
Internally, ... | Under the hood, ...
Create a new cluster. | Turn up a new cluster.

### Avoid statements about the future

Avoid making promises or giving hints about the future. If you need to talk about
an alpha feature, put the text under a heading that identifies it as alpha
information.

An exception to this rule is documentation about announced deprecations
targeting removal in future versions. One example of documentation like this
is the Deprecated API migration guide.

### Avoid statements that will soon be out of date

Avoid words like "currently" and "new." A feature that is new today might not be
considered new in a few months.

Do | Don't
:--| :-----
In version 1.4, ... | In the current version, ...
The Federation feature provides ... | The new Federation feature provides ...

### Avoid words that assume a specific level of understanding

Avoid words such as "just", "simply", "easy", "easily", or "simple". These words do not add value.

Do | Don't
:--| :-----
Include one command in ... | Include just one command in ...
Run the container ... | Simply run the container ...
You can remove ... | You can easily remove ...
These steps ... | These simple steps ...

### EditorConfig file
The Kubernetes project maintains an EditorConfig file that sets common style preferences in text editors
such as VS Code. You can use this file if you want to ensure that your contributions are consistent with
the rest of the project. To view the file, refer to
`.editorconfig` in the repository root.

## What's next

* Learn about writing a new topic.
* Learn about using page templates.
* Learn about custom hugo shortcodes.
* Learn about creating a pull request.
