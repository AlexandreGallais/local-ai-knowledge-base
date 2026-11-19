#!/usr/bin/env bash
# Runs a command, keeps its full output in a log file, and prints a short summary for an agent:
# the exit code, the log path, the error lines with their numbers, and the last lines.
#   bash run-compact.sh <command> [args...]
#   TAIL=80 bash run-compact.sh npm test
set -uo pipefail

if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <command> [args...]" >&2
  exit 2
fi

tail_lines="${TAIL:-40}"
log_dir="${AGENT_LOG_DIR:-/tmp/agent-logs}"
mkdir -p "$log_dir"
log_file="$log_dir/$(date +%Y%m%d-%H%M%S)-$$.log"

"$@" >"$log_file" 2>&1
code=$?
lines=$(wc -l <"$log_file" | tr -d ' ')

echo "command: $*"
echo "exit=$code log=$log_file lines=$lines"
echo "--- error lines (first 30) ---"
grep -n -i -E 'error|fail|panic|exception|traceback' "$log_file" | head -n 30
echo "--- last $tail_lines lines ---"
tail -n "$tail_lines" "$log_file"
exit "$code"
