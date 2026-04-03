import React from "react";
import { motion } from "framer-motion";

const OwnersImage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full px-4 py-20">

        {/* ✨ SECTION TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold text-center mb-12 tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Owners of <span className="text-blue-600">Vinit Cars</span>
        </motion.h2>

        {/* GRID — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 justify-items-center">

          {[
            {
              name: "Manoj",
              role: "Owner",
              img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379005.jpg&fm=jpg"
            },
            {
              name: "Harsh",
              role: "Manager",
              img: "https://t4.ftcdn.net/jpg/03/80/58/23/360_F_380582318_5lJ52eVLcePphpM4pMHdew3wgopfhQSc.jpg"
            },
            {
              name: "Janhavi",
              role: "Assistant",
              img: "https://static.startuptalky.com/2024/03/Sneha-Choudhry-Women-Entrepreneurs-In-India-StartupTalky.jpg"
            }
          ].map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.07 }}
              className="flex flex-col items-center"
            >
              <motion.img
                src={person.img}
                alt={person.name}
                className="
                  aspect-square w-28 sm:w-32 lg:w-40 
                  rounded-full object-cover shadow-2xl
                "
                whileHover={{ rotate: 2 }}
                transition={{ duration: 0.2 }}
              />

              <h3 className="mt-3 text-lg font-semibold">{person.name}</h3>
              <p className="text-sm text-gray-600">{person.role}</p>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default OwnersImage;
