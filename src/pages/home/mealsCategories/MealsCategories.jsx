import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MealsCart from "../../../components/MealsCart";

export default function MealsCategories({ meals }) {
  return (
    <div className="container mx-auto">
      <div className="mt-14 mb-14 text-center px-4 md:px-0">
        <h1 className=" text-2xl md:text-3xl uppercase font-semibold">
          Meals by Categories
        </h1>
        <p className="max-w-[550px] text-center mx-auto mt-2 text-sm md:text-base">
          Monotonectally pontificate bricks-and-clicks growth strategies via
          cross-media leadership skills. Energistically expedite open-source
          architectures vis-a-vis low-risk high-yield data. Globally whiteboard.
        </p>

        <div className="mt-10 ">
          <Tabs>
            <div className="max-w-[600px] mx-auto text-start">
              <TabList>
                <Tab>All Meals</Tab>
                <Tab>Breakfast</Tab>
                <Tab>Lunch</Tab>
                <Tab>Dinner</Tab>
              </TabList>
            </div>

            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                {/* all meals  */}
                {meals.length > 0 ? (
                  meals?.map((meal) => <MealsCart key={meal._id} meal={meal} />)
                ) : (
                  <div className="text-center  md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <p className="text-2xl font-bold text-center">
                      Not Found🥲
                    </p>
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                {/* Breakfast  */}
                {meals?.filter((item) => item.category === "Breakfast").length >
                0 ? (
                  meals
                    ?.filter((item) => item.category === "Breakfast")
                    .map((meal) => <MealsCart key={meal._id} meal={meal} />)
                ) : (
                  <div className="text-center  md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <p className="text-2xl font-bold text-center">
                      Not Found🥲
                    </p>
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                {/* Lunch  */}
                {meals?.filter((item) => item.category === "Lunch").length >
                0 ? (
                  meals
                    ?.filter((item) => item.category === "Lunch")
                    .map((meal) => <MealsCart key={meal._id} meal={meal} />)
                ) : (
                  <div className="text-center  md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <p className="text-2xl font-bold text-center">
                      Not Found🥲
                    </p>
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
                {/* Lunch  */}
                {meals?.filter((item) => item.category === "Dinner").length >
                0 ? (
                  meals
                    ?.filter((item) => item.category === "Dinner")
                    .map((meal) => <MealsCart key={meal._id} meal={meal} />)
                ) : (
                  <div className="text-center  md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <p className="text-2xl font-bold text-center">
                      Not Found🥲
                    </p>
                  </div>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
