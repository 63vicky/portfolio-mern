import { motion } from 'framer-motion';

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex md:contents ${isEven ? '' : 'flex-row-reverse'}`}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className={`col-start-1 col-end-2 mr-10 md:mx-auto relative ${
          isEven ? 'md:mr-0 md:ml-10' : 'md:ml-0 md:mr-10'
        }`}
      >
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-1 bg-blue-600 dark:bg-blue-500 pointer-events-none"></div>
        </div>
        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-600 dark:bg-blue-500 shadow"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="col-start-2 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md bg-white dark:bg-gray-800 w-full md:w-5/6"
      >
        <h3 className="font-bold text-lg mb-1 text-blue-600 dark:text-blue-400">{item.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {item.timeline.from} {item.timeline.to ? `- ${item.timeline.to}` : '- Present'}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-tight">{item.description}</p>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
