---
title: "Browsers (part 3 of 4)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/browsers.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Browsers (part 3 of 4)

## Install behind a firewall or a proxy

By default, Playwright downloads browsers from Microsoft's CDN.

Sometimes companies maintain an internal proxy that blocks direct access to the public
resources. In this case, Playwright can be configured to download browsers via a proxy server.

```bash
HTTPS_PROXY=https://192.0.2.1 npx playwright install
```

```batch
set HTTPS_PROXY=https://192.0.2.1
npx playwright install
```

```powershell
$Env:HTTPS_PROXY="https://192.0.2.1"
npx playwright install
```

```bash
pip install playwright
HTTPS_PROXY=https://192.0.2.1 playwright install
```

```batch
set HTTPS_PROXY=https://192.0.2.1
pip install playwright
playwright install
```

```powershell
$Env:HTTPS_PROXY="https://192.0.2.1"
pip install playwright
playwright install
```

```bash
HTTPS_PROXY=https://192.0.2.1 mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```batch
set HTTPS_PROXY=https://192.0.2.1
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```powershell
$Env:HTTPS_PROXY="https://192.0.2.1"
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```bash
HTTPS_PROXY=https://192.0.2.1 pwsh bin/Debug/netX/playwright.ps1 install
```

```batch
set HTTPS_PROXY=https://192.0.2.1
pwsh bin/Debug/netX/playwright.ps1 install
```

```powershell
$Env:HTTPS_PROXY="https://192.0.2.1"
pwsh bin/Debug/netX/playwright.ps1 install
```

If the requests of the proxy get intercepted with a custom untrusted certificate authority (CA) and it yields to `Error: self signed certificate in certificate chain` while downloading the browsers, you must set your custom root certificates via the `NODE_EXTRA_CA_CERTS` environment variable before installing the browsers:

```bash
export NODE_EXTRA_CA_CERTS="/path/to/cert.pem"
```

```batch
set NODE_EXTRA_CA_CERTS="C:\certs\root.crt"
```

```powershell
$Env:NODE_EXTRA_CA_CERTS="C:\certs\root.crt"
```

If the browser archive download is slow or stalls, you can increase the download socket timeout in milliseconds with the `PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT` environment variable. Despite its name this is an idle timeout rather than a connection timeout; it limits how long the download may go without receiving data, and defaults to 30 seconds:

```bash
PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000 npx playwright install
```

```batch
set PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000
npx playwright install
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT="120000"
npx playwright install
```

```bash
pip install playwright
PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000 playwright install
```

```batch
set PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000
pip install playwright
playwright install
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT="120000"
pip install playwright
playwright install
```

```bash
PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000 mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```batch
set PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT="120000"
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```bash
PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000 pwsh bin/Debug/netX/playwright.ps1 install
```

```batch
set PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000
pwsh bin/Debug/netX/playwright.ps1 install
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT="120000"
pwsh bin/Debug/netX/playwright.ps1 install
```

If you are installing dependencies and need to use a proxy on Linux, make sure to run the command as a root user. Otherwise, Playwright will attempt to become a root and will not pass <example-value> variables like `HTTPS_PROXY` to the linux package manager.

```bash
sudo HTTPS_PROXY=https://192.0.2.1 npx playwright install-deps
```

```bash
sudo HTTPS_PROXY=https://192.0.2.1 mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install-deps"
```

```bash
sudo HTTPS_PROXY=https://192.0.2.1 playwright install-deps
```

```bash
sudo HTTPS_PROXY=https://192.0.2.1 pwsh bin/Debug/netX/playwright.ps1 install-deps
```

## Download from artifact repository

By default, Playwright downloads browsers from Microsoft's CDN.

Sometimes companies maintain an internal artifact repository to host browser
binaries. In this case, Playwright can be configured to download from a custom
location using the `PLAYWRIGHT_DOWNLOAD_HOST` env variable.

```bash
PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 npx playwright install
```

```batch
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
npx playwright install
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
npx playwright install
```

```bash
pip install playwright
PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 playwright install
```

```batch
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
pip install playwright
playwright install
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
pip install playwright
playwright install
```

```bash
PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```batch
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```bash
PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 pwsh bin/Debug/netX/playwright.ps1 install
```

```batch
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
pwsh bin/Debug/netX/playwright.ps1 install
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
pwsh bin/Debug/netX/playwright.ps1 install
```

It is also possible to use a per-browser download hosts using `PLAYWRIGHT_CHROMIUM_DOWNLOAD_HOST`, `PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST` and `PLAYWRIGHT_WEBKIT_DOWNLOAD_HOST` env variables that
take precedence over `PLAYWRIGHT_DOWNLOAD_HOST`.

```bash
PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3 PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 npx playwright install
```

```batch
set PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
npx playwright install
```

```powershell
$Env:PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST="http://203.0.113.3"
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
npx playwright install
```

```bash
pip install playwright
PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3 PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 playwright install
```

```batch
set PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
pip install playwright
playwright install
```

```powershell
$Env:PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST="http://203.0.113.3"
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
pip install playwright
playwright install
```

```bash
PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3 PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```batch
set PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```powershell
$Env:PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST="http://203.0.113.3"
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```bash
PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3 PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 pwsh bin/Debug/netX/playwright.ps1 install
```

```batch
set PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3
set PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1
pwsh bin/Debug/netX/playwright.ps1 install
```

```powershell
$Env:PLAYWRIGHT_DOWNLOAD_HOST="http://192.0.2.1"
$Env:PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST="http://203.0.113.3"
pwsh bin/Debug/netX/playwright.ps1 install
```

## Using a pre-installed Node.js
* langs: python, java, csharp
By default, Playwright uses its bundled Node.js runtime for operations such as browser installation and script execution. If you want Playwright to use a pre-installed Node.js binary instead of the bundled runtime, you can specify it using the `PLAYWRIGHT_NODEJS_PATH` environment variable. This can be useful in environments where you need to use a specific version of Node.js or where the bundled runtime is not compatible.

```bash
PLAYWRIGHT_NODEJS_PATH="/usr/local/bin/node" npx playwright install
```

```batch
set PLAYWRIGHT_NODEJS_PATH=C:\Program Files\nodejs\node.exe
npx playwright install
```

```powershell
$Env:PLAYWRIGHT_NODEJS_PATH="C:\Program Files\nodejs\node.exe"
npx playwright install
```

```bash
pip install playwright
PLAYWRIGHT_NODEJS_PATH="/usr/local/bin/node" playwright install
```

```batch
set PLAYWRIGHT_NODEJS_PATH=C:\Program Files\nodejs\node.exe
pip install playwright
playwright install
```

```powershell
$Env:PLAYWRIGHT_NODEJS_PATH="C:\Program Files\nodejs\node.exe"
pip install playwright
playwright install
```

```bash
PLAYWRIGHT_NODEJS_PATH="/usr/local/bin/node" mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```batch
set PLAYWRIGHT_NODEJS_PATH=C:\Program Files\nodejs\node.exe
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```powershell
$Env:PLAYWRIGHT_NODEJS_PATH="C:\Program Files\nodejs\node.exe"
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```bash
PLAYWRIGHT_NODEJS_PATH="/usr/local/bin/node" pwsh bin/Debug/netX/playwright.ps1 install
```

```batch
set PLAYWRIGHT_NODEJS_PATH=C:\Program Files\nodejs\node.exe
pwsh bin/Debug/netX/playwright.ps1 install
```

```powershell
$Env:PLAYWRIGHT_NODEJS_PATH="C:\Program Files\nodejs\node.exe"
pwsh bin/Debug/netX/playwright.ps1 install
```
