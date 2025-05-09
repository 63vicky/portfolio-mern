import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import LoadingOverlay from '@/components/ui/loading-overlay';
import { Skeleton } from '@/components/ui/skeleton';
import {
  clearAllProjectSliceError,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from '@/store/slices/projectSlice';
import { Button } from '@/components/ui/button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const UpdateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [stack, setStack] = useState('');
  const [gitRepoLink, setGitRepoLink] = useState('');
  const [deployed, setDeployed] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectBanner, setProjectBanner] = useState('');
  const [projectBannerPreview, setProjectBannerPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigateTo = useNavigate();

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/project/get/${id}`, {
          withCredentials: true,
        });
        const project = res.data.project;
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBannerPreview(project.projectBanner?.url || '');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch project');
        navigateTo('/');
      } finally {
        setIsLoading(false);
      }
    };

    getProject();
  }, [id, navigateTo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
      navigateTo('/');
    }
  }, [error, message, dispatch, navigateTo]);

  const handleUpdateProject = (e) => {
    e.preventDefault();

    // Form validation
    if (!title || !description || !stack || !technologies || !deployed) {
      toast.error('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('deployed', deployed);
    formData.append('stack', stack);
    formData.append('technologies', technologies);
    formData.append('gitRepoLink', gitRepoLink);
    formData.append('projectLink', projectLink);
    if (projectBanner instanceof File) {
      formData.append('projectBanner', projectBanner);
    }

    dispatch(updateProject(id, formData));
  };

  const handleReturnToDashboard = () => {
    navigateTo('/');
  };

  // Loading skeleton for form fields
  const LoadingSkeleton = () => (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <div className="w-full sm:col-span-4">
            <Skeleton className="w-full h-[200px] rounded-md" />
          </div>
          {[...Array(7)].map((_, index) => (
            <div key={index} className="w-full sm:col-span-4">
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <form
        onSubmit={handleUpdateProject}
        className="w-[100%] px-5 md:w-[1000px] pb-5"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
              <h2 className="font-semibold leading-7 text-primary text-3xl">
                UPDATE PROJECT
              </h2>
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                {projectBannerPreview && (
                  <img
                    src={projectBannerPreview}
                    alt="projectBanner"
                    className="w-full h-auto mb-4"
                  />
                )}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProjectBanner}
                    className="avatar-update-btn mt-4 w-full"
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-primary/70">
                  Project Title *
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-primary/40 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="MERN STACK PORTFOLIO"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-primary/70">
                  Description *
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset text-primary/40 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      required
                      placeholder="Feature 1. Feature 2. Feature 3."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-primary/70">
                  Technologies Used In This Project *
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset text-primary/40 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Textarea
                      required
                      placeholder="HTML, CSS, JAVASCRIPT, REACT"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-primary/70">
                  Stack *
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset text-primary/40 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      required
                      value={stack}
                      onValueChange={(selectedValue) => setStack(selectedValue)}
                    >
                      <SelectTrigger>
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
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-primary/70">
                  Deployed *
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset text-primary/40 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <Select
                      required
                      value={deployed}
                      onValueChange={(selectedValue) =>
                        setDeployed(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Is this project deployed?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-primary/70">
                  Github Repository Link
                </label>
                <div className="mt-2">
                  <div className="relative flex rounded-md shadow-sm ring-1 ring-inset text-primary/40 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="url"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-primary/40 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Github Repository Link"
                      value={gitRepoLink}
                      onChange={(e) => setGitRepoLink(e.target.value)}
                    />
                    <Link className="absolute w-5 h-5 left-1 top-2" />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-primary/70">
                  Project Link
                </label>
                <div className="mt-2">
                  <div className="relative flex rounded-md shadow-sm ring-1 ring-inset text-primary/40 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="url"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-primary/40 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Project Link"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                    />
                    <Link className="absolute w-5 h-5 left-1 top-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <Button disabled className="w-52">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Updating...</span>
              </div>
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-52 rounded-md bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 
              focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </Button>
          )}
        </div>
      </form>
      {loading && <LoadingOverlay message="Updating project..." />}
    </div>
  );
};

export default UpdateProject;
