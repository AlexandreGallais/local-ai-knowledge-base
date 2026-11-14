---
title: "Sec-Browsing-Topics header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-browsing-topics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-Browsing-Topics header

> **Warning:**
> This feature is currently opposed by two browser vendors. See the Standards positions section for details of opposition.

> **Note:**
> An Enrollment process is required to use this feature in your applications.

The HTTP **`Sec-Browsing-Topics`** request header sends the selected topics for the current user along with the associated request, which are used by an ad tech platform to choose a personalized ad to display.

If the calling site does not have the Topics API included in a successful privacy sandbox enrollment process, attempting to create or modify `Sec-Browsing-Topics` fails silently, and any existing `Sec-Browsing-Topics` header is deleted.

       | Header type
       | Request header

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-Browsing-Topics: <array-of-observed-topics>
```

## Directives

A JSON object representing an array of up to three objects representing the current user's selected topics for the last three epochs. Each object contains the following properties:

- `configVersion`
    A string identifying the algorithm (other than the model part) used to calculate the topic.
- `modelVersion`
    A string representing the model used to classify a string (such as a web page's hostname) into topic IDs.
- `taxonomyVersion`
    A string representing the taxonomy version used.
- `topic`
    A number representing the ID of the topic, which can be used by the browser to retrieve the topic from the taxonomy (see an example taxonomy of interests).
- `version`
    The `configVersion`, `modelVersion`, and `taxonomyVersion`, concatenated with colons (`:`) between each.

## Examples

The exact property values may vary by browser implementation. An example header from Chrome might look as follows:

```http
Sec-Browsing-Topics: [{configVersion: "chrome.1", modelVersion: "1", taxonomyVersion: "1", topic: 43, version: "chrome.1:1:1"}]
```

## Specifications

This feature is not part of an official standard, although it is specified in the Topics API Unofficial Proposal Draft.

## See also

- Topics API
