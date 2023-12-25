import img from '../../assets/icon/15-Best-Task-Management-Software-For-Teams-In-2022.webp'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const AboutUsSection = () => {
  return (
    <section className="bg-gray-100 py-12 mt-8 lg:mt-20 mb-8 lg:mb-20">
      <div className="container mx-auto relative mb-8">
        <h3 className="text-[#2C2F24] text-2xl lg:text-4xl font-bold text-center mb-5">About Us</h3>
        <div className="flex flex-row-reverse flex-wrap items-center justify-center">
          <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-xl lg:text-3xl font-semibold text-gray-800 mb-4">
              Welcome to AgileTaskHub
            </h2>
            <p className="text-gray-600 mb-4">
            AgileTaskHub stands as a dynamic and feature-rich task management system, meticulously crafted to enhance the productivity and collaboration within your organization. This robust platform serves as the cornerstone for effective project management, offering a suite of tools designed to streamline tasks, facilitate communication, and drive project success.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to empower individuals and organizations to
              organize and participate in a wide range of contests. Whether
              you are an artist, developer, or have a unique skill, WinWave
              is designed to showcase your talents and connect you with a
              community of like-minded individuals.
            </p>
            <button className="px-6 lg:px-8 py-3 lg:py-4 mt-5 text-sm lg:text-base text-[#182226] rounded-full border border-solid border-gray-700">
              Learn More
            </button>
          </div>
          <div className="w-full lg:w-1/2 p-6">
           
            <img
              src={img}
              className="w-[300px] lg:w-[650px] h-auto rounded-lg"
              alt="Contest Platform"
            />
            <div className="bg-[#474747] absolute w-[220px] lg:w-[350px] ml-[130px] lg:ml-[350px] -mt-[100px] lg:-mt-[170px] pt-4 pl-4 h-auto rounded-xl">
              <p className="font-bold text-[#FFF] text-sm lg:text-2xl mb-3 lg:mb-5">
                Contact Us
              </p>
              <div className="flex gap-3 lg:gap-5 items-center mb-3 lg:mb-5">
                <span className="text-white text-xs lg:text-base">
                  <FaPhone />
                </span>
                <span className="lg:text-base text-xs text-[#F9F9F7]">
                  (123) 456-7890
                </span>
              </div>
              <div className="flex gap-3 lg:gap-5 items-center mb-3 lg:mb-5">
                <span className="text-white text-xs lg:text-base">
                  <FaEnvelope />
                </span>
                <span className="lg:text-base text-xs text-[#F9F9F7]">
                  info@agiletaskhub.com
                </span>
              </div>
              <div className="flex gap-3 lg:gap-5 items-center pr-3 pb-3 lg:pb-5">
                <span className="text-white text-xs lg:text-base">
                  <FaMapMarkerAlt />
                </span>
                <span className="text-xs lg:text-base text-[#F9F9F7]">
                  123 Contest Street, Creativityville, CA 56789
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;