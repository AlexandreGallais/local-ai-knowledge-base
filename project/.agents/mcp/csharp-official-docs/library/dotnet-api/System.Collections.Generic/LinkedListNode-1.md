---
title: "LinkedListNode<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/LinkedListNode`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LinkedListNode<T> class

Namespace: `System.Collections.Generic`

```csharp
public sealed class LinkedListNode<T>
```

Represents a node in a `LinkedList<T>`. This class cannot be inherited.

Parameters:

- `T`: Specifies the element type of the linked list.

#### Remarks
Each element of the `LinkedList<T>` collection is a `LinkedListNode<T>`.  The `LinkedListNode<T>` contains a value, a reference to the `LinkedList<T>` that it belongs to, a reference to the next node, and a reference to the previous node.

#### Examples
The following code example creates a `LinkedListNode<T>`, adds it to a `LinkedList<T>`, and tracks the values of its properties as the `LinkedList<T>` changes.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListNodeT/Overview/llnctor.cs._

## LinkedListNode<T>.LinkedListNode(T) constructor

```csharp
public LinkedListNode (T value);
```

Initializes a new instance of the `LinkedListNode<T>` class, containing the specified value.

Parameters:

- `value`: The value to contain in the `LinkedListNode<T>`.

#### Remarks
The `LinkedListNode<T>.List`, `LinkedListNode<T>.Next`, and `LinkedListNode<T>.Previous` properties are set to `null`.

#### Examples
The following code example creates a `LinkedListNode<T>`, adds it to a `LinkedList<T>`, and tracks the values of its properties as the `LinkedList<T>` changes.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListNodeT/Overview/llnctor.cs._

## LinkedListNode<T>.List property

```csharp
public System.Collections.Generic.LinkedList<T>? List { get; }
```

Gets the `LinkedList<T>` that the `LinkedListNode<T>` belongs to.

Returns: A reference to the `LinkedList<T>` that the `LinkedListNode<T>` belongs to, or `null` if the `LinkedListNode<T>` is not linked.

#### Examples
The following code example creates a `LinkedListNode<T>`, adds it to a `LinkedList<T>`, and tracks the values of its properties as the `LinkedList<T>` changes.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListNodeT/Overview/llnctor.cs._

## LinkedListNode<T>.Next property

```csharp
public System.Collections.Generic.LinkedListNode<T>? Next { get; }
```

Gets the next node in the `LinkedList<T>`.

Returns: A reference to the next node in the `LinkedList<T>`, or `null` if the current node is the last element (`LinkedList<T>.Last`) of the `LinkedList<T>`.

#### Examples
The following code example creates a `LinkedListNode<T>`, adds it to a `LinkedList<T>`, and tracks the values of its properties as the `LinkedList<T>` changes.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListNodeT/Overview/llnctor.cs._

## LinkedListNode<T>.Previous property

```csharp
public System.Collections.Generic.LinkedListNode<T>? Previous { get; }
```

Gets the previous node in the `LinkedList<T>`.

Returns: A reference to the previous node in the `LinkedList<T>`, or `null` if the current node is the first element (`LinkedList<T>.First`) of the `LinkedList<T>`.

#### Examples
The following code example creates a `LinkedListNode<T>`, adds it to a `LinkedList<T>`, and tracks the values of its properties as the `LinkedList<T>` changes.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListNodeT/Overview/llnctor.cs._

## LinkedListNode<T>.Value property

```csharp
public T Value { get; set; }
```

Gets the value contained in the node.

Returns: The value contained in the node.

#### Remarks
This property is set in the `LinkedListNode<T>.%23ctor`.

#### Examples
The following code example creates a `LinkedListNode<T>`, adds it to a `LinkedList<T>`, and tracks the values of its properties as the `LinkedList<T>` changes.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/LinkedListNodeT/Overview/llnctor.cs._

## LinkedListNode<T>.ValueRef property

```csharp
public ref T ValueRef { get; }
```

Gets a reference to the value held by the node.

Returns: A reference to the value held by the node.

To be added.
