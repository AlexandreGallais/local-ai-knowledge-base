---
title: "Breaking changes - .NET Framework to .NET Core (part 3 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/fx-core.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Breaking changes - .NET Framework to .NET Core (part 3 of 4)

### DoNotLoadLatestRichEditControl compatibility switch not supported

The `Switch.System.Windows.Forms.UseLegacyImages` compatibility switch, which was introduced in .NET Framework 4.7.1, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

In .NET Framework 4.6.2 and previous versions, the `System.Windows.Forms.RichTextBox` control instantiates the Win32 RichEdit control v3.0, and for applications that target .NET Framework 4.7.1, the  `System.Windows.Forms.RichTextBox` control instantiates RichEdit v4.1 (in *msftedit.dll*). The `Switch.System.Windows.Forms.DoNotLoadLatestRichEditControl` compatibility switch was introduced to allow applications that target .NET Framework 4.7.1 and later versions to opt out of the new RichEdit v4.1 control and use the old RichEdit v3 control instead.

In .NET Core and .NET 5.0 and later versions, the `Switch.System.Windows.Forms.DoNotLoadLatestRichEditControl` switch is not supported. Only new versions of the `System.Windows.Forms.RichTextBox` control are supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- `System.Windows.Forms.RichTextBox`

***

### DoNotSupportSelectAllShortcutInMultilineTextBox compatibility switch not supported

The `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` compatibility switch, which was introduced in .NET Framework 4.6.1, is not supported in Windows Forms on .NET Core and .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.6.1, selecting the `Ctrl` + `A` shortcut key in a `System.Windows.Forms.TextBox` control selected all text. In .NET Framework 4.6 and previous versions, selecting the `Ctrl` + `A` shortcut key <example-value> to select all text if the Textbox.ShortcutsEnabled and `System.Windows.Forms.TextBox.Multiline` properties were both set to `true`. The `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` compatibility switch was introduced in .NET Framework 4.6.1 to retain the original behavior. For more information see `System.Windows.Forms.TextBox.ProcessCmdKey*`.

In .NET Core and .NET 5.0 and later versions, the `Switch.System.Windows.Forms.DoNotSupportSelectAllShortcutInMultilineTextBox` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

***

### DontSupportReentrantFilterMessage compatibility switch not supported

The `Switch.System.Windows.Forms.DontSupportReentrantFilterMessage` compatibility switch, which was introduced in .NET Framework 4.6.1, is not supported in Windows Forms on .NET Core and .NET 5.0 and later.

#### Change description

Starting with the .NET Framework 4.6.1, the `Switch.System.Windows.Forms.DontSupportReentrantFilterMessage` compatibility switch addresses possible `System.IndexOutOfRangeException` exceptions when the `System.Windows.Forms.Application.FilterMessage*` message is called with a custom `System.Windows.Forms.IMessageFilter.PreFilterMessage*` implementation. For more information, see Mitigation: Custom IMessageFilter.PreFilterMessage Implementations.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.DontSupportReentrantFilterMessage` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- `System.Windows.Forms.Application.FilterMessage*`

***

### EnableVisualStyleValidation compatibility switch not supported

The `Switch.System.Windows.Forms.EnableVisualStyleValidation` compatibility switch is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

In .NET Framework, the `Switch.System.Windows.Forms.EnableVisualStyleValidation` compatibility switch allowed an application to opt out of validation of visual styles supplied in a numeric form.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.EnableVisualStyleValidation` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

***

### UseLegacyContextMenuStripSourceControlValue compatibility switch not supported

The `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` compatibility switch, which was introduced in .NET Framework 4.7.2, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.7.2, the `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` compatibility switch allows the developer to opt out of the new behavior of the `System.Windows.Forms.ContextMenuStrip.SourceControl` property, which now returns a reference to the source control. The previous behavior of the property was to return `null`. For more information, see \<AppContextSwitchOverrides> element.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- `System.Windows.Forms.ContextMenuStrip.SourceControl`

