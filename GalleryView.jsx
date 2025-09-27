import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { websimService } from "./WebsimService.js";
const GalleryView = () => {
  const allConfigs = websimService.useAllConfigs();
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    websimService.getCurrentUser().then(setCurrentUser);
  }, []);
  if (!currentUser) {
    return /* @__PURE__ */ jsxDEV("div", { className: "loading-overlay", children: "Connecting to Websim Network..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 14,
      columnNumber: 16
    });
  }
  const { username: currentUsername } = currentUser;
  return /* @__PURE__ */ jsxDEV("div", { className: "container", children: [
    /* @__PURE__ */ jsxDEV("h2", { children: [
      "Websim Gallery (",
      allConfigs.length,
      " Projects)"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 21,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "gallery", children: allConfigs.map((config) => /* @__PURE__ */ jsxDEV(
      WebsimCard,
      {
        config,
        isMine: config.username === currentUsername
      },
      config.id,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 24,
        columnNumber: 21
      }
    )) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 22,
      columnNumber: 13
    }),
    allConfigs.length === 0 && /* @__PURE__ */ jsxDEV("p", { style: { textAlign: "center", margin: "50px" }, children: 'No Websims configured yet. Click "My Websim Editor" to create yours!' }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 32,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 20,
    columnNumber: 9
  });
};
const WebsimCard = ({ config, isMine }) => {
  const logoUrl = config.logo_url && config.logo_url !== "null" && config.logo_url !== "undefined" ? config.logo_url : "/assets/websim_default_logo.png";
  const name = config.name || "Untitled Websim";
  return /* @__PURE__ */ jsxDEV("div", { className: "websim-card", children: [
    /* @__PURE__ */ jsxDEV(
      "img",
      {
        className: "websim-logo",
        src: logoUrl,
        alt: `${name} logo`,
        onError: (e) => {
          e.target.onerror = null;
          e.target.src = "/assets/websim_default_logo.png";
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 49,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "websim-name", children: name }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 55,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("small", { children: [
      "@",
      config.username,
      " ",
      isMine && "(Me)"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 48,
    columnNumber: 9
  });
};
var stdin_default = GalleryView;
export {
  stdin_default as default
};
