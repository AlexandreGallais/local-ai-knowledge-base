---
title: ".NET SDK and .NET CLI telemetry (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/telemetry.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET SDK and .NET CLI telemetry (part 3 of 3)

## Continuous integration detection

To detect if the .NET CLI is running in a continuous integration environment, the .NET CLI checks for the presence and values of several well-known environment variables that common CI providers set.

The following list shows the environment variables and how the .NET CLI uses their values. The .NET CLI doesn't collect the value of any environment variable; it only uses the value to set a Boolean flag.

| Variable(s) | Provider | Action |
| ----------- | -------- | ------ |
| `TF_BUILD`    | Azure Pipelines | Parse boolean value |
| `GITHUB_ACTIONS` | GitHub Actions | Parse boolean value |
| `APPVEYOR` | Appveyor | Parse boolean value |
| `CI` | Many/Most | Parse boolean value |
| `TRAVIS` | Travis CI | Parse boolean value |
| `CIRCLECI` | Circle CI | Parse boolean value |
| `CODEBUILD_BUILD_ID`, `AWS_REGION` | Amazon Web Services CodeBuild | Check if all are present and non-null |
| `BUILD_ID`, `BUILD_URL` | Jenkins | Check if all are present and non-null |
| `BUILD_ID`, `PROJECT_ID` | Google Cloud Build | Check if all are present and non-null |
| `TEAMCITY_VERSION` | TeamCity | Check if present and non-null |
| `JB_SPACE_API_URL` | JetBrains Space | Check if present and non-null |

## LLM detection

To detect if the .NET CLI is running in the context of an LLM agent, the .NET CLI checks for the presence and values of several environment variables that LLM agents and AI coding assistants set.

The following table shows the agent name, environment variable used for detection, and value of the agent type that's reported. The actual values of these environment variables aren't collected—they're only used to identify the agent type.

| LLM agent | Variable | Value |
| --------- | ----------- | ----- |
| GitHub Copilot | `GITHUB_COPILOT_CLI_MODE` | "copilot" |
| Claude Code | `CLAUDECODE` | "claude" |
| Cursor | `CURSOR_EDITOR`| "cursor" |
| Google Gemini | `GEMINI_CLI` | "gemini" |

If the .NET CLI detects multiple agents, it concatenates the different agent values with a comma to produce the final value.

## See also

- .NET CLI telemetry data
- Telemetry reference source (dotnet/sdk repository)
