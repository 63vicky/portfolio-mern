import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkillCard from '../components/SkillCard';
import TimelineItem from '../components/TimelineItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllSkills } from '../services/skillService';
import { getAllTimeline } from '../services/timelineService';
import { getUserForPortfolio } from '../services/userService';

const AboutPage = () => {
  const [skills, setSkills] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [skillsData, timelineData, userData] = await Promise.all([
          getAllSkills(),
          getAllTimeline(),
          getUserForPortfolio(),
        ]);
        
        setSkills(skillsData);
        setTimeline(timelineData);
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

  // Sort timeline by date (newest first)
  const sortedTimeline = [...timeline].sort((a, b) => {
    const dateA = new Date(a.timeline.from);
    const dateB = new Date(b.timeline.from);
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* About Me Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/3 mb-8 md:mb-0"
            >
              {user?.avatar?.url ? (
                <img 
                  src={user.avatar.url} 
                  alt={user.fullName} 
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-xl mx-auto"
                />
              ) : (
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                  <span className="text-4xl text-gray-400">👨‍💻</span>
                </div>
              )}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-2/3 md:pl-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
              <p className="text-lg text-gray-700 mb-6">
                {user?.aboutMe || 'Information about me will be displayed here.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {user?.email && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Email:</h3>
                    <p className="text-gray-700">{user.email}</p>
                  </div>
                )}
                {user?.phone && (
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone:</h3>
                    <p className="text-gray-700">{user.phone}</p>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4">
                {user?.githubURL && (
                  <a
                    href={user.githubURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {user?.linkedinURL && (
                  <a
                    href={user.linkedinURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
                {user?.twitterURL && (
                  <a
                    href={user.twitterURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                )}
              </div>
              
              {user?.resume?.url && (
                <a
                  href={user.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block btn btn-primary"
                >
                  Download Resume
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">My Journey</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {sortedTimeline.map((item, index) => (
              <TimelineItem key={item._id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
