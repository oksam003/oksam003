FROM public.ecr.aws/d3j8x8q7/olympus-base:latest

WORKDIR /app

# The pinned repo (rawify/Fraction.js @ 9aa0f35) is the build context.
COPY . /app

# Dev dependencies are crude-build (the bundler) and mocha (the test runner).
RUN npm install

# Produce dist/fraction.js, which the tests import.
RUN npm run build
