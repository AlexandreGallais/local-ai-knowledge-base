---
title: "Breaking change: Most code access security APIs are obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/code-access-security-apis-obsolete.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Most code access security APIs are obsolete

Most code access security (CAS)-related types in .NET are now obsolete as warning. This includes CAS attributes, such as `System.Security.Permissions.SecurityPermissionAttribute`, CAS permission objects, such as `System.Net.SocketPermission`, `System.Security.Policy.EvidenceBase`-derived types, and other supporting APIs.

## Change description

In .NET Framework 2.x - 4.x, CAS attributes and APIs can influence the course of code execution, including ensuring that CAS-demand stack walks succeed or fail.

```csharp
// In .NET Framework, the attribute causes CAS stack walks
// to terminate successfully when this permission is demanded.
[SocketPermission(SecurityAction.Assert, Host = "contoso.com", Port = "443")]
public void DoSomething()
{
    // open a socket to contoso.com:443
}
```

In .NET Core 2.x - 3.x, the runtime does not honor CAS attributes or CAS APIs. The runtime ignores attributes on method entry, and most programmatic APIs have no effect.

```csharp
// The .NET Core runtime ignores the following attribute.
[SocketPermission(SecurityAction.Assert, Host = "contoso.com", Port = "443")]
public void DoSomething()
{
    // open a socket to contoso.com:443
}
```

Additionally, programmatic calls to expansive APIs (`Assert`) always succeed, while programmatic calls to restrictive APIs (`Deny`, `PermitOnly`) always throw an exception at runtime. (`System.Security.Permissions.PrincipalPermission` is an exception to this rule. See the Recommended action section below.)

```csharp
public void DoAssert()
{
    // The line below has no effect at runtime.
    new SocketPermission(PermissionState.Unrestricted).Assert();
}

public void DoDeny()
{
    // The line below throws PlatformNotSupportedException at runtime.
    new SocketPermission(PermissionState.Unrestricted).Deny();
}
```

In .NET 5 and later versions, most CAS-related APIs are obsolete and produce compile-time warning `SYSLIB0003`.

```csharp
[SocketPermission(SecurityAction.Assert, Host = "contoso.com", Port = "443")] // warning SYSLIB0003
public void DoSomething()
{
    new SocketPermission(PermissionState.Unrestricted).Assert(); // warning SYSLIB0003
    new SocketPermission(PermissionState.Unrestricted).Deny(); // warning SYSLIB0003
}
```

This is a compile-time only change. There is no runtime change from previous versions of .NET Core. Methods that perform no operation in .NET Core 2.x - 3.x will continue to perform no operation at runtime in .NET 5 and later. Methods that throw `System.PlatformNotSupportedException` in .NET Core 2.x - 3.x will continue to throw a `System.PlatformNotSupportedException` at runtime in .NET 5 and later.

## Reason for change

Code access security (CAS) is an unsupported legacy technology. The infrastructure to enable CAS exists only in .NET Framework 2.x - 4.x, but is deprecated and not receiving servicing or security fixes.

Due to CAS's deprecation, the supporting infrastructure was not brought forward to .NET Core or .NET 5+. However, the APIs were brought forward so that apps could cross-compile against .NET Framework and .NET Core. This led to "fail open" scenarios, where some CAS-related APIs exist and are callable but perform no action at runtime. This can lead to security issues for components that expect the runtime to honor CAS-related attributes or programmatic API calls. To better communicate that the runtime doesn't respect these attributes or APIs, we have obsoleted the majority of them in .NET 5.0.

## Version introduced

5.0

## Recommended action

- If you're asserting any security permission, remove the attribute or call that asserts the permission.

  ```csharp
  // REMOVE the attribute below.
  [SecurityPermission(SecurityAction.Assert, ControlThread = true)]
  public void DoSomething()
  {
  }

  public void DoAssert()
  {
      // REMOVE the line below.
      new SecurityPermission(SecurityPermissionFlag.ControlThread).Assert();
  }
  ```

- If you're denying or restricting (via `PermitOnly`) any permission, contact your security advisor. Because CAS attributes are not honored by the .NET 5+ runtime, your application could have a security hole if it incorrectly relies on the CAS infrastructure to restrict access to these methods.

  ```csharp
  // REVIEW the attribute below; could indicate security vulnerability.
  [SecurityPermission(SecurityAction.Deny, ControlThread = true)]
  public void DoSomething()
  {
  }

  public void DoPermitOnly()
  {
      // REVIEW the line below; could indicate security vulnerability.
      new SecurityPermission(SecurityPermissionFlag.ControlThread).PermitOnly();
  }
  ```

- If you're demanding any permission (except `System.Security.Permissions.PrincipalPermission`), remove the demand. All demands will succeed at runtime.

  ```csharp
  // REMOVE the attribute below; it will always succeed.
  [SecurityPermission(SecurityAction.Demand, ControlThread = true)]
  public void DoSomething()
  {
  }

  public void DoDemand()
  {
      // REMOVE the line below; it will always succeed.
      new SecurityPermission(SecurityPermissionFlag.ControlThread).Demand();
  }
  ```

