---
title: "fix-for-503s"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9/includes/fix-for-503s.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# fix-for-503s

### Fix for 503's during app recycle in IIS

By default there is now a 1 second delay between when IIS is notified of a recycle or shutdown and when ANCM tells the managed server to start shutting down. The delay is configurable via the `ANCM_shutdownDelay` environment variable or by setting the `shutdownDelay` handler setting. Both values are in milliseconds. The delay is mainly to reduce the likelihood of a race where:

* IIS hasn't started queuing requests to go to the new app.
* ANCM starts rejecting new requests that come into the old app.

Slower machines or machines with heavier CPU usage may want to adjust this value to reduce 503 likelihood.

Example of setting `shutdownDelay`:

```xml
<aspNetCore processPath="dotnet" arguments="myapp.dll" stdoutLogEnabled="false" stdoutLogFile=".logsstdout">
  <handlerSettings>
    <!-- Milliseconds to delay shutdown by.
    this doesn't mean incoming requests will be delayed by this amount,
    but the old app instance will start shutting down after this timeout occurs -->
    <handlerSetting name="shutdownDelay" value="5000" />
  </handlerSettings>
</aspNetCore>
```

The fix is in the globally installed ANCM module that comes from the hosting bundle.
