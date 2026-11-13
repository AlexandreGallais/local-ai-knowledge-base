---
title: "Retrieve resources in .NET apps (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/retrieve-resources.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Retrieve resources in .NET apps (part 2 of 2)

## Retrieve resources from .resources Files

If you choose not to deploy resources in satellite assemblies, you can still use a `System.Resources.ResourceManager` object to access resources from .resources files directly. To do this, you must deploy the .resources files correctly. Then you use the `System.Resources.ResourceManager.CreateFileBasedResourceManager*` method to instantiate a `System.Resources.ResourceManager` object and specify the directory that contains the standalone .resources files.

### Deploy .resources Files

When you embed .resources files in an application assembly and satellite assemblies, each satellite assembly has the same file name, but is placed in a subdirectory that reflects the satellite assembly's culture. In contrast, when you access resources from .resources files directly, you can place all the .resources files in a single directory, usually a subdirectory of the application directory. The name of the app's default .resources file consists of a root name only, with no indication of its culture (for example, strings.resources). The resources for each localized culture are stored in a file whose name consists of the root name followed by the culture (for example, strings.ja.resources or strings.de-DE.resources).

The following illustration shows where resource files should be located in the directory structure. It also gives the naming conventions for .resource files.

### Use the resource manager

After you have created your resources and placed them in the appropriate directory, you create a `System.Resources.ResourceManager` object to use the resources by calling the `System.Resources.ResourceManager.CreateFileBasedResourceManager(System.String,System.String,System.Type)` method. The first parameter specifies the root name of the app's default .resources file (this would be "strings" for the example in the previous section). The second parameter specifies the location of the resources ("Resources" for the previous example). The third parameter specifies the `System.Resources.ResourceSet` implementation to use. If the third parameter is `null`, the default runtime `System.Resources.ResourceSet` is used.

> **Note:**
> Do not deploy ASP.NET apps using standalone .resources files. This can cause locking issues and breaks XCOPY deployment. We recommend that you deploy ASP.NET resources in satellite assemblies. For more information, see ASP.NET Web Page Resources Overview.

After you instantiate the `System.Resources.ResourceManager` object, you use the `System.Resources.ResourceManager.GetString*`, `System.Resources.ResourceManager.GetObject*`, and `System.Resources.ResourceManager.GetStream*` methods as discussed earlier to retrieve the resources. However, the retrieval of resources directly from .resources files differs from the retrieval of embedded resources from assemblies. When you retrieve resources from .resources files, the `System.Resources.ResourceManager.GetString(System.String)`, `System.Resources.ResourceManager.GetObject(System.String)`, and `System.Resources.ResourceManager.GetStream(System.String)` methods always retrieve the default culture's resources regardless of the current culture. To retrieve the resources of either the app's current culture or a specific culture, you must call the `System.Resources.ResourceManager.GetString(System.String,System.Globalization.CultureInfo)`, `System.Resources.ResourceManager.GetObject(System.String,System.Globalization.CultureInfo)`, or `System.Resources.ResourceManager.GetStream(System.String,System.Globalization.CultureInfo)` method and specify the culture whose resources are to be retrieved. To retrieve the resources of the current culture, specify the value of the `System.Globalization.CultureInfo.CurrentCulture` property as the `culture` argument. If the resource manager cannot retrieve the resources of `culture`, it uses the standard resource fallback rules to retrieve the appropriate resources.

### An example

The following example illustrates how the resource manager retrieves resources directly from .resources files. The example consists of three text-based resource files for the English (United States), French (France), and Russian (Russia) cultures. English (United States) is the example's default culture. Its resources are stored in the following file named *Strings.txt*:

```text
Greeting=Hello
Prompt=What is your name?
```

Resources for the French (France) culture are stored in the following file, which is named Strings.fr-FR.txt:

```text
Greeting=Bon jour
Prompt=Comment vous appelez-vous?
```

Resources for the Russian (Russia) culture are stored in the following file, which is named Strings.ru-RU.txt:

```text
Greeting=Здравствуйте
Prompt=Как вас зовут?
```

The following is the source code for the example. The example instantiates `System.Globalization.CultureInfo` objects for the English (United States), English (Canada), French (France), and Russian (Russia) cultures, and makes each the current culture. The `System.Resources.ResourceManager.GetString(System.String,System.Globalization.CultureInfo)` method then supplies the value of the `System.Globalization.CultureInfo.CurrentCulture` property as the `culture` argument to retrieve the appropriate culture-specific resources.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.retrieving/cs/example3.cs._

You can compile the C# version of the example by running the following batch file. If you're using Visual Basic, replace `csc` with `vbc`, and replace the `.cs` extension with `.vb`.

```console
md Resources
resgen Strings.txt Resources\Strings.resources
resgen Strings.fr-FR.txt Resources\Strings.fr-FR.resources
resgen Strings.ru-RU.txt Resources\Strings.ru-RU.resources

csc Example.cs
```

## See also

- `System.Resources.ResourceManager`
- Resources in .NET apps
- Package and deploy resources
- How the Runtime locates assemblies
