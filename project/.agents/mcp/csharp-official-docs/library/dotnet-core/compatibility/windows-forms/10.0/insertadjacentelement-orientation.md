---
title: "Breaking change: Renamed parameter in HtmlElement.InsertAdjacentElement"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/10.0/insertadjacentelement-orientation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Renamed parameter in HtmlElement.InsertAdjacentElement

`System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation,System.Windows.Forms.HtmlElement)` parameter `orient` was renamed to `orientation`.

## Previous behavior

Previously, calls to `System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation,System.Windows.Forms.HtmlElement)` included the `orient` parameter:

```csharp
element.InsertAdjacentElement(orient: HtmlElementInsertionOrientation.AfterEnd, newElement);
```

## New behavior

The new parameter name is `orientation`.

```csharp
element.InsertAdjacentElement(orientation: HtmlElementInsertionOrientation.AfterEnd, newElement);
```

## Version introduced

.NET 10

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The parameter name was changed to provide a more descriptive name.

## Recommended action

Edit any calls with a named argument to use the new parameter name or remove the parameter name:

```csharp
element.InsertAdjacentElement(orientation: HtmlElementInsertionOrientation.AfterEnd, newElement);
```

```csharp
element.InsertAdjacentElement(HtmlElementInsertionOrientation.AfterEnd, newElement);
```

## Affected APIs

- `System.Windows.Forms.HtmlElement.InsertAdjacentElement(System.Windows.Forms.HtmlElementInsertionOrientation,System.Windows.Forms.HtmlElement)`
