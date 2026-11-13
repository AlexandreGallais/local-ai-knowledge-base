---
title: "Breaking change: Nullable reference type annotations changed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/nullable-reference-type-annotations-changed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Nullable reference type annotations changed

Starting in ASP.NET Core 5.0, nullability annotations have been applied to parts of the code. From the outset of this effort, mistakes were expected in these annotations and fixes would need to be made. In ASP.NET Core 6.0, some previously applied annotations are being updated. Some of these changes are considered source breaking changes. The changes lead to the APIs being incompatible or more restrictive. The updated APIs may result in build-time warnings when used in projects that have nullable reference types enabled.

For discussion, see GitHub issue dotnet/aspnetcore#27564.

## Version introduced

ASP.NET Core 6.0

## Old behavior

The affected APIs have incorrect nullable reference type annotations. Build warnings are either absent or incorrect.

## New behavior

New build warnings are produced. Incorrect build warnings are no longer produced for the affected APIs.

## Reason for change

Through feedback and further testing, the nullable annotations for the affected APIs were determined to be inaccurate. The updated annotations now correctly represent the nullability contracts for the APIs.

## Recommended action

Update code calling these APIs to reflect the revised nullability contracts.

## Affected APIs

* `Microsoft.AspNetCore.Components.ParameterView.FromDictionary*`
* `Microsoft.AspNetCore.Components.RenderTree.Renderer.DispatchEventAsync*`
* `Microsoft.AspNetCore.Components.RenderTree.RenderTreeEdit.RemovedAttributeName`
* `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector`
* `Microsoft.Net.Http.Headers.RangeConditionHeaderValue.#ctor*`
* `Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync*`
* `Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator`
* `Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance*`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance*`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance*`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance*`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance*`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor*`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository`
* `Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate*`
* `Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier*`
* `Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory`
* `Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey`
* `Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate*`
* `Microsoft.AspNetCore.Http.Endpoint.#ctor*`
* `Microsoft.AspNetCore.Http.Endpoint.RequestDelegate`
* `Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd*`
* `Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress*`
* `Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set*`
* `Microsoft.AspNetCore.Http.Features.FeatureCollection.Set*`
* `Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get*`
* `Microsoft.AspNetCore.Authentication.Cookies.ITicketStore.RetrieveAsync*`
* `Microsoft.AspNetCore.Http.Features.IFeatureCollection.Get``1`
* `Microsoft.AspNetCore.Http.Features.IFeatureCollection.Set``1(``0)`
* `Microsoft.AspNetCore.Http.Features.FeatureCollection.Set``1(``0)`
* `Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.SetModelValue(System.String,System.Object,System.String)`
* `Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.Item(System.String)`
* `Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.#ctor*`
* `Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ClientValidatorItem.Validator`
* `Microsoft.AspNetCore.Http.Endpoint.#ctor*`
* `Microsoft.AspNetCore.Routing.RouteValueDictionary.TryAdd(System.String,System.Object)`>
* `Microsoft.AspNetCore.Routing.LinkGenerator.GetUriByAddress``1(``0,Microsoft.AspNetCore.Routing.RouteValueDictionary,System.String,Microsoft.AspNetCore.Http.HostString,Microsoft.AspNetCore.Http.PathString,Microsoft.AspNetCore.Http.FragmentString,Microsoft.AspNetCore.Routing.LinkOptions)`
* `Microsoft.AspNetCore.DataProtection.Infrastructure.IApplicationDiscriminator.Discriminator`
* `Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.AuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngCbcAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.CngGcmAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
* `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ManagedAuthenticatedEncryptorFactory.CreateEncryptorInstance(Microsoft.AspNetCore.DataProtection.KeyManagement.IKey)`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.IKey.CreateEncryptor`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.AuthenticatedEncryptorConfiguration`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlEncryptor`
* `Microsoft.AspNetCore.DataProtection.KeyManagement.KeyManagementOptions.XmlRepository`
* `Microsoft.AspNetCore.DataProtection.XmlEncryption.ICertificateResolver.ResolveCertificate(System.String)`
* `Microsoft.AspNetCore.DataProtection.DataProtectionUtilityExtensions.GetApplicationUniqueIdentifier(System.IServiceProvider)`
* `Microsoft.AspNetCore.DataProtection.Repositories.FileSystemXmlRepository.DefaultKeyStorageDirectory`
* `Microsoft.AspNetCore.DataProtection.Repositories.RegistryXmlRepository.DefaultRegistryKey`
* `Microsoft.AspNetCore.DataProtection.XmlEncryption.CertificateResolver.ResolveCertificate(System.String)`
* `Microsoft.AspNetCore.Connections.IConnectionListener.AcceptAsync(System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector`
* `Microsoft.Net.Http.Headers.RangeConditionHeaderValue.#ctor(Microsoft.Net.Http.Headers.EntityTagHeaderValue)`
* `Microsoft.AspNetCore.Http.Connections.Features.IHttpContextFeature.HttpContext`
* `Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithError*`
* `Microsoft.AspNetCore.SignalR.Protocol.CompletionMessage.WithResult*`
* `Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.Arguments`
* `Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.#ctor(System.String,System.String,System.Object[])`
* `Microsoft.AspNetCore.SignalR.Protocol.HubMethodInvocationMessage.#ctor(System.String,System.String,System.Object[],System.String[])`
* `Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.#ctor(System.String,System.Object[])`
* `Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.#ctor(System.String,System.String,System.Object[])`
* `Microsoft.AspNetCore.SignalR.Protocol.InvocationMessage.#ctor(System.String,System.String,System.Object[],System.String[])`
* `Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.#ctor(System.String,System.String,System.Object[])`
* `Microsoft.AspNetCore.SignalR.Protocol.StreamInvocationMessage.#ctor(System.String,System.String,System.Object[],System.String[])`
* `Microsoft.AspNetCore.SignalR.Protocol.IHubProtocol.TryParseMessage(System.Buffers.ReadOnlySequence{System.Byte}@,Microsoft.AspNetCore.SignalR.IInvocationBinder,Microsoft.AspNetCore.SignalR.Protocol.HubMessage@)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendAllAsync(System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendAllExceptAsync(System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendConnectionAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendGroupAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendGroupExceptAsync(System.String,System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendGroupsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendUserAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendUsersAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendAllAsync(System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendAllExceptAsync(System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendConnectionAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendConnectionsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendGroupAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendGroupExceptAsync(System.String,System.String,System.Object[],System.Collections.Generic.IReadOnlyList{System.String},System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendGroupsAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendUserAsync(System.String,System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.DefaultHubLifetimeManager`1.SendUsersAsync(System.Collections.Generic.IReadOnlyList{System.String},System.String,System.Object[],System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.SignalR.IClientProxy.SendCoreAsync*`
* `Microsoft.AspNetCore.SignalR.HubConnectionContext.User`
* `Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseNullableQuery(System.String)`
* `Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(System.String)`

## See also

- Nullable reference type annotation changes in core .NET libraries
