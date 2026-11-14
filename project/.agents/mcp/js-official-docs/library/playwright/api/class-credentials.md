---
title: "class: Credentials (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-credentials.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Credentials
* since: v1.61

`Credentials` is a virtual WebAuthn authenticator scoped to a [BrowserContext]. It lets tests
register passkeys and answer `navigator.credentials.create()` / `navigator.credentials.get()`
ceremonies in the page, without a real authenticator or hardware security key.

There are three common ways to use it:

- **Seed a known credential.** The passkey <example-value> exists — for example, your backend provisioned
  it for a test user. Import it with [`method: Credentials.create`] so the app under test can sign
  in right away. See the first example below.
- **Capture a credential, then reuse it.** Let the app register a passkey once in a setup test,
  read it back with [`method: Credentials.get`], and seed it into later tests. See the second example below.
- **Save credentials in the storage state, restore later.** Let the app register a passkey in a
  setup test and save it as part of the storage state by setting [`option: BrowserContext.storageState.credentials`]. See authentication guide for examples.

**Usage: seed a known credential**

```js
const context = await browser.newContext();

// A passkey your backend already provisioned for a test user.
await context.credentials.create('example.com', {
  id: knownCredentialId, // base64url
  userHandle: knownUserHandle, // base64url
  privateKey: <example-value>, // base64url PKCS#8 (DER)
  publicKey: <example-value>, // base64url SPKI (DER)
});
await context.credentials.install();

const page = await context.newPage();
await page.goto('https://example.com/login');
// The page's navigator.credentials.get() is answered with the seeded passkey.
```

```java
BrowserContext context = browser.newContext();

// A passkey your backend already provisioned for a test user.
context.credentials().create("example.com", new Credentials.CreateOptions()
    .setId(knownCredentialId) // base64url
    .setUserHandle(knownUserHandle) // base64url
    .setPrivateKey(knownPrivateKey) // base64url PKCS#8 (DER)
    .setPublicKey(knownPublicKey)); // base64url SPKI (DER)
context.credentials().install();

Page page = context.newPage();
page.navigate("https://example.com/login");
// The page's navigator.credentials.get() is answered with the seeded passkey.
```

```python
context = await browser.new_context()

# A passkey your backend already provisioned for a test user.
await context.credentials.create(
    "example.com",
    id=known_credential_id,  # base64url
    user_handle=known_user_handle,  # base64url
    private_key=<example-value>,  # base64url PKCS#8 (DER)
    public_key=<example-value>,  # base64url SPKI (DER)
)
await context.credentials.install()

page = await context.new_page()
await page.goto("https://example.com/login")
# The page's navigator.credentials.get() is answered with the seeded passkey.
```

```python
context = browser.new_context()

# A passkey your backend already provisioned for a test user.
context.credentials.create(
    "example.com",
    id=known_credential_id,  # base64url
    user_handle=known_user_handle,  # base64url
    private_key=<example-value>,  # base64url PKCS#8 (DER)
    public_key=<example-value>,  # base64url SPKI (DER)
)
context.credentials.install()

page = context.new_page()
page.goto("https://example.com/login")
# The page's navigator.credentials.get() is answered with the seeded passkey.
```

```csharp
var context = await browser.NewContextAsync();

// A passkey your backend already provisioned for a test user.
await context.Credentials.CreateAsync("example.com", new()
{
    Id = knownCredentialId, // base64url
    UserHandle = knownUserHandle, // base64url
    PrivateKey = <example-value>, // base64url PKCS#8 (DER)
    PublicKey = <example-value>, // base64url SPKI (DER)
});
await context.Credentials.InstallAsync();

var page = await context.NewPageAsync();
await page.GotoAsync("https://example.com/login");
// The page's navigator.credentials.get() is answered with the seeded passkey.
```

**Usage: capture a credential, then reuse it**

```js
// setup test: let the app register a passkey, then save the storage state with it.
const context = await browser.newContext();
await context.credentials.install();

const page = await context.newPage();
await page.goto('https://example.com/register');
await page.getByRole('button', { name: 'Create a passkey' }).click();

// Read back the passkey the page registered — it includes the private key.
const [credential] = await context.credentials.get({ rpId: 'example.com' });
fs.writeFileSync('playwright/.auth/passkey.json', JSON.stringify(credential));
```

```java
// setup test: let the app register a passkey, then save it.
BrowserContext context = browser.newContext();
context.credentials().install();

Page page = context.newPage();
page.navigate("https://example.com/register");
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Create a passkey")).click();

// Read back the passkey the page registered — it includes the private key.
VirtualCredential <example-value> = context.credentials().get(
    new Credentials.GetOptions().setRpId("example.com")).get(0);
Files.writeString(Paths.get("playwright/.auth/passkey.json"), new Gson().toJson(credential));
```

```python
# setup test: let the app register a passkey, then save it.
context = await browser.new_context()
await context.credentials.install()

page = await context.new_page()
await page.goto("https://example.com/register")
await page.get_by_role("button", name="Create a passkey").click()

# Read back the passkey the page registered — it includes the private key.
[credential] = await context.credentials.get(rp_id="example.com")
with open("playwright/.auth/passkey.json", "w") as f:
    json.dump(credential, f)
```

```python
# setup test: let the app register a passkey, then save it.
context = browser.new_context()
context.credentials.install()

page = context.new_page()
page.goto("https://example.com/register")
page.get_by_role("button", name="Create a passkey").click()

# Read back the passkey the page registered — it includes the private key.
[credential] = context.credentials.get(rp_id="example.com")
with open("playwright/.auth/passkey.json", "w") as f:
    json.dump(credential, f)
```

```csharp
// setup test: let the app register a passkey, then save it.
var context = await browser.NewContextAsync();
await context.Credentials.InstallAsync();

var page = await context.NewPageAsync();
await page.GotoAsync("https://example.com/register");
await page.GetByRole(AriaRole.Button, new() { Name = "Create a passkey" }).ClickAsync();

// Read back the passkey the page registered — it includes the private key.
var credentials = await context.Credentials.GetAsync(new() { RpId = "example.com" });
File.WriteAllText("playwright/.auth/passkey.json", JsonSerializer.Serialize(credentials[0]));
```

```js
// later test: seed the captured passkey so the app starts already enrolled.
const credential = JSON.parse(fs.readFileSync('playwright/.auth/passkey.json', 'utf8'));
const context = await browser.newContext();
await context.credentials.create(credential.rpId, credential);
await context.credentials.install();

const page = await context.newPage();
await page.goto('https://example.com/login');
// navigator.credentials.get() resolves the captured passkey — already signed in.
```

```java
// later test: seed the captured passkey so the app starts already enrolled.
VirtualCredential <example-value> = new Gson().fromJson(
    Files.readString(Paths.get("playwright/.auth/passkey.json")), VirtualCredential.class);
BrowserContext context = browser.newContext();
context.credentials().create(credential.rpId, new Credentials.CreateOptions()
    .setId(credential.id)
    .setUserHandle(credential.userHandle)
    .setPrivateKey(credential.privateKey)
    .setPublicKey(credential.publicKey)
    .setSignCount(credential.signCount));
context.credentials().install();

Page page = context.newPage();
page.navigate("https://example.com/login");
// navigator.credentials.get() resolves the captured passkey — already signed in.
```

```python
# later test: seed the captured passkey so the app starts already enrolled.
with open("playwright/.auth/passkey.json") as f:
    credential = json.load(f)
context = await browser.new_context()
await context.credentials.create(
    credential["rpId"],
    id=credential["id"],
    user_handle=credential["userHandle"],
    private_key=<example-value>["privateKey"],
    public_key=<example-value>["publicKey"],
    sign_count=credential["signCount"],
)
await context.credentials.install()

page = await context.new_page()
await page.goto("https://example.com/login")
# navigator.credentials.get() resolves the captured passkey — already signed in.
```

```python
# later test: seed the captured passkey so the app starts already enrolled.
with open("playwright/.auth/passkey.json") as f:
    credential = json.load(f)
context = browser.new_context()
context.credentials.create(
    credential["rpId"],
    id=credential["id"],
    user_handle=credential["userHandle"],
    private_key=<example-value>["privateKey"],
    public_key=<example-value>["publicKey"],
    sign_count=credential["signCount"],
)
context.credentials.install()

page = context.new_page()
page.goto("https://example.com/login")
# navigator.credentials.get() resolves the captured passkey — already signed in.
```

```csharp
// later test: seed the captured passkey so the app starts already enrolled.
var credential = JsonSerializer.Deserialize<VirtualCredential>(
    File.ReadAllText("playwright/.auth/passkey.json"));
var context = await browser.NewContextAsync();
await context.Credentials.CreateAsync(credential.RpId, new()
{
    Id = credential.Id,
    UserHandle = credential.UserHandle,
    PrivateKey = credential.PrivateKey,
    PublicKey = credential.PublicKey,
    SignCount = credential.SignCount,
});
await context.Credentials.InstallAsync();

var page = await context.NewPageAsync();
await page.GotoAsync("https://example.com/login");
// navigator.credentials.get() resolves the captured passkey — already signed in.
```

**Usage: save credentials in the storage state, restore later**

See authentication guide for examples of using saving and restoring the storage state.

**Defaults**

- The authenticator presents itself as a **platform** authenticator (`authenticatorAttachment` is
  `'platform'`), and `PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()` resolves
  to `true` in the page.
- Seeded credentials are **discoverable** (resident), so both username-then-passkey and
  usernameless passkey flows resolve them.
- Fresh keys are ECDSA P-256 (COSE algorithm `-7`). An omitted `id` or `userHandle` is
  filled with 16 random bytes.
- The signature counter of a fresh credential <example-value> at `0` and is incremented by one on every
  successful `navigator.credentials.get()` assertion. Pass [`option: Credentials.create.signCount`] to seed a different value.

## async method: Credentials.install
* since: v1.61

Installs the virtual WebAuthn authenticator into the context, overriding
`navigator.credentials.create()` and `navigator.credentials.get()` in all current
and future pages. Call this before the page first touches `navigator.credentials`.

Required: until [`method: Credentials.install`] is called, no interception is in place and the page sees
the platform's native (or absent) WebAuthn behaviour. Seeding credentials with
[`method: Credentials.create`] without installing populates the authenticator, but the
page will never see those credentials.

## async method: Credentials.create
* since: v1.61
- returns: "VirtualCredential" <[Object]>
  - `id` <[string]> Base64url-encoded credential id.
  - `rpId` <[string]> Relying party id.
  - `userHandle` <[string]> Base64url-encoded user handle.
  - `privateKey` <[string]> Base64url-encoded PKCS#8 (DER) private key.
  - `publicKey` <[string]> Base64url-encoded SPKI (DER) public key.
  - `signCount` <[int]> Signature counter, the value reported to the relying party in the most recent assertion.

Seeds a virtual WebAuthn credential and returns it.

With only [`param: Credentials.create.rpId`], generates a fresh **ECDSA P-256** keypair, credential id and user handle. The
seeded credential is discoverable (resident), so the page can resolve it from both
username-then-passkey and usernameless passkey flows. The returned object carries the private and public keys, so it can be persisted to disk and re-seeded in a later test.

To **import a known credential**, supply all four of [`option: Credentials.create.id`], [`option: Credentials.create.userHandle`], [`option: Credentials.create.privateKey`] and
[`option: Credentials.create.publicKey`] together. Pass [`option: Credentials.create.signCount`] as well to continue from the
signature counter the relying party has already seen.

Call [`method: Credentials.install`] before navigating to a page that uses WebAuthn.

### param: Credentials.create.rpId
* since: v1.61
- `rpId` <[string]>

Relying party id (typically the site's effective domain).

### option: Credentials.create.id
* since: v1.61
- `id` <[string]>

Base64url-encoded credential id. Auto-generated if omitted.

### option: Credentials.create.userHandle
* since: v1.61
- `userHandle` <[string]>

Base64url-encoded user handle. Auto-generated if omitted.

### option: Credentials.create.privateKey
* since: v1.61
- `privateKey` <[string]>

Base64url-encoded PKCS#8 (DER) private key. Auto-generated if omitted.

### option: Credentials.create.publicKey
* since: v1.61
- `publicKey` <[string]>

Base64url-encoded SPKI (DER) public key. Auto-generated if omitted.

### option: Credentials.create.signCount
* since: v1.64
- `signCount` <[int]>

Initial value of the signature counter. The counter is incremented by one on
every successful `navigator.credentials.get()` assertion, so the first assertion reports `signCount + 1`. Defaults to `0`.

## async method: Credentials.delete
* since: v1.61

Removes a credential from the authenticator by its id. Works for any credential <example-value> held —
both those seeded with [`method: Credentials.create`] and those the page registered itself by
calling `navigator.credentials.create()`.

### param: Credentials.delete.id
* since: v1.61
- `id` <[string]>

Base64url-encoded credential id.
