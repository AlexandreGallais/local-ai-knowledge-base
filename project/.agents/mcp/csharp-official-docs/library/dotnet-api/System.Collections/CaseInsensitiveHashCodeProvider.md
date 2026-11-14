---
title: "CaseInsensitiveHashCodeProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/CaseInsensitiveHashCodeProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CaseInsensitiveHashCodeProvider class

Namespace: `System.Collections`

```csharp
public class CaseInsensitiveHashCodeProvider : System.Collections.IHashCodeProvider
```

Supplies a hash code for an object, using a hashing algorithm that ignores the case of strings.

To be added.

## CaseInsensitiveHashCodeProvider.CaseInsensitiveHashCodeProvider() constructor

```csharp
public CaseInsensitiveHashCodeProvider ();
```

Initializes a new instance of the `CaseInsensitiveHashCodeProvider` class using the `Thread.CurrentCulture` of the current thread.

#### Remarks
When the `CaseInsensitiveHashCodeProvider` instance is created using this constructor, the `Thread.CurrentCulture` of the current thread is saved. Comparison procedures use the saved culture to determine the casing rules; therefore, hash code comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

## CaseInsensitiveHashCodeProvider.CaseInsensitiveHashCodeProvider(CultureInfo) constructor

```csharp
public CaseInsensitiveHashCodeProvider (System.Globalization.CultureInfo culture);
```

Initializes a new instance of the `CaseInsensitiveHashCodeProvider` class using the specified `CultureInfo`.

Parameters:

- `culture`: The `CultureInfo` to use for the new `CaseInsensitiveHashCodeProvider`.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.

#### Remarks
Comparison procedures use the specified `CultureInfo` to determine the casing rules. Hash code comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

## CaseInsensitiveHashCodeProvider.Default property

```csharp
public static System.Collections.CaseInsensitiveHashCodeProvider Default { get; }
```

Gets an instance of `CaseInsensitiveHashCodeProvider` that is associated with the `Thread.CurrentCulture` of the current thread and that is always available.

Returns: An instance of `CaseInsensitiveHashCodeProvider` that is associated with the `Thread.CurrentCulture` of the current thread.

#### Remarks
When the `CaseInsensitiveHashCodeProvider` instance is created using the parameterless constructor, the `Thread.CurrentCulture` of the current thread is saved. Comparison procedures use the saved culture to determine the casing rules; therefore, hash code comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

## CaseInsensitiveHashCodeProvider.DefaultInvariant property

```csharp
public static System.Collections.CaseInsensitiveHashCodeProvider DefaultInvariant { get; }
```

Gets an instance of `CaseInsensitiveHashCodeProvider` that is associated with `CultureInfo.InvariantCulture` and that is always available.

Returns: An instance of `CaseInsensitiveHashCodeProvider` that is associated with `CultureInfo.InvariantCulture`.

#### Remarks
Comparison procedures use the `CultureInfo.InvariantCulture` to determine the casing rules. Hash code comparisons might have different results depending on the culture. For more information on culture-specific comparisons, see the `Globalization` namespace and Globalization and Localization.

## CaseInsensitiveHashCodeProvider.GetHashCode(Object) method

```csharp
public int GetHashCode (object obj);
```

Returns a hash code for the given object, using a hashing algorithm that ignores the case of strings.

Parameters:

- `obj`: The `Object` for which a hash code is to be returned.

Returns: A hash code for the given object, using a hashing algorithm that ignores the case of strings.

Exceptions:

- `ArgumentNullException`: `obj` is `null`.

#### Remarks
The return value from this method must not be persisted for two reasons. First, the hash function of a class might be altered to generate a better distribution, thereby rendering any values from the old hash function useless. Second, the default implementation of this class does not guarantee that the same value will be returned by different instances.
