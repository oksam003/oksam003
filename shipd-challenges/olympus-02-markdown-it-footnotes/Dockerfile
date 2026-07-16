FROM public.ecr.aws/d3j8x8q7/olympus-base:latest

WORKDIR /app

# The pinned repo (markdown-it/markdown-it @ 2d9bbea) is the build context.
COPY . /app

# Install runtime + dev dependencies at build time (internet is available then).
# markdown-it's source imports mdurl, entities, linkify-it, uc.micro and
# punycode.js, so node_modules must be present to run the tests.
RUN npm install

# Keep a copy of node_modules outside the working tree, so test.sh can restore
# it offline if /app/node_modules is reset before the test/solution patch is
# applied. The tests use Node's built-in runner and JUnit reporter, so nothing
# else is needed at run time.
RUN cp -r node_modules /opt/node_modules_cache

# Default to an interactive shell so `docker run -it <image>` drops into bash.
CMD ["/bin/bash"]
