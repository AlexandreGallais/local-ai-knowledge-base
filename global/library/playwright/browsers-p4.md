---
title: "Browsers (part 4 of 4)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/browsers.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Browsers (part 4 of 4)

## Managing browser binaries

Playwright downloads Chromium, WebKit and Firefox browsers into the OS-specific cache folders:

- `%USERPROFILE%\AppData\Local\ms-playwright` on Windows
- `~/Library/Caches/ms-playwright` on macOS
- `~/.cache/ms-playwright` on Linux

These browsers will take a few hundred megabytes of disk space when installed:

```bash
du -hs ~/Library/Caches/ms-playwright/*
281M  chromium-XXXXXX
187M  firefox-XXXX
180M  webkit-XXXX
```

You can override default behavior using environment variables. When installing Playwright, ask it to download browsers into a specific location:

```bash
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers npx playwright install
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
npx playwright install
```

```powershell
$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
npx playwright install
```

```bash
pip install playwright
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers python -m playwright install
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
pip install playwright
playwright install
```

```powershell
$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
pip install playwright
playwright install
```

```bash
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```powershell
$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```bash
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers pwsh bin/Debug/netX/playwright.ps1 install
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
pwsh bin/Debug/netX/playwright.ps1 install
```

```powershell
$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
pwsh bin/Debug/netX/playwright.ps1 install
```

When running Playwright scripts, ask Playwright to search for browsers in a shared location.

```bash
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers npx playwright test
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
npx playwright test
```

```powershell
$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
npx playwright test
```

```bash
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers python playwright_script.py
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
python playwright_script.py
```

```powershell

$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
python playwright_script.py
```

```bash
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers mvn test
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
mvn test
```

```powershell
$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
mvn test
```

```bash
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers dotnet test
```

```batch
set PLAYWRIGHT_BROWSERS_PATH=%USERPROFILE%\pw-browsers
dotnet test
```

```powershell
$Env:PLAYWRIGHT_BROWSERS_PATH="$Env:USERPROFILE\pw-browsers"
dotnet test
```

Playwright keeps track of packages that need those browsers and will garbage collect them as you update Playwright to the newer versions.

:::note
Developers can opt into this mode by exporting `PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers` in their `.bashrc`.
:::

### Hermetic install
* langs: js

You can opt into the hermetic install and place binaries in the local folder:

```bash
# Places binaries to node_modules/playwright-core/.local-browsers
PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install
```

```batch
# Places binaries to node_modules\playwright-core\.local-browsers
set PLAYWRIGHT_BROWSERS_PATH=0
npx playwright install
```

```powershell
# Places binaries to node_modules\playwright-core\.local-browsers
$Env:PLAYWRIGHT_BROWSERS_PATH=0
npx playwright install
```

:::note
`PLAYWRIGHT_BROWSERS_PATH` does not change installation path for Google Chrome and Microsoft Edge.
:::

### Skip browser downloads
* langs: java

In certain cases, it is desired to avoid browser downloads altogether because
browser binaries are managed separately.

This can be done by setting `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` variable before installation.

```bash
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 mvn test
```

```batch
set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
mvn test
```

```powershell
$Env:PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
mvn test
```

### Stale browser removal

Playwright keeps track of the clients that use its browsers. When there are no more clients that require a particular version of the browser, that version is deleted from the system. That way you can safely use Playwright instances of different versions and at the same time, you don't waste disk space for the browsers that are no longer in use.

To opt-out from the unused browser removal, you can set the `PLAYWRIGHT_SKIP_BROWSER_GC=1` environment variable, or pass the `--no-remove` option to the install command:

```bash
npx playwright install --no-remove
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --no-remove"
```

```bash
playwright install --no-remove
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install --no-remove
```

### List all installed browsers:

Prints list of browsers from all playwright installations on the machine.

```bash
npx playwright install --list
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --list"
```

```bash
playwright install --list
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install --list
```

### Uninstall browsers

This will remove the browsers (chromium, firefox, webkit) of the current Playwright installation:

```bash
npx playwright uninstall
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="uninstall"
```

```bash
playwright uninstall
```

```bash
pwsh bin/Debug/netX/playwright.ps1 uninstall
```

To remove browsers of other Playwright installations as well, pass `--all` flag:

```bash
npx playwright uninstall --all
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="uninstall --all"
```

```bash
playwright uninstall --all
```

```bash
pwsh bin/Debug/netX/playwright.ps1 uninstall --all
```
