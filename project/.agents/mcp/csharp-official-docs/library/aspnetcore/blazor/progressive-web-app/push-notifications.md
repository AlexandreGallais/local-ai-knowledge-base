---
title: "Push notifications for ASP.NET Core Blazor Progressive Web Applications (PWAs) (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/progressive-web-app/push-notifications.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Push notifications for ASP.NET Core Blazor Progressive Web Applications (PWAs)

Blazor PWAs can receive and display *push notifications* (data messages) from a backend server, even when the user isn't actively using the app. For example, push notifications can be sent when a different user performs an action in their installed PWA or when the app or users interacting directly with the backend server app perform an action.

Use push notifications to:

* Notify users that something important has happened, prompting them to return to the app.
* Update data stored in the app, such as a news feed, so the user has fresh data on their next return to the app, even if they're offline when the push notification is issued.

The mechanisms for sending, receiving, and displaying a push notification are independent of Blazor WebAssembly. Sending a push notification is implemented by the backend server, which can use any technology. Receiving and displaying a push notification on the client is implemented in the service worker JavaScript (JS) file.

The example in this article uses push notifications to provide order status updates to the customers of a pizza restaurant based on the Blazing Pizza Workshop PWA demonstration app. You aren't required to participate in the online workshop to use this article, but the workshop is a helpful introduction to Blazor PWA development.

> **Note:**
> The Blazing Pizza app adopts the *repository pattern* to create an abstraction layer between the UI layer and the data access layer. For more information, see Unit of Work (UoW) pattern and Designing the infrastructure persistence layer.

## Establish public and private keys

Generate the cryptographic public and private keys for securing push notifications either locally, for example with PowerShell or IIS, or using an online tool.

Placeholders used in this article's example code:

* `{PUBLIC KEY}`: The public key.
* `{PRIVATE KEY}`: The private key.

For this article's C# examples, update the `user@example.com` email address to match the address used when creating the custom key pair.

When implementing push notifications, ensure that cryptographic keys are managed securely:

* **Key <example-value>**: Use a trusted library or tool to generate the public and private keys. Avoid using weak or outdated algorithms.
* **Key <example-value>**: Store private keys securely on the server, using a secure storage mechanism such as a hardware security module (HSM) or encrypted storage. Never expose private keys to the client.
* **Key usage**: Use the private key only for signing push notification payloads. Ensure that the public key is distributed securely to clients.

For more information on cryptographic best practices, see Cryptographic Services.

## Create a subscription

Before sending push notifications to a user, the app must ask the user for permission. If they grant permission to receive notifications, their browser generates a *subscription*, which includes a set of tokens the app can use to route notifications to the user.

Permission can be obtained at any time by the app, but we only recommend asking users for permission when it's clear why they would want to subscribe for notifications from the app. The following example asks users when they arrive on the checkout page (`Checkout` component) because at that point it's clear that the user is serious about placing an order.

If the user agrees to receive notifications, the following example sends the push notification subscription data to the server, where push notification tokens are stored in the database for later use.

Add a push notifications JS file to request a subscription:

* Call `navigator.serviceWorker.getRegistration` to get the service worker's registration.
* Call `worker.pushManager.getSubscription` to determine if a subscription exists.
* If a subscription doesn'<example-value>'s URL and tokens.

In the Blazing Pizza app, the JS file is named `pushNotifications.js` and located in the public static assets folder (`wwwroot`) of the solution's Razor class library project (`BlazingPizza.ComponentsLibrary`). The `blazorPushNotifications.requestSubscription` function requests a subscription.

`BlazingPizza.ComponentsLibrary/wwwroot/pushNotifications.js`:

```javascript
(function () {
    const applicationServerPublicKey = '{PUBLIC KEY}';

    window.blazorPushNotifications = {
        requestSubscription: async () => {
            const worker = await navigator.serviceWorker.getRegistration();
            const existingSubscription = await worker.pushManager.getSubscription();
            if (!existingSubscription) {
                const newSubscription = await subscribe(worker);
                if (newSubscription) {
                    return {
                        url: newSubscription.endpoint,
                        p256dh: arrayBufferToBase64(newSubscription.getKey('p256dh')),
                        auth: arrayBufferToBase64(newSubscription.getKey('auth'))
                    };
                }
            }
        }
    };

    async function subscribe(worker) {
        try {
            return await worker.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: <example-value>
            });
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                return null;
            }
            throw error;
        }
    }

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
})();
```

> **Note:**
> For more information on the preceding `arrayBufferToBase64` function, see How can I convert an ArrayBuffer to a base64-encoded string? (Stack Overflow).

A subscription object and notification subscription endpoint is created on the server. The endpoint receives client web API calls with push notification subscription data, including cryptographic tokens. The data is stored in the database for each app user.

In the Blazing Pizza app, the subscription object is the `NotificationSubscription` class. The `P256dh` and `Auth` properties are the user's cryptographic tokens.

`BlazingPizza.Shared/NotificationSubscription.cs`:

```csharp
public class NotificationSubscription
{
    public int? NotificationSubscriptionId { get; set; }

    public string? UserId { get; set; }

    public string? Url { get; set; }

    public string? P256dh { get; set; }

    public string? Auth { get; set; }
}
```

The `notifications/subscribe` endpoint is defined in the app'<example-value>'s `Program` file to set up web API endpoints for the app. The user's notification subscription (`NotificationSubscription`), which includes their push notification tokens, is stored in the database. Only one subscription per user is stored. Alternatively, you could allow the user register multiple subscriptions from different browsers or devices.

