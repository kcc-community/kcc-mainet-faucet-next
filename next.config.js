const withLess = require("next-with-less");

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {}
    }
  }
};

module.exports = withLess(nextConfig);
