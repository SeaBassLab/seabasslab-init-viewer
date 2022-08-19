export interface Options {
    success?: (api: any) => void;
    error?: () => void;
    autostart?: number;
    autospin?: number;
    preload?: number;
    ui_infos?: number;
    ui_stop?: number;
    ui_controls?: number;
    ui_fadeout?: number;
    ui_fullscreen?: number;
    ui_settings?: number;
    ui_help?: number;
    ui_inspector?: number;
    ui_vr?: number;
    ui_ar?: number;
    ui_watermark?: number;
    ui_ar_help?: number;
    ui_ar_qrcode?: number;
    ui_loading?: number;
}
export declare const options: Options;
export declare const init_viewer: (iframe: HTMLIFrameElement, uid: string, custom_options?: Options) => void;
