#!/usr/bin/env bash
# Runs the C# checks of the base on the example .NET project, in a copy of it.
# Usage, from the root of the repository:
#   bash scripts/dotnet-sample.sh version        prints the .NET SDK version, exit 3 without SDK
#   bash scripts/dotnet-sample.sh prepare <dir>  copies the example project and the templates to <dir>
#   bash scripts/dotnet-sample.sh restore <dir>  restores the packages and CSharpier (NuGet)
#   bash scripts/dotnet-sample.sh build <dir>    restores, then builds; prints exit=<code>
#   bash scripts/dotnet-sample.sh format <dir> [--check]
set -euo pipefail

here=$(cd "$(dirname "$0")/.." && pwd)

if ! command -v dotnet >/dev/null 2>&1; then
  for candidate in "$HOME/.dotnet/dotnet" /usr/local/share/dotnet/dotnet /usr/share/dotnet/dotnet /opt/homebrew/bin/dotnet; do
    if [[ -x "$candidate" ]]; then
      PATH="$(dirname "$candidate"):$PATH"
      export PATH
      break
    fi
  done
fi
if ! command -v dotnet >/dev/null 2>&1; then
  echo "No .NET SDK on this machine."
  exit 3
fi
export DOTNET_CLI_TELEMETRY_OPTOUT=1
export DOTNET_NOLOGO=1

case "${1:-}" in
  version)
    dotnet --version
    ;;
  prepare)
    target="$2"
    mkdir -p "$target/scripts"
    cp -R "$here/samples/csharp/." "$target/"
    cp "$here/code/templates/csharp/Directory.Build.props" "$here/code/templates/csharp/.editorconfig" "$target/"
    cp "$here/code/templates/csharp/format-csharp.sh" "$target/scripts/"
    ;;
  restore)
    cd "$2" || exit 1
    dotnet restore --verbosity quiet >/dev/null
    dotnet tool restore >/dev/null
    echo "restored"
    ;;
  build)
    cd "$2" || exit 1
    dotnet restore --verbosity quiet >/dev/null
    set +e
    dotnet build --no-restore -tl:off -nologo -v:q >build.log 2>&1
    code=$?
    set -e
    grep -E ": (error|warning) " build.log | sort -u | head -n 60 || true
    echo "exit=$code"
    ;;
  format)
    cd "$2" || exit 1
    shift 2
    bash scripts/format-csharp.sh "$@"
    ;;
  *)
    echo "Usage: bash scripts/dotnet-sample.sh version | prepare <dir> | restore <dir> | build <dir> | format <dir> [--check]"
    exit 2
    ;;
esac
