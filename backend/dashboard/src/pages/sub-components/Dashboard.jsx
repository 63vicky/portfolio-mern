import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllSkillSliceErrors } from '@/store/slices/skillSlice';
import {
  clearAllApplicationSliceErrors,
  deleteApplication,
  getAllApplications,
  resetApplicationSlice,
} from '@/store/slices/applicationSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllTimelineErrors } from '@/store/slices/timelineSlice';
import { clearAllProjectSliceError } from '@/store/slices/projectSlice';
const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo('/manage/skills');
  };
  const gotoMangeTimeline = () => {
    navigateTo('/manage/timeline');
  };
  const gotoMangeProjects = () => {
    navigateTo('/manage/projects');
  };

  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  const {
    applications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.application);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );

  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteApplication(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillSliceErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllApplicationSliceErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectSliceError());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetApplicationSlice());
      dispatch(getAllApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
    projectError,
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Visit Portfolio</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">
                    {projects && projects.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeSkills}>Manage Skill</Button>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table className={'text-center'}>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell text-center">
                            Update
                          </TableHead>
                          <TableHead className="text-center">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow
                                className="not-odd:bg-muted/20"
                                key={element._id}
                              >
                                <TableCell>
                                  <div className="font-medium text-left">
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    className="text-xs"
                                    variant="secondary"
                                  >
                                    {element.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Link
                                    to={element.projectLink}
                                    target="_blank"
                                  >
                                    <Button>Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
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
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-4 sm:px-7 gap-3">
                    <CardTitle className="text-xl sm:text-2xl">
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card
                            key={element._id}
                            className="hover:shadow-md hover:shadow-card-foreground transition-shadow gap-0"
                          >
                            <CardHeader className="p-4">
                              <CardTitle className="text-base sm:text-lg">
                                {element.title}
                              </CardTitle>
                            </CardHeader>
                            <CardFooter className="p-4">
                              <Progress
                                value={element.proficiency}
                                className="h-2"
                              />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-xl sm:text-2xl col-span-full text-center py-4">
                        You have not added any skills.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-4 sm:px-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle className="text-xl sm:text-2xl">
                      Software Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Icon
                          </TableHead>
                          <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications && applications.length > 0 ? (
                          applications.map((element) => {
                            return (
                              <TableRow
                                className="hover:bg-muted/50"
                                key={element._id}
                              >
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <img
                                    className="w-6 h-6 sm:w-7 sm:h-7"
                                    src={element.svg && element.svg.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  {appLoading && appId === element._id ? (
                                    <SpecialLoadingButton
                                      content={'Deleting'}
                                      width={'w-28 sm:w-fit'}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftwareApp(element._id)
                                      }
                                      className="w-28 sm:w-auto"
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={3}
                              className="text-xl sm:text-2xl text-center py-4"
                            >
                              You have not added any applications.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={gotoMangeTimeline} className="w-fit">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow
                                className="not-odd:bg-muted/20"
                                key={element._id}
                              >
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-right">
                                  {element.timeline.to}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any timeline.
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
        </main>
      </div>
    </>
  );
};

export default Dashboard;
