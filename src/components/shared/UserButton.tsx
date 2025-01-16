"use client";

import useAuth from "@/hooks/auth";
import { members } from "@wix/members";
import {
  Check,
  LogInIcon,
  LogOutIcon,
  Monitor,
  Moon,
  Sun,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  className?: string;
}

export default function UserButton({
  loggedInMember,
  className,
}: UserButtonProps) {
  const { login, logout } = useAuth();

  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className={className}>
          <UserIcon className="size-5 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44 max-w-64 text-primary">
        {loggedInMember && (
          <>
            <DropdownMenuLabel>
              Logged in as{" "}
              {loggedInMember.contact?.firstName || loggedInMember.loginEmail}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer font-bold text-primary">
                <UserIcon className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer font-bold">
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="font-bold text-primary">
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer"
              >
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        {loggedInMember ? (
          <DropdownMenuItem
            onClick={() => logout()}
            className="cursor-pointer font-bold text-primary"
          >
            <LogOutIcon className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => login()}
            className="cursor-pointer font-bold text-primary"
          >
            <LogInIcon className="mr-2 size-4" />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
