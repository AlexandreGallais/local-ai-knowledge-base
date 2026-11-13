---
title: "Browser detection using the user agent string (UA sniffing) (part 2 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/browser_detection_using_the_user_agent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Browser detection using the user agent string (UA sniffing) (part 2 of 2)

## Extracting relevant UA string parts

If you've explored all of the options above, and you still need to parse the UA string as a last resort, there are some hints in this section that will help.
Unfortunately, there is no uniformity of the different part of the user agent string, so we've come to the tricky part.

### Rendering engine

Browsers sharing a common rendering engine will display a page in the same way: it's often a fair assumption that what will work in one browser will work in the other.
There are three active major rendering engines: Blink, Gecko, and WebKit.

The rendering engine is the string `Gecko/20100101` in the following example, indicating the rendering engine is `Gecko`, and the "gecko-Trail" is the fixed string `20100101`, which means "desktop":

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0
```

Detecting rendering engine names is common in websites, and a lot of user agents historically added other rendering names to avoid websites shutting them out based on rendering engine name alone.
It's therefore important to pay attention not to trigger false-positives when detecting the rendering engine, as this method is particularly unreliable.
Consider the following UA string sent in Chrome 134 on macOS:

```http
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36
```

| Engine   | Must contain      | Details                                                                                                                        |
| -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Blink    | `Chrome/xyz`      |                                                                                                                                |
| Gecko    | `Gecko/xyz`       |                                                                                                                                |
| WebKit   | `AppleWebKit/xyz` | WebKit browsers add a `like Gecko` string that may trigger false positive for Gecko if the detection is not carefully applied. |
| Presto   | `Opera/xyz`       | Obsolete; Presto is no longer used in Opera browser builds >= version 15 (see 'Blink')                                         |
| EdgeHTML | `Edge/xyz`        | Obsolete; EdgeHTML is no longer used in Edge browser builds >= version 79 (see 'Blink').                                       |

### Rendering engine version

Most rendering engines put the version number in the `RenderingEngine/VersionNumber` token, with the notable exception of Gecko.
It's the string `rv:138.0` in the following example, meaning the rendering engine version number is `138.0`, which is the same as the Firefox version:

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0
```

### Browser name and version

When people say they want "browser detection", they actually often want "rendering engine detection".
That usually means detecting "Gecko" or "WebKit" as opposed to "Firefox" or "Safari".

Most browsers set the name and version in the format `BrowserName/VersionNumber`.
But as the name is not the only information in a user agent string in that format, you can't discover the name of the browser, you can only check if the name you are looking for is present.
The browser name is the string `Firefox/138.0` in the following example, indicating the browser name is `Firefox`, and the software version is `138.0`:

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0
```

Some browsers send conflicting information: Chrome, for example, reports both Chrome and Safari.
So to detect Safari you have to check for the Safari string and the absence of the Chrome string, Chromium often reports itself as Chrome too and SeaMonkey <example-value> itself as Firefox.

Be careful when using regular expressions on the `BrowserName` part as user agents also contain strings around the Keyword/Value syntax.
Safari & Chrome contain the string `like Gecko`, for instance.

| Browser name                    | Must contain    | Must not contain               |
| ------------------------------- | --------------- | ------------------------------ |
| Firefox                         | `Firefox/xyz`   | `Seamonkey/xyz`                |
| Seamonkey                       | `Seamonkey/xyz` |                                |
| Chrome                          | `Chrome/xyz`    | `Chromium/xyz` or `Edg.*/xyz`  |
| Chromium                        | `Chromium/xyz`  |                                |
| Safari                          | `Safari/xyz` \* | `Chrome/xyz` or `Chromium/xyz` |
| Opera 15+ (Blink-based engine)  | `OPR/xyz`       |                                |
| Opera 12- (Presto-based engine) | `Opera/xyz`     |                                |

\* Safari gives two version numbers: one technical in the `Safari/xyz` token, and one user-friendly in a `Version/xyz` token.

Of course, there is absolutely no guarantee that another browser will not spoof these in certain cases.
That's why browser detection using the user agent string is unreliable and should be done only with the check of the version number (spoofing past versions is less likely).

### Operating system detection

The Operating System is sent in most UA strings (although not web-focused platforms), but the format varies.
It's a fixed string between two semicolons, in the comment part of the User Agent and these strings are specific for each browser.

They indicate the OS, and often its version and information on the relying hardware (32 or 64 bits, Intel/PPC for Mac, or x86/ARM CPU architecture for Windows PCs).
It's the string `Intel Mac OS X 10.15` in the following example:

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0
```

In all cases, these strings may change, so you should use them only in conjunction with the detection of already-released browsers so patterns are known ahead of time.
Consider a visitor or UA string survey to adapt your code when new browser versions are released.

### Mobile, Tablet or Desktop

The most common reason to perform user agent sniffing is to determine which type of device the browser runs on.

- Never assume that a browser or a rendering engine only runs on one type of device.
  In particular, don't rely on different defaults for different browsers or rendering engines.
- Never use the OS token to define if a browser is on mobile, tablet or desktop.
  The OS may run on more than one type of device (for example, Android runs on tablets as well as phones).

The following table summarizes the way common browser vendors indicate that their browsers are running on a mobile device:

| Browser                                                           | Rule                                                 | Example                                                                                                                                                          |
| ----------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mozilla (Gecko, Firefox)                                          | `Mobile` or `Tablet` inside the comment.             | `Mozilla/5.0 (Android 15; Mobile; rv:136.0) Gecko/136.0 Firefox/136.0`                                                                                           |
| WebKit-based (Android, Safari)                                    | `Mobile Safari` token <example-value> the comment.           | `Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`               |
| Blink-based (Chromium, Google Chrome, Opera 15+, Edge on Android) | `Mobile Safari` token <example-value> the comment.           | `Mozilla/5.0 (Linux; Android 4.4.2; Nexus 5 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Mobile Safari/537.36 OPR/20.0.1396.72047`  |
| Edge on Windows 10 Mobile                                         | `Mobile/xyz` and `Edge/` tokens outside the comment. | `Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36 Edge/16.16299` |

In short, you can look for the string `Mobi` anywhere in the UA string.
If the device is large enough that it's not marked with `Mobi`, you should serve your desktop site (which, as a best practice, should support touch input anyway, as desktop devices may have touchscreens).

## See also

- CSS Media Queries
- HTTP Client hints
- Implementing feature detection
- Migrate to User-Agent Client Hints on web.dev (2021)
