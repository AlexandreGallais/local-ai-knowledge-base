---
title: "XmlNodeChangedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeChangedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeChangedEventArgs class

Namespace: `System.Xml`

```csharp
public class XmlNodeChangedEventArgs : EventArgs
```

Provides data for the `XmlDocument.NodeChanged`, `XmlDocument.NodeChanging`, `XmlDocument.NodeInserted`, `XmlDocument.NodeInserting`, `XmlDocument.NodeRemoved` and `XmlDocument.NodeRemoving` events.

#### Remarks
The following C# code shows how to use the event handler.

```csharp
//Add a new event handler.
XmlDocument doc = new XmlDocument();
doc.NodeInserted += new XmlNodeChangedEventHandler(NodeInsertedHandler);
//Define the event handler.
void NodeInsertedHandler(Object src, XmlNodeChangedEventArgs args)
{
 Console.WriteLine("Node " + args.Node.Name + " inserted!!");
}
```

> **Note:**
> If an operation is comprised of multiple actions, it results in multiple events. For example, an `XmlNode.AppendChild` call may have to remove the node being appended from its previous parent. In this case you will see a `NodeRemoved` event followed by a `NodeInserted` event.

## XmlNodeChangedEventArgs.XmlNodeChangedEventArgs(XmlNode, XmlNode, XmlNode, String, String, XmlNodeChangedAction) constructor

```csharp
public XmlNodeChangedEventArgs (System.Xml.XmlNode? node, System.Xml.XmlNode? oldParent, System.Xml.XmlNode? newParent, string? oldValue, string? newValue, System.Xml.XmlNodeChangedAction action);
```

Initializes a new instance of the `XmlNodeChangedEventArgs` class.

Parameters:

- `node`: The `XmlNode` that generated the event.
- `oldParent`: The old parent `XmlNode` of the `XmlNode` that generated the event.
- `newParent`: The new parent `XmlNode` of the `XmlNode` that generated the event.
- `oldValue`: The old value of the `XmlNode` that generated the event.
- `newValue`: The new value of the `XmlNode` that generated the event.
- `action`: The `XmlNodeChangedAction`.

To be added.

## XmlNodeChangedEventArgs.Action property

```csharp
public System.Xml.XmlNodeChangedAction Action { get; }
```

Gets a value indicating what type of node change event is occurring.

Returns: One of the enumeration values that describes the node change event. The `Action` value does not differentiate between when the event occurred (before or after). You can create separate event handlers to handle both instances.

To be added.

## XmlNodeChangedEventArgs.NewParent property

```csharp
public System.Xml.XmlNode? NewParent { get; }
```

Gets the value of the `XmlNode.ParentNode` after the operation completes.

Returns: The value of the `ParentNode` after the operation completes. This property returns `null` if the node is being removed. For attribute nodes, this property returns the `XmlAttribute.OwnerElement`.

To be added.

## XmlNodeChangedEventArgs.NewValue property

```csharp
public string? NewValue { get; }
```

Gets the new value of the node.

Returns: The new value of the node. This property returns `null` if the node is neither an attribute nor a text node, or if the node is being removed.

If called in a `XmlDocument.NodeChanging` event, `NewValue` returns the value of the node if the change is successful. If called in a `XmlDocument.NodeChanged` event, `NewValue` returns the current value of the node.

To be added.

## XmlNodeChangedEventArgs.Node property

```csharp
public System.Xml.XmlNode? Node { get; }
```

Gets the `XmlNode` that is being added, removed or changed.

Returns: The `XmlNode` that is being added, removed or changed; this property never returns `null`.

To be added.

## XmlNodeChangedEventArgs.OldParent property

```csharp
public System.Xml.XmlNode? OldParent { get; }
```

Gets the value of the `XmlNode.ParentNode` before the operation began.

Returns: The value of the `ParentNode` before the operation began. This property returns `null` if the node did not have a parent. For attribute nodes, this property returns the `XmlAttribute.OwnerElement`.

To be added.

## XmlNodeChangedEventArgs.OldValue property

```csharp
public string? OldValue { get; }
```

Gets the original value of the node.

Returns: The original value of the node. This property returns `null` if the node is neither an attribute nor a text node, or if the node is being inserted.

If called in a `XmlDocument.NodeChanging` event, `OldValue` returns the current value of the node that will be replaced if the change is successful. If called in a `XmlDocument.NodeChanged` event, `OldValue` returns the value of node prior to the change.

To be added.
