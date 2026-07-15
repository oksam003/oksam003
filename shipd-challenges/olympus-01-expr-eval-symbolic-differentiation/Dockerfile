FROM public.ecr.aws/d3j8x8q7/olympus-base:latest

WORKDIR /app

# The pinned repo (silentmatt/expr-eval @ 6e889e0) is provided as the build
# context. Install dev dependencies (mocha + rollup); the legacy eslint peer
# range requires --legacy-peer-deps on modern npm.
COPY . /app
RUN npm install --legacy-peer-deps

# Tests import ../dist/bundle, produced by the rollup build.
RUN npm run build
