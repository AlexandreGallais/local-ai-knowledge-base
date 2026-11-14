---
title: "Unsupported APIs on .NET Core and .NET 5+ (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/unsupported-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# APIs that always throw exceptions on .NET (Core)

The following APIs always throw an exception on .NET (Core) on all or a subset of platforms. In most cases, the exception that's thrown is `System.PlatformNotSupportedException`.

This article organizes the affected APIs by namespace.

> **Note:**
>
> - This article is a work-in-progress. It is not a complete list of APIs that throw exceptions on .NET 5+.
> - This article does not include the explicit interface implementations for binary serialization that throw on .NET 5+. For more information, see Binary serialization in .NET Core.

## System

| Member                                                               | Platforms that throw |
|----------------------------------------------------------------------|----------------------|
| `System.AppDomain.CreateDomain*` | All                  |
| `System.AppDomain.ExecuteAssembly(System.String,System.String[],System.Byte[],System.Configuration.Assemblies.AssemblyHashAlgorithm)` | All |
| `System.AppDomain.Unload(System.AppDomain)` | All |
| `System.Console.CapsLock` | Linux and macOS |
| `System.Console.NumberLock` | Linux and macOS |
| `System.Delegate.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Exception.SerializeObjectState` | All |
| `System.MarshalByRefObject.GetLifetimeService` | All |
| `System.MarshalByRefObject.InitializeLifetimeService` | All |
| `System.OperatingSystem.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Type.ReflectionOnlyGetType(System.String,System.Boolean,System.Boolean)` | All |

## System.CodeDom.Compiler

| Member | Platforms that throw |
|--------|----------------------|
| `System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromDom*` | All |
| `System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromFile*` | All |
| `System.CodeDom.Compiler.CodeDomProvider.CompileAssemblyFromSource*` | All |

## System.Collections.Specialized

| Member | Platforms that throw |
|--------|----------------------|
| `System.Collections.Specialized.NameObjectCollectionBase.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Collections.Specialized.NameObjectCollectionBase.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Collections.Specialized.NameObjectCollectionBase.OnDeserialization(System.Object)` | All |

## System.Configuration

| Member | Platforms that throw |
|--------|----------------------|
| `System.Configuration.RsaProtectedConfigurationProvider` (all members) | All |

## System.Console

| Member | Platforms that throw |
|--------|----------------------|
| `System.Console.Beep` | Linux and macOS |
| `System.Console.BufferHeight` (set only) | Linux and macOS |
| `System.Console.BufferWidth` (set only) | Linux and macOS |
| `System.Console.CursorSize` (set only) | Linux and macOS |
| `System.Console.CursorVisible` (get only) | Linux and macOS |
| `System.Console.MoveBufferArea*` | Linux and macOS |
| `System.Console.SetWindowPosition*` | Linux and macOS |
| `System.Console.SetWindowSize*` | Linux and macOS |
| `System.Console.Title` (get only) | Linux and macOS |
| `System.Console.WindowHeight` (set only) | Linux and macOS |
| `System.Console.WindowLeft` (set only) | Linux and macOS |
| `System.Console.WindowTop` (set only) | Linux and macOS |
| `System.Console.WindowWidth` (set only) | Linux and macOS |

## System.Diagnostics.Process

| Member | Platforms that throw |
|--------|----------------------|
| `System.Diagnostics.Process.MaxWorkingSet` (set only) | Linux |
| `System.Diagnostics.Process.MinWorkingSet` (set only) | Linux |
| `System.Diagnostics.Process.ProcessorAffinity` | macOS |
| `System.Diagnostics.Process.MainWindowHandle` | Linux and macOS |
| `System.Diagnostics.Process.Start(System.String,System.String,System.String,System.Security.SecureString,System.String)` | Linux and macOS |
| `System.Diagnostics.Process.Start(System.String,System.String,System.Security.SecureString,System.String)` | Linux and macOS |
| `System.Diagnostics.ProcessStartInfo.UserName` | Linux and macOS |
| `System.Diagnostics.ProcessStartInfo.PasswordInClearText` | Linux and macOS |
| `System.Diagnostics.ProcessStartInfo.Domain` | Linux and macOS |
| `System.Diagnostics.ProcessStartInfo.LoadUserProfile` | Linux and macOS |
| `System.Diagnostics.ProcessThread.BasePriority` (set only) | Linux and macOS |
| `System.Diagnostics.ProcessThread.BasePriority` (get only) | macOS |
| `System.Diagnostics.ProcessThread.ProcessorAffinity` (set only) | Linux and macOS |

## System.IO

| Member | Platforms that throw |
|--------|----------------------|
| `System.IO.FileSystemInfo.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.IO.FileSystemInfo.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |

## System.IO.Pipes

| Member | Platforms that throw |
|--------|----------------------|
| `System.IO.Pipes.NamedPipeClientStream.NumberOfServerInstances` | Linux and macOS |
| `System.IO.Pipes.NamedPipeServerStream.GetImpersonationUserName` | Linux and macOS |
| `System.IO.Pipes.PipeStream.InBufferSize` | Linux and macOS |
| `System.IO.Pipes.PipeStream.OutBufferSize` | Linux and macOS |
| `System.IO.Pipes.PipeStream.ReadMode` (set only) | Linux and macOS |
| `System.IO.Pipes.PipeStream.WaitForPipeDrain` | Linux and macOS |

## System.Media

| Member | Platforms that throw |
|--------|----------------------|
| `System.Media.SoundPlayer.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |

