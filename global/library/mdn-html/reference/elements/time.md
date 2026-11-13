---
title: "`<time>` HTML time (date) element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/time/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<time>` HTML time (date) element

The **`<time>`** HTML element represents a specific period in time. It may include the `datetime` attribute to translate dates into machine-readable format, allowing for better search engine results or custom features such as reminders.

It may represent one of the following:

- A time on a 24-hour clock.
- A precise date in the Gregorian calendar (with optional time and timezone information).
- A valid time duration.

```html
<p>
  The Cure will be celebrating their 40th anniversary on
  <time datetime="2018-07-07">July 7</time> in London's Hyde Park.
</p>

<p>
  The concert starts at <time datetime="20:00">20:00</time> and you'll be able
  to enjoy the band for at least <time datetime="PT2H30M">2h 30m</time>.
</p>
```

```css
time {
  font-weight: bold;
}
```

## Attributes

Like all other HTML elements, this element supports the global attributes.

- `datetime`
    This attribute indicates the time and/or date of the element and must be in one of the formats described below.

## Usage notes

This element is for presenting dates and times in a machine-readable format. For example, this can help a user agent offer to add an event to a user's calendar.

This element should not be used for dates prior to the introduction of the Gregorian calendar (due to complications in calculating those dates).

The _datetime value_ (the machine-readable value of the datetime) is the value of the element's `datetime` attribute, which must be in the proper format (see below). If the element does not have a `datetime` attribute, **it must not have any element descendants**, and the _datetime value_ is the element's child text content.

### Valid datetime values

       | Description
       | Microsyntax
       | Examples

       | Valid month string
       | <code>YYYY-MM</code>
       | `2011-11`, `2013-05`

       | Valid date string
       | <code>YYYY-MM-DD</code>
       | `1887-12-01`

       | Valid yearless date string
       | <code>MM-DD</code>
       | `11-12`

       | Valid time string
       |
        <code>HH:MM</code>
        <code>HH:MM:SS</code>
        <code>HH:MM:SS.mmm</code>

       |
        `23:59`
        `12:15:47`
        `12:15:52.998`

       | Valid local date and time string
       |
        <code>YYYY-MM-DD HH:MM</code>
        <code>YYYY-MM-DD HH:MM:SS</code>
        <code>YYYY-MM-DD HH:MM:SS.mmm</code>
        <code>YYYY-MM-DDTHH:MM</code>
        <code>YYYY-MM-DDTHH:MM:SS</code>
        <code>YYYY-MM-DDTHH:MM:SS.mmm</code>

       |
        `2013-12-25 11:12`
        `1972-07-25 13:43:07`
        `1941-03-15 07:06:23.678`
        `2013-12-25T11:12`
        `1972-07-25T13:43:07`
        `1941-03-15T07:06:23.678`

       | Valid time-zone offset string
       |
        `Z`
        <code>+HHMM</code>
        <code>+HH:MM</code>
        <code>-HHMM</code>
        <code>-HH:MM</code>

       |
        `Z`
        `+0200`
        `+04:30`
        `-0300`
        `-08:00`

       | Valid global date and time string
       |
        Any combination of a valid local date and time string followed by a
        valid time-zone offset string

       |
        `2013-12-25 11:12+0200`
        `1972-07-25 13:43:07+04:30`
        `1941-03-15 07:06:23.678Z`
        `2013-12-25T11:12-08:00`

       | Valid week string
       | <code>YYYY-WWW</code>
       | `2013-W46`

       | Four or more ASCII digits
       | <code>YYYY</code>
       | `2013`, `0001`

       | Valid duration string
       |
        <code>PdDThHmMsS</code>
        <code>PdDThHmMs.XS</code>
        <code>PdDThHmMs.XXS</code>
        <code>PdDThHmMs.XXXS</code>
        <code>PThHmMsS</code>
        <code>PThHmMs.XS</code>
        <code>PThHmMs.XXS</code>
        <code>PThHmMs.XXXS</code>
        <code>ww dd hh mm ss</code>

       |
        `P12DT7H12M13S`
        `P12DT7H12M13.3S`
        `P12DT7H12M13.45S`
        `P12DT7H12M13.455S`
        `PT7H12M13S`
        `PT7H12M13.2S`
        `PT7H12M13.56S`
        `PT7H12M13.999S`
        `7d 5h 24m 13s`

## Examples

### Basic <example-value>

#### HTML

```html
<p>The concert starts at <time datetime="2018-07-07T20:00:00">20:00</time>.</p>
```

#### Result

### `datetime` example

#### HTML

```html
<p>
  The concert took place on <time datetime="2001-05-15T19:00">May 15</time>.
</p>
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        <code
          >time</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLTimeElement`

## See also

- The `<data>` element, allowing you to signal other kinds of values.
