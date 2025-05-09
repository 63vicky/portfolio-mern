import { motion } from 'framer-motion';

const SkillCard = ({ skill }) => {
  // Convert proficiency string to number for progress bar
  const proficiencyLevel = parseInt(skill.proficiency) || 50;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-dark-lighter"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 mr-4 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md p-2 shadow-sm">
          <img
            src={skill.svg?.url}
            alt={skill.title}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">{skill.title}</h3>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full ${
            proficiencyLevel > 80
              ? 'bg-green-500 dark:bg-green-400'
              : proficiencyLevel > 60
              ? 'bg-primary-500 dark:bg-primary-400'
              : proficiencyLevel > 40
              ? 'bg-blue-500 dark:bg-blue-400'
              : proficiencyLevel > 20
              ? 'bg-yellow-500 dark:bg-yellow-400'
              : 'bg-red-500 dark:bg-red-400'
          }`}
          style={{ width: `${proficiencyLevel}%` }}
        ></div>
      </div>
      <div className="mt-2 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
        {proficiencyLevel}%
      </div>
    </motion.div>
  );
};

export default SkillCard;
