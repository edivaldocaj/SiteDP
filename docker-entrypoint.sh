#!/bin/sh
set -eu

node ./scripts/check-db-target.mjs

exec "$@"
