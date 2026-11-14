---
title: "XmlNamespaceManager class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNamespaceManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNamespaceManager class (part 2 of 2)

## XmlNamespaceManager.PopScope() method

```csharp
public virtual bool PopScope ();
```

Pops a namespace scope off the stack.

Returns: `true` if there are namespace scopes left on the stack; `false` if there are no more namespaces to pop.

#### Remarks
When you call this method, all namespaces which were added to `XmlNamespaceManager` (by calling `XmlNamespaceManager.AddNamespace`) since the last call to `XmlNamespaceManager.PopScope` are removed.

#### Examples
The following example adds prefix/namespace pairs to the `XmlNamespaceManager` and then displays all the pairs in the collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamespaceManager/LookupNamespace/source.cs._

## XmlNamespaceManager.PushScope() method

```csharp
public virtual void PushScope ();
```

Pushes a namespace scope onto the stack.

#### Remarks
After a call to this method, all namespaces, which are added to `XmlNamespaceManager` (by calling `XmlNamespaceManager.AddNamespace`), belong to the pushed namespace scope.

#### Examples
The following example adds prefix/namespace pairs to the `XmlNamespaceManager` and then displays all the pairs in the collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamespaceManager/LookupNamespace/source.cs._

## XmlNamespaceManager.RemoveNamespace(String, String) method

```csharp
public virtual void RemoveNamespace (string prefix, string uri);
```

Removes the given namespace for the given prefix.

Parameters:

- `prefix`: The prefix for the namespace.
- `uri`: The namespace to remove for the given prefix. The namespace removed is from the current namespace scope. Namespaces outside the current scope are ignored.

Exceptions:

- `ArgumentNullException`: The value of `prefix` or `uri` is `null`.

To be added.
