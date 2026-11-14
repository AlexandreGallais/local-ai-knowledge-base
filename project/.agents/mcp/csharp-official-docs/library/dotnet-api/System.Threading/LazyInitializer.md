---
title: "LazyInitializer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/LazyInitializer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LazyInitializer class

Namespace: `System.Threading`

```csharp
public static class LazyInitializer
```

Provides lazy initialization routines.

#### Remarks
These routines avoid needing to allocate a dedicated, lazy-initialization instance, instead using references to ensure targets have been initialized as they are accessed.

#### Examples
The following example demonstrates how to use EnsureInitialized to lazily initialize a value using a Boolean value to track whether initialization has already happened and an object to use as the mutual exclusion lock.

```vb
Dim _data As ExpensiveData = Nothing  
Dim _dataInitialized As Boolean = False  
Dim _dataLock As Object = Nothing  
'    ...  
Dim name = LazyInitializer.EnsureInitialized(_data, _dataInitialized, _dataLock)  
```  

```csharp
ExpensiveData _data = null;  
bool _dataInitialized = false;  
object _dataLock = new object();  

//  ...  
  
ExpensiveData dataToUse = LazyInitializer.EnsureInitialized(ref _data, ref _dataInitialized, ref _dataLock);  
```

## LazyInitializer.EnsureInitialized<T>(T) method

```csharp
public static T EnsureInitialized<T> (ref T? target) where T : class;
```

Initializes a target reference type with the type's parameterless constructor if it hasn't already been initialized.

Parameters:

- `T`: The type of the reference to be initialized.
- `target`: A reference to initialize if it has not already been initialized. If it is `null`, it is considered not initialized; otherwise, it's considered initialized.

Returns: The initialized object.

Exceptions:

- `MemberAccessException`: Permissions to access the constructor of type `T` were missing.
- `MissingMemberException`: Type `T` does not have a parameterless constructor.

#### Remarks
This method may only be used on reference types. To ensure initialization of value types, see other overloads of `EnsureInitialized`.

This method may be used concurrently by multiple threads to initialize `target`.

In the event that multiple threads access this method concurrently, multiple instances of `T` may be created, but only one will be stored into `target` and returned. In such an occurrence, this method will not dispose of the objects that were not stored. If such objects must be disposed, use an overload that takes a `valueFactory` and dispose of the object if it does not reference the same stored object.

## LazyInitializer.EnsureInitialized<T>(T, Func<T>) method

```csharp
public static T EnsureInitialized<T> (ref T? target, Func<T> valueFactory) where T : class;
```

Initializes a target reference type by using a specified function if it hasn't already been initialized.

Parameters:

- `T`: The type of the reference to be initialized.
- `target`: The reference to initialize if it hasn't already been initialized.
- `valueFactory`: The function that is called to initialize the reference.

Returns: The initialized object.

Exceptions:

- `MissingMemberException`: Type `T` does not have a parameterless constructor.
- `InvalidOperationException`: `valueFactory` returned null (Nothing in Visual Basic).

#### Remarks
This method may only be used on reference types, and `valueFactory` may not return a null reference (Nothing in Visual Basic). To ensure initialization of value types or to allow null reference types, see other overloads of EnsureInitialized.

This method may be used concurrently by multiple threads to initialize `target`.

In the event that multiple threads access this method concurrently, multiple instances of `T` may be created, but only one will be stored into `target`. In such an occurrence, this method will not dispose of the objects that were not stored. If such objects must be disposed, it is up to the caller to determine if an object was not used and to then dispose of the object appropriately.

## LazyInitializer.EnsureInitialized<T>(T, Boolean, Object) method

```csharp
public static T EnsureInitialized<T> (ref T target, ref bool initialized, ref object? syncLock);
```

Initializes a target reference or value type with its parameterless constructor if it hasn't already been initialized.

Parameters:

- `T`: The type of the reference to be initialized.
- `target`: A reference or value of type `T` to initialize if it hasn't already been initialized.
- `initialized`: A reference to a Boolean value that determines whether the target has already been initialized.
- `syncLock`: A reference to an object used as the mutually exclusive lock for initializing `target`. If `syncLock` is `null`, a new object will be instantiated.

Returns: The initialized object.

Exceptions:

- `MemberAccessException`: Permissions to access the constructor of type `T` were missing.
- `MissingMemberException`: Type `T` does not have a parameterless constructor.

#### Remarks
If `initialized` is specified as true, then no further initialization occurs.

## LazyInitializer.EnsureInitialized<T>(T, Object, Func<T>) method

```csharp
public static T EnsureInitialized<T> (ref T? target, ref object? syncLock, Func<T> valueFactory) where T : class;
```

Initializes a target reference type with a specified function if it has not already been initialized.

Parameters:

- `T`: The type of the reference to be initialized.
- `target`: A reference to initialize if it has not already been initialized. If it is `null`, it is considered not initialized; otherwise, it's considered initialized.
- `syncLock`: A reference to an object used as the mutually exclusive lock for initializing
`target`. If `syncLock` is `null`, a new object will be instantiated.
- `valueFactory`: The method to invoke to initialize `target`.

Returns: The initialized object.

To be added.

## LazyInitializer.EnsureInitialized<T>(T, Boolean, Object, Func<T>) method

```csharp
public static T EnsureInitialized<T> (ref T target, ref bool initialized, ref object? syncLock, Func<T> valueFactory);
```

Initializes a target reference or value type by using a specified function if it hasn't already been initialized.

Parameters:

- `T`: The type of the reference to be initialized.
- `target`: A reference or value of type `T` to initialize if it hasn't already been initialized.
- `initialized`: A reference to a Boolean value that determines whether the target has already been initialized.
- `syncLock`: A reference to an object used as the mutually exclusive lock for initializing `target`. If `syncLock` is `null`, a new object will be instantiated.
- `valueFactory`: The function that is called to initialize the reference or value.

Returns: The initialized object.

Exceptions:

- `MemberAccessException`: Permissions to access the constructor of type `T` were missing.
- `MissingMemberException`: Type `T` does not have a parameterless constructor.

#### Remarks
If `initialized` is specified as true, then no further initialization occurs.
