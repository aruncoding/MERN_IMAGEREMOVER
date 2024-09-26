import { SHOW_DASHBOARD,
    SHOW_IMAGE_UPLOADER,
    SHOW_IMAGE_VIEWER } from "../constants/componentRender";

    const initialState = {
        currentComponent: 'dashboard', // Default component to show
        selectedFolderId: null,
        selectedSubFolderId: null,
    };
    
    const componentRenderReducer = (state = initialState, action) => {
        switch (action.type) {
            case SHOW_DASHBOARD:
                return { ...state, currentComponent: 'dashboard' };
            case SHOW_IMAGE_UPLOADER:
                return { 
                    ...state, 
                    currentComponent: 'imageUploader', 
                    selectedFolderId: action.payload.folderId,
                    selectedSubFolderId: action.payload.subFolderId 
                };
            case SHOW_IMAGE_VIEWER:
                return { 
                    ...state, 
                    currentComponent: 'showImage', 
                    selectedFolderId: action.payload.folderId,
                    selectedSubFolderId: action.payload.subFolderId 
                };
            default:
                return state;
        }
    };
    
    export default componentRenderReducer;
    
    