## System.Net

| Member                                                            | Platforms that throw |
|-------------------------------------------------------------------|----------------------|
| `System.Net.AuthenticationManager`\* | All                  |
| `System.Net.AuthenticationManager.Authenticate(System.String,System.Net.WebRequest,System.Net.ICredentials)` | All |
| `System.Net.AuthenticationManager.PreAuthenticate(System.Net.WebRequest,System.Net.ICredentials)` | All |
| `System.Net.FileWebRequest.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.FileWebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.FileWebResponse.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.FileWebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.HttpWebRequest.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.HttpWebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.HttpWebResponse.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.HttpWebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.WebProxy.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.WebProxy.GetDefaultProxy` | All |
| `System.Net.WebProxy.GetObjectData*` | All |
| `System.Net.WebRequest.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.WebRequest.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.WebResponse.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Net.WebResponse.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |

\* .NET 9 and later versions.

## System.Net.NetworkInformation

| Member | Platforms that throw |
|--------|----------------------|
| `System.Net.NetworkInformation.Ping.Send*` | Windows (UWP) |

## System.Net.Sockets

| Member | Platforms that throw |
|--------|----------------------|
| `System.Net.Sockets.Socket.#ctor(System.Net.Sockets.SocketInformation)` | All |
| `System.Net.Sockets.Socket.DuplicateAndClose(System.Int32)` | All |

## System.Net.WebSockets

| Member | Platforms that throw |
|--------|----------------------|
| `System.Net.WebSockets.WebSocket.RegisterPrefixes` | All |

## System.Reflection

| Member | Platforms that throw |
|--------|----------------------|
| `System.Reflection.Assembly.CodeBase` | All |
| `System.Reflection.Assembly.EscapedCodeBase` | All |
| `System.Reflection.Assembly.LoadFrom(System.String,System.Byte[],System.Configuration.Assemblies.AssemblyHashAlgorithm)` | All |
| `System.Reflection.Assembly.ReflectionOnlyLoad*` | All |
| `System.Reflection.Assembly.ReflectionOnlyLoadFrom(System.String)` | All |
| `System.Reflection.AssemblyName.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Reflection.AssemblyName.KeyPair` | All |
| `System.Reflection.AssemblyName.OnDeserialization(System.Object)` | All |
| `System.Reflection.StrongNameKeyPair.#ctor*` | All |
| `System.Reflection.StrongNameKeyPair.PublicKey` | All |

## System.Runtime.CompilerServices

| Member | Platforms that throw |
|--------|----------------------|
| `System.Runtime.CompilerServices.DebugInfoGenerator.CreatePdbGenerator` | All |

## System.Runtime.InteropServices

| Member | Platforms that throw |
|--------|----------------------|
| `System.Runtime.InteropServices.IDispatchImplAttribute` | All |
| `System.Runtime.InteropServices.Marshal.GetIDispatchForObject(System.Object)` | All |
| `System.Runtime.InteropServices.RuntimeEnvironment.SystemConfigurationFile` | All |
| `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(System.Guid,System.Guid)` | All |
| `System.Runtime.InteropServices.RuntimeEnvironment.GetRuntimeInterfaceAsObject(System.Guid,System.Guid)` | All |
| `System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.StringToHString(System.String)` | Linux and macOS |
| `System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.PtrToStringHString(System.IntPtr)` | Linux and macOS |
| `System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeMarshal.FreeHString(System.IntPtr)` | Linux and macOS |

## System.Runtime.Serialization

| Member | Platforms that throw |
|--------|----------------------|
| `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream,System.Object)`\* | All |
| `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Serialize(System.IO.Stream,System.Object)`† | All |
| `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize(System.IO.Stream)`† | All |
| `System.Runtime.Serialization.XsdDataContractExporter.Schemas` | All |

\* .NET 9 and later versions.
† .NET 8 only for all project types except Windows Forms and WPF.

## System.Security

| Member | Platforms that throw |
|--------|----------------------|
| `System.Security.CodeAccessPermission.Deny` | All |
| `System.Security.CodeAccessPermission.PermitOnly` | All |
| `System.Security.PermissionSet.ConvertPermissionSet(System.String,System.Byte[],System.String)` | All |
| `System.Security.PermissionSet.Deny` | All |
| `System.Security.PermissionSet.PermitOnly` | All |
| `System.Security.SecurityContext.Capture` | All |
| `System.Security.SecurityContext.CreateCopy` | All |
| `System.Security.SecurityContext.Dispose` | All |
| `System.Security.SecurityContext.IsFlowSuppressed` | All |
| `System.Security.SecurityContext.IsWindowsIdentityFlowSuppressed` | All |
| `System.Security.SecurityContext.RestoreFlow` | All |
| `System.Security.SecurityContext.Run(System.Security.SecurityContext,System.Threading.ContextCallback,System.Object)` | All |
| `System.Security.SecurityContext.SuppressFlow` | All |
| `System.Security.SecurityContext.SuppressFlowWindowsIdentity` | All |

## System.Security.Claims

| Member | Platforms that throw |
|--------|----------------------|
| `System.Security.Claims.ClaimsPrincipal.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Security.Claims.ClaimsPrincipal.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Security.Claims.ClaimsIdentity.#ctor(System.Runtime.Serialization.SerializationInfo)` | All |
| `System.Security.Claims.ClaimsIdentity.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
| `System.Security.Claims.ClaimsIdentity.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)` | All |
