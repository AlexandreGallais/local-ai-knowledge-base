---
title: "OTPCredential: code property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/otpcredential/code/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OTPCredential: code property

The **`code`** read-only property of the `OTPCredential` interface contains the one-time password (OTP).

## Value

A string containing the OTP.

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
