---
title: "ComponentEditor class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ComponentEditor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComponentEditor class

Namespace: `System.ComponentModel`

```csharp
public abstract class ComponentEditor
```

Provides the base class for a custom component editor.

#### Remarks
A component editor is used to edit a component as a whole and can be used to implement a user interface similar to that of the property pages. You associate a component editor with a component by using the `EditorAttribute` attribute.

#### Examples
The following code example demonstrates an example `ComponentEditor` implementation.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentEditor/Overview/componenteditorexamplecomponent.cs._
## ComponentEditor.ComponentEditor() constructor

```csharp
protected ComponentEditor ();
```

Initializes a new instance of the `ComponentEditor` class.

To be added.

## ComponentEditor.EditComponent(Object) method

```csharp
public bool EditComponent (object component);
```

Edits the component and returns a value indicating whether the component was modified.

Parameters:

- `component`: The component to be edited.

Returns: `true` if the component was modified; otherwise, `false`.

#### Remarks
This method opens an advanced user interface that you can use to edit the component. The default implementation opens a dialog box with a collection of component editor control objects and a user interface.

## ComponentEditor.EditComponent(ITypeDescriptorContext, Object) method

```csharp
public abstract bool EditComponent (System.ComponentModel.ITypeDescriptorContext? context, object component);
```

Edits the component and returns a value indicating whether the component was modified based upon a given context.

Parameters:

- `context`: An optional context object that can be used to obtain further information about the edit.
- `component`: The component to be edited.

Returns: `true` if the component was modified; otherwise, `false`.

#### Remarks
You can override this method to provide a custom editing user interface for a component. From within this method you can display a dialog box or other type of user interface.
