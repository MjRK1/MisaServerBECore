#!/bin/bash
set -e

psql -U misauser -d misaserverappdb <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS misafiles_schema;
  CREATE SCHEMA IF NOT EXISTS misacore_schema;
EOSQL
