---
title: "ArgIterator struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArgIterator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArgIterator struct

Namespace: `System`

```csharp
public ref struct ArgIterator
```

Represents a variable-length argument list; that is, the parameters of a function that takes a variable number of arguments.

#### Remarks
Developers who write compilers use the `ArgIterator` structure to enumerate the mandatory and optional arguments in an argument list. The `ArgIterator` structure is not generally useful for applications other than compilers.

The functionality in the `ArgIterator` structure is typically hidden in the syntax of a specific programming language. For example, in the C++ programming language you declare a variable-length argument list by specifying an ellipsis ("...") at the end of the argument list. The `ArgIterator` structure is useful primarily when a development language does not provide direct support for accessing variable-length parameters.

## ArgIterator.ArgIterator(RuntimeArgumentHandle) constructor

```csharp
public ArgIterator (RuntimeArgumentHandle arglist);
```

Initializes a new instance of the `ArgIterator` structure using the specified argument list.

Parameters:

- `arglist`: An argument list consisting of mandatory and optional arguments.

#### Remarks
The new `ArgIterator` object enumerates the argument list starting from the first optional argument.

## ArgIterator.ArgIterator(RuntimeArgumentHandle, Void*) constructor

```csharp
public ArgIterator (RuntimeArgumentHandle arglist, void* ptr);
```

Initializes a new instance of the `ArgIterator` structure using the specified argument list and a pointer to an item in the list.

Parameters:

- `arglist`: An argument list consisting of mandatory and optional arguments.
- `ptr`: A pointer to the argument in `arglist` to access first, or the first mandatory argument in `arglist` if `ptr` is `null`.

#### Remarks
The new `ArgIterator` object enumerates the argument list starting from the argument specified by `ptr`, or the first mandatory argument if `ptr` is `null`.

## ArgIterator.End() method

```csharp
public void End ();
```

Concludes processing of the variable-length argument list represented by this instance.

#### Remarks
Conceptually, `ArgIterator.End` concludes the processing of a variable-length argument list. However, this method has no actual implementation; the `ArgIterator.End` method body is empty. You can use this method in your code as a marker to indicate where variable-length argument list processing logically ends.

The `ArgIterator.End` method corresponds to the `va_end` method in the C standard library.

## ArgIterator.Equals(Object) method

```csharp
public override bool Equals (object? o);
```

This method is not supported, and always throws `NotSupportedException`.

Parameters:

- `o`: An object to be compared to this instance.

Returns: This comparison is not supported. No value is returned.

Exceptions:

- `NotSupportedException`: This method is not supported.

To be added.

## ArgIterator.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code of this object.

Returns: A 32-bit signed integer hash code.

To be added.

## ArgIterator.GetNextArg() method

```csharp
public TypedReference GetNextArg ();
```

Returns the next argument in a variable-length argument list.

Returns: The next argument as a `TypedReference` object.

Exceptions:

- `InvalidOperationException`: An attempt was made to read beyond the end of the list.

#### Remarks
The iterator is automatically advanced to the next argument.

## ArgIterator.GetNextArg(RuntimeTypeHandle) method

```csharp
public TypedReference GetNextArg (RuntimeTypeHandle rth);
```

Returns the next argument in a variable-length argument list that has a specified type.

Parameters:

- `rth`: A runtime type handle that identifies the type of the argument to retrieve.

Returns: The next argument as a `TypedReference` object.

Exceptions:

- `InvalidOperationException`: An attempt was made to read beyond the end of the list.
- `ArgumentNullException`: The pointer to the remaining arguments is zero.

#### Remarks
The iterator is automatically advanced to the next argument.

## ArgIterator.GetNextArgType() method

```csharp
public RuntimeTypeHandle GetNextArgType ();
```

Returns the type of the next argument.

Returns: The type of the next argument.

#### Remarks
This method does not advance the iterator to the next argument.

`ArgIterator.GetNextArgType` returns the type of the argument as specified in the calling function. For example, if an argument is type `String`, but the calling function specifies the argument as type `Object`, `ArgIterator.GetNextArgType` reports the argument as type `Object`.

## ArgIterator.GetRemainingCount() method

```csharp
public int GetRemainingCount ();
```

Returns the number of arguments remaining in the argument list.

Returns: The number of remaining arguments.

To be added.
