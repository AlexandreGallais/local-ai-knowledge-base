---
title: "Create satellite assemblies (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/create-satellite-assemblies.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Create satellite assemblies for .NET apps

Resource files play a central role in localized applications. They enable an application to display strings, images, and other data in the user's language and culture, and provide alternate data if resources for the user's language or culture are unavailable. .NET uses a hub-and-spoke model to locate and retrieve localized resources. The hub is the main assembly that contains the non-localizable executable code and the resources for a single culture, which is called the neutral or default culture. The default culture is the fallback culture for the application; it's used when no localized resources are available. You use the `System.Resources.NeutralResourcesLanguageAttribute` attribute to designate the culture of the application's default culture. Each spoke connects to a satellite assembly that contains the resources for a single localized culture but does not contain any code. Because the satellite assemblies aren't part of the main assembly, you can easily update or replace resources that correspond to a specific culture without replacing the main assembly for the application.

> **Note:**
> The resources of an application's default culture can also be stored in a satellite assembly. To do this, you assign the `System.Resources.NeutralResourcesLanguageAttribute` attribute a value of `System.Resources.UltimateResourceFallbackLocation.Satellite`.

## Satellite assembly name and location

The hub-and-spoke model requires that you place resources in specific locations so that they can be easily located and used. If you don't compile and name resources as expected, or if you don't place them in the correct locations, the common language runtime won't be able to locate them and will use the resources of the default culture instead. The .NET resource manager is represented by the `System.Resources.ResourceManager` type, and it's used to automatically access localized resources. The resource manager requires the following:

- A single satellite assembly must include all the resources for a particular culture. In other words, you should compile multiple *.txt* or *.resx* files into a single binary *.resources* file.

- There must be a separate subdirectory in the application directory for each localized culture that stores that culture's resources. The subdirectory name must be the same as the culture name. Alternately, you can store your satellite assemblies in the global assembly cache. In this case, the culture information component of the assembly's strong name must indicate its culture. For more information, see Install satellite assemblies in the Global Assembly Cache.

  > **Note:**
  > If your application includes resources for subcultures, place each subculture in a separate subdirectory under the application directory. Do not place subcultures in subdirectories under their main culture's directory.

- The satellite assembly must have the same name as the application, and must use the file name extension ".resources.dll". For example, if an application is named *Example.exe*, the name of each satellite assembly should be *Example.resources.dll*. The satellite assembly name doesn't indicate the culture of its resource files. However, the satellite assembly appears in a directory that does specify the culture.

- Information about the culture of the satellite assembly must be included in the assembly's metadata. To store the culture name in the satellite assembly's metadata, you specify the `/culture` option when you use Assembly Linker to embed resources in the satellite assembly.

The following illustration shows a sample directory structure and location requirements for applications that you aren't installing in the global assembly cache. The items with *.txt* and *.resources* extensions won't ship with the final application. These are the intermediate resource files used to create the final satellite resource assemblies. In this example, you could substitute *.resx* files for the *.txt* files. For more information, see Package and deploy resources.

The following image shows the satellite assembly directory:

## Compile satellite assemblies

You use Resource File Generator (*resgen.exe*) to compile text files or XML (*.resx*) files that contain resources to binary *.resources* files. You then use Assembly Linker (*al.exe*) to compile *.resources* files into satellite assemblies. *al.exe* creates an assembly from the *.resources* files that you specify. Satellite assemblies can contain only resources; they can't contain any executable code.

The following *al.exe* command creates a satellite assembly for the application `Example` from the German resources file *strings.de.resources*.

```console
al -target:lib -embed:strings.de.resources -culture:de -out:Example.resources.dll
```

The following *al.exe* command also creates a satellite assembly for the application `Example` from the file *strings.de.resources*. The **/template** option causes the satellite assembly to inherit all assembly metadata except for its culture information from the parent assembly (*Example.dll*).

```console
al -target:lib -embed:strings.de.resources -culture:de -out:Example.resources.dll -template:Example.dll
```

The following table describes the *al.exe* options used in these commands in more detail:

| Option | Description |
|--|--|
| `-target:lib` | Specifies that your satellite assembly is compiled to a library (.dll) file. Because a satellite assembly doesn't contain executable code and is not an application's main assembly, you must save satellite assemblies as DLLs. |
| `-embed:strings.de.resources` | Specifies the name of the resource file to embed when *al.exe* compiles the assembly. You can embed multiple .resources files in a satellite assembly, but if you are following the hub-and-spoke model, you must compile one satellite assembly for each culture. However, you can create separate .resources files for strings and objects. |
| `-culture:de` | Specifies the culture of the resource to compile. The common language runtime uses this information when it searches for the resources for a specified culture. If you omit this option, *al.exe* will still compile the resource, but the runtime won't be able to find it when a user requests it. |
| `-out:Example.resources.dll` | Specifies the name of the output file. The name must follow the naming standard *baseName*.resources.*extension*, where *baseName* is the name of the main assembly and *extension* is a valid file name extension (such as .dll). The runtime is not able to determine the culture of a satellite assembly based on its output file name; you must use the **/culture** option to specify it. |
| `-template:Example.dll` | Specifies an assembly from which the satellite assembly will inherit all assembly metadata except the culture field. This option affects satellite assemblies only if you specify an assembly that has a strong name. |