- If you're demanding `System.Security.Permissions.PrincipalPermission`, consult the guidance for PrincipalPermissionAttribute is obsolete as error. That guidance applies for both `System.Security.Permissions.PrincipalPermission` and `System.Security.Permissions.PrincipalPermissionAttribute`.

- If you absolutely must disable these warnings (which is not recommended), you can suppress the `SYSLIB0003` warning in code.

  ```csharp
  #pragma warning disable SYSLIB0003 // disable the warning
  [SecurityPermission(SecurityAction.Demand, ControlThread = true)]
  #pragma warning restore SYSLIB0003 // re-enable the warning
  public void DoSomething()
  {
  }

  public void DoDemand()
  {
  #pragma warning disable SYSLIB0003 // disable the warning
      new SecurityPermission(SecurityPermissionFlag.ControlThread).Demand();
  #pragma warning restore SYSLIB0003 // re-enable the warning
  }
  ```

  You can also suppress the warning in your project file. Doing so disables the warning for all source files within the project.

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">
    <PropertyGroup>
      <TargetFramework>net5.0</TargetFramework>
      <!-- NoWarn below suppresses SYSLIB0003 project-wide -->
      <NoWarn>$(NoWarn);SYSLIB0003</NoWarn>
    </PropertyGroup>
  </Project>
  ```

  > **Note:**
  > Suppressing `SYSLIB0003` disables only the CAS-related obsoletion warnings. It does not disable any other warnings or change the behavior of the .NET 5+ runtime.
- Security

## Affected APIs

- `System.AppDomain.PermissionSet`
- `System.Configuration.ConfigurationPermission`
- `System.Configuration.ConfigurationPermissionAttribute`
- `System.Data.Common.DBDataPermission`
- `System.Data.Common.DBDataPermissionAttribute`
- `System.Data.Odbc.OdbcPermission`
- `System.Data.Odbc.OdbcPermissionAttribute`
- `System.Data.OleDb.OleDbPermission`
- `System.Data.OleDb.OleDbPermissionAttribute`
- `System.Data.OracleClient.OraclePermission`
- `System.Data.OracleClient.OraclePermissionAttribute`
- `System.Data.SqlClient.SqlClientPermission`
- `System.Data.SqlClient.SqlClientPermissionAttribute`
- `System.Diagnostics.EventLogPermission`
- `System.Diagnostics.EventLogPermissionAttribute`
- `System.Diagnostics.PerformanceCounterPermission`
- `System.Diagnostics.PerformanceCounterPermissionAttribute`
- `System.DirectoryServices.DirectoryServicesPermission`
- `System.DirectoryServices.DirectoryServicesPermissionAttribute`
- `System.Drawing.Printing.PrintingPermission`
- `System.Drawing.Printing.PrintingPermissionAttribute`
- `System.Net.DnsPermission`
- `System.Net.DnsPermissionAttribute`
- `System.Net.Mail.SmtpPermission`
- `System.Net.Mail.SmtpPermissionAttribute`
- `System.Net.NetworkInformation.NetworkInformationPermission`
- `System.Net.NetworkInformation.NetworkInformationPermissionAttribute`
- `System.Net.PeerToPeer.Collaboration.PeerCollaborationPermission`
- `System.Net.PeerToPeer.Collaboration.PeerCollaborationPermissionAttribute`
- `System.Net.PeerToPeer.PnrpPermission`
- `System.Net.PeerToPeer.PnrpPermissionAttribute`
- `System.Net.SocketPermission`
- `System.Net.SocketPermissionAttribute`
- `System.Net.WebPermission`
- `System.Net.WebPermissionAttribute`
- `System.Runtime.InteropServices.AllowReversePInvokeCallsAttribute`
- `System.Security.CodeAccessPermission`
- `System.Security.HostProtectionException`
- `System.Security.IPermission`
- `System.Security.IStackWalk`
- `System.Security.NamedPermissionSet`
- `System.Security.PermissionSet`
- `System.Security.Permissions.CodeAccessSecurityAttribute`
- `System.Security.Permissions.DataProtectionPermission`
- `System.Security.Permissions.DataProtectionPermissionAttribute`
- `System.Security.Permissions.DataProtectionPermissionFlags`
- `System.Security.Permissions.EnvironmentPermission`
- `System.Security.Permissions.EnvironmentPermissionAccess`
- `System.Security.Permissions.EnvironmentPermissionAttribute`
- `System.Security.Permissions.FileDialogPermission`
- `System.Security.Permissions.FileDialogPermissionAccess`
- `System.Security.Permissions.FileDialogPermissionAttribute`
- `System.Security.Permissions.FileIOPermission`
- `System.Security.Permissions.FileIOPermissionAccess`
- `System.Security.Permissions.FileIOPermissionAttribute`
- `System.Security.Permissions.GacIdentityPermission`
- `System.Security.Permissions.GacIdentityPermissionAttribute`
- `System.Security.Permissions.HostProtectionAttribute`
- `System.Security.Permissions.HostProtectionResource`
- `System.Security.Permissions.IUnrestrictedPermission`
- `System.Security.Permissions.IsolatedStorageContainment`
- `System.Security.Permissions.IsolatedStorageFilePermission`
- `System.Security.Permissions.IsolatedStorageFilePermissionAttribute`
- `System.Security.Permissions.IsolatedStoragePermission`
- `System.Security.Permissions.IsolatedStoragePermissionAttribute`
- `System.Security.Permissions.KeyContainerPermission`
- `System.Security.Permissions.KeyContainerPermissionAccessEntry`
- `System.Security.Permissions.KeyContainerPermissionAccessEntryCollection`
- `System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator`
- `System.Security.Permissions.KeyContainerPermissionAttribute`
- `System.Security.Permissions.KeyContainerPermissionFlags`
- `System.Security.Permissions.MediaPermission`
- `System.Security.Permissions.MediaPermissionAttribute`
- `System.Security.Permissions.MediaPermissionAudio`
- `System.Security.Permissions.MediaPermissionImage`
- `System.Security.Permissions.MediaPermissionVideo`
- `System.Security.Permissions.PermissionSetAttribute`
- `System.Security.Permissions.PermissionState`
- `System.Security.Permissions.PrincipalPermission`
- `System.Security.Permissions.PrincipalPermissionAttribute`
- `System.Security.Permissions.PublisherIdentityPermission`
- `System.Security.Permissions.PublisherIdentityPermissionAttribute`
- `System.Security.Permissions.ReflectionPermission`
- `System.Security.Permissions.ReflectionPermissionAttribute`
- `System.Security.Permissions.ReflectionPermissionFlag`
- `System.Security.Permissions.RegistryPermission`
- `System.Security.Permissions.RegistryPermissionAccess`
- `System.Security.Permissions.RegistryPermissionAttribute`
- `System.Security.Permissions.ResourcePermissionBase`
- `System.Security.Permissions.ResourcePermissionBaseEntry`
- `System.Security.Permissions.SecurityAction`
- `System.Security.Permissions.SecurityAttribute`
- `System.Security.Permissions.SecurityPermission`
- `System.Security.Permissions.SecurityPermissionAttribute`
- `System.Security.Permissions.SecurityPermissionFlag`
- `System.Security.Permissions.SiteIdentityPermission`
- `System.Security.Permissions.SiteIdentityPermissionAttribute`
- `System.Security.Permissions.StorePermission`
- `System.Security.Permissions.StorePermissionAttribute`
- `System.Security.Permissions.StorePermissionFlags`
- `System.Security.Permissions.StrongNameIdentityPermission`
- `System.Security.Permissions.StrongNameIdentityPermissionAttribute`
- `System.Security.Permissions.StrongNamePublicKeyBlob`
- `System.Security.Permissions.TypeDescriptorPermission`
- `System.Security.Permissions.TypeDescriptorPermissionAttribute`
- `System.Security.Permissions.TypeDescriptorPermissionFlags`
- `System.Security.Permissions.UIPermission`
- `System.Security.Permissions.UIPermissionAttribute`
- `System.Security.Permissions.UIPermissionClipboard`
- `System.Security.Permissions.UIPermissionWindow`
- `System.Security.Permissions.UrlIdentityPermission`
- `System.Security.Permissions.UrlIdentityPermissionAttribute`
- `System.Security.Permissions.WebBrowserPermission`
- `System.Security.Permissions.WebBrowserPermissionAttribute`
- `System.Security.Permissions.WebBrowserPermissionLevel`
- `System.Security.Permissions.ZoneIdentityPermission`
- `System.Security.Permissions.ZoneIdentityPermissionAttribute`
- System.Security.Policy.ApplicationTrust.ApplicationTrust(PermissionSet, IEnumerable\<StrongName>)
- `System.Security.Policy.ApplicationTrust.FullTrustAssemblies`
- `System.Security.Policy.FileCodeGroup`
- `System.Security.Policy.GacInstalled`
- `System.Security.Policy.IIdentityPermissionFactory`
- `System.Security.Policy.PolicyLevel.AddNamedPermissionSet(System.Security.NamedPermissionSet)`
- `System.Security.Policy.PolicyLevel.ChangeNamedPermissionSet(System.String,System.Security.PermissionSet)`
- `System.Security.Policy.PolicyLevel.GetNamedPermissionSet(System.String)`
- `System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet*`
- `System.Security.Policy.PolicyStatement.PermissionSet`
- `System.Security.Policy.PolicyStatement.#ctor*`
- `System.Security.Policy.Publisher`
- `System.Security.Policy.Site`
- `System.Security.Policy.StrongName`
- `System.Security.Policy.StrongNameMembershipCondition`
- `System.Security.Policy.Url`
- `System.Security.Policy.Zone`
- `System.Security.SecurityManager`
- `System.ServiceProcess.ServiceControllerPermission`
- `System.ServiceProcess.ServiceControllerPermissionAttribute`
- `System.Transactions.DistributedTransactionPermission`
- `System.Transactions.DistributedTransactionPermissionAttribute`
- `System.Web.AspNetHostingPermission`
- `System.Web.AspNetHostingPermissionAttribute`
- `System.Xaml.Permissions.XamlLoadPermission`
