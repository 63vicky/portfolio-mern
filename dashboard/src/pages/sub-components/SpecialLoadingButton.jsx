import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SpecialLoadingButton = ({ content, width }) => {
  return (
    <Button disabled className={width ? `${width}` : 'w-full'}>
      <Loader2 className="animate-spin" />
      {content}
    </Button>
  );
};

export default SpecialLoadingButton;
