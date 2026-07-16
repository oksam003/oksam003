FROM public.ecr.aws/d3j8x8q7/olympus-base:latest

WORKDIR /app

# The pinned repo (rawify/Fraction.js @ 9aa0f35) is the build context.
COPY . /app

# Install the exact dev dependencies needed to build and test, pinned for
# reproducibility (the repo ships no lockfile). Internet is available at build
# time; nothing else is needed at run time.
#   crude-build -> the bundler that produces dist/fraction.js
#   mocha       -> the test runner
#
# The build is intentionally NOT run here: crude-build rewrites src/fraction.js
# (it stamps a version/date header), which would dirty the tree and make the
# solution patch fail to apply. test.sh runs the build after patches are applied.
RUN npm install --no-save --save-exact crude-build@0.1.3 mocha@11.7.6

# Default to an interactive shell so `docker run -it <image>` drops into bash.
CMD ["/bin/bash"]
