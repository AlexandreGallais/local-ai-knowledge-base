---
title: "Python language-specific guide (part 2 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/python.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Python language-specific guide (part 2 of 5)

## Use containers for Python development

### Prerequisites

Complete Containerize a Python application.

### Overview

Once your application runs in a container, the next step is making the
container loop part of your everyday development workflow. Code changes should
show up quickly, and services your app depends on, like databases, should run
right alongside it.

In this section, you'll extend the project from the previous topic by adding a
PostgreSQL database service to your `compose.yaml`, persisting the database
data in a named volume, and enabling Compose Watch so that changes you save in
your editor are picked up by the running container without a manual rebuild.

### Update the application

You'll update your application to connect to a PostgreSQL database. Continue
working in your `python-docker-example` directory.

Replace `app.py` and `requirements.txt`, and add a new `config.py` file with the
following contents.

> **Note:**
>
> The application won't run yet after this step. It tries to connect to a
> PostgreSQL database that doesn't exist. The next two sections add the
> database service and the Docker configuration needed to run everything
> together.

```python
# FastAPI application backed by a PostgreSQL database via SQLModel.
# The FastAPI lifespan handler creates database tables at startup.
# Endpoints: GET / (greeting), POST /heroes/ (create), GET /heroes/ (list).
# See https://fastapi.tiangolo.com/ and https://sqlmodel.tiangolo.com/

from collections.abc import AsyncGenerator, Sequence
from contextlib import asynccontextmanager

from fastapi import FastAPI
from sqlmodel import Field, Session, SQLModel, create_engine, select

from config import settings

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    secret_name: str
    age: int | None = Field(default=None, index=True)

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncGenerator[None, None]:
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
def hello() -> str:
    return "Hello, Docker!"

@app.post("/heroes/")
def create_hero(hero: Hero) -> Hero:
    with Session(engine) as session:
        session.add(hero)
        session.commit()
        session.refresh(hero)
        return hero

@app.get("/heroes/")
def read_heroes() -> Sequence[Hero]:
    with Session(engine) as session:
        heroes = session.exec(select(Hero)).all()
        return heroes
```

```python
# Pydantic settings that read PostgreSQL connection details from the
# environment. Supports a password file (Docker secrets) via
# POSTGRES_PASSWORD_FILE in addition to POSTGRES_PASSWORD.
# See https://docs.pydantic.dev/latest/concepts/pydantic_settings/

import os
from typing import Any

from pydantic import (
    PostgresDsn,
    computed_field,
    field_validator,
    model_validator,
)
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    POSTGRES_SERVER: str
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str | None = None
    POSTGRES_PASSWORD_FILE: str | None = None
    POSTGRES_DB: str

    @model_validator(mode="before")
    @classmethod
    def check_postgres_password(cls, data: Any) -> Any:
        """Validate that either POSTGRES_PASSWORD or POSTGRES_PASSWORD_FILE is set."""
        if isinstance(data, dict):
            password_file: str | None = data.get("POSTGRES_PASSWORD_FILE")  # type: ignore
            password: str | None = data.get("POSTGRES_PASSWORD")  # type: ignore
            if password_file is None and password is None:
                raise ValueError(
                    "At least one of POSTGRES_PASSWORD_FILE and POSTGRES_PASSWORD must be set."
                )
        return data  # type: ignore

    @field_validator("POSTGRES_PASSWORD_FILE", mode="before")
    @classmethod
    def read_password_from_file(cls, v: str | None) -> str | None:
        if v is not None:
            file_path = v
            if os.path.exists(file_path):
                with open(file_path) as file:
                    return file.read().strip()
            raise ValueError(f"Password file {file_path} does not exist.")
        return v

    @computed_field
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> PostgresDsn:
        url = MultiHostUrl.build(
            scheme="postgresql+psycopg",
            username=self.POSTGRES_USER,
            password=self.POSTGRES_PASSWORD
            if self.POSTGRES_PASSWORD
            else self.POSTGRES_PASSWORD_FILE,
            host=self.POSTGRES_SERVER,
            port=self.POSTGRES_PORT,
            path=self.POSTGRES_DB,
        )
        return PostgresDsn(url)

settings = Settings()  # type: ignore
```

```text
# Python package dependencies for the application, pinned for reproducible builds.
# See https://pip.pypa.io/en/stable/reference/requirements-file-format/

fastapi==0.115.12
sqlmodel==0.0.24
psycopg[binary]==3.2.9
pydantic-settings==2.9.1
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
