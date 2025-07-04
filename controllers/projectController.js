import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import { Project } from '../models/projectSchema.js';
import { v2 as cloudinary } from 'cloudinary';

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler('Project Banner Image required!', 400));

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technologies ||
    !deployed
  )
    return next(new ErrorHandler('Please Provide All Details!', 400));

  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: 'PROJECT IMAGES' }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      'Cloudinary Error:',
      cloudinaryResponse.error || 'Unknown Cloudinary Error'
    );
    return next(
      new ErrorHandler('Failed To Upload Project Banner to Cloudinary!', 500)
    );
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: 'New Project Added!',
    project,
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    gitRepoLink: req.body.gitRepoLink,
    projectLink: req.body.projectLink,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
  };

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);
    const projectBannerId = project.projectBanner.public_id;
    await cloudinary.uploader.destroy(projectBannerId); // Delete Old Image
    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: 'PROJECT IMAGES' }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        'Cloudinary Error:',
        cloudinaryResponse.error || 'Unknown Cloudinary Error'
      );
      return next(
        new ErrorHandler('Failed To Upload Project Banner to Cloudinary!', 500)
      );
    }

    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    newProjectData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!project) {
    return next(new ErrorHandler('Project not found!', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Project Updated Successfully!',
    project,
  });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) return next(new ErrorHandler('Project Not Found!', 404));
  const projectBannerId = project.projectBanner.public_id;
  await cloudinary.uploader.destroy(projectBannerId);
  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Project Deleted!',
  });
});

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    projects,
  });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) return next(new ErrorHandler('Project Not Found!', 404));
  res.status(200).json({
    success: true,
    project,
  });
});
