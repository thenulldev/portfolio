// open-next.config.ts
var config = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      // Disable KV cache for now to simplify deployment
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy"
    }
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch"
    }
  }
};
var open_next_config_default = config;
export {
  open_next_config_default as default
};
