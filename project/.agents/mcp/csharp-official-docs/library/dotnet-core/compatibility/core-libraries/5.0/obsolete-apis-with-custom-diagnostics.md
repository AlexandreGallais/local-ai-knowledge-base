---
title: "Breaking change: .NET 5 API obsoletions with non-default diagnostic IDs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/obsolete-apis-with-custom-diagnostics.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# API obsoletions with non-default diagnostic IDs

Some APIs have been marked as obsolete, starting in .NET 5. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 5 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
| - | - |
| SYSLIB0001 | The UTF-7 encoding is insecure and should not be used. Consider using UTF-8 instead. | Warning |
| SYSLIB0002 | `System.Security.Permissions.PrincipalPermissionAttribute` is not honored by the runtime and must not be used. | Error |
| SYSLIB0003 | Code access security (CAS) is not supported or honored by the runtime. | Warning |
| SYSLIB0004 | The constrained execution region (CER) feature is not supported. | Warning |
| SYSLIB0005 | The global assembly cache (GAC) is not supported. | Warning |
| SYSLIB0006 | `System.Threading.Thread.Abort` is not supported and throws `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0007 | The default implementation of this cryptography algorithm is not supported. | Warning |
| SYSLIB0008 | The `System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator` API is not supported and throws `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0009 | The `System.Net.AuthenticationManager.Authenticate*` and `System.Net.AuthenticationManager.PreAuthenticate*` methods are not supported and throw `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0010 | Some remoting APIs are not supported and throw `System.PlatformNotSupportedException`. | Warning |
| SYSLIB0011 | `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` serialization is obsolete and should not be used. | Warning |
| SYSLIB0012 | `System.Reflection.Assembly.CodeBase` and `System.Reflection.Assembly.EscapedCodeBase` are only included for .NET Framework compatibility. Use `System.Reflection.Assembly.Location` instead. | Warning |

## Version introduced

.NET 5.0

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0001

- `System.Text.Encoding.UTF7`
- `System.Text.UTF7Encoding.#ctor*`

### SYSLIB0002

- `System.Security.Permissions.PrincipalPermissionAttribute.#ctor(System.Security.Permissions.SecurityAction)`

### SYSLIB0003

Classes in the `System.Security.Permissions` namespace:

- `System.Security.Permissions.CodeAccessSecurityAttribute`
- `System.Security.Permissions.DataProtectionPermission`
- `System.Security.Permissions.DataProtectionPermissionAttribute`
- `System.Security.Permissions.EnvironmentPermission`
- `System.Security.Permissions.EnvironmentPermissionAttribute`
- `System.Security.Permissions.FileDialogPermission`
- `System.Security.Permissions.FileDialogPermissionAttribute`
- `System.Security.Permissions.FileIOPermission`
- `System.Security.Permissions.FileIOPermissionAttribute`
- `System.Security.Permissions.GacIdentityPermission`
- `System.Security.Permissions.GacIdentityPermissionAttribute`
- `System.Security.Permissions.HostProtectionAttribute`
- `System.Security.Permissions.IsolatedStorageFilePermission`
- `System.Security.Permissions.IsolatedStorageFilePermissionAttribute`
- `System.Security.Permissions.IsolatedStoragePermission`
- `System.Security.Permissions.IsolatedStoragePermissionAttribute`
- `System.Security.Permissions.KeyContainerPermission`
- `System.Security.Permissions.KeyContainerPermissionAccessEntry`
- `System.Security.Permissions.KeyContainerPermissionAccessEntryCollection`
- `System.Security.Permissions.KeyContainerPermissionAccessEntryEnumerator`
- `System.Security.Permissions.KeyContainerPermissionAttribute`
- `System.Security.Permissions.MediaPermission`
- `System.Security.Permissions.MediaPermissionAttribute`
- `System.Security.Permissions.PermissionSetAttribute`
- `System.Security.Permissions.PrincipalPermission`
- `System.Security.Permissions.PrincipalPermissionAttribute`
- `System.Security.Permissions.PublisherIdentityPermission`
- `System.Security.Permissions.PublisherIdentityPermissionAttribute`
- `System.Security.Permissions.ReflectionPermission`
- `System.Security.Permissions.ReflectionPermissionAttribute`
- `System.Security.Permissions.RegistryPermission`
- `System.Security.Permissions.RegistryPermissionAttribute`
- `System.Security.Permissions.ResourcePermissionBase`
- `System.Security.Permissions.ResourcePermissionBaseEntry`
- `System.Security.Permissions.SecurityAttribute`
- `System.Security.Permissions.SecurityPermission`
- `System.Security.Permissions.SecurityPermissionAttribute`
- `System.Security.Permissions.SiteIdentityPermission`
- `System.Security.Permissions.SiteIdentityPermissionAttribute`
- `System.Security.Permissions.StorePermission`
- `System.Security.Permissions.StorePermissionAttribute`
- `System.Security.Permissions.StrongNameIdentityPermission`
- `System.Security.Permissions.StrongNameIdentityPermissionAttribute`
- `System.Security.Permissions.StrongNamePublicKeyBlob`
- `System.Security.Permissions.TypeDescriptorPermission`
- `System.Security.Permissions.TypeDescriptorPermissionAttribute`
- `System.Security.Permissions.UIPermission`
- `System.Security.Permissions.UIPermissionAttribute`
- `System.Security.Permissions.UrlIdentityPermission`
- `System.Security.Permissions.UrlIdentityPermissionAttribute`
- `System.Security.Permissions.WebBrowserPermission`
- `System.Security.Permissions.WebBrowserPermissionAttribute`
- `System.Security.Permissions.ZoneIdentityPermission`
- `System.Security.Permissions.ZoneIdentityPermissionAttribute`

