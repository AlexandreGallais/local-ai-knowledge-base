---
title: "NewLineHandling enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/NewLineHandling.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NewLineHandling enum

Namespace: `System.Xml`

```csharp
public enum NewLineHandling
```

Specifies how to handle line breaks.

#### Remarks
This enumeration is passed to the `XmlWriter.Create` method to specify whether the `XmlWriter` object will normalize line breaks in the output.

See the `NewLineHandling` property to see a table detailing the behavior of each of the validation types.

## NewLineHandling.Entitize field

```csharp
Entitize
```

New line characters are entitized. This setting preserves all characters when the output is read by a normalizing `XmlReader`.

## NewLineHandling.None field

```csharp
None
```

The new line characters are unchanged. The output is the same as the input.

## NewLineHandling.Replace field

```csharp
Replace
```

New line characters are replaced to match the character specified in the `XmlWriterSettings.NewLineChars` property.
