---
title: "Examples using the Docker Engine SDKs and Docker API (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/engine/sdk/examples.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Examples using the Docker Engine SDKs and Docker API (part 2 of 2)

## Commit a container

Commit a container to create an image from its contents:

**Go**

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/moby/moby/api/types/container"
	"github.com/moby/moby/client"
)

func main() {
	ctx := context.Background()
	apiClient, err := client.New(client.FromEnv, client.WithUserAgent("my-application/1.0.0"))
	if err != nil {
		log.Fatal(err)
	}
	defer apiClient.Close()

	createResp, err := apiClient.ContainerCreate(ctx, client.ContainerCreateOptions{
		Config: &container.Config{
			Cmd: []string{"touch", "/helloworld"},
		},
		Image: "alpine",
	})
	if err != nil {
		log.Fatal(err)
	}

	if _, err := apiClient.ContainerStart(ctx, createResp.ID, client.ContainerStartOptions{}); err != nil {
		log.Fatal(err)
	}

	wait := apiClient.ContainerWait(ctx, createResp.ID, client.ContainerWaitOptions{})
	select {
	case err := <-wait.Error:
		if err != nil {
			log.Fatal(err)
		}
	case <-wait.Result:
	}

	commitResp, err := apiClient.ContainerCommit(ctx, createResp.ID, client.ContainerCommitOptions{Reference: "helloworld"})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(commitResp.ID)
}
```

**Python**

```python
import docker
client = docker.from_env()
container = client.containers.run("alpine", ["touch", "/helloworld"], detach=True)
container.wait()
image = container.commit("helloworld")
print(image.id)
```

**HTTP**

```console
$ docker run -d alpine touch /helloworld
0888269a9d584f0fa8fc96b3c0d8d57969ceea3a64acf47cd34eebb4744dbc52
$ curl --unix-socket /var/run/docker.sock\
  -X POST "http://localhost/v{{% param "latest_engine_api_version" %}}/commit?container=0888269a9d&repo=helloworld"
{"Id":"sha256:6c86a5cd4b87f2771648ce619e319f3e508394b5bfc2cdbd2d60f59d52acda6c"}
```
