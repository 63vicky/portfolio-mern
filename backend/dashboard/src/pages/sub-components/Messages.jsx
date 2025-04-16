import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  markAllAsRead,
  resetMessageSlice,
} from '@/store/slices/messagesSlice';
import { toast } from 'react-toastify';
import LoadingOverlay from '@/components/ui/loading-overlay';
import { Skeleton } from '@/components/ui/skeleton';

const Messages = () => {
  const [messageId, setMessageId] = useState('');
  const { loading, error, message, messages } = useSelector(
    (state) => state.messages
  );
  const dispatch = useDispatch();

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  // Mark all messages as read when component mounts
  useEffect(() => {
    dispatch(getAllMessages());
    dispatch(markAllAsRead());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message]);

  // Loading skeleton for messages
  const LoadingSkeleton = () => (
    <div className="grid gap-4 sm:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="p-4">
          <CardDescription className="text-primary">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </CardDescription>
          <CardDescription className="text-primary">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </CardDescription>
          <CardDescription className="text-primary">
            <Skeleton className="h-4 w-[100px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </CardDescription>
          <CardFooter className="justify-end">
            <Skeleton className="h-8 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 px-4">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <LoadingSkeleton />
              ) : messages && messages.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {messages.map((message) => (
                    <Card className="p-4" key={message._id}>
                      <CardDescription className="text-primary">
                        <span>Sender Name: </span>
                        {message.senderName}
                      </CardDescription>
                      <CardDescription className="text-primary">
                        <span>Subject: </span>
                        {message.subject}
                      </CardDescription>
                      <CardDescription className="text-primary">
                        <span>Message: </span>
                        {message.message}
                      </CardDescription>

                      <CardFooter className="justify-end">
                        {loading && messageId === message._id ? (
                          <Button disabled className="w-32">
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              <span>Deleting...</span>
                            </div>
                          </Button>
                        ) : (
                          <Button
                            className="w-32"
                            onClick={() => handleMessageDelete(message._id)}
                          >
                            Delete
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <CardHeader>No Messages Found</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {loading && <LoadingOverlay message="Loading messages..." />}
    </div>
  );
};

export default Messages;
