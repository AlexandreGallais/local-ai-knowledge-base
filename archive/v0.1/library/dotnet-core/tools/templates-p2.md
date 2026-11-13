---
title: ".NET templates for authors (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/templates.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET templates for authors (part 2 of 2)

## Template localization

The .NET template engine supports optional localization of template metadata. When you provide localization files, hosts such as `dotnet new` and the Visual Studio **New Project** dialog display the template's name, description, and symbol information in the user's language instead of the original authored language.

The following template fields support localization:

- `name`
- `author`
- `description`
- Symbol `description` and `displayName`
- Description and display name for each choice in a choice parameter
- Post action `description` and `manualInstructions`

To add localization, create a `localize` subfolder inside `.template.config` and add one JSON file per language. Name each file `templatestrings.<lang-code>.json`, where `<lang-code>` matches a valid `System.Globalization.CultureInfo` name, such as `pt-BR`, `zh-Hans`, or `de`. Each file contains key-value pairs where the key is a path to the element in `template.json`, using `/` as a delimiter for nested fields.

For example, given a `template.json` with the following content:

```json
{
  "$schema": "https://json.schemastore.org/template",
  "author": "Microsoft",
  "classifications": [ "Config" ],
  "name": "EditorConfig file",
  "description": "Creates an .editorconfig file for configuring code style preferences.",
  "symbols": {
    "Empty": {
      "type": "parameter",
      "datatype": "bool",
      "defaultValue": "false",
      "displayName": "Empty",
      "description": "Creates empty .editorconfig instead of the defaults for .NET."
    }
  }
}
```

A Brazilian Portuguese localization file named `templatestrings.pt-BR.json` would look like this:

```json
{
  "author": "Microsoft",
  "name": "Arquivo EditorConfig",
  "description": "Cria um arquivo .editorconfig para configurar as preferências de estilo de código.",
  "symbols/Empty/displayName": "Vazio",
  "symbols/Empty/description": "Cria .editorconfig vazio em vez dos padrões para .NET."
}
```

The template engine parses these files when it loads template information, and it returns localized values automatically based on the current UI culture—no extra steps are required from the user.

Localization is optional. If you don't include localization files, the template works normally and always displays the values from `template.json`. For more information, see the dotnet/templating wiki localization page.

## Visual Studio integration

Visual Studio's **Create a new project** dialog uses the .NET template engine for .NET project templates. Templates you author for `dotnet new` work in Visual Studio too, without any extra configuration. When a user installs your template package with `dotnet new install`, Visual Studio automatically detects and surfaces those templates in the dialog.

**Project and solution templates** appear in the **Create a new project** dialog alongside the built-in SDK templates. Users can find templates by name, language, or the tags from the `classifications` field in the template's `template.json` file. Accurate classifications help your template surface in the right filter categories, so choose them carefully. To give your template a polished appearance in the dialog, add an `icon.png` to the `.template.config` folder — Visual Studio displays it next to your template's name.

**Item templates** don't currently appear in the **Add** > **New Item** dialog. Users can still use item templates with the `dotnet new` command in the terminal.

To make your template discoverable to Visual Studio users who haven't installed it yet, publish your template package to nuget.org. The **Create a new project** dialog includes an **Install more templates from the online search** option that searches nuget.org for template packages. When a user installs your package through that option, Visual Studio uses the same install mechanism as `dotnet new install`.

For deeper guidance on Visual Studio-specific integration—such as controlling template sort order and configuring additional IDE-specific options—see Sayed Hashimi's template-sample repository.

## Related content

- Tutorial: Create an item template
- Tutorial: Create a project template
- Tutorial: Create a template package
- dotnet new command
- dotnet/templating GitHub repo wiki
- Template samples
