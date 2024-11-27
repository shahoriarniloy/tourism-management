import React from 'react';

const TitleSection = ({ subHeader, mainHeader }) => {
    return (
        <div>
            <div className="text-center mb-8 px-4">
                <h2 className="text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-blue-700 after:rounded-lg-full">{mainHeader}</h2>
                <p className="mt-8 text-lg text-black font-thin">
                    {subHeader}
                </p>
            </div>
        </div>
    );
};

export default TitleSection;