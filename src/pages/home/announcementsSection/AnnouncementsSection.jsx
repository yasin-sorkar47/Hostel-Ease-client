const AnnouncementsSection = () => {
  return (
    <div className=" py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Announcements
        </h2>
        <p className="max-w-[550px] text-center mx-auto  text-sm md:text-base mb-8">
          {" "}
          Energistically expedite open-source architectures vis-a-vis low-risk
          high-yield data. Globally whiteboard. progressive total linkage.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Announcement Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Maintenance Work Notice
            </h3>
            <p className="text-gray-600 mb-4">
              There will be maintenance work in the dining hall on 15th Jan.
              Please avoid using the area during this time.
            </p>
            <p className="text-sm text-gray-500">Posted on: January 10, 2025</p>
            <a
              href="#"
              className="mt-4 inline-block text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              View Details &rarr;
            </a>
          </div>
          {/* End of Card */}

          {/* Another Announcement Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Meal Schedule Update
            </h3>
            <p className="text-gray-600 mb-4">
              The meal schedule has been updated. Please check the new schedule
              on the notice board or download the attached file.
            </p>
            <p className="text-sm text-gray-500">Posted on: January 8, 2025</p>
            <a
              href="#"
              className="mt-4 inline-block text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Download Schedule &rarr;
            </a>
          </div>
          {/* End of Card */}

          {/* Another Announcement Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Hostel Event Announcement
            </h3>
            <p className="text-gray-600 mb-4">
              Join us for the annual hostel sports day on 20th Jan. Don't miss
              out on the fun activities and prizes!
            </p>
            <p className="text-sm text-gray-500">Posted on: January 5, 2025</p>
            <a
              href="#"
              className="mt-4 inline-block text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Learn More &rarr;
            </a>
          </div>
          {/* End of Card */}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsSection;
