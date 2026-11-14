---
title: "Retrieve resources in .NET apps (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/retrieve-resources.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Retrieve resources in .NET apps

When you work with localized resources in .NET apps, you should ideally package the resources for the default or neutral culture with the main assembly and create a separate satellite assembly for each language or culture that your app supports. You can then use the `System.Resources.ResourceManager` class as described in the next section to access named resources. If you choose not to embed your resources in the main assembly and satellite assemblies, you can also access binary *.resources* files directly, as discussed in the section Retrieve resources from .resources files later in this article.

## Retrieve resources from assemblies

The `System.Resources.ResourceManager` class provides access to resources at runtime. You use the `System.Resources.ResourceManager.GetString*` method to retrieve string resources and the `System.Resources.ResourceManager.GetObject*` or `System.Resources.ResourceManager.GetStream*` method to retrieve non-string resources. Each method has two overloads:

- An overload whose single parameter is a string that contains the name of the resource. The method attempts to retrieve that resource for the current culture. For more information, see the `System.Resources.ResourceManager.GetString(System.String)`, `System.Resources.ResourceManager.GetObject(System.String)`, and `System.Resources.ResourceManager.GetStream(System.String)` methods.

- An overload that has two parameters: a string containing the name of the resource, and a `System.Globalization.CultureInfo` object that represents the culture whose resource is to be retrieved. If a resource set for that culture cannot be found, the resource manager uses fallback rules to retrieve an appropriate resource. For more information, see the `System.Resources.ResourceManager.GetString(System.String,System.Globalization.CultureInfo)`, `System.Resources.ResourceManager.GetObject(System.String,System.Globalization.CultureInfo)`, and `System.Resources.ResourceManager.GetStream(System.String,System.Globalization.CultureInfo)` methods.

The resource manager uses the resource fallback process to control how the app retrieves culture-specific resources. For more information, see the "Resource Fallback Process" section in Package and deploy resources. For information about instantiating a `System.Resources.ResourceManager` object, see the "Instantiating a ResourceManager Object" section in the `System.Resources.ResourceManager` class topic.

### Retrieve string data example

The following example calls the `System.Resources.ResourceManager.GetString(System.String)` method to retrieve the string resources of the current UI culture. It includes a neutral string resource for the English (United States) culture and localized resources for the French (France) and Russian (Russia) cultures. The following English (United States) resource is in a file named Strings.txt:

```text
TimeHeader=The current time is
```

The French (France) resource is in a file named Strings.fr-FR.txt:

```text
TimeHeader=L'heure actuelle est
```

The Russian (Russia) resource is in a file named Strings.ru-RU.txt:

```text
TimeHeader=Текущее время —
```

The source code for this example, which is in a file named GetString.cs for the C# version of the code and GetString.vb for the Visual Basic <example-value>, defines a string array that contains the name of four cultures: the three cultures for which resources are available and the Spanish (Spain) culture. A loop that executes five times randomly selects one of these cultures and assigns it to the `System.Threading.Thread.CurrentCulture` and `System.Globalization.CultureInfo.CurrentUICulture` properties. It then calls the `System.Resources.ResourceManager.GetString(System.String)` method to retrieve the localized string, which it displays along with the time of day.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/getstring.cs._

The following batch (*.bat*) file compiles the example and generates satellite assemblies in the appropriate directories. The commands are provided for the C# language and compiler. For Visual Basic, change `csc` to `vbc`, and change `GetString.cs` to `GetString.vb`.

```console
resgen strings.txt
csc GetString.cs -resource:strings.resources

resgen strings.fr-FR.txt
md fr-FR
al -embed:strings.fr-FR.resources -culture:fr-FR -out:fr-FR\GetString.resources.dll

resgen strings.ru-RU.txt
md ru-RU
al -embed:strings.ru-RU.resources -culture:ru-RU -out:ru-RU\GetString.resources.dll
```

When the current UI culture is Spanish (Spain), note that the example displays English language resources, because Spanish language resources are unavailable, and English is the example's default culture.

### Retrieve object data examples

You can use the `System.Resources.ResourceManager.GetObject*` and `System.Resources.ResourceManager.GetStream*` methods to retrieve object data. This includes primitive data types, serializable objects, and objects that are stored in binary format (such as images).

