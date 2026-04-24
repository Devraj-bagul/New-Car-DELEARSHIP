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

      <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-20 my-10 pt-24 pb-32">
        <h2 className="font-black text-4xl md:text-6xl text-midnight dark:text-white uppercase tracking-tighter mb-2">
          {mode === 'edit' ? 'Edit' : 'Add New'} <span className="text-gold italic font-serif lowercase">Listing</span>
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.3em] font-black mb-12 opacity-70">
          Reach thousands of elite buyers instantly
        </p>

        <form className="bg-white dark:bg-card border border-border/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] p-6 md:p-16 space-y-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-yellow-400 to-gold"></div>
          {/* Car Details  */}

          <div className="space-y-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-gold flex items-center justify-center rounded-2xl shadow-lg shadow-gold/20">
                  <span className="text-2xl">🚗</span>
               </div>
               <h2 className="font-black text-2xl uppercase tracking-widest text-midnight dark:text-white">Car Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {carDetails.carDetails.map((item, index) => (
                <div key={index} className="space-y-4 group">
                  <label className="text-[11px] font-black uppercase tracking-[0.25em] text-black dark:text-gray-400 group-hover:text-gold transition-colors flex items-center gap-3">
                    <IconField icon={item?.icon} />
                    <span>
                      {item?.label}
                      {item.required && <span className="text-red-600 ml-1.5">*</span>}
                    </span>
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

          <Separator className="opacity-50" />
          
          {/* feature List  */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-midnight dark:bg-gold/20 flex items-center justify-center rounded-2xl shadow-lg">
                     <span className="text-2xl text-gold">✨</span>
                  </div>
                  <h2 className="font-black text-2xl uppercase tracking-widest text-midnight dark:text-white">Premium Features</h2>
               </div>
               
               <Button 
                 type="button" 
                 variant="outline" 
                 size="sm" 
                 onClick={handleSelectAllFeatures}
                 className="w-fit text-[10px] font-black uppercase tracking-widest border-border hover:bg-neutral-100 dark:hover:bg-neutral-800"
               >
                 {features.features.every(item => featuresData?.[item.name]) ? "Unselect All" : "Quick Select All"}
               </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 bg-secondary/30 rounded-[2.5rem] border border-border/40 transition-colors">
              {features.features.map((item, index) => (
                <label key={index} className="flex gap-3 items-center p-3 rounded-2xl hover:bg-white dark:hover:bg-midnight transition-all cursor-pointer group border border-transparent hover:border-border/40 hover:shadow-sm">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                    className="w-5 h-5 border-2 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                  />{" "}
                  <span className="text-xs font-black text-black dark:text-neutral-400 group-hover:text-gold transition-colors tracking-tight">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* car Image  */}

          <Separator className="opacity-50" />
          
          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold flex items-center justify-center rounded-2xl shadow-lg">
                   <span className="text-2xl">📸</span>
                </div>
                <h2 className="font-black text-2xl uppercase tracking-widest text-midnight dark:text-white">Media Gallery</h2>
             </div>
             
             <div className="bg-secondary/20 p-4 md:p-8 rounded-[2.5rem] border border-dashed border-border/60">
                <UploadImages
                  triggleUploadImages={triggerUploadImages}
                  carInfo={carInfo}
                  mode={mode}
                  setLoader={(v) => {
                    setLoader(v);
                    navigate("/profile");
                  }}
                />
             </div>
          </div>

          <div className="pt-16 flex justify-end border-t border-border/40">
            <Button
              type="submit"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
              className="h-20 px-20 bg-black dark:bg-gold text-white dark:text-black font-black uppercase tracking-[0.3em] text-sm rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:scale-[1.03] active:scale-95 transition-all w-full md:w-auto relative z-50 overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-3">
                {!loader ? (
                  <>Publish Listing <span className="text-xl">🚀</span></>
                ) : (
                  <BiLoaderAlt className="animate-spin text-2xl" />
                )}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
