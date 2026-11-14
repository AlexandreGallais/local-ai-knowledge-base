---
title: "RunInstallerAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RunInstallerAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RunInstallerAttribute class

Namespace: `System.ComponentModel`

```csharp
public class RunInstallerAttribute : Attribute
```

Specifies whether the Visual Studio Custom Action Installer or the Installutil.exe (Installer Tool) should be invoked when the assembly is installed.

#### Remarks
If a class that inherits from `Installer` is marked with the `RunInstallerAttribute` set to `true`, Visual Studio's Custom Action Installer or the InstallUtil.exe will be invoked when the assembly is installed. Members marked with the `RunInstallerAttribute` set to `false` will not invoke an installer. The default is `true`.

> **Note:**
>  When you mark a property with the `RunInstallerAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. For a property marked with the `RunInstallerAttribute` set to `false`, the value is `No`. Therefore, when you want to check the value of this attribute in your code, you must specify the attribute as `Yes` or `No`.

For more information, see Attributes.

#### Examples
The following example specifies that the installer should be run for `MyProjectInstaller`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/RunInstallerAttribute/Overview/source.cs._

The next example creates an instance of `MyProjectInstaller`. Then it gets the attributes for the class, extracts the `RunInstallerAttribute`, and prints whether to run the installer.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/RunInstallerAttribute/Overview/source.cs._

## RunInstallerAttribute.RunInstallerAttribute(Boolean) constructor

```csharp
public RunInstallerAttribute (bool runInstaller);
```

Initializes a new instance of the `RunInstallerAttribute` class.

Parameters:

- `runInstaller`: `true` if an installer should be invoked during installation of an assembly; otherwise, `false`.

To be added.

## RunInstallerAttribute.RunInstaller property

```csharp
public bool RunInstaller { get; }
```

Gets a value indicating whether an installer should be invoked during installation of an assembly.

Returns: `true` if an installer should be invoked during installation of an assembly; otherwise, `false`.

To be added.

## RunInstallerAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the value of the specified `RunInstallerAttribute` is equivalent to the current `RunInstallerAttribute`.

Parameters:

- `obj`: The object to compare.

Returns: `true` if the specified `RunInstallerAttribute` is equal to the current `RunInstallerAttribute`; otherwise, `false`.

To be added.

## RunInstallerAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Generates a hash code for the current `RunInstallerAttribute`.

Returns: A hash code for the current `RunInstallerAttribute`.

To be added.

## RunInstallerAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## RunInstallerAttribute.Default field

```csharp
public static readonly System.ComponentModel.RunInstallerAttribute Default;
```

Specifies the default visibility, which is `RunInstallerAttribute.No`. This `static` field is read-only.

#### Remarks
When you mark a property with this value, this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## RunInstallerAttribute.No field

```csharp
public static readonly System.ComponentModel.RunInstallerAttribute No;
```

Specifies that the Visual Studio Custom Action Installer or the Installutil.exe (Installer Tool) should not be invoked when the assembly is installed. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

When you mark a property with the `RunInstallerAttribute` set to `false`, the value of this attribute is set to the constant member `No`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `No`.

## RunInstallerAttribute.Yes field

```csharp
public static readonly System.ComponentModel.RunInstallerAttribute Yes;
```

Specifies that the Visual Studio Custom Action Installer or the Installutil.exe (Installer Tool) should be invoked when the assembly is installed. This `static` field is read-only.

#### Remarks
When you mark a property with the `RunInstallerAttribute` set to `true`, the value of this attribute is set to the constant member `Yes`. Therefore, when you want to check whether the attribute is set to this value in your code, you must specify the attribute as `Yes`.
