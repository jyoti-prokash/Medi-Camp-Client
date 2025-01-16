

const AddCamp = () => {
    return (
      <div>
        {/* <SectionTitle heading={"Add Camp"}></SectionTitle> */}
        <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
          <form
            noValidate=""
            action=""
            className="container flex flex-col mx-auto space-y-12"
          >
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Camp name</label>
                <input
                  type="text"
                  placeholder="Camp name"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Photo Upload</label>
                <input
                  type="file"
                  name="campPhoto"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Camp Fees</label>
                <input
                  name="fees"
                  type="number"
                  placeholder="fees"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Date & Time</label>
                <input
                  name="date"
                  type="date"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Location</label>
                <input
                  name="location"
                  type="text"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Healthcare Professional Name</label>
                <input
                  name="healthcareName"
                  type="text"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm">Participant Professional Name</label>
                <input
                  name="participant"
                  type="number"
                  defaultValue={0}
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              <div className="col-span-full">
                <label className="text-sm">Description</label>
                <textarea
                  type="text"
                  placeholder="Type hear"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:border-gray-300"
                />
                <div className='text-center'>
                  <button className='btn btn-outline'>Add Camp</button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
};

export default AddCamp;