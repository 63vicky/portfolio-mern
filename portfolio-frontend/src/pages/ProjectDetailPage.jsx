import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import { getProjectById } from '../services/projectService';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl text-red-500">{error}</h2>
        <Link to="/projects" className="mt-4 btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl">Project not found</h2>
        <Link to="/projects" className="mt-4 btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Split description into paragraphs or bullet points
  const descriptionItems = project.description
    .split('.')
    .filter(item => item.trim().length > 0)
    .map(item => item.trim() + '.');

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <Link to="/projects" className="inline-flex items-center text-primary hover:text-secondary mb-6">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Projects
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-64 md:h-96"
          >
            <img
              src={project.projectBanner?.url || '/placeholder-project.jpg'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full">
              {project.deployed}
            </div>
          </motion.div>

          <div className="p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {descriptionItems.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
                  <p className="text-gray-700">{project.stack}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Technologies</h2>
                  <p className="text-gray-700">{project.technologies}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.gitRepoLink && (
                  <a
                    href={project.gitRepoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub Repository
                  </a>
                )}
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn border border-primary text-primary hover:bg-primary hover:text-white flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
