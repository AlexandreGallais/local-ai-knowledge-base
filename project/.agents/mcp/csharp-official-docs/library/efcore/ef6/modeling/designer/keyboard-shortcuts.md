---
title: "Entity Framework Designer Keyboard Shortcuts - EF6 (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/keyboard-shortcuts.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Entity Framework Designer Keyboard Shortcuts
This page provides a list of keyboard shorcuts that are available in the various screens of the Entity Framework Tools for Visual Studio.

## ADO.NET Entity Data Model Wizard

### Step One: Choose Model Contents

| Shortcut  | Action                                                     | Notes                                               |
|:----------|:-----------------------------------------------------------|:----------------------------------------------------|
| **Alt+n** | Move to next screen                                        | Not available for all selections of model contents. |
| **Alt+f** | Finish wizard                                              | Not available for all selections of model contents. |
| **Alt+w** | Switch focus to the “What should the model contain?” pane. |                                                     |

### Step Two: Choose Your Connection

| Shortcut  | Action                                                     | Notes                                                   |
|:----------|:-----------------------------------------------------------|:--------------------------------------------------------|
| **Alt+n** | Move to next screen                                        |                                                         |
| **Alt+p** | Move to previous screen                                    |                                                         |
| **Alt+w** | Switch focus to the “What should the model contain?” pane. |                                                         |
| **Alt+c** | Open the “Connection Properties” window                    | Allows for the definition of a new database connection. |
| **Alt+e** | Exclude sensitive data from the connection string          |                                                         |
| **Alt+i** | Include sensitive data in the connection string            |                                                         |
| **Alt+s** | Toggle the “Save connection settings in App.Config” option |                                                         |

### Step Three: Choose Your Version

| Shortcut  | Action                                             | Notes                                                                                 |
|:----------|:---------------------------------------------------|:--------------------------------------------------------------------------------------|
| **Alt+n** | Move to next screen                                |                                                                                       |
| **Alt+p** | Move to previous screen                            |                                                                                       |
| **Alt+w** | Switch focus to Entity Framework version selection | Allows for specifying a different version of Entity Framework for use in the project. |

### Step Four: Choose Your Database Objects and Settings

| Shortcut  | Action                                                                                    | Notes                                                               |
|:----------|:------------------------------------------------------------------------------------------|:--------------------------------------------------------------------|
| **Alt+f** | Finish wizard                                                                             |                                                                     |
| **Alt+p** | Move to previous screen                                                                   |                                                                     |
| **Alt+w** | Switch focus to database object selection pane                                            | Allows for specifying database objects to be reverse engineered.    |
| **Alt+s** | Toggle the “Pluralize or singularize generated object names” option                       |                                                                     |
| **Alt+k** | Toggle the “Include foreign key <example-value> in the model” option                              | Not available for all selections of model contents.                 |
| **Alt+i** | Toggle the “Import selected stored procedures and functions into the entity model” option | Not available for all selections of model contents.                 |
| **Alt+m** | Switches focus to the “Model Namespace” text field                                        | Not available for all selections of model contents.                 |
| **Space** | Toggle selection on element                                                               | If element has children, all child elements will be toggled as well |
| **Left**  | Collapse child tree                                                                       |                                                                     |
| **Right** | Expand child tree                                                                         |                                                                     |
| **Up**    | Navigate to previous element in tree                                                      |                                                                     |
| **Down**  | Navigate to next element in tree                                                          |                                                                     |
