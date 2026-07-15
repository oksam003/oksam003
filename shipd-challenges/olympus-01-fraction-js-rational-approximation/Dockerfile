FROM public.ecr.aws/d3j8x8q7/olympus-base:latest

WORKDIR /app

# The pinned repo (rawify/Fraction.js @ 9aa0f35) is the build context.
COPY . /app

# Dev dependencies are crude-build (the bundler) and mocha (the test runner).
# Do NOT run the build here: crude-build rewrites src/fraction.js (it stamps a
# version/date header), which would dirty the tree and make the solution patch
# fail to apply. test.sh runs the build after patches are applied instead.
RUN npm install