Classes that derive from `CodeAccessSecurityAttribute`:

- `System.Configuration.ConfigurationPermissionAttribute`
- `System.Data.Common.DBDataPermissionAttribute`
- `System.Data.Odbc.OdbcPermissionAttribute`
- `System.Data.OleDb.OleDbPermissionAttribute`
- `System.Data.OracleClient.OraclePermissionAttribute`
- `System.Data.SqlClient.SqlClientPermissionAttribute`
- `System.Diagnostics.EventLogPermissionAttribute`
- `System.Diagnostics.PerformanceCounterPermissionAttribute`
- `System.DirectoryServices.DirectoryServicesPermissionAttribute`
- `System.Drawing.Printing.PrintingPermissionAttribute`
- `System.Net.DnsPermissionAttribute`
- `System.Net.SocketPermissionAttribute`
- `System.Net.WebPermissionAttribute`
- `System.Net.Mail.SmtpPermissionAttribute`
- `System.Net.NetworkInformation.NetworkInformationPermissionAttribute`
- `System.Net.PeerToPeer.PnrpPermissionAttribute`
- `System.Net.PeerToPeer.Collaboration.PeerCollaborationPermissionAttribute`
- `System.ServiceProcess.ServiceControllerPermissionAttribute`
- `System.Transactions.DistributedTransactionPermissionAttribute`
- `System.Web.AspNetHostingPermissionAttribute`

Interfaces:

- `System.Security.Permissions.IUnrestrictedPermission`
- `System.Security.IPermission`
- `System.Security.IStackWalk`
- `System.Security.Policy.IIdentityPermissionFactory`

Classes that implement `IStackWalk`:

- `System.Security.NamedPermissionSet`
- `System.Security.PermissionSet`

Classes that implement `IPermission`:

- `System.Security.CodeAccessPermission`

Classes that derive from `CodeAccessPermission`:

- `System.Configuration.ConfigurationPermission`
- `System.Data.Common.DBDataPermission`
- `System.Data.Odbc.OdbcPermission`
- `System.Data.OleDb.OleDbPermission`
- `System.Data.SqlClient.SqlClientPermission`
- `System.Data.OracleClient.OraclePermission`
- `System.Drawing.Printing.PrintingPermission`
- `System.Net.DnsPermission`
- `System.Net.SocketPermission`
- `System.Net.WebPermission`
- `System.Net.Mail.SmtpPermission`
- `System.Net.NetworkInformation.NetworkInformationPermission`
- `System.Net.PeerToPeer.PnrpPermission`
- `System.Net.PeerToPeer.Collaboration.PeerCollaborationPermission`
- `System.Transactions.DistributedTransactionPermission`
- `System.Web.AspNetHostingPermission`
- `System.Xaml.Permissions.XamlLoadPermission`

Classes that derive from `ResourcePermissionBase`:

- `System.Diagnostics.EventLogPermission`
- `System.Diagnostics.PerformanceCounterPermission`
- `System.DirectoryServices.DirectoryServicesPermission`
- `System.ServiceProcess.ServiceControllerPermission`

Enums in the `System.Security.Permissions` namespace:

- `System.Security.Permissions.DataProtectionPermissionFlags`
- `System.Security.Permissions.EnvironmentPermissionAccess`
- `System.Security.Permissions.FileDialogPermissionAccess`
- `System.Security.Permissions.FileIOPermissionAccess`
- `System.Security.Permissions.HostProtectionResource`
- `System.Security.Permissions.IsolatedStorageContainment`
- `System.Security.Permissions.KeyContainerPermissionFlags`
- `System.Security.Permissions.MediaPermissionAudio`
- `System.Security.Permissions.MediaPermissionImage`
- `System.Security.Permissions.MediaPermissionVideo`
- `System.Security.Permissions.PermissionState`
- `System.Security.Permissions.ReflectionPermissionFlag`
- `System.Security.Permissions.RegistryPermissionAccess`
- `System.Security.Permissions.SecurityAction`
- `System.Security.Permissions.SecurityPermissionFlag`
- `System.Security.Permissions.StorePermissionFlags`
- `System.Security.Permissions.TypeDescriptorPermissionFlags`
- `System.Security.Permissions.UIPermissionClipboard`
- `System.Security.Permissions.UIPermissionWindow`
- `System.Security.Permissions.WebBrowserPermissionLevel`

