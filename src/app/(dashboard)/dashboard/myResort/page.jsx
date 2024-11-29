"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";

const UpdateResortPage = () => {
  const session = useSession();

  const [resort, setResort] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchResort = async () => {
      if (!session?.data?.user?.email) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard/myResort/api/${session?.data?.user?.email}`
        );
        const data = await response.json();

        if (data && data.myResort) {
          setResort(data.myResort);
          setImagePreview(data.myResort.imageUrl);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Resort not found!",
          });
        }
      } catch (error) {
        console.error("Error fetching resort:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch resort data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResort();
  }, [session?.data?.user?.email]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.data.url;
  };

  const handleUpdateResort = async (event) => {
    event.preventDefault();

    const updatedResort = {
      name: event.target.name.value,
      location: event.target.location.value,
      phone: event.target.phone.value,
      resortName: event.target.resortName.value,
      description: event.target.description.value,
      priceRange: event.target.priceRange.value,
    };

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToImgBB(image);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/myResort/api/${session?.data?.user?.email}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            ...updatedResort,
            imageUrl,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Resort updated successfully!",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Failed to update resort.",
        });
      }
    } catch (error) {
      console.error("Error updating resort:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center"><span className="flex justify-center items-center">
      <div className="w-24 h-24 border-4 border-gray-300 border-t-sky-500 rounded-full animate-spin"></div>
    </span>
    </div>
      ;
  }

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Resort</h1>
        <form onSubmit={handleUpdateResort} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block font-medium mb-1 text-gray-700">Resort Name</label>
            <input
              type="text"
              name="resortName"
              defaultValue={resort.resortName}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label className="block font-medium mb-1 text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={resort.location}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label className="block font-medium mb-1 text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={resort.phone}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block font-medium mb-1 text-gray-700">Description</label>
            <textarea
              name="description"
              defaultValue={resort.description}
              rows="4"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label className="block font-medium mb-1 text-gray-700">Price Range</label>
            <input
              type="text"
              name="priceRange"
              defaultValue={resort.priceRange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label className="block font-medium mb-1 text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}

              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-2 relative w-32 h-32">
                <Image
                  src={imagePreview}
                  alt="Image Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 absolute top-0 right-0 bg-white p-1 rounded-full"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Resort
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateResortPage;
