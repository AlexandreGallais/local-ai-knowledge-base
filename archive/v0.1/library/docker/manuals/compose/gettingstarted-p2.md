---
title: "Docker Compose Quickstart (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/compose/gettingstarted.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Compose Quickstart (part 2 of 2)

## Step 7: Inspect and debug your running stack

With a fully configured stack, you can observe what's happening inside your containers
without stopping anything. This step covers the core commands for inspecting the resolved configuration, streaming logs, and running commands
inside a running container.

Before starting the stack, verify that Compose has resolved your `.env` variables and
merged all files correctly:

```console
$ docker compose config
```

`docker compose config` doesn't require the stack to be running — it works purely from
your files. A few things worth noting in the output:

- `${APP_PORT}`, `${REDIS_HOST}`, and `${REDIS_PORT}` have all been replaced with the
  values from your `.env` file.
- Short-form port notation (`"8000:5000"`) is expanded into its canonical fields
  (`target`, `published`, `protocol`).
- The default network and volume names are made explicit, prefixed with the project name
  `compose-demo`.
- The output is the fully resolved configuration, with any files
  brought in via `include` merged into a single view.

Use `docker compose config` any time you want to confirm what Compose will actually
apply, especially when debugging variable substitution or working with multiple Compose files.

Now start the stack in detached mode so the terminal stays free for the commands that
follow:

```console
$ docker compose up -d
```

### Stream logs from all services

```console
$ docker compose logs -f
```

The `-f` flag follows the log stream in real time, interleaving output from both
containers with color-coded service name prefixes. Refresh `http://localhost:8000` a
few times and watch the Flask request logs appear. To follow logs for a single service,
pass its name:

```console
$ docker compose logs -f web
```

Press `Ctrl+C` to stop following logs. The containers keep running.

### Run commands inside a running container

`docker compose exec` runs a command inside an already-running container without
starting a new one. This is the primary tool for live debugging.

#### Verify environment variables are set correctly

```console
$ docker compose exec web env | grep REDIS
```

```text
REDIS_HOST=redis
REDIS_PORT=6379
```

#### Test that the `web` container can reach Redis using the service name as the hostname

```console
$ docker compose exec web python -c "import redis; r = redis.Redis(host='redis'); print(r.ping())"
```

```text
True
```

This uses the same `redis` library your app uses, so a `True` response confirms that
service discovery, networking, and the Redis connection are all working end to end.

#### Inspect the live value of the hit counter in Redis

```console
$ docker compose exec redis redis-cli GET hits
```

## Where to go next

- Explore the full list of Compose commands
- Explore the Compose file reference
- Check out the Learning Docker Compose video on LinkedIn Learning
- Learn how to set environment variables in Compose
- Learn how to package and distribute your Compose app
