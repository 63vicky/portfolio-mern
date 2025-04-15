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
import SpecialLoadingButton from './SpecialLoadingButton';
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  markAllAsRead,
  resetMessageSlice,
} from '@/store/slices/messagesSlice';
import { toast } from 'react-toastify';

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

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 px-4">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {messages && messages.length > 0 ? (
                messages.map((message) => {
                  return (
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
                          <SpecialLoadingButton />
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
                  );
                })
              ) : (
                <CardHeader>No Messages Found</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