```csharp
app.MapPut("/notifications/subscribe", 
    [Authorize] async (
    HttpContext context,
    PizzaStoreContext db,
    NotificationSubscription subscription) => 
    {
        var userId = GetUserId(context);

        if (userId is null)
        {
            return Results.Unauthorized();
        }

        // Remove old subscriptions for this user
        var oldSubscriptions = db.NotificationSubscriptions.Where(
            e => e.UserId == userId);
        db.NotificationSubscriptions.RemoveRange(oldSubscriptions);

        // Store the new subscription
        subscription.UserId = userId;
        db.NotificationSubscriptions.Add(subscription);

        await db.SaveChangesAsync();

        return Results.Ok(subscription);
    });
```

In `BlazingPizza.Client/HttpRepository.cs`, the `SubscribeToNotifications` method issues an HTTP PUT to the subscriptions endpoint on the server:

```csharp
public class HttpRepository : IRepository
{

	private readonly HttpClient _httpClient;

	public HttpRepository(HttpClient httpClient)
	{
		_httpClient = httpClient;
	}

    ...

    public async Task SubscribeToNotifications(NotificationSubscription subscription)
	    {
		    var response = await _httpClient.PutAsJsonAsync("notifications/subscribe", 
                subscription);
		    response.EnsureSuccessStatusCode();
	}
}
```

The repository interface (`BlazingPizza.Shared/IRepository.cs`) includes the method signature of `SubscribeToNotifications`:

```csharp
public interface IRepository
{
    ...

	Task SubscribeToNotifications(NotificationSubscription subscription);
}
```

Define a method to request a subscription and subscribe to notifications if the subscription is established. Save the subscription in the database for later use.

In the `Checkout` component of the Blazing Pizza app, the `RequestNotificationSubscriptionAsync` method performs the following duties:

* The subscription is created via JS interop by calling `blazorPushNotifications.requestSubscription`. The component injects the `Microsoft.JSInterop.IJSRuntime` service to invoke the JS function.
* The `SubscribeToNotifications` method is called to save the subscription.

In `BlazingPizza.Client/Components/Pages/Checkout.razor`:

```csharp
async Task RequestNotificationSubscriptionAsync()
{
    var subscription = await JSRuntime.InvokeAsync<NotificationSubscription>(
        "blazorPushNotifications.requestSubscription");

    if (subscription is not null)
    {
        try
        {
            await Repository.SubscribeToNotifications(subscription);
        }
        catch (AccessTokenNotAvailableException ex)
        {
            ex.Redirect();
        }
    }
}
```

In the `Checkout` component, `RequestNotificationSubscriptionAsync` is called in the `OnInitialized` lifecycle method and executes on component initialization. The method is asynchronous, but it can run in the background, and the `System.Threading.Tasks.Task` that it returns can be discarded. Therefore, the method isn't called in the asynchronous lifecycle method for component initialization (`OnInitializedAsync`). This approach renders the component faster.

```csharp
protected override void OnInitialized()
{
    _ = RequestNotificationSubscriptionAsync();
}
```

To demonstrate how the code works, run the Blazing Pizza app and start placing an order. Go to the checkout screen to see the subscription request:

Choose **Allow** and check in the browser developer tools console for errors. You can set a breakpoint in the `PizzaApiExtensions`'s `MapPut("<example-value>"...)` code and run the app with debugging to inspect the incoming data from the browser. The data includes an endpoint URL and cryptographic tokens.

After the user has either allowed or blocked notifications for a given site, the browser won't ask again. To reset the permission for further testing for either Google Chrome or Microsoft Edge, select the "information" icon (&#x1F6C8;) to the left of the browser's address bar and change **Notifications** back to **Ask (default)**, as seen in the following image:

## Send a notification

Sending a notification involves performing some complex cryptographic operations on the server to protect the data in transit. The bulk of the complexity is handled for the app by a third-party NuGet package, `WebPush`, which is used by the server project (`BlazingPizza.Server`) in the Blazing Pizza app.

The `SendNotificationAsync` method dispatches order notifications using the captured subscription. The following code makes uses of `WebPush` APIs for dispatching the notification. The payload of the notification is JSON serialized and includes a message and a URL. The message is displayed to the user, and the URL allows the user to reach the pizza order associated with the notification. Additional parameters can be serialized as required for other notification scenarios.

> **Caution:**
> In the following example, we recommend using a secure approach for supplying the private key. When working locally in the `Development` environment, a private key can be provided to the app using the Secret <example-value> tool. In `Development`, `Staging`, and `Production` environments, Azure Key Vault with Azure Managed Identities can be used, noting in passing that to obtain a certificate's private key from a key vault that the certificate must have an exportable private key.

```csharp
private static async Task SendNotificationAsync(Order order, 
    NotificationSubscription subscription, string message)
{
    var publicKey = "{PUBLIC KEY}";
    var privateKey = "{PRIVATE KEY}";

    var pushSubscription = new PushSubscription(subscription.Url, 
        subscription.P256dh, subscription.Auth);
    var vapidDetails = new VapidDetails("mailto:<user@example.com>", publicKey, 
        privateKey);
    var webPushClient = new WebPushClient();

    try
    {
        var payload = JsonSerializer.Serialize(new
        {
            message,
            url = $"myorders/{order.OrderId}",
        });

        await webPushClient.SendNotificationAsync(pushSubscription, payload, 
            vapidDetails);
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"Error sending push notification: {ex.Message}");
    }
}
```

The preceding example enables the server to send notifications, but the browser doesn't react to notifications without additional logic. Displaying notifications is covered in the Display notifications section.

The browser's developer tools console indicates the arrival of notifications ten seconds after orders are placed in the Blazing Pizza app. On the **Application** tab, open the **Push Messaging** section. Select the circle to **Start recording**:
