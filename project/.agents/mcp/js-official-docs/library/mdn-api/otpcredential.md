---
title: "OTPCredential"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/otpcredential/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OTPCredential

The **`OTPCredential`** interface of the `WebOTP API` is returned when a WebOTP `navigator.credentials.get()` call (i.e., invoked with an `otp` option) fulfills. It includes a `code` property that contains the retrieved one-time password (OTP).

## Instance properties

_This interface also inherits properties from `Credential`._

- `OTPCredential.code` (read-only) (experimental)
    The one-time password (OTP).

## Instance methods

None.

## Examples

The below code triggers the browser's permission flow when an SMS message arrives. If permission is granted, then the promise resolves with an `OTPCredential` object. The contained `code` value is then set as the value of an `` form element, which is then submitted.

```js
navigator.credentials
  .get({
    otp: { transport: ["sms"] },
    signal: ac.signal,
  })
  .then((otp) => {
    input.value = otp.code;
    if (form) form.submit();
  })
  .catch((err) => {
    console.error(err);
  });
```

> **Note:**
> For a full explanation of the code, see the `WebOTP API` landing page. You can also see this code as part of a full working demo.
