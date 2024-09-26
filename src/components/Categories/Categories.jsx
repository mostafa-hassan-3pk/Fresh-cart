import axios from "axios";
import { Helmet } from "react-helmet";
import { InfinitySpin } from "react-loader-spinner";
import { Card } from "flowbite-react";
import { useQuery } from "react-query";

const Categories = () => {
  // Function to fetch all categories from the API
  const getAllCategories = async () => {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return data.data;
  };

  // Using react-query to fetch categories
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("categories", getAllCategories);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>

      <div className="container mx-auto p-4 mt-14">
        {/* Loading Spinner */}
        {isLoading ? (
          <div className="h-[calc(-112px+100vh)] flex justify-center items-center">
            <InfinitySpin
              visible={true}
              width="200"
              color="#0e9f6e"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : error ? (
          // Error Message
          <div className="h-[calc(-112px+100vh)] flex justify-center items-center">
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          // Categories Grid
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] m-auto mt-10  ">
            {categories?.length > 0 ? (
              categories.map((category, idx) => (
                <Card
                  key={idx}
                  className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="text-2xl font-bold tracking-tight text-green-600">
                      {category.name}
                    </h5>
                  </div>
                </Card>
              ))
            ) : (
              // No Categories Found Message
              <div className="col-span-full flex justify-center items-center">
                <p className="text-gray-700 dark:text-gray-400">
                  No categories found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Categories;
