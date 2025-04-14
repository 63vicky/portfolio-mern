import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  addNewProject,
  clearAllProjectSliceError,
  getAllProjects,
  resetProjectSlice,
} from '@/store/slices/projectSlice';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/loading-spinner';
import SpecialLoadingButton from './SpecialLoadingButton';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectBanner, setProjectBanner] = useState('');
  const [projectBannerPreview, setProjectBannerPreview] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [stack, setStack] = useState('');
  const [deployed, setDeployed] = useState('');

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const handleAddNewProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('gitRepoLink', gitRepoLink);
    formData.append('projectLink', projectLink);
    formData.append('technologies', technologies);
    formData.append('stack', stack);
    formData.append('deployed', deployed);
    formData.append('projectBanner', projectBanner);
    dispatch(addNewProject(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());

      setTitle('');
      setDescription('');
      setGitRepoLink('');
      setProjectLink('');
      setTechnologies('');
      setStack('');
      setDeployed('');
      setProjectBanner('');
      setProjectBannerPreview('');
    }
  }, [dispatch, error, loading, message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <form
          className="md:w-[1000px] w-full px-5 bg-background py-8 rounded-lg"
          onSubmit={handleAddNewProject}
        >
          <div className="space-y-12">
            <div className="border-b border-foreground/10 pb-12">
              <h2 className="font-semibold leading-7 text-foreground text-3xl text-center">
                ADD NEW PROJECT
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full sm:col-span-4"
                >
                  <Label className="font-medium text-sm leading-6 block text-foreground">
                    Title
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full sm:col-span-4"
                >
                  <Label className="font-medium text-sm leading-6 block text-foreground">
                    Description
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        placeholder="Feature 1. Feature 2. Feature 3."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full sm:col-span-4"
                >
                  <Label className="font-medium text-sm leading-6 block text-foreground">
                    Technologies Used In This Project
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        placeholder="HTML, CSS, JavaScript, Bootstrap"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full sm:col-span-4"
                >
                  <Label className="font-medium text-sm leading-6 block text-foreground">
                    Stack
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select
                        value={stack}
                        onValueChange={(selectedValue) =>
                          setStack(selectedValue)
                        }
                      >
                        <SelectTrigger className="flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6">
                          <SelectValue placeholder="Select Project Stack" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full Stack">Full Stack</SelectItem>
                          <SelectItem value="MERN">MERN</SelectItem>
                          <SelectItem value="NEXT.JS">NEXT.JS</SelectItem>
                          <SelectItem value="REACT.JS">REACT.JS</SelectItem>
                          <SelectItem value="Frontend">Frontend</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full sm:col-span-4"
                >
                  <Label className="font-medium text-sm leading-6 block text-foreground">
                    Github Repository Link
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Paste Your Github Repository Link..."
                        value={gitRepoLink}
                        onChange={(e) => setGitRepoLink(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full sm:col-span-4"
                >
                  <Label className="font-medium text-sm leading-6 block text-foreground">
                    Deployed
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select
                        value={deployed}
                        onValueChange={(selectedValue) =>
                          setDeployed(selectedValue)
                        }
                      >
                        <SelectTrigger className="flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6">
                          <SelectValue placeholder="Is This Project Deployed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full sm:col-span-4"
                >
                  <Label className="font-medium text-sm leading-6 block text-foreground">
                    Project Link
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Paste Your Deployed Project Link..."
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full sm:col-span-4"
                >
                  <div className="col-span-full">
                    <Label
                      htmlFor="cover-photo"
                      className="block text-sm/6 font-medium text-foreground"
                    >
                      Project Banner
                    </Label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-foreground/25 px-6 py-10">
                      <div className="text-center">
                        {projectBannerPreview ? (
                          <img
                            src={projectBannerPreview}
                            alt="Cover photo"
                            viewBox="0 0 24 24"
                            className="mx-auto w-full h-[250px] text-foreground/20"
                          />
                        ) : (
                          <ImageIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-foreground/20"
                          />
                        )}
                        <div className="mt-4 flex text-sm/6 text-foreground/20">
                          <Label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 px-1 font-semibold focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-primary-foreground/60"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              onChange={handleSvg}
                              className="sr-only"
                            />
                          </Label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs/5 text-foreground/20">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mx-auto"
            >
              {loading ? (
                <div className="flex justify-center">
                  <SpecialLoadingButton content="Adding..." width={56} />
                </div>
              ) : (
                <Button
                  className="w-56 mx-auto flex justify-center"
                  type="submit"
                >
                  Add Project
                </Button>
              )}
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddProject;
