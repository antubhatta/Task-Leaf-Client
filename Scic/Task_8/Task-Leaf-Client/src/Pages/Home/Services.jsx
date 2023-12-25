import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Services = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const services = [
        { title: 'Developers', image: 'https://i.ibb.co/102b1D7/developer-typing-on-keyboard-896x504.webp' },
        { title: 'Corporate ', image: 'https://i.ibb.co/sQMJRh5/20160420164615-business-people-corporate-meeting.jpg' },
        { title: 'Bankers', image: 'https://i.ibb.co/yqK0yw8/19-surprising-facts-about-banker-1695739602.jpg' },
        { title: 'Agency', image: 'https://i.ibb.co/mTs9KNw/48-what-is-a-full-service-digital-marketing-agency.webp' },
        { title: 'Workforce Planning', image: 'https://i.ibb.co/5hvw0W4/Strategic-workforce-planning-Graphic-V3b.png' },
        { title: 'Employee ', image: 'https://i.ibb.co/JQhjmRR/employee.jpg' },
        { title: 'HR Technology ', image: 'https://i.ibb.co/QNg6t3M/disrupting-the-hr-workforce-5cc32496b50f0.jpg' },
    ];

    return (
        <motion.div
            id="services"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-aos="fade-up"
        >
            <SectionTitle subheading={'---Find your service---'} heading={'Our Users '} />

            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                {services.map((service, index) => (
                   <SwiperSlide key={index}>
                   <motion.div
                       className="relative overflow-hidden"
                       data-aos="fade-up"
                       data-aos-delay={`${index * 100}`}
                   >
                       <img
                           className="w-full h-72 object-cover rounded-lg transition-transform transform hover:scale-105"
                           src={service.image}
                           alt=""
                       />
                       <p className="text-2xl font-bold text-[#fcc2c0] text-center mt-4 ">
                           {service.title}
                       </p>
                   </motion.div>
               </SwiperSlide>
               
                
                ))}
            </Swiper>
        </motion.div>
    );
};

export default Services;
