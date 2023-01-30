# seabasslab-init-viewer

Author:

- @SeaBassLab

## tl;dr

- Install by executing `npm i seabasslab-init-viewer` or `yarn add seabasslab-init-viewer`.
- Import by adding `import { initViewer } from 'seabasslab-init-viewer'`.
- Use by adding this function `initViewer(config)`.
- Use `onMount` because it needs to run on client side.

## Description

seabasslab-init-viewer is a small browser-oriented library that allows you to manipulate the Sketchfab Viewer API simply and easily.

## Motivation

With the strong demand for 3D models on the web. Sketchfab has become an important benchmark for many reasons, one of which is connecting a 3D viewer to an iframe tag. I have personally had to work on several projects where it was necessary to implement and modify the API viewer. Hide a button, add a custom payload, custom icon, etc.
The hard part is implementing the Sketchfab client in projects with server-side rendering.🤒
These and other common API viewer configuration errors that consume research time and cause us some headaches. This package will be handling them 👍🏻. So enjoy it 🙌🏼!!!

## Getting started

### Installation

Add seabasslab-init-viewer to your project by executing

```js
 npm install seabasslab-init-viewer
```

or

```js
 yarn add seabasslab-init-viewer
```

### Usage

Here's an example of basic usage:

- Add a container

```html
<main id="1-iframe-container">
  <!-- <div id="loader">Loading!</div> -->
</main>
```

- Initialize the viewer

  ```js
  import { initViewer } from "@ibisdev/init-viewer";
  import { onMount } from "svelte";

  const config = {
    model_uid: "a47b60046a9b45b9a465af72fac78deb", // required
    container_id: "1-iframe-container", // required
    request_settings: [
      // optional
      {
        name: "getMaterialList",
        arguments: [],
      },
      {
        name: "getTextureList",
        arguments: [],
      },
      {
        name: "setTextureQuality",
        arguments: ["hd"],
      },
    ],
  };

  onMount(async () => {
    initViewer(config, (data) => {
      console.log(data); // data is the value for the request_settings response
    });
  }); // needs to run on the client side

  updateSettings("1-iframe-container", {
    name: "startAR",
    arguments: [],
  });
  ```

# InitViewer

## Config

- `model_uid`: It refers to the identification of the 3D model previously uploaded in Sketchfab

- `container_id`: Refers to the id of the HTML tag container

- `request_settings`: It is an array of objects containing 2 properties. The function name and arguments(if it takes no arguments, pass an empty array)

## Callback

- Receives a response to functions in request_settings and/or updateSettings

## Function - updateSettings

Receives 2 arguments. The first is a string with the id of the `HTML` container tag and the second is an object equal to the objects in request_settings. This function allows you to manipulate the 3D model without having to start it again.

## TypeScript

- This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.

## Options

- Option parameters for the 3D viewer

You will probably need to interact with the different options provided by the Sketchfab viewer API itself. Many of the options have account limitations.
Please visit the [official site](https://sketchfab.com/developers/viewer/initialization) to know all the options

having said that...

You can control the different aspects of the model viewer by passing as a third parameter (optional) an object with the values allowed by the Sketchfab Viewer API

```js
onMount(async () => {
  initViewer(
    config,
    (data) => {
      console.log(data);
    },
    { autospin: 0.2 }
  ); // read on for possible values and uses
});
```

## Possible Values

| Key           | Default Value   | Account Limitation | Usage                                                                               |
| ------------- | --------------- | ------------------ | ----------------------------------------------------------------------------------- |
| success       | (api:any)=>void | none               | It will be passed an api object so that you can interact with the viewer.           |
| error         | ()=>void        | none               | This callback will be invoked when the viewer can not be initialized.               |
| autostart     | 1               | none               | Setting to 0 will make the model load wait for a user to click the Play button.     |
| autospin      | 0.2             | none               | Cause the model to automatically spin around the z-axis after loading.              |
| preload       | 1               | none               | Setting to 0 will not force all resources to download before the scene is displayed |
| ui_infos      | 0               | Premium            | Setting to 1 will not hide the model info bar at the top of the viewer.             |
| ui_stop       | 0               | none               | Setting to 0 will not hide the "Disable Viewer" button in the top right.            |
| ui_controls   | 1               | Premium            | Setting to 0 will hide all the viewer controls at the bottom of the viewer.         |
| ui_fadeout    | 0               | Premium            | Setting to 1 will not prevent controls from disappearing when the camera moves.     |
| ui_fullscreen | 0               | Premium            | Setting to 1 will not hide the Fullscreen button.                                   |
| ui_settings   | 0               | Premium            | Setting to 1 will not hide the Settings button.                                     |
| ui_help       | 0               | Premium            | Setting to 1 will not hide the Help button.                                         |
| ui_inspector  | 0               | Premium            | Setting to 1 will not hide the inspector button.                                    |
| ui_vr         | 0               | Premium            | Setting to 1 will not hide the View in VR button.                                   |
| ui_ar         | 0               | Premium            | Setting to 1 will not hide 1 will not hide.                                         |
| ui_watermark  | 0               | Premium            | Setting to 1 will not remove the Sketchfab logo watermark.                          |
| ui_ar_help    | 0               | Premium            | Setting to 1 will not hide the AR popup's help link.                                |
| ui_ar_qrcode  | 0               | Premium            | Setting to 1 will not hide the AR popup's QR code.                                  |
| ui_loading    | 0               | Premium            | Setting to 1 will not hide the viewer loading bars.                                 |

## Author

<table>
  <tr>
    <td>
      <img src="https://avatars.githubusercontent.com/u/70863556?v=4" width="100">
    </td>
    <td>
      Sebastian Pulido<br />
      <a href="mailto:sebastian.pulido@ibisdev.tech">sebastian.pulido@ibisdev.tech</a><br />
      Software Developer at IbisDev<br />
      <a href="https://ibisdev.tech">https://ibisdev.tech</a>
    </td>
  </tr>
</table>
