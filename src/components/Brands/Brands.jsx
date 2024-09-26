import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { InfinitySpin } from "react-loader-spinner";
import { Card } from "flowbite-react";
import { useQuery } from "react-query";

const Brands = () => {
  // Function to fetch all brands from the API
  const getAllBrands = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return data.data;
  };

  // Using react-query to fetch brands
  const { data: brands, isLoading, error } = useQuery("brands", getAllBrands);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <div className="container mx-auto p-4 mt-14">
        {/* Loading Spinner */}
        {isLoading ? (
          <div className="min-h-[calc(-112px+100vh)] flex justify-center items-center">
            <InfinitySpin
              visible={true}
              width="200"
              color="#0e9f6e"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : error ? (
          // Error Message
          <div className="min-h-[calc(-112px+100vh)] flex justify-center items-center">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          // Brands Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[90%] m-auto mt-10">
            {brands?.length > 0 ? (
              brands.map((brand, idx) => (
                <Card
                  key={idx}
                  className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full"
                  />
                  <div className="p-4">
                    <h5 className="text-2xl font-bold tracking-tight text-green-600">
                      {brand.name}
                    </h5>
                  </div>
                </Card>
              ))
            ) : (
              // No Brands Found Message
              <div className="col-span-full flex justify-center items-center">
                <p className="text-gray-700 dark:text-gray-400">
                  No brands found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Brands;
