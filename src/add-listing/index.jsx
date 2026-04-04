import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "@/components/DropdownField";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import features from "./../Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CarImages, CarListing } from "./../../configs/schema";
import { db } from "./../../configs";
import TextAreaField from "@/components/TextAreaField";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner";

import { useNavigate, useSearchParams } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";

const AddListing = () => {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode == "edit" && recordId) {
      GetListingDetail();
    } else {
      setFormData({
        instagramUrl: "https://www.instagram.com/vinitautodeals_malegaon/?hl=en",
      });
    }
  }, [mode, recordId]);

  const GetListingDetail = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, recordId));

      const resp = Service.FormatResult(result);
      console.log("Fetched Detail:", resp);
      if (resp && resp.length > 0) {
        setCarInfo(resp[0]);
        setFormData(resp[0]);
        setFeaturesData(resp[0].features || []);
      }
    } catch (e) {
      console.error("Error fetching listing detail:", e);
    }
  };

  // Used To capture User Input Form the Form!
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

  // Used To Save selected  Feature List!
  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectAllFeatures = () => {
    // Check if all are currently selected
    const allSelected = features.features.every(item => featuresData?.[item.name]);
    
    if (allSelected) {
      // Unselect all
      setFeaturesData({});
    } else {
      // Select all
      const allSelectedData = {};
      features.features.forEach(item => {
        allSelectedData[item.name] = true;
      });
      setFeaturesData(allSelectedData);
    }
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(formData);
    toast("please Wait....");

    if (mode == "edit") {
      const { images, id, ...dataToUpdate } = formData;
      try {
        const result = await db
          .update(CarListing)
          .set({
            ...dataToUpdate,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .where(eq(CarListing.id, recordId))
          .returning({ id: CarListing.id });

        if (result) {
          console.log("Data Updated");
          setTriggerUploadImages(result[0]?.id);
          setLoader(false);
        }
      } catch (e) {
        console.error("Error updating listing:", e);
        toast.error("Failed to update listing.");
        setLoader(false);
      }
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName, // This Line is added Latter
            userImageUrl: user?.imageUrl, // This Line is added latter
            postedOn: moment().format("DD/MM/yyyy"),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log("Data Saved");
          setTriggerUploadImages(result[0]?.id);
          setLoader(false);
        }
      } catch (e) {
        console.error("Error creating listing:", e);
        toast.error("Failed to create listing. Check console for details.");
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* Car Details  */}

          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconField icon={item?.icon} />
                    {item?.label}{" "}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />
          {/* feature List  */}
          <div>
            <div className="flex justify-between items-center my-6">
              <h2 className="font-medium text-xl">Features</h2>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleSelectAllFeatures}
                className="text-gold border-gold/50 hover:bg-gold/10"
              >
                {features.features.every(item => featuresData?.[item.name]) ? "Unselect All" : "Select All Features"}
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                  />{" "}
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* car Image  */}

          <Separator className="my-6" />
          <UploadImages
            triggleUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            setLoader={(v) => {
              setLoader(v);
              navigate("/profile");
            }}
          />

          <div className="mt-10 flex justify-end">
            <Button
              type="submit"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? (
                "Submit"
              ) : (
                <BiLoaderAlt className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
