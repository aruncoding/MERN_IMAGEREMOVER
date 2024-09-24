import { SHOW_DASHBOARD,
    SHOW_IMAGE_UPLOADER,
    SHOW_IMAGE_VIEWER
 } from "../constants/componentRender";

 export const showDashboard = () => ({
    type: SHOW_DASHBOARD,
});

export const showImageUploader = () => ({
    type: SHOW_IMAGE_UPLOADER,
});

export const showImageViewer = () => ({
    type: SHOW_IMAGE_VIEWER,
});