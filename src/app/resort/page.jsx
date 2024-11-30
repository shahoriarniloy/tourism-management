
"use client";
import React, { Suspense } from "react";
import SingleResort from "./SingleResort";

const ResortPage = () => {
    return (
        <Suspense fallback={<p>Loading resort details...</p>}>
            <SingleResort />
        </Suspense>
    );
};

export default ResortPage;
