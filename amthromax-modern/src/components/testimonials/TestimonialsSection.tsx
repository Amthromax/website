import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CTO, TechInnovate Inc.",
    content: "Amthromax transformed our legacy systems into a modern cloud-native architecture. Their expertise and attention to detail exceeded our expectations.",
    rating: 5,
    avatar: "/avatars/sarah.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "CEO, GlobalRetail Solutions",
    content: "The AI-powered analytics platform they developed for us has increased our operational efficiency by 40%. Truly remarkable work.",
    rating: 5,
    avatar: "/avatars/michael.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    title: "Research Director, BioHealth Labs",
    content: "Working with Amthromax on our AI research platform was a pleasure. They delivered innovative solutions that accelerated our research timeline.",
    rating: 5,
    avatar: "/avatars/emily.jpg",
  },
];

const TestimonialsSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our clients' success stories speak volumes about the quality and impact of our technology solutions.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2 + testimonial.id * 0.05,
              }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                "{testimonial.content}"
              </p>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className="text-yellow-400"
                  >
                    {index < testimonial.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
