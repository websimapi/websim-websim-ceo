import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { websimService } from "./WebsimService.js";
const safeJsonParse = (jsonString, fallback = {}) => {
  try {
    if (!jsonString || jsonString.trim() === "") return fallback;
    const parsed = JSON.parse(jsonString);
    if (typeof parsed !== "object" || parsed === null) throw new Error("JSON must be an object or array.");
    return parsed;
  } catch (e) {
    console.warn("Failed to parse JSON:", e);
    return null;
  }
};
const safeJsonStringify = (jsonObject, indent = 2) => {
  try {
    if (jsonObject === null || jsonObject === void 0) return "{}";
    return JSON.stringify(jsonObject, null, indent);
  } catch (e) {
    return "{}";
  }
};
const EditorView = ({ onBack }) => {
  const config = websimService.useCurrentUserConfig();
  const [formData, setFormData] = React.useState(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    if (config) {
      setFormData({
        name: config.name || "",
        logo_url: config.logo_url || "",
        // Ensure default empty object handling if record field is null/undefined
        col1_json: safeJsonStringify(config.col1_json || {}),
        col2_json: safeJsonStringify(config.col2_json || {}),
        col3_json: safeJsonStringify(config.col3_json || {})
      });
      setError(null);
    }
  }, [config]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await websimService.uploadFile(file);
      setFormData((prev) => ({ ...prev, logo_url: url }));
      await websimService.updateConfig(config.id, { logo_url: url });
      alert("Logo uploaded and saved successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to upload logo.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!config || isSaving || !formData) return;
    setIsSaving(true);
    setError(null);
    try {
      const col1 = safeJsonParse(formData.col1_json);
      const col2 = safeJsonParse(formData.col2_json);
      const col3 = safeJsonParse(formData.col3_json);
      if (col1 === null) throw new Error("Column 1 JSON is invalid.");
      if (col2 === null) throw new Error("Column 2 JSON is invalid.");
      if (col3 === null) throw new Error("Column 3 JSON is invalid.");
      if (!formData.name.trim()) throw new Error("Websim Name cannot be empty.");
      const updates = {
        name: formData.name,
        logo_url: formData.logo_url,
        col1_json: col1,
        col2_json: col2,
        col3_json: col3
      };
      await websimService.updateConfig(config.id, updates);
      alert("Websim Configuration updated successfully!");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save configuration. Please check your JSON formatting.");
    } finally {
      setIsSaving(false);
    }
  };
  if (!config || !formData) {
    return /* @__PURE__ */ jsxDEV("div", { className: "loading-overlay", children: "Loading Editor..." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 116,
      columnNumber: 16
    });
  }
  const displayLogoUrl = formData.logo_url && formData.logo_url !== "null" ? formData.logo_url : "/assets/websim_default_logo.png";
  return /* @__PURE__ */ jsxDEV("div", { className: "container", children: /* @__PURE__ */ jsxDEV("div", { className: "editor-container", children: [
    /* @__PURE__ */ jsxDEV("button", { onClick: onBack, style: { marginBottom: "20px" }, children: "\u2190 Back to Gallery" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 124,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("h2", { children: [
      "Websim Editor: ",
      config.name || "Untitled"
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 126,
      columnNumber: 17
    }),
    /* @__PURE__ */ jsxDEV("p", { children: "Define how your custom Websim works. All fields are stored in your single authorized row in the database." }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 127,
      columnNumber: 17
    }),
    error && /* @__PURE__ */ jsxDEV("div", { style: { color: "red", padding: "10px", border: "1px solid red", borderRadius: "4px", marginBottom: "10px" }, children: [
      /* @__PURE__ */ jsxDEV("strong", { children: "Error:" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 130,
        columnNumber: 21
      }),
      " ",
      error
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 129,
      columnNumber: 27
    }),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxDEV("div", { className: "section-title", children: "Identity & Branding" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 135,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "name", children: "Websim Name" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 138,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            value: formData.name,
            onChange: handleChange,
            required: true
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 139,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 137,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxDEV("label", { children: "Websim Logo" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 150,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(
          "img",
          {
            className: "websim-logo",
            src: displayLogoUrl,
            alt: "Current Logo",
            style: { width: "80px", height: "80px", margin: "10px 0" },
            onError: (e) => {
              e.target.onerror = null;
              e.target.src = "/assets/websim_default_logo.png";
            }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 151,
            columnNumber: 25
          }
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "file",
            accept: "image/*",
            onChange: handleLogoUpload,
            disabled: uploading
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 158,
            columnNumber: 25
          }
        ),
        /* @__PURE__ */ jsxDEV("p", { style: { marginTop: "5px", fontSize: "0.9rem", color: "#666" }, children: [
          "Current Logo URL (auto-saved upon upload): ",
          formData.logo_url || "Default"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 164,
          columnNumber: 25
        }),
        uploading && /* @__PURE__ */ jsxDEV("p", { style: { color: "blue" }, children: "Uploading logo..." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 167,
          columnNumber: 39
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 149,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "section-title", children: "Custom Data Definitions (JSON)" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 170,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "col1_json", children: "Column 1 (Config & Themes): Landing Page Content, Theme, Custom Code" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 174,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            id: "col1_json",
            name: "col1_json",
            value: formData.col1_json,
            onChange: handleChange,
            placeholder: '{"landing_page_content": "...", "theme": "...", "custom_code": "// JS/CSS"}'
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 175,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 173,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "col2_json", children: "Column 2 (AI Configuration): System Prompts, Behaviors (Required for AI within your Websim)" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 186,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            id: "col2_json",
            name: "col2_json",
            value: formData.col2_json,
            onChange: handleChange,
            placeholder: '{"ai_enabled": true, "system_prompt": "You are...", "initial_message": "..."}'
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 187,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 185,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("div", { className: "form-group", children: [
        /* @__PURE__ */ jsxDEV("label", { htmlFor: "col3_json", children: "Column 3 (Database Schema): Data Models for User's Websim (Required for database use within your Websim)" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 198,
          columnNumber: 25
        }),
        /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            id: "col3_json",
            name: "col3_json",
            value: formData.col3_json,
            onChange: handleChange,
            placeholder: '{"schemas": [{"name": "Post", "fields": ["title", "content"]}]}'
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 199,
            columnNumber: 25
          }
        )
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 197,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("button", { type: "submit", disabled: isSaving || uploading, children: isSaving ? "Saving..." : "Save Configuration" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 208,
        columnNumber: 21
      }),
      isSaving && /* @__PURE__ */ jsxDEV("p", { style: { color: "blue", marginTop: "10px" }, children: "Configuration changes take time to persist across the network." }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 211,
        columnNumber: 34
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 133,
      columnNumber: 17
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 123,
    columnNumber: 13
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 122,
    columnNumber: 9
  });
};
var stdin_default = EditorView;
export {
  stdin_default as default
};
