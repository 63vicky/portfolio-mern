import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  clearAllProjectSliceError,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from '@/store/slices/projectSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Eye, Pen, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingOverlay from '@/components/ui/loading-overlay';

const ManageProjects = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo('/');
  };
  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();
  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
  };

  // Fetch projects on component mount
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  // Handle errors and messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectSliceError());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  // Loading skeleton for table rows
  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index} className="not-odd:bg-muted/20 py-0">
          <TableCell className="py-0">
            <Skeleton className="w-16 h-16 rounded-md" />
          </TableCell>
          <TableCell className="py-0">
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell className="hidden md:table-cell py-0">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="hidden md:table-cell py-0">
            <Skeleton className="h-4 w-[50px]" />
          </TableCell>
          <TableCell className="flex flex-row items-center gap-3 h-24 py-0">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-sidebar">
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your Projects</CardTitle>
                <Button className="w-fit" onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Stack
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Deployed
                      </TableHead>
                      <TableHead className="md:table-cell">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <LoadingSkeleton />
                    ) : projects && projects.length > 0 ? (
                      projects.map((element) => {
                        return (
                          <TableRow
                            className="not-odd:bg-muted/20 py-0"
                            key={element._id}
                          >
                            <TableCell className="py-0">
                              <div className="font-medium">
                                <img
                                  src={
                                    element.projectBanner &&
                                    element.projectBanner.url
                                  }
                                  alt={element.title}
                                  className="w-16 h-16"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="py-0">
                              <div className="font-medium">{element.title}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell py-0">
                              {element.stack}
                            </TableCell>
                            <TableCell className="hidden md:table-cell py-0">
                              {element.deployed}
                            </TableCell>
                            <TableCell className="flex flex-row items-center gap-3 h-24 py-0">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/project/${element._id}`}>
                                      <button
                                        className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                                      justify-center items-center text-green-600  hover:text-slate-950 
                                      hover:bg-green-600"
                                      >
                                        <Eye className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    View
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/update/project/${element._id}`}>
                                      <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400  hover:text-slate-950 hover:bg-yellow-400">
                                        <Pen className="h-5 w-5" />
                                      </button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Edit
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                                      onClick={() =>
                                        handleProjectDelete(element._id)
                                      }
                                    >
                                      <Trash2 className="h-5 w-5" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Delete
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-2xl">
                          You have not added any project.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* {loading && <LoadingOverlay message="Loading projects..." />} */}
    </>
  );
};

export default ManageProjects;