Classes and members that depend on code access security types:

- `System.AppDomain.ExecuteAssembly(System.String,System.String[],System.Byte[],System.Configuration.Assemblies.AssemblyHashAlgorithm)`
- `System.AppDomain.PermissionSet`
- `System.Runtime.InteropServices.AllowReversePInvokeCallsAttribute`
- `System.Security.HostProtectionException`
- `System.Security.Policy.FileCodeGroup`
- `System.Security.Policy.StrongName`
- `System.Security.Policy.StrongNameMembershipCondition`
- System.Security.Policy.ApplicationTrust.ApplicationTrust(PermissionSet, IEnumerable\<StrongName>)
- `System.Security.Policy.ApplicationTrust.FullTrustAssemblies`
- `System.Security.Policy.GacInstalled`
- `System.Security.Policy.PolicyStatement.#ctor*`
- `System.Security.Policy.PolicyLevel.AddNamedPermissionSet(System.Security.NamedPermissionSet)`
- `System.Security.Policy.PolicyLevel.ChangeNamedPermissionSet(System.String,System.Security.PermissionSet)`
- `System.Security.Policy.PolicyLevel.GetNamedPermissionSet(System.String)`
- `System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet(System.String)`
- `System.Security.Policy.PolicyLevel.RemoveNamedPermissionSet(System.Security.NamedPermissionSet)`
- `System.Security.Policy.PolicyStatement.PermissionSet`
- `System.Security.Policy.Publisher`
- `System.Security.Policy.Site`
- `System.Security.Policy.Url`
- `System.Security.Policy.Zone`
- `System.Security.SecurityManager`

### SYSLIB0004

- `System.Runtime.CompilerServices.RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup(System.Runtime.CompilerServices.RuntimeHelpers.TryCode,System.Runtime.CompilerServices.RuntimeHelpers.CleanupCode,System.Object)`
- `System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegions`
- `System.Runtime.CompilerServices.RuntimeHelpers.PrepareConstrainedRegionsNoOP`
- `System.Runtime.CompilerServices.RuntimeHelpers.PrepareContractedDelegate(System.Delegate)`
- `System.Runtime.CompilerServices.RuntimeHelpers.ProbeForSufficientStack`
- `System.Runtime.ConstrainedExecution.Cer`
- `System.Runtime.ConstrainedExecution.Consistency`
- `System.Runtime.ConstrainedExecution.PrePrepareMethodAttribute`
- `System.Runtime.ConstrainedExecution.ReliabilityContractAttribute`

### SYSLIB0005

- `System.Reflection.Assembly.GlobalAssemblyCache`

### SYSLIB0006

- `System.Threading.Thread.Abort`
- `System.Threading.Thread.Abort(System.Object)`

### SYSLIB0007

- `System.Security.Cryptography.AsymmetricAlgorithm.Create`
- `System.Security.Cryptography.HashAlgorithm.Create`
- `System.Security.Cryptography.HMAC.Create`
- `System.Security.Cryptography.KeyedHashAlgorithm.Create`
- `System.Security.Cryptography.SymmetricAlgorithm.Create`

### SYSLIB0008

- `System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator`

### SYSLIB0009

- `System.Net.AuthenticationManager.Authenticate*`
- `System.Net.AuthenticationManager.PreAuthenticate*`

### SYSLIB0010

- `System.MarshalByRefObject.GetLifetimeService`
- `System.MarshalByRefObject.InitializeLifetimeService`

### SYSLIB0011

- `System.Exception.SerializeObjectState`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize*`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*`
- `System.Runtime.Serialization.Formatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.Formatter.Deserialize(System.IO.Stream)`
- `System.Runtime.Serialization.IFormatter.Serialize(System.IO.Stream,System.Object)`
- `System.Runtime.Serialization.IFormatter.Deserialize(System.IO.Stream)`

### SYSLIB0012

- `System.Reflection.Assembly.CodeBase`
- `System.Reflection.Assembly.EscapedCodeBase`

## See also

- API obsoletions with non-default diagnostic IDs (.NET 6)
- API obsoletions with non-default diagnostic IDs (.NET 7)
- Obsolete features in .NET 5+
