---
title: "KeySizes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/KeySizes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeySizes class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class KeySizes
```

Determines the set of valid key sizes for the symmetric cryptographic algorithms.

#### Examples
The following example shows the use of members of the `KeySizes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/KeySizes/Overview/members.cs._

## KeySizes.KeySizes(Int32, Int32, Int32) constructor

```csharp
public KeySizes (int minSize, int maxSize, int skipSize);
```

Initializes a new instance of the `KeySizes` class with the specified key values.

Parameters:

- `minSize`: The minimum valid key size.
- `maxSize`: The maximum valid key size.
- `skipSize`: The interval between valid key sizes.

#### Examples
The following code shows the use of the `KeySizes.%23ctor` constructor. This code example is part of a larger example provided for the `KeySizes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/KeySizes/Overview/members.cs._

## KeySizes.MaxSize property

```csharp
public int MaxSize { get; }
```

Specifies the maximum key size.

Returns: The maximum key size.

#### Examples
The following code shows how to retrieve the use of the `MaxSize` property. This code example is part of a larger example provided for the `KeySizes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/KeySizes/Overview/members.cs._

## KeySizes.MinSize property

```csharp
public int MinSize { get; }
```

Specifies the minimum key size.

Returns: The minimum key size.

#### Examples
The following code shows how to retrieve the use of the `MinSize` property. This code example is part of a larger example provided for the `KeySizes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/KeySizes/Overview/members.cs._

## KeySizes.SkipSize property

```csharp
public int SkipSize { get; }
```

Specifies the interval between valid key sizes.

Returns: The interval between valid key sizes.

#### Examples
The following code shows how to retrieve the use of the `SkipSize` property. This code example is part of a larger example provided for the `KeySizes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/KeySizes/Overview/members.cs._
