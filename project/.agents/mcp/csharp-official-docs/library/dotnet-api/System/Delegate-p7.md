---
title: "Delegate class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Delegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Delegate class (part 7 of 7)

## Delegate.Remove(Delegate, Delegate) method

```csharp
public static Delegate? Remove (Delegate? source, Delegate? value);
```

Removes the last occurrence of the invocation list of a delegate from the invocation list of another delegate.

Parameters:

- `source`: The delegate from which to remove the invocation list of `value`.
- `value`: The delegate that supplies the invocation list to remove from the invocation list of `source`.

Returns: A new delegate with an invocation list formed by taking the invocation list of `source` and removing the last occurrence of the invocation list of `value`, if the invocation list of `value` is found within the invocation list of `source`. Returns `source` if `value` is `null` or if the invocation list of `value` is not found within the invocation list of `source`. Returns a null reference if the invocation list of `value` is equal to the invocation list of `source` or if `source` is a null reference.

Exceptions:

- `ArgumentException`: The delegate types do not match.
- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

#### Remarks
If the invocation list of `value` matches a contiguous set of elements in the invocation list of `source`, then the invocation list of `value` is said to occur within the invocation list of `source`. If the invocation list of `value` occurs more than once in the invocation list of `source`, the last occurrence is removed.

## Delegate.RemoveAll(Delegate, Delegate) method

```csharp
public static Delegate? RemoveAll (Delegate? source, Delegate? value);
```

Removes all occurrences of the invocation list of a delegate from the invocation list of another delegate.

Parameters:

- `source`: The delegate from which to remove the invocation list of `value`.
- `value`: The delegate that supplies the invocation list to remove from the invocation list of `source`.

Returns: A new delegate with an invocation list formed by taking the invocation list of `source` and removing all occurrences of the invocation list of `value`, if the invocation list of `value` is found within the invocation list of `source`. Returns `source` if `value` is `null` or if the invocation list of `value` is not found within the invocation list of `source`. Returns a null reference if the invocation list of `value` is equal to the invocation list of `source`, if `source` contains only a series of invocation lists that are equal to the invocation list of `value`, or if `source` is a null reference.

Exceptions:

- `ArgumentException`: The delegate types do not match.
- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

#### Remarks
If the invocation list of `value` matches a contiguous set of elements in the invocation list of `source`, then the invocation list of `value` is said to occur within the invocation list of `source`. If the invocation list of `value` occurs more than once in the invocation list of `source`, all occurrences are removed.

## Delegate.RemoveImpl(Delegate) method

```csharp
protected virtual Delegate? RemoveImpl (Delegate d);
```

Removes the invocation list of a delegate from the invocation list of another delegate.

Parameters:

- `d`: The delegate that supplies the invocation list to remove from the invocation list of the current delegate.

Returns: A new delegate with an invocation list formed by taking the invocation list of the current delegate and removing the invocation list of `d`, if the invocation list of `d` is found within the current delegate's invocation list. Returns the current delegate if `d` is `null` or if the invocation list of `d` is not found within the current delegate's invocation list. Returns `null` if the invocation list of `d` is equal to the current delegate's invocation list.

Exceptions:

- `MemberAccessException`: The caller does not have access to the method represented by the delegate (for example, if the method is private).

#### Remarks
If the invocation list of `value` matches a contiguous set of elements in the current delegate's invocation list, then the invocation list of `value` is said to occur within the current delegate's invocation list. If the invocation list of `value` occurs more than once in the current delegate's invocation list, the last occurrence is removed.
