---
title: "CSSContainerRule (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csscontainerrule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSContainerRule

The **`CSSContainerRule`** interface represents a single CSS `@container` rule.

## Instance properties

_Inherits properties from its ancestors `CSSConditionRule`, `CSSGroupingRule`, and `CSSRule`._

- `CSSContainerRule.conditions` (read-only)
    Returns an array of objects, each of which specifies a container condition in a `@container` rule.
    The objects have a `name` string property and a `query` string property, either of which may be the empty string if not defined.
    The `name` represents the name of a container, and the `query` represents the set of feature tests that must be true for the particular condition to apply.
- `CSSContainerRule.containerName` (read-only)
    Returns a string representing the name of the container condition of a `@container`, when there is just one condition.
    If there are multiple container conditions, or if there is just one condition that does not specify a name, this is the empty string.
- `CSSContainerRule.containerQuery` (read-only)
    Returns a string representing the container query for the container condition of a `@container`, when there is only one condition.
    This represents a set of feature tests that must all be true for the condition to apply.
    If there are multiple container conditions, or if there is just one condition that does not specify a query, this is the empty string.

## Instance methods

_No specific methods; inherits methods from its ancestors `CSSConditionRule`, `CSSGroupingRule`, and `CSSRule`._

## Description

A `CSSContainerRule` object represents a `@container` rule.

A `@container` rule defines one or more comma-separated _container conditions_.
Each container condition consists of a "name" and/or a "query", where the "name" indicates the name of the container to which the condition applies and the "query" specifies one or more logically combined feature checks on a container's properties.
If any of the container conditions match a container, the indicated styles are applied.

> **Note:**
> Support for multiple container conditions is indicated by the `conditions` key in the Browser compatibility table (earlier versions of the specification allowed only a single container condition).
> This affects how `CSSContainerRule` and `@container` are used.

A contrived example consisting of three conditions is shown below.
This will match a container named `main-content` if its width is between `600px` and `800px`, any container that has a height greater than `800px`, or any container named `other-content`.

```css
@container main-content (width > 600px) and (width < 800px), (height > 800px), other-content {
  /* Apply styles */
}
```

In supporting browsers, the `CSSContainerRule.conditions` property represents a `@container` as an array of objects, each of which defines a single container condition.
The objects have the properties `name` and `query`, which may be the empty string (`""`).
The `conditions` property for the `@container` example above would look like this:

```js
[
  { name: "main-content", query: "(width > 600px) and (width < 800px)" },
  { name: "", query: "(height > 800px)" },
  { name: "other-content", query: "" },
];
```

The `containerName` and `containerQuery` properties predate support for container rules with multiple container conditions.
For a container rule with a _single container condition_ they contain the name and query of that condition (mirroring the `name` and `query` properties of the object in the `conditions` array).
For a container rule with multiple conditions they are both set to the empty string.

Note that browsers that don't support the `conditions` property only allow container rules with a single container condition.
An `@container` with multiple container conditions will not be parsed, and no corresponding `CSSContainerRule` will be created.

You can also get the text for the whole condition using `CSSConditionRule.conditionText`.
