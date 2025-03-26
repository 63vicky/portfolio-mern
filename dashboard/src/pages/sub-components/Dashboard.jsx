import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  FileText,
  User,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  if (!user) return null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar.url} alt={user.fullName} />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Me */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300">{user.aboutMe}</p>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.portfolioURL && (
              <Button variant="outline" className="w-full justify-start gap-2">
                <Globe className="h-4 w-4" />
                Portfolio
              </Button>
            )}
            {user.githubURL && (
              <Button variant="outline" className="w-full justify-start gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            )}
            {user.linkedinURL && (
              <Button variant="outline" className="w-full justify-start gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            )}
            {user.instagramURL && (
              <Button variant="outline" className="w-full justify-start gap-2">
                <Instagram className="h-4 w-4" />
                Instagram
              </Button>
            )}
            {user.twitterURL && (
              <Button variant="outline" className="w-full justify-start gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
            )}
            {user.facebookURL && (
              <Button variant="outline" className="w-full justify-start gap-2">
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resume */}
      <Card className="bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Resume</h2>
          <Button variant="outline" className="w-full justify-start gap-2">
            <FileText className="h-4 w-4" />
            View Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
