
import Link from 'next/link';
import { Brain, LogIn,  } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import { useScreenSize } from '@/lib/hooks/useScreenSize'; 
import { useAppSelector } from '@/lib/hooks'; 
import MobileNav  from './MobileNav';
import Core from '@/conf/cfg';
interface NavProps {
  title: string;
  version: string;
  discord: string;
}

const Nav: React.FC<NavProps> = ({ title, version, discord }) => {
  useScreenSize();
  const isMobile = useAppSelector((state) => state.screenSize.isMobile);

  return (
    <header className="flex items-center h-16 px-4 md:px-6">
      {isMobile ? (
        <MobileNav discord={Core.discord} />
      ) : (

        <>
      <nav className="flex-row hidden gap-6 text-lg font-medium md:flex md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
          <Brain className="w-6 h-6"/>
          <span className="sr-only">{title}</span>
        </Link>
        <Link className="font-bold" href="/">
          Home
        </Link>
        <Link className="text-zinc-500 dark:text-zinc-400" href="/dashboard/models">
          Dashboard
        </Link>
        <Link className="text-zinc-500 dark:text-zinc-400" href='https://chat.naga.ac/'>
          LibreChat
        </Link>
        <Link className="text-zinc-500 dark:text-zinc-400" href={discord}>
          Discord
        </Link>
      </nav>

      <Button variant='outline' className="ml-auto">
        <LogIn className="mr-2 h-4 w-4" /> Login
      </Button>
      </>
      )}
    </header>
  );
      };
export default Nav