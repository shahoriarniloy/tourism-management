// import { connectDB } from "@/lib/connectDB";
// import { resorts } from "@/lib/resorts";




// // Connect to the database
// await connectDB();

// export default async function handler(req, res) {
//     if (req.method === "GET") {
//         const { query } = req.query; // Get the search query from the URL
//         try {
//             const resort = resorts.find({
//                 $or: [
//                     { name: { $regex: query, $options: "i" } }, // Search by resort name
//                 ],
//             });

//             res.status(200).json(resort);
//         } catch (error) {
//             console.error("Error fetching resort:", error);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     } else {
//         res.setHeader("Allow", ["GET"]);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }


// pages/api/resorts.js

import { resorts } from "@/lib/resorts"; // Assuming resorts are stored in this file or fetched from a DB

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { searchTerm, price, destination, destinationType } = req.query;

        // Parse price range from the query
        const priceRange = price ? price.split(',').map(p => parseInt(p)) : [50, 3000];

        // Initialize filters
        const filters = {
            name: searchTerm ? { $regex: searchTerm, $options: "i" } : undefined, // Case-insensitive name search
            price: priceRange.length === 2 ? { $gte: priceRange[0], $lte: priceRange[1] } : undefined,
            destination: destination ? { $regex: destination, $options: "i" } : undefined,
            destinationType: destinationType || undefined,
        };

        // Filter resorts based on query params
        const filteredResorts = resorts.filter(resort => {
            let match = true;

            // Name match
            if (filters.name && !new RegExp(filters.name.$options).test(resort.name)) match = false;
            // Price range match
            if (filters.price && !(resort.price >= filters.price.$gte && resort.price <= filters.price.$lte)) match = false;
            // Destination match
            if (filters.destination && !new RegExp(filters.destination.$options).test(resort.location)) match = false;
            // Destination type match
            if (filters.destinationType && resort.destinationType !== filters.destinationType) match = false;

            return match;
        });

        res.status(200).json(filteredResorts);
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