***

### UseLegacyImages compatibility switch not supported

The `Switch.System.Windows.Forms.UseLegacyImages` compatibility switch, which was introduced in .NET Framework 4.8, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.8, the `Switch.System.Windows.Forms.UseLegacyImages` compatibility switch addressed possible image scaling issues in ClickOnce scenarios in high DPI environments. When set to `true`, the switch allows the user to restore legacy image scaling on high DPI displays whose scale is set to greater than 100%. For more information, see .NET Framework 4.8 Release Notes on GitHub.

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.UseLegacyImages` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- None

***

### About and SplashScreen templates are broken

The `About.vb` and `SplashScreen.vb` files generated by Visual Studio contain references to types in the `My` namespace that aren't available .NET Core 3.0 and 3.1.

#### Version introduced

3.0

#### Change description

.NET Core 3.0 and 3.1 don't contain full Visual Basic `My` support. The **About** and **SplashScreen** form templates in Visual Studio for Visual Basic <example-value> Forms apps reference properties in the `My.Application.Info` type that aren't available.

#### Recommended action

Visual Basic `My` support was improved in .NET 5, upgrade your project to .NET 5 or later.

-or-

Fix the compiler errors in the **About** and **SplashScreen** types in your app. Use the `System.Reflection.Assembly` class to get the information provided by the `My.Application.Info` type. A straight port of both forms is available here.

> **Tip:**
> This is sample code and unoptimized. The list of attributes should be cached to reduce form load time.

**About**

```vb
Imports System.Reflection

Public NotInheritable Class About

    Private Sub about_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        ' Set the title of the form.
        Dim applicationTitle As String = Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyTitleAttribute)()?.Title

        If String.IsNullOrEmpty(applicationTitle) Then
            applicationTitle = System.IO.Path.GetFileNameWithoutExtension(Assembly.GetExecutingAssembly().GetName().Name)
        End If

        Me.Text = String.Format("About {0}", applicationTitle)
        ' Initialize all of the text displayed on the About Box.
        ' TODO: Customize the application's assembly information in the "Application" pane of the project
        '    properties dialog (under the "Project" menu).
        Me.LabelProductName.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyProductAttribute)()?.Product, "")
        Me.LabelVersion.Text = String.Format("Version {0}", Assembly.GetExecutingAssembly().GetName().Version)
        Me.LabelCopyright.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyCopyrightAttribute)()?.Copyright, "")
        Me.LabelCompanyName.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyCompanyAttribute)()?.Company, "")
        Me.TextBoxDescription.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyDescriptionAttribute)()?.Description, "")
    End Sub

    Private Sub OKButton_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles OKButton.Click
        Me.Close()
    End Sub

End Class
```

**SplashScreen**

```vb
Imports System.Reflection

Public NotInheritable Class SplashScreen

    Private Sub SplashScreen1_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'Set up the dialog text at runtime according to the application's assembly information.  

        'TODO: Customize the application's assembly information in the "Application" pane of the project
        '  properties dialog (under the "Project" menu).

        'Application title
        Dim appTitle As String = Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyTitleAttribute)()?.Title

        If String.IsNullOrEmpty(appTitle) Then
            appTitle = System.IO.Path.GetFileNameWithoutExtension(Assembly.GetExecutingAssembly().GetName().Name)
        End If

        ApplicationTitle.Text = appTitle

        Dim versionValue = Assembly.GetExecutingAssembly().GetName().Version

        'Format the version information using the text set into the Version control at design time as the
        '  formatting string.  This allows for effective localization if desired.
        '  Build and revision information could be included by using the following code and changing the
        '  Version control's designtime text to "Version {0}.{1:00}.{2}.{3}" or something similar.  See
        '  String.Format() in Help for more information.
        '
        '    Version.Text = System.String.Format(Version.Text, versionValue.Major, versionValue.Minor, versionValue.Build, versionValue.Revision)

        Version.Text = System.String.Format(Version.Text, versionValue.Major, versionValue.Minor)

        'Copyright info
        Copyright.Text = If(Assembly.GetExecutingAssembly().GetCustomAttribute(Of AssemblyCopyrightAttribute)()?.Copyright, "")
    End Sub

