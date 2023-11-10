import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-500 to-purple-700 py-12 sm:py-12 mx-auto overflow-y-auto max-h-screen mt-28 px-4 ">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-cyan-300 sm:text-4xl">Meet our leadership</h2>
          <p className="mt-6 text-lg leading-8  text-white ">
            There were fields reaching for the horizons, only disappearing after rolling over the hills in the distance. All around you, cows and deer slept and grazed in the tranquil pastures, and curving and slithering through the landscape ran an overgrown, dusty road. The road led to an ordinary mansion surrounded by a wooden fence. The mansion was showing signs of wear and tear, but in otherwise great condition. A giant barn housed the hay for the winter, piles and piles of logs were stacked against the walls of the farm, and an old greenhouse stood to the side of the courtyard, no longer used, and with a few cracked glass panes. The farm had a serene feel to it, a combination of the tranquil landscape and the isolation of the farm within these lush fields.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src="/test.jpg" alt="" />
              <div>
                <h3 className="text-2xl font-semibold leading-7 tracking-tight  text-emerald-400 ">Richardson Adjei</h3>
                <p className="text-sm font-semibold leading-6  text-white ">
                  Co-Founder / CEO
                  <br />
                  <span className=" text-white  font-bold">
                    Richardson Adjei is a visionary entrepreneur with a passion for technology and innovation. With years of experience in the industry, Richardson leads our team with determination and creativity, driving our company's mission to new heights.
                  </span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src="/IMG_9506.jpg" alt="" />
              <div>
                <h3 className="text-2xl font-semibold leading-7 tracking-tight  text-emerald-400">Grace Aidoo</h3>
                <p className="text-sm font-semibold leading-6  text-white ">
                  Co-Founder / CEO
                  <br />
                  <span className=" text-white  font-semibold">
                    Grace Aidoo is a dedicated leader known for her exceptional organizational skills and strategic thinking. With a good knowledge in business management, Grace plays a key role in shaping our company's growth and success.
                  </span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-x-6">
              <img className="h-16 w-16 rounded-full" src="/PHOTO-2023-08-27-20-21-49.jpg" alt="" />
              <div>
                <h3 className="text-2xl font-semibold leading-7 tracking-tight  text-emerald-400 ">Mr Ahmed</h3>
                <p className="text-sm font-semibold leading-6  text-white ">
                  <span>Co-Founder / CEO</span>
                  Co-Founder / CEO
                  <br />
                  <span className=" text-white  font-semibold">
                    Mr Ahmed brings a wealth of knowledge and experience to our leadership team. His expertise in financial management and strategic planning is instrumental in steering our company towards sustainable growth and prosperity.
                  </span>
                </p>
              </div>
            </div>
          </li>
          {/* Add more people... */}
        </ul>
      </div>
    </div>
  );
};

export default About;
