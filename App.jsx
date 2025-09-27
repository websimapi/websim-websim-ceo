import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import * as ReactDOM from "react-dom/client";
import { websimService } from "./WebsimService.js";
import GalleryView from "./GalleryView.jsx";
import EditorView from "./EditorView.jsx";
function useQueryParams() {
  const [search, setSearch] = React.useState(window.location.search);
  React.useEffect(() => {
    const handlePopState = () => {
      setSearch(window.location.search);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const App = () => {
  const query = useQueryParams();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [appView, setAppView] = React.useState(query.get("view") === "editor" ? "editor" : "gallery");
  React.useEffect(() => {
    websimService.initPromise.then(async () => {
      const user = await websimService.getCurrentUser();
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);
  React.useEffect(() => {
    const urlView = query.get("view") === "editor" ? "editor" : "gallery";
    setAppView(urlView);
  }, [query]);
  const navigate = (newView) => {
    const path = newView === "editor" ? `?view=editor` : window.baseUrl;
    if (newView !== appView) {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new Event("popstate"));
    }
  };
  const renderView = () => {
    if (isLoading) {
      return /* @__PURE__ */ jsxDEV("div", { className: "loading-overlay", children: "Initializing App..." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 58,
        columnNumber: 20
      });
    }
    if (appView === "editor") {
      return /* @__PURE__ */ jsxDEV(EditorView, { onBack: () => navigate("gallery") }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 62,
        columnNumber: 20
      });
    }
    return /* @__PURE__ */ jsxDEV(GalleryView, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 65,
      columnNumber: 16
    });
  };
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(Header, { navigate, currentView: appView }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 70,
      columnNumber: 13
    }),
    renderView()
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 69,
    columnNumber: 9
  });
};
const Header = ({ navigate, currentView }) => {
  return /* @__PURE__ */ jsxDEV("header", { children: [
    /* @__PURE__ */ jsxDEV("h1", { children: "Websim CEO Dashboard" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 79,
      columnNumber: 13
    }),
    currentView === "editor" ? /* @__PURE__ */ jsxDEV("button", { onClick: () => navigate("gallery"), children: "Gallery View" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 81,
      columnNumber: 17
    }) : /* @__PURE__ */ jsxDEV("button", { onClick: () => navigate("editor"), children: "My Websim Editor" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 83,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 78,
    columnNumber: 9
  });
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 90,
  columnNumber: 13
}));