End Class
```

#### Category

Visual Basic
Windows Forms

#### Affected APIs

None

***

### Types in Microsoft.VisualBasic.ApplicationServices namespace not available

The types in the `Microsoft.VisualBasic.ApplicationServices` namespace are not available.

#### Version introduced

.NET Core 3.0

#### Change description

The types in the `Microsoft.VisualBasic.ApplicationServices` namespace were available in .NET Framework. They're not available in .NET Core 3.0 - 3.1.

The types were removed to avoid unnecessary assembly dependencies or breaking changes in subsequent releases.

#### Recommended action

This namespace was added in .NET 5, upgrade your project to .NET 5 or later.

-or-

If your code depends on the use of `Microsoft.VisualBasic.ApplicationServices` types and their members, you may be able to use a corresponding type or member in the .NET class library. For example, some `System.Environment` and `System.Security.Principal.WindowsIdentity` members provide equivalent functionality to the properties of the `Microsoft.VisualBasic.ApplicationServices.User` class.

#### Category

Visual Basic

#### Affected APIs

- `Microsoft.VisualBasic.ApplicationServices`

***
### Types in Microsoft.VisualBasic.Devices namespace not available

The types in the `Microsoft.VisualBasic.Devices` namespace are not available.

#### Version introduced

.NET Core 3.0

#### Change description

The types in the `Microsoft.VisualBasic.Devices` namespace were available in .NET Framework. They're not available in .NET Core 3.0 - 3.1.

The types were removed to avoid unnecessary assembly dependencies or breaking changes in subsequent releases.

#### Recommended action

This namespace was added in .NET 5, upgrade your project to .NET 5 or later.

-or-

If your code depends on the use of `Microsoft.VisualBasic.Devices` types and their members, you may be able to use a corresponding type or member in the .NET class library. For example, equivalent functionality to the `Microsoft.VisualBasic.Devices.Clock` class is provided by the `System.DateTime` and `System.Environment` types, and equivalent functionality to the `Microsoft.VisualBasic.Devices.Ports` class is provided by types in the `System.IO.Ports` namespace.

#### Category

Visual Basic

#### Affected APIs

- `Microsoft.VisualBasic.Devices`

***

### Types in Microsoft.VisualBasic.MyServices namespace not available

The types in the `Microsoft.VisualBasic.MyServices` namespace are not available.

#### Version introduced

.NET Core 3.0

#### Change description

The types in the `Microsoft.VisualBasic.MyServices` namespace were available in .NET Framework. They're not available in .NET Core 3.0 - 3.1.

The types were removed to avoid unnecessary assembly dependencies or breaking changes in subsequent releases.

#### Recommended action

This namespace was added in .NET 5, upgrade your project to .NET 5 or later.

-or-

If your code depends on the use of **Microsoft.VisualBasic.MyServices** types and their members, there are corresponding types and members in the .NET class library. The following is a mapping of  **Microsoft.VisualBasic.MyServices** types to their equivalent .NET class library types:

|Microsoft.VisualBasic.MyServices type|.NET class library type|
|--|--|
|`Microsoft.VisualBasic.MyServices.ClipboardProxy`|`System.Windows.Clipboard` for WPF applications, `System.Windows.Forms.Clipboard` for Windows Forms applications|
|`Microsoft.VisualBasic.MyServices.FileSystemProxy`|Types in the `System.IO` namespace|
|`Microsoft.VisualBasic.MyServices.RegistryProxy`|Registry-related types in the `Microsoft.Win32` namespace|
|`Microsoft.VisualBasic.MyServices.SpecialDirectoriesProxy`|`System.Environment.GetFolderPath*`|

#### Category

Visual Basic

#### Affected APIs

- `Microsoft.VisualBasic.MyServices`

***
