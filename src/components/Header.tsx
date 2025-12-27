import { Send, MessageSquare, User, Users, LogOut } from 'lucide-react';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  sentInvites: number;
  repliesReceived: number;
}

const Header = ({ sentInvites, repliesReceived }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <Logo />
        
        <div className="flex items-center gap-6">
          {/* Outreach Counters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <Send className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground">{sentInvites}</span>
                <span className="text-muted-foreground ml-1">Sent</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
                <MessageSquare className="w-4 h-4 text-success" />
              </div>
              <div>
                <span className="font-semibold text-foreground">{repliesReceived}</span>
                <span className="text-muted-foreground ml-1">Replies</span>
              </div>
            </div>
          </div>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">HR</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Users className="w-4 h-4 mr-2" />
                Manage Team
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
