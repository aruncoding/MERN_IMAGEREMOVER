import React, { useState, useEffect } from 'react';


const Imageuploader = () => {

    return (

        <div>
            <input
                type="file"
                accept="image/*"
                multiple />
            <button> Upload </button>
        </div>
    );
};

export default Imageuploader;
