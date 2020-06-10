// graphql api url
let url = "https://idkdev.co.za/graphql";

// If we're running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === "/home/node") {
  url = "https://idkdev.co.za/graphql";
}
const Config = {
  gqlUrl: url,
};

export default Config;