The following example uses the `System.Resources.ResourceManager.GetStream(System.String)` method to retrieve a bitmap that is used in an app's opening splash window. The following source code in a file named CreateResources.cs (for C#) or CreateResources.vb (for Visual Basic) generates a .resx file that contains the serialized image. In this case, the image is loaded from a file named SplashScreen.jpg; you can modify the file name to substitute your own image.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/createresources.cs._

The following code retrieves the resource and displays the image in a `System.Windows.Forms.PictureBox` control.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/getstream.cs._

You can use the following batch file to build the C# example. For Visual Basic, change `csc` to `vbc`, and change the extension of the source code file from `.cs` to `.vb`.

```console
csc CreateResources.cs
CreateResources

resgen AppResources.resx

csc GetStream.cs -resource:AppResources.resources
```

The following example uses the `System.Resources.ResourceManager.GetObject(System.String)` method to deserialize a custom object. The example includes a source code file named UIElements.cs (UIElements.vb for Visual Basic) that defines the following structure named `PersonTable`. This structure is intended to be used by a general table display routine that displays the localized names of table columns. Note that the `PersonTable` structure is marked with the `System.SerializableAttribute` attribute.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/example.cs._

The following code from a file named CreateResources.cs (CreateResources.vb for Visual Basic) creates an XML resource file named UIResources.resx that stores a table title and a `PersonTable` object that contains information for an app that is localized for the English language.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/example1.cs._

The following code in a source code file named GetObject.cs (GetObject.vb) then retrieves the resources and displays them to the console.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/example2.cs._

You can build the necessary resource file and assemblies and run the app by executing the following batch file. You must use the `/r` option to supply Resgen.exe with a reference to UIElements.dll so that it can access information about the `PersonTable` structure. If you're using C#, replace the `vbc` compiler name with `csc`, and replace the `.vb` extension with `.cs`.

```console
vbc -t:library UIElements.vb
vbc CreateResources.vb -r:UIElements.dll
CreateResources

resgen UIResources.resx  -r:UIElements.dll
vbc GetObject.vb -r:UIElements.dll -resource:UIResources.resources

GetObject.exe
```

## Version support for satellite assemblies

By default, when the `System.Resources.ResourceManager` object retrieves requested resources, it looks for satellite assemblies that have version numbers that match the version number of the main assembly. After you have deployed an app, you might want to update the main assembly or specific resource satellite assemblies. The .NET Framework provides support for versioning the main assembly and satellite assemblies.

The `System.Resources.SatelliteContractVersionAttribute` attribute  provides versioning support for a main assembly. Specifying this attribute on an app's main assembly enables you to update and redeploy a main assembly without updating its satellite assemblies. After you update the main assembly, increment the main assembly's version number but leave the satellite contract version number unchanged. When the resource manager retrieves requested resources, it loads the satellite assembly version specified by this attribute.

Publisher policy assemblies provide support for versioning satellite assemblies. You can update and redeploy a satellite assembly without updating the main assembly. After you update a satellite assembly, increment its version number and ship it with a publisher policy assembly. In the publisher policy assembly, specify that your new satellite assembly is backward-compatible with its previous version. The resource manager will use the `System.Resources.SatelliteContractVersionAttribute` attribute to determine the version of the satellite assembly, but the assembly loader will bind to the satellite assembly version specified by the publisher policy. For more information about publisher policy assemblies, see Create a publisher policy file.

To enable full assembly versioning support, we recommend that you deploy strong-named assemblies in the global assembly cache and deploy assemblies that don'<example-value>'s version number when you update the assembly. Instead, you must perform an in-place update where you replace the existing code with the updated code and maintain the same version number. For example, if you want to update version 1.0.0.0 of a satellite assembly with the fully specified assembly name "<example-value>", overwrite it with the updated myApp.resources.dll that has been compiled with the same, fully specified assembly name "<example-value>". Note that using in-place updates on satellite assembly files makes it difficult for an app to accurately determine the version of a satellite assembly.

For more information about assembly versioning, see Assembly versioning and How the Runtime locates assemblies.
