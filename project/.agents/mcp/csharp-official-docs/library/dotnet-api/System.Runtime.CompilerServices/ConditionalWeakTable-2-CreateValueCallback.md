---
title: "ConditionalWeakTable<TKey,TValue>+CreateValueCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ConditionalWeakTable`2+CreateValueCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConditionalWeakTable<TKey,TValue>+CreateValueCallback delegate

Namespace: `System.Runtime.CompilerServices`

```csharp
public delegate TValue ConditionalWeakTable<TKey,TValue>.CreateValueCallback(TKey key) where TKey : class where TValue : class;
```

Represents a method that creates a non-default value to add as part of a key/value pair to a `ConditionalWeakTable<T1,T2>` object.

Parameters:

- `key`: The key that belongs to the value to create.

Returns: An instance of a reference type that represents the value to attach to the specified key.

#### Remarks
The `CreateValueCallback` delegate encapsulates a callback method that is invoked by the `ConditionalWeakTable<T1,T2>.GetValue` method when the key <example-value> to the method is not found in the `ConditionalWeakTable<T1,T2>` object. The `ConditionalWeakTable<T1,T2>.GetValue` method passes the callback method the key that represents a managed object to which a property value is to be dynamically attached. The method is responsible for returning the property value to its caller, which, in turn, adds the key/value pair to the table.

The `CreateValueCallback` method is used to return an instance of a reference type that can be attached to the specified key. It enables that instance to be initialized using non-default values. If the key is not found in the table, the `ConditionalWeakTable<T1,T2>.GetOrCreateValue` method adds a key/value pair in which the value is initialized using default values.

#### Examples
The following example defines a `MainClass` class and a `MainInfo` class. `MainInfo` provides information about the `MainClass` instance. It also defines a static (`Shared` in Visual Basic) `CreateAttachedValue` method that can be assigned to the `CreateValueCallback` delegate and passed to the `ConditionalWeakTable<T1,T2>.GetValue` method. The example calls the `ConditionalWeakTable<T1,T2>.GetValue` method to add a `MainClass` object and its corresponding `MainInfo` object to a `ConditionalWeakTable<T1,T2>` table. The example also illustrates calls to the `ConditionalWeakTable<T1,T2>.Add` and `ConditionalWeakTable<T1,T2>.GetOrCreateValue` methods to add key/value pairs to the table, and a call to the `ConditionalWeakTable<T1,T2>.TryGetValue` method to retrieve the value that belongs to an existing key.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/ConditionalWeakTableTKey,TValue+CreateValueCallback/Overview/getvalue1.cs._
