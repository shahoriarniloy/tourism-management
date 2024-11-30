
"use client";
import React, { Suspense } from "react";
import SingleResort from "../singleResort/page";

const ResortPage = () => {
    return (
        <Suspense fallback={<p>Loading resort details...</p>}>
            <SingleResort />
        </Suspense>
    );
};

export default ResortPage;
