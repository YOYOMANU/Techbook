import { Layers, SearchIcon, LogOutIcon, UserIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTechnologies } from "../context/Technologies-context";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type FormValue = {
  search: string;
};

export default function Header() {
  const { setSearch } = useTechnologies();
  const { register, handleSubmit } = useForm<FormValue>();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const onSearch = ({ search }: FormValue) => {
    setSearch(search.trim());
  };

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex gap-2">
        <Layers />
        <Link to={"/"}>TechBook</Link>
      </div>

      <form onSubmit={handleSubmit(onSearch)} className="flex gap-1">
        <InputGroup className="w-80">
          <InputGroupInput
            {...register("search")}
            placeholder="Rechercher une techno..."
            onChange={(e) => {
              if (e.target.value === "") setSearch("");
            }}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <Button type="submit">Rechercher</Button>
      </form>

      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="ml-2 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback>
                {user?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="cursor-pointer"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />
      </div>
    </header>
  );
}
