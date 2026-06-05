import { Layers, SearchIcon, LogOutIcon, UserIcon, XIcon } from "lucide-react";
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
import { useRef, useState } from "react";

type FormValue = {
  search: string;
};

export default function Header() {
  const { setSearch } = useTechnologies();
  const { register, handleSubmit, watch, setValue } = useForm<FormValue>({
    defaultValues: { search: "" },
  });
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref: registerRef, ...registerRest } = register("search");

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const onSearch = ({ search }: FormValue) => {
    setSearch(search.trim());
  };

  const handleToggleSearch = () => {
    setShowSearch((v) => {
      if (!v) setTimeout(() => inputRef.current?.focus(), 50);
      return !v;
    });
  };

  // ✅ Un seul ref partagé — pointe toujours vers le champ visible
  const sharedRef = (el: HTMLInputElement | null) => {
    registerRef(el);
    inputRef.current = el;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerRest.onChange(e);
    // ✅ Reset la recherche dès que le champ est vidé
    if (e.target.value === "") setSearch("");
  };

  // ✅ Champ unique partagé entre desktop et mobile via les mêmes props
  const searchInputProps = {
    ...registerRest,
    ref: sharedRef,
    placeholder: "Rechercher une techno...",
    onChange: handleChange,
  };

  return (
    <header className="border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2 items-center">
          <Layers />
          <Link to={"/"}>TechBook</Link>
        </div>

        {/* Search bar — sm+ */}
        <form onSubmit={handleSubmit(onSearch)} className="hidden sm:flex gap-1">
          <InputGroup className="w-64 md:w-80">
            <InputGroupInput {...searchInputProps} />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <Button type="submit">Rechercher</Button>
        </form>

        {/* Actions droite */}
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={handleToggleSearch}
            aria-label={showSearch ? "Fermer la recherche" : "Ouvrir la recherche"}
          >
            {showSearch ? <XIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="ml-2 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback>{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
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
        </div>
      </div>

      {/* Search bar dépliable — mobile */}
      {showSearch && (
        <div className="sm:hidden px-4 pb-3">
          <form onSubmit={handleSubmit(onSearch)} className="flex gap-1">
            <InputGroup className="flex-1">
              {/* ✅ Champ mobile indépendant — state local pour éviter le conflit de ref */}
              <InputGroupInput
                placeholder="Rechercher une techno..."
                value={watch("search")}
                onChange={(e) => {
                  setValue("search", e.target.value);
                  if (e.target.value === "") setSearch("");
                }}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Button type="submit" className="shrink-0">Rechercher</Button>
          </form>
        </div>
      )}
    </header>
  );
}