#!/usr/bin/env bash
# Shipd test runner: accepts --output_path <path> and writes JUnit XML there.
set -u

OUTPUT_PATH=""
while [ $# -gt 0 ]; do
  case "$1" in
    --output_path)
      OUTPUT_PATH="$2"
      shift 2
      ;;
    --output_path=*)
      OUTPUT_PATH="${1#*=}"
      shift
      ;;
    *)
      shift
      ;;
  esac
done

if [ -z "$OUTPUT_PATH" ]; then
  echo "usage: test.sh --output_path <path>" >&2
  exit 2
fi

# Rebuild dist/ so the test import (../dist/bundle) reflects any applied patch.
npm run build >/dev/null 2>&1

# Run the full suite; mocha's xunit reporter emits JUnit-compatible XML.
# Do not abort on test failures — the XML must always be written so the
# grader can read the per-test breakdown.
npx mocha --reporter xunit --reporter-options output="$OUTPUT_PATH" || true

exit 0
