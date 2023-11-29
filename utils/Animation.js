'use client'

import { motion } from 'framer-motion';

export const withAnimation = (Component) => {
  return function AnimatedComponent(props) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Component {...props} />
      </motion.div>
    );
  };
};
