import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import cookie from "cookie";
import _ from "lodash";

export default ({ store, req }) => {
  createPersistedState({
    key: "demo-ssr",
    paths: ["auth.token"],
    storage: {
      getItem: (key) => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          const headerCookie = _.get(req, "headers.cookie");
          const parsedCookies = headerCookie
            ? cookie.parse(headerCookie)
            : null;
          if (parsedCookies) return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.

      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: false }),

      removeItem: (key) => Cookies.remove(key),
    },
  })(store);
};
