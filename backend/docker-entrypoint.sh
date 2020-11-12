#!/usr/bin/env sh

cat /psql/*.sql | psql -h postgres -U le4db
/le4db
