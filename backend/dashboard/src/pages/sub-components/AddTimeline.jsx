import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/ui/loading-spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
} from '@/store/slices/timelineSlice';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AddTimeline = () => {
  const { loading, error, message } = useSelector((state) => state.timeline);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const dispatch = useDispatch();

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    if (!title || !from) {
      toast.error('Please fill in all fields');
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('from', from);
    formData.append('to', to);
    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }

    if (message) {
      toast.success(message);
      setTitle('');
      setDescription('');
      setFrom('');
      setTo('');
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [error, message, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center min-h-[100vh] sm:pl-14 sm:gap-4 sm:py-4">
        <form
          className="md:w-[650px] w-full px-5 bg-background py-8 rounded-lg"
          onSubmit={handleAddNewTimeline}
        >
          <div className="space-y-12">
            <div className="border-b border-foreground/10 pb-12">
              <h2 className="font-semibold leading-7 text-foreground text-3xl text-center">
                ADD NEW TIMELINE
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
                        placeholder="Matriculation"
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
                    Description
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea
                        type="text"
                        placeholder="Timeline Description"
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
                  transition={{ delay: 0.3 }}
                  className="w-full sm:col-span-4"
                >
                  <label className="font-medium text-sm leading-6 block text-foreground">
                    From
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="number"
                        placeholder="Starting Period"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full sm:col-span-4"
                >
                  <label className="font-medium text-sm leading-6 block text-foreground">
                    To
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-foreground focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="number"
                        placeholder="Ending Period"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="block flex-1 border-0 bg-transparent py-1.5 px-2 text-foreground placeholder:text-foreground/20 focus-visible:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                      />
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
                  Add Timeline
                </Button>
              )}
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTimeline;
