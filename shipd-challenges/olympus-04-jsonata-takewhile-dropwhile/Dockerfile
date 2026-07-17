FROM public.ecr.aws/d3j8x8q7/olympus-base:latest

WORKDIR /app

# The pinned repo (jsonata-js/jsonata @ 6c7e95f) is the build context.
COPY . /app

# jsonata has no runtime dependencies. Install only the test tooling, pinned to
# exact versions for reproducibility (the repo ships no lockfile). Internet is
# available at build time; nothing is fetched at run time.
RUN npm install --no-save mocha@7.2.0 chai@4.5.0 chai-as-promised@7.1.2

# Keep a copy of node_modules outside the working tree so test.sh can restore it
# offline if /app/node_modules is reset before the test/solution patch is applied.
RUN cp -r node_modules /opt/node_modules_cache

# Default to an interactive shell so `docker run -it <image>` drops into bash.
CMD ["/bin/bash"]
