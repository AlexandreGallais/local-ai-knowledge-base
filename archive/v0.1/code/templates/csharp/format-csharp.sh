#!/usr/bin/env bash
# Format C# code, or check its formatting with --check.
# One line of Directory.Build.props selects the formatter:
#   <StrictFormatting>true</StrictFormatting>   CSharpier, with code-style and analyzer fixes
#   <StrictFormatting>false</StrictFormatting>  dotnet format
# Run it from the folder that holds Directory.Build.props and the project or solution file.
# Strict mode needs CSharpier once: dotnet new tool-manifest; dotnet tool install csharpier
set -euo pipefail

mode="fix"
if [[ "${1:-}" == "--check" ]]; then
  mode="check"
fi

strict="false"
if grep -q "<StrictFormatting>true</StrictFormatting>" Directory.Build.props; then
  strict="true"
fi

if [[ "$strict" == "true" && "$mode" == "fix" ]]; then
  dotnet format style --no-restore
  dotnet format analyzers --no-restore
  dotnet csharpier format .
elif [[ "$strict" == "true" ]]; then
  dotnet csharpier check .
  dotnet format style --no-restore --verify-no-changes
  dotnet format analyzers --no-restore --verify-no-changes
elif [[ "$mode" == "fix" ]]; then
  dotnet format --no-restore
else
  dotnet format --no-restore --verify-no-changes
fi
