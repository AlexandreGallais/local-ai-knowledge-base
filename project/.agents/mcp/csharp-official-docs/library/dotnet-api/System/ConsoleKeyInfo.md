---
title: "ConsoleKeyInfo struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ConsoleKeyInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleKeyInfo struct

Namespace: `System`

```csharp
public readonly struct ConsoleKeyInfo : IEquatable<ConsoleKeyInfo>
```

Describes the console key that was pressed, including the character represented by the console key and the state of the SHIFT, ALT, and CTRL modifier keys.

#### Remarks
The `ConsoleKeyInfo` type is not intended to be created by users. Instead, it is returned to the user in response to calling the `Console.ReadKey` method.

The `ConsoleKeyInfo` object describes the `ConsoleKey` constant and Unicode character, if any, that correspond to the pressed console key. The `ConsoleKeyInfo` object also describes, in a bitwise combination of `ConsoleModifiers` values, whether one or more SHIFT, ALT, or CTRL modifier keys was pressed simultaneously with the console key.

#### Examples
The following example demonstrates using a `ConsoleKeyInfo` object in a read operation.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/rk.cs._

## ConsoleKeyInfo.ConsoleKeyInfo(Char, ConsoleKey, Boolean, Boolean, Boolean) constructor

```csharp
public ConsoleKeyInfo (char keyChar, ConsoleKey key, bool shift, bool alt, bool control);
```

Initializes a new instance of the `ConsoleKeyInfo` structure using the specified character, console key, and modifier keys.

Parameters:

- `keyChar`: The Unicode character that corresponds to the `key` parameter.
- `key`: The console key that corresponds to the `keyChar` parameter.
- `shift`: `true` to indicate that a SHIFT key was pressed; otherwise, `false`.
- `alt`: `true` to indicate that an ALT key was pressed; otherwise, `false`.
- `control`: `true` to indicate that a CTRL key was pressed; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: The numeric value of the `key` parameter is less than 0 or greater than 255.

#### Remarks
This type is not intended to be created by users. Instead, it is returned to the user in response to calling the `Console.ReadKey` method.

The `ConsoleKeyInfo` type does not specify whether the left or right SHIFT, ALT, or CTRL modifier key was pressed.

## ConsoleKeyInfo.Key <example-value>

```csharp
public ConsoleKey Key { get; }
```

Gets the console key <example-value> by the current `ConsoleKeyInfo` object.

Returns: A value that identifies the console key that was pressed.

#### Examples
The following example demonstrates using a `Key` property in a read operation.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/rk.cs._

## ConsoleKeyInfo.KeyChar property

```csharp
public char KeyChar { get; }
```

Gets the Unicode character represented by the current `ConsoleKeyInfo` object.

Returns: An object that corresponds to the console key <example-value> by the current `ConsoleKeyInfo` object.

#### Remarks
If the key <example-value> does not map to a Unicode character (for example, if the user presses the **F1** key or the **Home** key), the value of the `KeyChar` property is \U0000.

#### Examples
The following example uses the `KeyChar` property to add the characters input by the user into a string. The example ignores special keys other than **ENTER**, **ESC**, and **BACKSPACE**.

_Code sample not included: ~/snippets/csharp/System/ConsoleKeyInfo/KeyChar/keychar1.cs._

## ConsoleKeyInfo.Modifiers property

```csharp
public ConsoleModifiers Modifiers { get; }
```

Gets a bitwise combination of `ConsoleModifiers` values that specifies one or more modifier keys pressed simultaneously with the console key.

Returns: A bitwise combination of the enumeration values. There is no default value.

#### Examples
The following example demonstrates using a `Modifiers` property in a read operation.

_Code sample not included: ~/snippets/csharp/System/Console/ReadKey/rk.cs._

## ConsoleKeyInfo.Equals(ConsoleKeyInfo) method

```csharp
public bool Equals (ConsoleKeyInfo obj);
```

Gets a value indicating whether the specified `ConsoleKeyInfo` object is equal to the current `ConsoleKeyInfo` object.

Parameters:

- `obj`: An object to compare to the current `ConsoleKeyInfo` object.

Returns: `true` if `obj` is equal to the current `ConsoleKeyInfo` object; otherwise, `false`.

#### Remarks
Two `ConsoleKeyInfo` objects are equal if their corresponding `ConsoleKeyInfo.KeyChar`, `ConsoleKeyInfo.Key`, and `ConsoleKeyInfo.Modifiers` properties are equal.

The `ConsoleKeyInfo.Equals` method performs slightly better than the `Equals` method because it does not have to convert `obj` to an object.

## ConsoleKeyInfo.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Gets a value indicating whether the specified object is equal to the current `ConsoleKeyInfo` object.

Parameters:

- `value`: An object to compare to the current `ConsoleKeyInfo` object.

Returns: `true` if `value` is a `ConsoleKeyInfo` object and is equal to the current `ConsoleKeyInfo` object; otherwise, `false`.

#### Remarks
Two `ConsoleKeyInfo` objects are equal if their corresponding `ConsoleKeyInfo.KeyChar`, `ConsoleKeyInfo.Key`, and `ConsoleKeyInfo.Modifiers` properties are equal.

#### Examples
The following example demonstrates the `ConsoleKeyInfo.Equals` method.

_Code sample not included: ~/snippets/csharp/System/ConsoleKeyInfo/Equals/equals.cs._

## ConsoleKeyInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `ConsoleKeyInfo` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
The value returned by the `ConsoleKeyInfo.GetHashCode` method is not suitable for distinguishing one `ConsoleKeyInfo` object from another. If your application needs a unique hash code, override the `ConsoleKeyInfo.GetHashCode` method with your own method.

#### Examples
The following example demonstrates the `ConsoleKeyInfo.GetHashCode` method.

_Code sample not included: ~/snippets/csharp/System/ConsoleKeyInfo/GetHashCode/hash.cs._

## ConsoleKeyInfo.op_Equality(ConsoleKeyInfo, ConsoleKeyInfo) method

```csharp
public static bool operator == (ConsoleKeyInfo a, ConsoleKeyInfo b);
```

Indicates whether the specified `ConsoleKeyInfo` objects are equal.

Parameters:

- `a`: The first object to compare.
- `b`: The second object to compare.

Returns: `true` if `a` is equal to `b`; otherwise, `false`.

#### Remarks
Two `ConsoleKeyInfo` objects are equal if their corresponding `ConsoleKeyInfo.KeyChar`, `ConsoleKeyInfo.Key`, and `ConsoleKeyInfo.Modifiers` properties are equal.

The equivalent method for this operator is `Equals`.

## ConsoleKeyInfo.op_Inequality(ConsoleKeyInfo, ConsoleKeyInfo) method

```csharp
public static bool operator != (ConsoleKeyInfo a, ConsoleKeyInfo b);
```

Indicates whether the specified `ConsoleKeyInfo` objects are not equal.

Parameters:

- `a`: The first object to compare.
- `b`: The second object to compare.

Returns: `true` if `a` is not equal to `b`; otherwise, `false`.

#### Remarks
Two `ConsoleKeyInfo` objects are equal if their corresponding `ConsoleKeyInfo.KeyChar`, `ConsoleKeyInfo.Key`, and `ConsoleKeyInfo.Modifiers` properties are equal.
