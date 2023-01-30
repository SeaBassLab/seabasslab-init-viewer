declare type OptionName =
  | "autostart"
  | "autospin"
  | "preload"
  | "ui_infos"
  | "ui_stop"
  | "ui_controls"
  | "ui_fadeout"
  | "ui_fullscreen"
  | "ui_settings"
  | "ui_help"
  | "ui_inspector"
  | "ui_vr"
  | "ui_ar"
  | "ui_watermark"
  | "ui_ar_help"
  | "ui_ar_qrcode"
  | "ui_loading";
declare type OptionInfo =
  | "0"
  | "0.1"
  | "0.2"
  | "0.3"
  | "0.4"
  | "0.5"
  | "0.6"
  | "0.7"
  | "0.8"
  | "0.9"
  | "1";
declare type Options = Record<OptionName, OptionInfo>;
interface ViewerOptions {
  options?: Partial<Options>;
  api_version?: string;
}
interface RequestOptions {
  name: string;
  arguments: unknown[];
}
export interface ModelConfig {
  model_uid: string;
  container_id: string;
  loader_id?: string;
  request_settings?: RequestOptions[];
}
export declare const updateSettings: (
  container_id: string,
  request: RequestOptions
) => {
  destroy(): void;
};
export declare const initViewer: (
  config: ModelConfig,
  handleResults?: ((data: unknown) => void) | undefined,
  options?: ViewerOptions
) => {
  destroy(): void;
};
export {};
