import React from 'react';
import SvgLoading from '../svg/Svg-loading';

const Loading = () => {
    return (
        <div className="flex items-center flex-col my-auto justify-center w-full h-full">
            <div className="flex justify-center items-center space-x-1 text-sm text-white">
                <SvgLoading />
                <div className="text-white animate-pulse">Loading ...</div>
            </div>
        </div>
    );
};

export default Loading;
