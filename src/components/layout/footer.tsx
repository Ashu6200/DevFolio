import { Github, Instagram, Twitter } from 'lucide-react';
import { Separator } from '../ui/separator';

const Footer = ({ copyright = '© 2025 Ashutosh. All rights reserved.' }) => {
  return (
    <>
      <Separator />
      <footer className='flex items-center justify-center'>
        <div className='max-w-5xl flex flex-col justify-between gap-4 p-8 text-sm font-medium md:flex-row md:items-center'>
          <p className='flex-1'>{copyright}</p>
          <div className='flex gap-2 items-center'>
            <Twitter />
            <Instagram />
            <Github />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
