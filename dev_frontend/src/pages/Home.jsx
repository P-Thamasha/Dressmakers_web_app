import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import img1 from "../assets/images/01.jpg";
import img2 from "../assets/images/02.jpg";
import img3 from "../assets/images/03.jpg";
import img4 from "../assets/images/04.jpg";
import img5 from "../assets/images/05.jpg";

const images = [img1, img2, img3, img4, img5];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const testimonialSlideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  }),
};

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const fullText = "Welcome to Your Tailor";

  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(typingInterval);
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 3); // Cycle through 3 testimonials
    }, 5000); // Change every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);

  const testimonials = [
    {
      id: 0,
      image: img1,
      name: "Mike Hardson",
      role: "Customer",
      quote:
        "I was very impressed by the company services lorem ipsum is simply free text available used by copytyping refreshing. Neque porro est qui dolorem ipsum quia.",
    },
    {
      id: 1,
      image: img2,
      name: "Sarah Albert",
      role: "Customer",
      quote:
        "I was very impressed by the company services lorem ipsum is simply free text available used by copytyping refreshing. Neque porro est qui dolorem ipsum quia.",
    },
    {
      id: 2,
      image: img3,
      name: "Kevin Martin",
      role: "Customer",
      quote:
        "I was very impressed by the company services lorem ipsum is simply free text available used by copytyping refreshing. Neque porro est qui dolorem ipsum quia.",
    },
  ];

  const direction = testimonialIndex === 0 ? 1 : testimonialIndex === 2 ? -1 : 0;

  return (
    <div className="relative">
      {/* Hero Section (unchanged) */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt="Fashion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover absolute"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
        >
          <h2 className="text-4xl sm:text-6xl font-bold text-white">
            {displayText}
          </h2>
          <a
            href="/categories"
            className="mt-6 inline-block px-6 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Shop Now
          </a>
        </motion.div>
      </section>

      {/* About Us Section (unchanged) */}
      <section ref={aboutRef} className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={isAboutInView ? "visible" : "hidden"}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            {/* Left Circle Badge */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-lg">
                <p className="text-center text-gray-800 dark:text-white font-semibold">
                  20 <br /> Years of <br /> Practicing
                </p>
              </div>
            </div>

            {/* Central Image */}
            <div className="flex-1 max-w-md">
              <motion.img
                src={img2}
                alt="Our Craftsmanship"
                variants={sectionVariants}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Right Text Section */}
            <div className="flex-1 max-w-md text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                Introducing the Quality Taylers in Town
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Lorem ipsum dolor sit amet, consectetur notted adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem andhn.
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
                <li>Nsectetur cing elit.</li>
                <li>Suspe ndisse suscipit sagittis leo.</li>
                <li>Entum estibulum dignissim posuere.</li>
                <li>Donec eros libero, dignisssim egt.</li>
              </ul>
              <div className="flex items-center">
                <img
                  src={img3}
                  alt="Signature"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-gray-800 dark:text-white font-semibold">Kevin Martin</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section (Updated with Hover Effect) */}
      <section ref={servicesRef} className="py-20 bg-gray-50 dark:bg-gray-900 bg-[url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='10' fill='none' stroke='%23d4a373' stroke-width='1'/%3E%3Crect x='20' y='20' width='10' height='10' fill='none' stroke='%23d4a373' stroke-width='1'/%3E%3Cpath d='M30 70 L70 30' fill='none' stroke='%23d4a373' stroke-width='1'/%3E%3C/svg%3E')] bg-repeat bg-contain">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            className="text-center"
          >
            <a href="#services" className="text-sm text-gray-500 dark:text-gray-400 mb-2 inline-block">
              Check out our Services
            </a>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 dark:text-white">
              Services We Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Service Card 1 */}
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <img
                  src={img1}
                  alt="Stylish Clothing"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Stylish Clothing
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Donec suscipi ipsum quis est lorem, quis sollicitudin libero dmes tempus.
                </p>
              </motion.div>

              {/* Service Card 2 */}
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <img
                  src={img2}
                  alt="Suits & Shirts"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Suits & Shirts
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Donec suscipi ipsum quis est lorem, quis sollicitudin libero dmes tempus.
                </p>
              </motion.div>

              {/* Service Card 3 */}
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <img
                  src={img3}
                  alt="Wedding Dresses"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Wedding Dresses
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Donec suscipi ipsum quis est lorem, quis sollicitudin libero dmes tempus.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section (Updated with Side-by-Side Animation) */}
      <section ref={testimonialsRef} className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate={isTestimonialsInView ? "visible" : "hidden"}
            className="text-center"
          >
            <a href="#testimonials" className="text-sm text-gray-500 dark:text-gray-400 mb-2 inline-block">
              Our Testimonials
            </a>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 dark:text-white">
              What They're Saying
            </h2>
            <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
              <motion.div
                className="flex"
                animate="center"
                initial="enter"
                variants={testimonialSlideVariants}
                custom={direction}
                key={testimonialIndex}
              >
                <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                  <img
                    src={testimonials[testimonialIndex].image}
                    alt={testimonials[testimonialIndex].name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {testimonials[testimonialIndex].quote}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {testimonials[testimonialIndex].name}
                  </h3>
                  <p className="text-sm text-[#d4a373] dark:text-[#d4a373]">
                    {testimonials[testimonialIndex].role}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;