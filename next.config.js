module.exports = {
  i18n: {
    locales: ["en", "ru", "ua"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gorillastorage.s3.eu-north-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.telegram.org",
        port: "",
      },
    ],
  },
};
