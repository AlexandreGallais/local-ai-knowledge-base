---
title: "Python language-specific guide (part 1 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/python.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

> **Acknowledgment**
>
> This guide is a community contribution. Docker would like to thank
> Esteban Maya and Igor Aleksandrov for their contribution
> to this guide.

The Python language-specific guide teaches you how to containerize a Python application using Docker. In this guide, you’ll learn how to:

- Containerize and run a Python application
- Set up a local environment to develop a Python application using containers
- Lint, format, typing and best practices

Start by containerizing an existing Python application.

## Containerize a Python application

### Prerequisites

- You have installed the latest version of Docker Desktop.

### Overview

Containerizing your application means packaging it together with its
dependencies, configuration, and runtime into a single portable unit called a
container image. Running that image creates a container, an isolated process
that behaves the same on any machine, whether it's your laptop, a CI runner, or
a production server.

In this section, you'll containerize a simple
FastAPI web application. You'll write a
`Dockerfile` that describes how to build the image, add a `compose.yaml` file
that defines how Docker runs your container, and then build and start the
application with one command.

You'll use Docker Hardened Images as the base. These are minimal,
secure Python images maintained by Docker.

### Create the application

The sample application is a minimal FastAPI service with a single endpoint
that returns a JSON greeting. Create the following files in a new
`python-docker-example` directory. To create all the files at once, switch to
the **Scaffold script** tab in the file browser and copy the shell command.

```python
# A minimal FastAPI application.
# The root endpoint (GET /) returns a JSON "Hello World" response.
# See https://fastapi.tiangolo.com/ for the framework reference.

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
```

```text
# Python package dependencies for the application, pinned for reproducible builds.
# See https://pip.pypa.io/en/stable/reference/requirements-file-format/

fastapi==0.115.12
uvicorn==0.34.3
```

```text
# Files and directories that Git should ignore. This is the standard Python
# template covering bytecode, build artifacts, virtual environments, and IDE
# settings. See https://git-scm.com/docs/gitignore for syntax reference.

# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Unit test / coverage reports
htmlcov/
.tox/
.nox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.py,cover
.hypothesis/
.pytest_cache/
cover/

# PEP 582; used by e.g. github.com/David-OConnor/pyflow and github.com/pdm-project/pdm
__pypackages__/

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Secrets
db/password.txt
```

If you already have Python installed and want to verify the app works before
containerizing it, you can run it locally:

```console
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
$ uvicorn app:app --reload
```

> **Note:**
>
> On Windows, activate the virtual environment with `.venv\Scripts\activate`
> instead of `source .venv/bin/activate`.

If you don't have Python installed, skip ahead to the next section. The
remaining steps run the application in a container, with no local Python
required.

### Create the Docker assets

Sign in to the DHI registry so Docker can pull the Python base images during
the build. The available Python images are listed in the
catalog.

```console
$ docker login dhi.io
```

Add the following three files to your `python-docker-example` directory. The
`Dockerfile` describes how to build the image, `compose.yaml` defines how
Docker runs the container, and `.dockerignore` keeps unwanted files out of the
build context.

> **Tip:**
>
> Gordon, Docker's AI assistant, can generate Docker assets for
> your project. Ask Gordon to create a Dockerfile, Compose file, and
> `.dockerignore` tailored to your application.

```python
# A minimal FastAPI application.
# The root endpoint (GET /) returns a JSON "Hello World" response.
# See https://fastapi.tiangolo.com/ for the framework reference.

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}
```

```text
# Python package dependencies for the application, pinned for reproducible builds.
# See https://pip.pypa.io/en/stable/reference/requirements-file-format/

fastapi==0.115.12
uvicorn==0.34.3
```

```dockerfile
# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# This Dockerfile uses Docker Hardened Images (DHI) for enhanced security.
# For more information, see https://docs.docker.com/dhi/

# Use the dev image to build and install dependencies.
FROM dhi.io/python:3.12-dev AS builder

WORKDIR /app

RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
# Leverage a bind mount to requirements.txt to avoid having to copy them into
# this layer.
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    pip install -r requirements.txt

# Use the minimal runtime image. It runs as nonroot by default.
FROM dhi.io/python:3.12

WORKDIR /app

COPY --from=builder /venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy the source code into the container.
COPY . .

# Expose the port that the application listens on.
EXPOSE 8000

# Run the application.
CMD ["/venv/bin/python3", "-m", "uvicorn", "app:app", "--host=0.0.0.0", "--port=8000"]
```

```yaml
# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Docker Compose reference guide at
# https://docs.docker.com/go/compose-spec-reference/

# Here the instructions define your application as a service called "server".
# This service is built from the Dockerfile in the current directory.
# You can add other services your application may depend on here, such as a
# database or a cache. For examples, see the Awesome Compose repository:
# https://github.com/docker/awesome-compose
services:
  server:
    build:
      context: .
    ports:
      - 8000:8000
```

```text
# Include any files or directories that you don't want to be copied to your
# container here (e.g., local build artifacts, temporary files, etc.).
#
# For more help, visit the .dockerignore file reference guide at
# https://docs.docker.com/go/build-context-dockerignore/

**/.DS_Store
**/__pycache__
**/.venv
**/.classpath
**/.dockerignore
**/.env
**/.git
**/.gitignore
**/.project
**/.settings
**/.toolstarget
**/.vs
**/.vscode
**/*.*proj.user
**/*.dbmdl
**/*.jfm
**/bin
**/charts
**/docker-compose*
**/compose.y*ml
**/Dockerfile*
**/node_modules
**/npm-debug.log
**/obj
**/secrets.dev.yaml
**/values.dev.yaml
LICENSE
README.md
```

```text
# Files and directories that Git should ignore. This is the standard Python
# template covering bytecode, build artifacts, virtual environments, and IDE
# settings. See https://git-scm.com/docs/gitignore for syntax reference.

# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Unit test / coverage reports
htmlcov/
.tox/
.nox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.py,cover
.hypothesis/
.pytest_cache/
cover/

# PEP 582; used by e.g. github.com/David-OConnor/pyflow and github.com/pdm-project/pdm
__pypackages__/

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Secrets
db/password.txt
```

To learn more about each file, see the following:

- Dockerfile
- .dockerignore
- compose.yaml

### Run the application

Inside the `python-docker-example` directory, run the following command in a
terminal.

```console
$ docker compose up --build
```

Open a browser and view the application at http://localhost:8000. You should see a simple FastAPI application.

In the terminal, press `ctrl`+`c` to stop the application.

#### Run the application in the background

You can run the application detached from the terminal by adding the `-d`
option. Inside the `python-docker-example` directory, run the following command
in a terminal.

```console
$ docker compose up --build -d
```

Open a browser and view the application at http://localhost:8000.

To see the OpenAPI docs you can go to http://localhost:8000/docs.

You should see a simple FastAPI application.

In the terminal, run the following command to stop the application.

```console
$ docker compose down
```

For more information about Compose commands, see the Compose CLI
reference.
