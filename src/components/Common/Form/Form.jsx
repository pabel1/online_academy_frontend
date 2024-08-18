import * as React from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../Upload/ImageUpload";


const Form = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>{
console.log(data, selectedFile)
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] border px-8 py-5 rounded-md">
        <div className="">
          {/* <h2 className="text-md font-bold">Billing details</h2> */}
          <div className="form ">
            <div className="grid grid-cols-9 gap-4">
              <div className="banner col-span-4 h-full">
                <div className="screenshot">
                  <label htmlFor="screenshot">Screenshot</label>
                  <br />
                  <ImageUpload
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                </div>
              </div>
              <div className="details col-span-5 flex flex-col gap-2">
                <div className="order-id">
                  <label htmlFor="order-id">
                    Order ID<span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="text"
                    id="order-id"
                    {...register("orderId")}
                    placeholder="Enter Order ID"
                  />
                </div>
                
                <div className="date">
                  <label htmlFor="date">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="date"
                    id="date"
                    {...register("date")}
                    placeholder="Enter course name"
                  />
                </div>
                
                <div className="price">
                  <label htmlFor="price">
                  Price <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    className="w-full border border-gray-400 p-2 focus:outline-none rounded-md"
                    type="number"
                    id="price"
                    {...register("price")}
                    placeholder="Enter Price"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="button flex justify-end mt-2">
          {isLoading ? (
            <button className="bg-[#6440FB] text-white px-7 py-2 rounded-md">
              <span>Creating...</span>
            </button>
          ) : (
            <button
              className="bg-[#11998E] text-white px-7 py-2 rounded-md"
              type="submit"
            >
              <span>Get Cashback</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
