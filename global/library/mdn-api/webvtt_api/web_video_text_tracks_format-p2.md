---
title: "Web Video Text Tracks Format (WebVTT) (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webvtt_api/web_video_text_tracks_format/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Video Text Tracks Format (WebVTT) (part 2 of 2)

## NOTE blocks

NOTE blocks are optional sections that can be used to add comments to a WebVTT file.
They are intended for those reading the file and are not seen by users.
For example, you might use them to record author contact details, provide an overview of your structure, or add placeholders for cues that still need to be written.

They can be used anywhere in the WebVTT file after the header.

NOTE blocks may contain newlines but cannot contain two consecutive newlines: that would create a blank line, which indicates the end of the block.

A comment cannot contain the string `-->`, the ampersand character (`&`), or the less-than sign (`<`).
If you wish to use these characters, you need to instead use a character reference such as `&` for ampersand and `<` for less-than.
It is also recommended that you use the greater-than escape sequence (`>`) instead of the greater-than character (`>`) to avoid confusion with tags.

A comment consists of three parts:

- The string `NOTE`.
- A space or a new line.
- Zero or more characters other than those noted above.

Here are some examples:

```plain
NOTE This is a single line comment

NOTE
This is a simple multi line comment

NOTE
One comment that is spanning
more than one line.

NOTE You can also make a comment
across more than one line this way.

NOTE TODO I might add a line to indicate work that still has to be done.
```

## STYLE Blocks

`STYLE` blocks are optional sections that can be used to embed CSS styling of cues within a WebVTT file.
Note that these are used to style the appearance and size of the cues, but not their position and layout, which are controlled by the Cue settings.

> **Note:**
> WebVTT cues can also be matched by CSS styles loaded by the associated document embedding the video/audio element.

`STYLE` blocks must appear before any cue blocks in the file.

Each block consists of the following lines:

- The String `STYLE` followed by zero or more space or tab characters, and then a newline.
- A string defining the CSS styles to match and apply, using the `::cue` pseudo-element.

The block cannot contain the string `-->`.
It may contain newlines but cannot contain two consecutive newlines: that would create a blank line, which indicates the end of the block.

A simple WebVTT files with two `STYLE` blocks is shown below.
This uses `::cue` to apply a text color to all cue text, and a different text color just to text that is tagged with `` tags.

```plain
WEBVTT

STYLE
::cue {
  background-image: linear-gradient(to bottom, dimgray, lightgray);
  color: papayawhip;
}
/* Style blocks cannot use blank lines nor "dash dash greater than" */

NOTE comment blocks can be used between style blocks.

STYLE
::cue(b) {
  color: peachpuff;
}

00:00:00.000 --> 00:00:10.000
- Hello <b>world</b>.

NOTE style blocks cannot appear after the first cue.
```

> **Note:**
> There are live examples demonstrating many of the following cases in More cue styling examples in _WebVTT API_.

### Match all cue payload text

Match on all cue payload text using `::cue`.

For example, the following `STYLE` block would match all cue text and color it yellow.

```plain
STYLE
::cue {
  color: yellow;
}
```

### Match a tag type

Match cue text marked up with particular cue payload text tags, such as `c`, `i`, `b`, `u`, `ruby`, `rt`, `v`, and `lang`, by specifying the tag in `::cue()` as a type selector.

For example, the following block would match cue payload text marked up with `lang` as yellow, and each of the other tags as red.

```plain
STYLE
::cue(c),
::cue(i),
::cue(b),
::cue(u),
::cue(ruby),
::cue(rt),
::cue(v) {
  color: red;
}
::cue(lang) {
  color: yellow;
}
```

### Match a class selector

Match all tags marked up using a class selector in `::cue()`.

The `STYLE` block in the following WebVTT file would match all the text after it, because all the tags have the `myclass` class.

```plain
WEBVTT

STYLE
::cue(.myclass) {
  color: yellow;
}

00:00:00.000 --> 00:00:08.000
<c.myclass>Yellow!</c>
<i.myclass>Yellow!</i>
<u.myclass>Yellow!</u>
<b.myclass>Yellow!</b>
<u.myclass>Yellow!</u>
<ruby.myclass>Yellow! <rt.myclass>Yellow!</rt></ruby>
<v.myclass Kathryn>Yellow!</v>
<lang.myclass en>Yellow!</lang>
```

To select a particular tag and class you must specify both in `::cue()`:

```css
::cue(b.myclass) {
  color: yellow;
}
```

### Match an attribute

Cue payload text marked up with a particular tag and attribute can be matched using an attribute selector.

For example, consider the following WebVTT file, which has text marked up using the `v` and `lang` cue payload text tags, using attributes to specify the particular voice ("Salame") and languages.

```plain
WEBVTT

STYLE
::cue([lang="en-US"]) {
color: yellow;
}
::cue(lang[lang="en-GB"]) {
color: cyan;
}
::cue(v[voice="Salame"]) {
color: lime;
}

00:00:00.000 --> 00:00:08.000
Yellow!

00:00:08.000 --> 00:00:16.000
<lang en-GB>Cyan!</lang>

00:00:16.000 --> 00:00:24.000
I like <v Salame>lime.</v>
```

### Match using pseudo-classes

The previous example styled text for a particular language using attribute matching.
You can also match languages using the `:lang()` pseudo class, as demonstrated by the `STYLE` block below.

```plain
STYLE
::cue(:lang(en)) {
  color: yellow;
}
::cue(:lang(en-GB)) {
  color: cyan;
}
```

You can similarly match with the `:past` and `:future` pseudo-classes, to provide a karaoke-like experience.

```css
video::cue(:past) {
  color: yellow;
}
video::cue(:future) {
  color: cyan;
}
```

Other pseudo-classes such as `link`, `nth-last-child`, and `nth-child` should work similarly.

### Match a cue id

Match against a particular cue `id` by specifying the `id` inside `::cue()`.

> **Note:**
> At time of writing this does not appear to be supported in any of the main browsers.

For example, the following WebVTT file should style the cue with identifier `cue1` in green.

```plain
WEBVTT

STYLE ::cue(#cue1) {
  color: green;
}

cue1
00:00:00.000 --> 00:00:08.000
Green!
```

Note that escape sequences are used in WebVTT CSS in the same way as HTML pages. The below example shows how to escape spaces in a cue identifier:

```plain
WEBVTT

STYLE
::cue(#transcription\ credits) {
  color: red;
}

transcription credits
00:04.000 --> 00:05.000
Transcribed by Célestes™
```

## See also

- The CSS `::cue` and `::cue()` pseudo-elements
