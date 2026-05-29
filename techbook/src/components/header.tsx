import { PlusIcon, Layers, SearchIcon, LogOutIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTechnologies } from "../context/Technologies-context";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type FormValue = {
  search: string;
};

export default function Header() {
  const { setSearch } = useTechnologies();
  const { register, handleSubmit } = useForm<FormValue>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      <div className="flex gap-2">
        {pathname === "/" && (
          <Button
            onClick={() => navigate("/add")}
            className="hover:cursor-pointer"
          >
            <PlusIcon />
            Ajouter
          </Button>
        )}
        <div className="flex items-center gap-4">
          {/* <span className="text-sm text-muted-foreground">{user?.name}</span> */}
          <Avatar className="ml-2">
            <AvatarImage src={""} />
            <AvatarFallback>
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="destructive"
            className="hover:cursor-pointer"
            size="sm"
            onClick={handleLogout}
          >
            <LogOutIcon />
            Déconnexion
          </Button>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
