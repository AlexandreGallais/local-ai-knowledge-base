---
title: "IXmlNamespaceResolver interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IXmlNamespaceResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlNamespaceResolver interface

Namespace: `System.Xml`

```csharp
public interface IXmlNamespaceResolver
```

Provides read-only access to a set of prefix and namespace mappings.

To be added.

## IXmlNamespaceResolver.GetNamespacesInScope(XmlNamespaceScope) method

```csharp
public System.Collections.Generic.IDictionary<string,string> GetNamespacesInScope (System.Xml.XmlNamespaceScope scope);
```

Gets a collection of defined prefix-namespace mappings that are currently in scope.

Parameters:

- `scope`: An `XmlNamespaceScope` value that specifies the type of namespace nodes to return.

Returns: An `IDictionary` that contains the current in-scope namespaces.

#### Remarks
The collection is keyed by prefix and can be used to enumerate the namespaces currently in scope. The collection is a disconnected copy of the current namespace list.

The following table lists the `XmlNamespaceScope` values and how it affects the whether or not the default and built-in namespaces are returned by the `IXmlNamespaceResolver.GetNamespacesInScope` method.

|XmlNamespaceScope value|xmlns:xml|xmlns:xmlns|xmlns=""|
|-----------------------------|---------------|-----------------|---------------|
|`All`|yes|no|no|
|`ExcludeXml`|no|no|no|
|`Local`|no|no|yes|

## IXmlNamespaceResolver.LookupNamespace(String) method

```csharp
public string? LookupNamespace (string prefix);
```

Gets the namespace URI mapped to the specified prefix.

Parameters:

- `prefix`: The prefix whose namespace URI you wish to find.

Returns: The namespace URI that is mapped to the prefix; `null` if the prefix is not mapped to a namespace URI.

#### Remarks

> **Note:**
> Namespace URI-to-prefix mappings can change from node to node in an XML document. You cannot depend on the result of a lookup being consistent from one node to the next.

The following table describes how the default and built-in namespaces are handled by the `IXmlNamespaceResolver.LookupNamespace` method.

|Prefix|Return Value|
|------------|------------------|
|xml|http://www.w3.org/XML/1998/namespace|
|xmlns|http://www.w3.org/2000/xmlns/|
|`String.Empty` (A default namespace has been assigned).|The currently assigned default namespace.|
|`String.Empty` (The default namespace has not been explicitly assigned).|`String.Empty` (The blank prefix is associated with elements that are not in any namespace).|

## IXmlNamespaceResolver.LookupPrefix(String) method

```csharp
public string? LookupPrefix (string namespaceName);
```

Gets the prefix that is mapped to the specified namespace URI.

Parameters:

- `namespaceName`: The namespace URI whose prefix you wish to find.

Returns: The prefix that is mapped to the namespace URI; `null` if the namespace URI is not mapped to a prefix.

#### Remarks
It is possible for a namespace URI to be mapped to multiple prefixes. Because the prefixes are not mapped in a predictable manner, you should not depend on getting back a particular prefix when a namespace URI is mapped to more than one prefix.

> **Note:**
> Namespace URI to prefix mappings can change from node to node in an XML document. You cannot depend on the result of a lookup being consistent from one node to the next.

The following table describes how the default and built-in namespaces are handled by the `IXmlNamespaceResolver.LookupPrefix` method.

|Namespace|Return value|
|---------------|------------------|
|http://www.w3.org/XML/1998/namespace|xml|
|http://www.w3.org/2000/xmlns/|xmlns|
|An empty namespace.|A default namespace that has not been defined.|
