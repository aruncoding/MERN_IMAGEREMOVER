import { SHOW_DASHBOARD,
    SHOW_IMAGE_UPLOADER,
    SHOW_IMAGE_VIEWER
 } from "../constants/componentRender";

 export const showDashboard = () => ({
    type: SHOW_DASHBOARD,
});

export const showImageUploader = (folderId, subFolderId) => ({
    type: SHOW_IMAGE_UPLOADER,
    payload: { folderId, subFolderId },
});

export const showImageViewer = (folderId, subFolderId) => ({
    type: SHOW_IMAGE_VIEWER,
    payload: { folderId, subFolderId },
});
