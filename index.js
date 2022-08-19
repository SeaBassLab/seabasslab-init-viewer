const error = () => {
    console.error("Sketchfab API error");
};
const success = (api) => {
    api.start();
    api.addEventListener('viewerready', function () {
        // API is ready to use
        // Insert your code here
        console.log('Viewer is ready');
    });
};
export const options = {
    success: success,
    error: error,
    autostart: 1,
    autospin: 0.2,
    preload: 1,
    ui_infos: 0,
    ui_stop: 0,
    ui_controls: 1,
    ui_fadeout: 0,
    ui_fullscreen: 0,
    ui_settings: 0,
    ui_help: 0,
    ui_inspector: 0,
    ui_vr: 0,
    ui_ar: 0,
    ui_watermark: 0,
    ui_ar_help: 0,
    ui_ar_qrcode: 0,
    ui_loading: 0,
};
export const init_viewer = (iframe, uid, custom_options) => {
    const client = new window.Sketchfab(iframe);
    if (custom_options)
        Object.assign(options, custom_options);
    client.init(uid, options);
};
