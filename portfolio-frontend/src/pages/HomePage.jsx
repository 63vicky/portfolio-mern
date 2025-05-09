import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllProjects } from '../services/projectService';
import { getAllSkills } from '../services/skillService';
import { getUserForPortfolio } from '../services/userService';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, skillsData, userData] = await Promise.all([
          getAllProjects(),
          getAllSkills(),
          getUserForPortfolio(),
        ]);

        setProjects(projectsData);
        setSkills(skillsData);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl text-red-500">{error}</h2>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-dark pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-50 leading-tight">
                Hi, I'm <span className="text-primary-600 dark:text-primary-400">{user?.fullName || 'Developer'}</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-lg">
                {user?.aboutMe || 'Welcome to my portfolio website where I showcase my projects and skills.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="btn btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  View Projects
                </Link>
                <Link
                  to="/contact"
                  className="btn border-2 border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-500 dark:hover:bg-primary-600 hover:text-white dark:hover:text-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2 flex justify-center"
            >
              {user?.avatar?.url ? (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-accent-600 rounded-full blur-md opacity-75"></div>
                  <img
                    src={user.avatar.url}
                    alt={user.fullName}
                    className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top shadow-xl border-4 border-white dark:border-dark-card"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-accent-600 rounded-full blur-md opacity-75"></div>
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-dark-card">
                    <span className="text-4xl text-gray-400 dark:text-gray-300">👨‍💻</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section bg-white dark:bg-dark">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-title text-gray-900 dark:text-gray-50"
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
          {projects.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/projects"
                className="btn btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                View All Projects
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-title text-gray-900 dark:text-gray-50"
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.slice(0, 6).map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            ))}
          </div>
          {skills.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/about"
                className="btn btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                View All Skills
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 text-white">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Interested in working together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl mb-8 max-w-2xl mx-auto text-gray-100 dark:text-gray-200"
          >
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="btn bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
