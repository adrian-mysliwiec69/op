/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-bc83dc37'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/index.0af82f49.css",
    "revision": null
  }, {
    "url": "assets/index.e485f400.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "936dc15f3113e63554ccaee3bb562c56"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "images/icons/android-chrome-192x192.png",
    "revision": "5c42e0bf3e6000a21ccfb7db70f968b3"
  }, {
    "url": "images/icons/android-chrome-512x512.png",
    "revision": "35dce6370c447e0189a427789ca0a26f"
  }, {
    "url": "images/employees.jpg",
    "revision": "183434f7da5cfd90317e11dbaa2f88c2"
  }, {
    "url": "webfonts/fa-brands-400.ttf",
    "revision": "f34b6a2a94e1a01e4c21fa84dcbf6667"
  }, {
    "url": "webfonts/fa-brands-400.woff2",
    "revision": "ee91e640b5449fb98d9320c877a9866e"
  }, {
    "url": "webfonts/fa-regular-400.ttf",
    "revision": "65e80529f5cfcf16a4b1161601a1616c"
  }, {
    "url": "webfonts/fa-regular-400.woff2",
    "revision": "82bafee9dcc7b6fb7bca7ed323f9b7ae"
  }, {
    "url": "webfonts/fa-solid-900.ttf",
    "revision": "52afeb7a328694838c6b073ad7af24d8"
  }, {
    "url": "webfonts/fa-solid-900.woff2",
    "revision": "57b380d27f14f16e737bcca7e849cf79"
  }, {
    "url": "webfonts/fa-v4compatibility.ttf",
    "revision": "9d6f359a328ee3df73709c1d8f05b0d4"
  }, {
    "url": "webfonts/fa-v4compatibility.woff2",
    "revision": "43044320c62b2b1397b8a0d535dea6a7"
  }, {
    "url": "fonts/Montserrat/Montserrat-Regular.ttf",
    "revision": "34de1239b12123b85ff1a68b58835a1f"
  }, {
    "url": "images/icons/apple-touch-icon.png",
    "revision": "bf3ad9bdf93e301b34b708504a55f1de"
  }, {
    "url": "images/icons/favicon-16x16.png",
    "revision": "d52159b7af901dc604d9f225741e0a4e"
  }, {
    "url": "images/icons/favicon-32x32.png",
    "revision": "9bfabce1d04c23108097cbbf39f41472"
  }, {
    "url": "images/icons/favicon.ico",
    "revision": "e8302d59481b7726f0786d469bb446d6"
  }, {
    "url": "images/icons/mstile-150x150.png",
    "revision": "7a9864a9a4215975c96d2c99b6421642"
  }, {
    "url": "manifest.webmanifest",
    "revision": "09fdc3bc27ef274a18304014878010e2"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/\/images\/portraits\/.+\/.+/, new workbox.CacheFirst({
    "cacheName": "roberts-images",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute("/employees", new workbox.NetworkFirst({
    "cacheName": "roberts-employees",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 50,
      maxAgeSeconds: 86400
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
