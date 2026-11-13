---
title: "Registering attribution sources (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/attribution_reporting_api/registering_sources/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Registering attribution sources (part 2 of 2)

## Specifying URLs inside attributionsrc

So far, in all the examples we have seen, the `attributionsrc` attribute/feature or `attributionSrc` property has been left blank, taking the value of an empty string. This is fine if the server that holds the requested resource is the same server that you also want to handle the registration, i.e., receive the `Attribution-Reporting-Eligible` header and respond with the `Attribution-Reporting-Register-Source` header.

However, it might be that the requested resource is not on a server you control, or you just want to handle registering the attribution source on a different server. In such cases, you can specify one or more URLs as the value of `attributionsrc`. When the resource request occurs, the `Attribution-Reporting-Eligible` header will be sent to the URL(s) specified in `attributionsrc` in addition to the resource origin; these URLs can then respond with the `Attribution-Reporting-Register-Source` to register the source.

For example, in the case of an `` element you could declare the URL(s) in the `attributionsrc` attribute:

```html
<a
  href="https://shop.example"
  attributionsrc="https://a.example/register-source">
  Click to visit our shop
</a>
```

Or in JavaScript via the `attributionSrc` property:

```js
// encode the URLs in case they contain special characters
// such as '=' that would be improperly parsed.
const encodedUrlA = encodeURIComponent("https://a.example/register-source");
const encodedUrlB = encodeURIComponent("https://b.example/register-source");

const aElem = document.querySelector("a");
aElem.attributionSrc = `${encodedUrlA} ${encodedUrlB}`;
```

In the case of a `Window.open()` call, the different URLs would have to be listed as multiple separate `attributionsrc` features in the `windowFeatures` parameter, separated by commas or whitespace:

```js
// encode the URLs in case they contain special characters
// such as '=' that would be improperly parsed.
const encodedUrlA = encodeURIComponent("https://a.example/register-source");
const encodedUrlB = encodeURIComponent("https://b.example/register-source");

elem.addEventListener("click", () => {
  window.open(
    "https://ourshop.example",
    "_blank",
    `attributionsrc=${encodedUrlA},attributionsrc=${encodedUrlB}`,
  );
});
```

> **Note:**
> Specifying multiple URLs means that multiple attribution sources can be registered on the same feature. You might for example have different campaigns that you are trying to measure the success of, which involve generating different reports on different data.

## See also

- Attribution Reporting Header Validation tool
