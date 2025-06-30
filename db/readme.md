# 🗃️ Database Directory Overview

Welcome to the database layer of the Huli Huli Jars application. This directory contains everything needed to create, seed, and inspect the PostgreSQL schema.

## Contents

- `schema.sql` — Defines the table structures, relationships, and constraints
- `seed.sql` — Populates development seed data
- `CHANGELOG.md` — Records all schema changes over time
- `README.md` — This file (provides directory context and usage guidance)

## Quick Start

To reset and seed the database:

```bash
psql -d hulihuli_jars -f schema.sql
psql -d hulihuli_jars -f seed.sql
Diagnostic Queries
View all constraints: \d+ table_name

View FK relationships: Run the query in README.md or use pgAdmin