For a complete list of options available with *al.exe*, see Assembly Linker (*al.exe*).

> **Note:**
> There may be times when you want to use the .NET Core MSBuild task to compile satellite assemblies, even though you're targeting .NET Framework. For example, you may want to use the C# compiler deterministic option to be able to compare assemblies from different builds. In this case, set GenerateSatelliteAssembliesForCore to `true` in the *.csproj* file to generate satellite assemblies using *csc.exe* instead of Al.exe (Assembly Linker).
>
> ```xml
> <Project>
>     <PropertyGroup>
>         <GenerateSatelliteAssembliesForCore>true</GenerateSatelliteAssembliesForCore>
>     </PropertyGroup>
> </Project>
> ```
>
> The .NET Core MSBuild task uses *csc.exe* instead of *al.exe* to generate satellite assemblies, by default. For more information, see Make it easier to opt in to "Core" satellite assembly generation.

## Satellite assemblies example

The following is a simple "Hello world" example that displays a message box containing a localized greeting. The example includes resources for the English (United States), French (France), and Russian (Russia) cultures, and its fallback culture is English. To create the example, do the following:

1. Create a resource file named *Greeting.resx* or *Greeting.txt* to contain the resource for the default culture. Store a single string named `HelloString` whose value is "Hello world!" in this file.

2. To indicate that English (en) is the application's default culture, add the following `System.Resources.NeutralResourcesLanguageAttribute` attribute to the application's AssemblyInfo file or to the main source code file that will be compiled into the application's main assembly.

    _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.locating/cs/assemblyinfo.cs._

3. Add support for additional cultures (`en-US`, `fr-FR`, and `ru-RU`) to the application as follows:

    - To support the `en-US` or English (United States) culture, create a resource file named *Greeting.en-US.resx* or *Greeting.en-US.txt*, and store in it a single string named `HelloString` whose value is "Hi world!".

    - To support the `fr-FR` or French (France) culture, create a resource file named *Greeting.fr-FR.resx* or *Greeting.fr-FR.txt*, and store in it a single string named `HelloString` whose value is "Salut tout le monde!".

    - To support the `ru-RU` or Russian (Russia) culture, create a resource file named *Greeting.ru-RU.resx* or *Greeting.ru-RU.txt*, and store in it a single string named `HelloString` whose value is "Всем привет!".

4. Use *resgen.exe* to compile each text or XML resource file to a binary *.resources* file. The output is a set of files that have the same root file name as the *.resx* or *.txt* files, but a *.resources* extension. If you create the example with Visual Studio, the compilation process is handled automatically. If you aren't using Visual Studio, run the following commands to compile the *.resx* files into *.resources* files:

    ```console
    resgen Greeting.resx
    resgen Greeting.en-us.resx
    resgen Greeting.fr-FR.resx
    resgen Greeting.ru-RU.resx
    ```

    If your resources are in text files instead of XML files, replace the *.resx* extension with *.txt*.

5. Compile the following source code along with the resources for the default culture into the application's main assembly:

    > **Important:**
    > If you are using the command line rather than Visual Studio to create the example, you should modify the call to the `System.Resources.ResourceManager` class constructor to the following: `ResourceManager rm = new ResourceManager("Greeting", typeof(Example).Assembly);`

    _Code sample not included: ~/samples/snippets/csharp/VS_Snippets_CLR/conceptual.resources.locating/cs/program.cs._

    If the application is named **Example** and you're compiling from the command line, the command for the C# compiler is:

    ```console
    csc Example.cs -res:Greeting.resources
    ```

    The corresponding Visual Basic <example-value> command is:

    ```console
    vbc Example.vb -res:Greeting.resources
    ```

6. Create a subdirectory in the main application directory for each localized culture supported by the application. You should create an *en-US*, an *fr-FR*, and an *ru-RU* subdirectory. Visual Studio creates these subdirectories automatically as part of the compilation process.

7. Embed the individual culture-specific *.resources* files into satellite assemblies and save them to the appropriate directory. The command to do this for each *.resources* file is:

    ```console
    al -target:lib -embed:Greeting.culture.resources -culture:culture -out:culture\Example.resources.dll
    ```

     where *culture* is the name of the culture whose resources the satellite assembly contains. Visual Studio handles this process automatically.

You can then run the example. It will randomly make one of the supported cultures the current culture and display a localized greeting.
