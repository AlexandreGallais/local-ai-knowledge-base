---
title: "ConsoleColor enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ConsoleColor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleColor enum

Namespace: `System`

```csharp
public enum ConsoleColor
```

Specifies constants that define foreground and background colors for the console.

#### Examples
The following example saves the values of the `ConsoleColor` enumeration to an array and stores the current values of the `Console.BackgroundColor` and `Console.ForegroundColor` properties to variables. It then changes the foreground color to each color in the `ConsoleColor` enumeration except to the color that matches the current background, and it changes the background color to each color in the `ConsoleColor` enumeration except to the color that matches the current foreground. (If the foreground color is the same as the background color, the text isn't visible.) Finally, it calls the `Console.ResetColor` method to restore the original console colors.

_Code sample not included: ~/snippets/csharp/System/Console/BackgroundColor/foregroundcolor3.cs._

## ConsoleColor.Black field

```csharp
Black
```

The color black.

## ConsoleColor.Blue field

```csharp
Blue
```

The color blue.

## ConsoleColor.Cyan field

```csharp
Cyan
```

The color cyan (blue-green).

## ConsoleColor.DarkBlue field

```csharp
DarkBlue
```

The color dark blue.

## ConsoleColor.DarkCyan field

```csharp
DarkCyan
```

The color dark cyan (dark blue-green).

## ConsoleColor.DarkGray field

```csharp
DarkGray
```

The color dark gray.

## ConsoleColor.DarkGreen field

```csharp
DarkGreen
```

The color dark green.

## ConsoleColor.DarkMagenta field

```csharp
DarkMagenta
```

The color dark magenta (dark purplish-red).

## ConsoleColor.DarkRed field

```csharp
DarkRed
```

The color dark red.

## ConsoleColor.DarkYellow field

```csharp
DarkYellow
```

The color dark yellow (ochre).

## ConsoleColor.Gray field

```csharp
Gray
```

The color gray.

## ConsoleColor.Green field

```csharp
Green
```

The color green.

## ConsoleColor.Magenta field

```csharp
Magenta
```

The color magenta (purplish-red).

## ConsoleColor.Red field

```csharp
Red
```

The color red.

## ConsoleColor.White field

```csharp
White
```

The color white.

## ConsoleColor.Yellow field

```csharp
Yellow
```

The color yellow.
