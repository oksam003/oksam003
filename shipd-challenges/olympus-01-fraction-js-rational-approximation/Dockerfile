FROM public.ecr.aws/d3j8x8q7/olympus-base:latest

WORKDIR /app

# The pinned repo (rawify/Fraction.js @ 9aa0f35) is the build context.
COPY . /app

# Install the test runner and bundler GLOBALLY (pinned) so they survive a reset
# of /app/node_modules (which is gitignored and gets cleaned before patches are
# applied) and are available with NO network at test time.
#   crude-build -> the bundler that regenerates dist/fraction.js from src
#   mocha       -> the test runner
# Internet is available during build; nothing is fetched at run time.
#
# Note: require('fraction.js') resolves offline via the package's "exports"
# field to the committed dist/, so no local install of the package is needed.
# The build is intentionally NOT run here: crude-build rewrites src/fraction.js
# (it stamps a version/date header), which would dirty the tree and make the
# solution patch fail to apply. test.sh runs the build after patches are applied.
RUN npm install -g --save-exact mocha@11.7.6 crude-build@0.1.3

# Default to an interactive shell so `docker run -it <image>` drops into bash.
CMD ["/bin/bash"]
