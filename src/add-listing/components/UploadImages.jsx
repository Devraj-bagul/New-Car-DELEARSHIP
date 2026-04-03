import { supabase } from "../../../configs/supabase";
import { storage } from "../../../configs/firebaseConfig";
import { ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { CarImages } from "./../../../configs/schema";
import { db } from "./../../../configs";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UploadImages = ({ triggleUploadImages, setLoader, carInfo, mode }) => {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [EditCarImageList, setEditCarImageList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode == "edit" && carInfo?.images?.length > 0) {
      setEditCarImageList(carInfo.images);
    }
  }, [carInfo]);

  useEffect(() => {
    if (triggleUploadImages && selectedFileList.length > 0) {
      UploadImageToServer();
    }
  }, [triggleUploadImages]);

  const onFileSelected = (event) => {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setSelectedFileList((prev) => [...prev, file]);
      }
    }
  };

  const onImageRemove = (image) => {
    const result = selectedFileList.filter((item) => item !== image);
    setSelectedFileList(result);
  };

  const onImageRemoveFromDB = async (image) => {
    try {
      const result = await db
        .delete(CarImages)
        .where(eq(CarImages.id, image.id))
        .returning({ id: CarImages.id });

      if (result) {
        const imageList = EditCarImageList.filter((item) => item.id !== image.id);
        setEditCarImageList(imageList);
        toast.success("Image removed");
      }
    } catch (e) {
      console.error("Error deleting image:", e);
      toast.error("Failed to delete image.");
    }
  };

  const UploadImageToServer = async () => {
    setLoader(true);
    if (!selectedFileList || selectedFileList.length === 0) {
      setLoader(false);
      return;
    }

    try {
      for (const file of selectedFileList) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        // 1️⃣ Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from("car-images") // Updated to match config
          .upload(fileName, file);

        if (error) {
          console.error("Upload failed for:", file.name, error.message);
          toast.error("Failed to upload " + file.name);
          continue;
        }

        // 2️⃣ Get Public URL
        const { data: urlData } = supabase.storage
          .from("car-images")
          .getPublicUrl(fileName);

        const imageUrl = urlData.publicUrl;
        console.log("Uploaded Image URL:", imageUrl);

        // 3️⃣ Save Image URL in Neon DB (Drizzle)
        await db.insert(CarImages).values({
          imageUrl: imageUrl,
          carListingId: triggleUploadImages,
        });

        console.log("Image saved in Neon DB");
      }
    } catch (e) {
      console.error("Error in UploadImageToServer:", e);
      toast.error("Something went wrong during image upload.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {mode == "edit" &&
          EditCarImageList.map((image, index) => (
            <div key={index} className="relative">
              <IoMdCloseCircle
                className="absolute m-2 text-lg text-white cursor-pointer"
                onClick={() => onImageRemoveFromDB(image)}
              />
              <img
                src={image?.imageUrl}
                className="w-full h-[130px] object-cover rounded-xl"
                alt=""
              />
            </div>
          ))}

        {selectedFileList.map((image, index) => (
          <div key={index}>
            <IoMdCloseCircle
              className="absolute m-2 text-lg text-white"
              onClick={() => onImageRemove(image, index)}
            />

            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt=""
            />
          </div>
        ))}
        <label htmlFor="upload-iamges">
          <div className="border rounded-xl border-dotted border-blue-600 bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center text-red-600">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-iamges"
          onChange={onFileSelected}
          className="opacity-0"
        />
      </div>
    </div>
  );
};

export default UploadImages;
