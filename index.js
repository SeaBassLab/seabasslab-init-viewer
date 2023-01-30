export const custom_loader = () => {
  return `<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;" id="loader">
	<div class="lds-grid" >
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>

	<style>
		.lds-grid {
			display: inline-block;
			position: relative;
			width: 80px;
			height: 80px;
		}
		.lds-grid div {
			position: absolute;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background: #fff;
			animation: lds-grid 1.2s linear infinite;
		}
		.lds-grid div:nth-child(1) {
			top: 8px;
			left: 8px;
			animation-delay: 0s;
		}
		.lds-grid div:nth-child(2) {
			top: 8px;
			left: 32px;
			animation-delay: -0.4s;
		}
		.lds-grid div:nth-child(3) {
			top: 8px;
			left: 56px;
			animation-delay: -0.8s;
		}
		.lds-grid div:nth-child(4) {
			top: 32px;
			left: 8px;
			animation-delay: -0.4s;
		}
		.lds-grid div:nth-child(5) {
			top: 32px;
			left: 32px;
			animation-delay: -0.8s;
		}
		.lds-grid div:nth-child(6) {
			top: 32px;
			left: 56px;
			animation-delay: -1.2s;
		}
		.lds-grid div:nth-child(7) {
			top: 56px;
			left: 8px;
			animation-delay: -0.8s;
		}
		.lds-grid div:nth-child(8) {
			top: 56px;
			left: 32px;
			animation-delay: -1.2s;
		}
		.lds-grid div:nth-child(9) {
			top: 56px;
			left: 56px;
			animation-delay: -1.6s;
		}
		@keyframes lds-grid {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.5;
			}
		}
	</style>
</div>
`;
};
const base_url = "https://sketchfab.com/models/";
const embed_path = "/embed?";
const required_params = {
  api_id: "1",
  api_version: "1.12.1",
};
const default_params = {
  autostart: "1",
  autospin: "0.2",
  preload: "1",
  ui_infos: "0",
  ui_stop: "0",
  ui_controls: "1",
  ui_fadeout: "0",
  ui_fullscreen: "0",
  ui_settings: "0",
  ui_help: "0",
  ui_inspector: "0",
  ui_vr: "0",
  ui_ar: "0",
  ui_watermark: "0",
  ui_ar_help: "0",
  ui_ar_qrcode: "0",
  ui_loading: "0",
};
export function build_url(model_uid, props) {
  if (typeof model_uid !== "string")
    throw new Error("model uid must be a string");
  if (props?.options) Object.assign(default_params, props.options);
  if (props?.api_version) Object.assign(required_params, props?.api_version);
  const newUrl = new URL(model_uid + embed_path, base_url);
  Object.keys(required_params).forEach((param) => {
    newUrl.searchParams.append(param, required_params[param]);
  });
  Object.keys(default_params).forEach((param) => {
    newUrl.searchParams.append(param, default_params[param]);
  });
  return newUrl.href;
}
export const updateSettings = (container_id, request) => {
  const VIEWER = window.document.getElementById("viewer_" + container_id);
  VIEWER &&
    VIEWER.contentWindow?.postMessage(
      {
        type: "api.request",
        instanceId: "1",
        requestId: request.name,
        member: request.name,
        arguments: request.arguments,
      },
      "https://sketchfab.com"
    );
};
export const initViewer = (config, handleResults, options) => {
  if (typeof config !== "object") throw new Error("config must be an object");
  const VIEWER = window.document.createElement("iframe");
  const CONTAINER = window.document.getElementById(config.container_id);
  const LOADER = window.document.getElementById(config.loader_id || "loader");
  const PREVIOUS_INSTANCE = window.document.getElementById(
    "viewer_" + config.container_id
  );
  LOADER ? null : CONTAINER ? (CONTAINER.innerHTML = custom_loader()) : null;
  PREVIOUS_INSTANCE
    ? () => {
        LOADER?.setAttribute("style", "display: flex;");
        CONTAINER?.removeChild(PREVIOUS_INSTANCE);
      }
    : null;
  CONTAINER?.style;
  CONTAINER?.setAttribute(
    "style",
    "position: relative; display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;"
  );
  VIEWER.width = "100%";
  VIEWER.height = "100%";
  VIEWER.id = "viewer_" + config.container_id;
  VIEWER.allowFullscreen = true;
  VIEWER.style;
  VIEWER.setAttribute(
    "style",
    "opacity: 0; transition: opacity 1s; position: absolute; z-index: -1"
  );
  VIEWER.src = build_url(config.model_uid, options);
  VIEWER.onload = () => {
    VIEWER.contentWindow?.postMessage(
      { type: "api.initialize", requestId: 0, name: "1.12.1", instanceId: "1" },
      "https://sketchfab.com"
    );
  };
  const showModel = () => {
    LOADER?.setAttribute("style", "display: none;");
    VIEWER.setAttribute(
      "style",
      "opacity: 1; transition: opacity 1s; position: absolute; z-index: 1"
    );
  };
  const sendMessage = () => {
    config.request_settings &&
      config.request_settings.forEach((request) => {
        VIEWER.contentWindow?.postMessage(
          {
            type: "api.request",
            instanceId: "1",
            requestId: request.name,
            member: request.name,
            arguments: request.arguments,
          },
          "https://sketchfab.com"
        );
      });
  };
  const handleMessageEvent = (event) => {
    const { data } = event;
    if (data.results) {
      data.results[1]?.progress === 1 && showModel();
      data.results[0] === "viewerready" && sendMessage();
    }
    data.type === "api.request.result" &&
      handleResults &&
      handleResults({
        name: data.requestId,
        result: data.results[0] ?? data.results[1],
      });
  };
  window.addEventListener("message", (event) => handleMessageEvent(event));
  CONTAINER?.appendChild(VIEWER);
  return {
    destroy() {
      window.removeEventListener("message", (event) =>
        handleMessageEvent(event)
      );
    },
  };
};
