"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fittingFeatures = [
  {
    number: "01",
    title: "3D Body Mapping",
    description:
      "Advanced motion-capture technology analyses your unique biomechanics to create a precise digital model of your riding position.",
  },
  {
    number: "02",
    title: "Pressure Analysis",
    description:
      "Real-time saddle and pedal pressure mapping identifies hotspots and ensures optimal contact points for comfort and power.",
  },
  {
    number: "03",
    title: "Dynamic Fit",
    description:
      "Ride in real conditions on our smart trainer while our fitters make micro-adjustments to achieve your perfect position.",
  },
  {
    number: "04",
    title: "Follow-Up Tuning",
    description:
      "Your fit evolves with you. Complimentary follow-up sessions ensure your position stays dialled as your riding develops.",
  },
];

export default function IDMatchSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="fitting"
      ref={sectionRef}
      className="relative bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-[20rem] font-bold text-twh-dark select-none leading-none">
            W
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-twh-gold text-sm tracking-[0.3em] uppercase mb-4 font-medium"
          >
            Precision Bike Fitting
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-twh-dark text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
          >
            ID Match
            <br />
            <span className="text-twh-gold">Bike Fitting</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 bg-twh-gold mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-twh-dark/60 text-lg leading-relaxed font-light"
          >
            Your body is unique — your bike fit should be too. Our certified ID
            Match fitters use cutting-edge technology to unlock your optimal
            riding position, maximising comfort, power, and efficiency.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {fittingFeatures.map((feature, i) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group"
            >
              <div className="flex items-start gap-6">
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="text-twh-gold/30 text-5xl font-bold leading-none group-hover:text-twh-gold transition-colors duration-500">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-twh-dark text-xl font-semibold tracking-wide uppercase mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-twh-dark/50 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="bg-twh-dark text-white px-8 py-3.5 text-sm font-semibold tracking-[0.2em] uppercase hover:bg-twh-dark-light transition-colors duration-300"
          >
            Book Your Fit
          </a>
          <a
            href="#about"
            className="border border-twh-dark/20 text-twh-dark px-8 py-3.5 text-sm font-semibold tracking-[0.2em] uppercase hover:border-twh-gold hover:text-twh-gold transition-colors duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
