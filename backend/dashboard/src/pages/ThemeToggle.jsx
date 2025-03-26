import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';

const ThemeToggle = ({ className }) => {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('dark');
  };

  return (
    <Button variant="outline" className={className} onClick={handleThemeChange}>
      {theme === 'light' ? (
        <MoonIcon className="size-4" />
      ) : (
        <SunIcon className="size-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
