#!/bin/sh
set -eu

node ./scripts/check-db-target.mjs

if [ "${DB_BOOTSTRAP_ON_START:-true}" = "true" ]; then
  node ./scripts/bootstrap-prod-db.mjs
fi

exec "$@"
