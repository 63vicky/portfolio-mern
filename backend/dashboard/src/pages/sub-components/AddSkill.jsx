import LoadingSpinner from '@/components/ui/loading-spinner';
import {
  addNewSkill,
  clearAllSkillSliceErrors,
  getAllSkills,
  resetSkillSlice,
} from '@/store/slices/skillSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';

const AddSkill = () => {
  const [title, setTitle] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [svg, setSvg] = useState('');
  const [svgPreview, setSvgPreview] = useState('');

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(file);
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const { loading, error, message } = useSelector((state) => state.skill);
  const dispatch = useDispatch();

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('proficiency', proficiency);
    formData.append('svg', svg);

    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillSliceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [error, message, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <form
          className="md:w-[650px] w-full px-5 bg-background py-8 rounded-lg"
          onSubmit={handleAddNewSkill}
        >
          <div className="space-y-12">
            <div className="border-b border-foreground/10 pb-12">
              <h2 className="font-semibold leading-7 text-foreground text-3xl text-center">
                ADD NEW SKILL
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="w-full sm:col-span-4"
                >
                  <label className="font-medium text-sm leading-6 block text-foreground">
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        placeholder="Skill Title"
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
                  <label className="font-medium text-sm leading-6 block text-foreground">
                    Proficiency
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="number"
                        placeholder="30"
                        value={proficiency}
                        onChange={(e) => setProficiency(e.target.value)}
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
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm/6 font-medium text-foreground"
                    >
                      Cover photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-foreground/25 px-6 py-10">
                      <div className="text-center">
                        {svgPreview ? (
                          <img
                            src={svgPreview}
                            alt="Cover photo"
                            viewBox="0 0 24 24"
                            className="mx-auto size-12 text-foreground/20"
                          />
                        ) : (
                          <ImageIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-foreground/20"
                          />
                        )}
                        <div className="mt-4 flex text-sm/6 text-foreground/20">
                          <label
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
                          </label>
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
            >
              {loading ? (
                <div className="flex justify-center">
                  <LoadingSpinner size="md" />
                </div>
              ) : (
                <Button className="w-full" type="submit">
                  Add Skill
                </Button>
              )}
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddSkill;
