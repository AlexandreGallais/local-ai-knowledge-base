---
title: "TextEncoderSettings class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Encodings.Web/TextEncoderSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextEncoderSettings class

Namespace: `System.Text.Encodings.Web`

```csharp
public class TextEncoderSettings
```

Represents a filter that allows only certain Unicode code points.

#### Remarks
The source code for this type is available in the System.Text.Encodings.Web project on GitHub. Unit tests that can also serve as code examples are found in the System.Text.Encodings.Web/tests folder on GitHub.

## TextEncoderSettings.TextEncoderSettings() constructor

```csharp
public TextEncoderSettings ();
```

Instantiates an empty filter (allows no code points through by default).

## TextEncoderSettings.TextEncoderSettings(TextEncoderSettings) constructor

```csharp
public TextEncoderSettings (System.Text.Encodings.Web.TextEncoderSettings other);
```

Instantiates a filter by cloning the allowed list of another `TextEncoderSettings` object.

Parameters:

- `other`: The other `TextEncoderSettings` object to be cloned.

## TextEncoderSettings.TextEncoderSettings(UnicodeRange[]) constructor

```csharp
public TextEncoderSettings (params System.Text.Unicode.UnicodeRange[] allowedRanges);
```

Instantiates a filter where only the character ranges specified by `allowedRanges` are allowed by the filter.

Parameters:

- `allowedRanges`: The allowed character ranges.

Exceptions:

- `ArgumentNullException`: `allowedRanges` is `null`.

## TextEncoderSettings.AllowCharacter(Char) method

```csharp
public virtual void AllowCharacter (char character);
```

Allows the character specified by `character` through the filter.

Parameters:

- `character`: The allowed character.

## TextEncoderSettings.AllowCharacters(Char[]) method

```csharp
public virtual void AllowCharacters (params char[] characters);
```

Allows all characters specified by `characters` through the filter.

Parameters:

- `characters`: The allowed characters.

Exceptions:

- `ArgumentNullException`: `characters` is `null`.

## TextEncoderSettings.AllowCodePoints(Int32>) method

```csharp
public virtual void AllowCodePoints (System.Collections.Generic.IEnumerable<int> codePoints);
```

Allows all code points specified by `codePoints`.

Parameters:

- `codePoints`: The allowed code points.

Exceptions:

- `ArgumentNullException`: `codePoints` is `null`.

## TextEncoderSettings.AllowRange(UnicodeRange) method

```csharp
public virtual void AllowRange (System.Text.Unicode.UnicodeRange range);
```

Allows all characters specified by `range` through the filter.

Parameters:

- `range`: The range of characters to be allowed.

Exceptions:

- `ArgumentNullException`: `range` is `null`.

## TextEncoderSettings.AllowRanges(UnicodeRange[]) method

```csharp
public virtual void AllowRanges (params System.Text.Unicode.UnicodeRange[] ranges);
```

Allows all characters specified by `ranges` through the filter.

Parameters:

- `ranges`: The ranges of characters to be allowed.

Exceptions:

- `ArgumentNullException`: `ranges` is `null`.

## TextEncoderSettings.Clear() method

```csharp
public virtual void Clear ();
```

Resets this object by disallowing all characters.

## TextEncoderSettings.ForbidCharacter(Char) method

```csharp
public virtual void ForbidCharacter (char character);
```

Disallows the character `character` through the filter.

Parameters:

- `character`: The disallowed character.

## TextEncoderSettings.ForbidCharacters(Char[]) method

```csharp
public virtual void ForbidCharacters (params char[] characters);
```

Disallows all characters specified by `characters` through the filter.

Parameters:

- `characters`: The disallowed characters.

Exceptions:

- `ArgumentNullException`: `characters` is `null`.

## TextEncoderSettings.ForbidRange(UnicodeRange) method

```csharp
public virtual void ForbidRange (System.Text.Unicode.UnicodeRange range);
```

Disallows all characters specified by `range` through the filter.

Parameters:

- `range`: The range of characters to be disallowed.

Exceptions:

- `ArgumentNullException`: `range` is `null`.

## TextEncoderSettings.ForbidRanges(UnicodeRange[]) method

```csharp
public virtual void ForbidRanges (params System.Text.Unicode.UnicodeRange[] ranges);
```

Disallows all characters specified by `ranges` through the filter.

Parameters:

- `ranges`: The ranges of characters to be disallowed.

Exceptions:

- `ArgumentNullException`: `ranges` is `null`.

## TextEncoderSettings.GetAllowedCodePoints() method

```csharp
public virtual System.Collections.Generic.IEnumerable<int> GetAllowedCodePoints ();
```

Gets an enumerator of all allowed code points.

Returns: The enumerator of allowed code points.
