import { useTechnologies } from "../context/Technologies-context";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Fragment } from "react";

export default function RecentlyItems() {
  const { recents } = useTechnologies();

  return (
    <>
      {recents.length > 0 && <h2 className="ml-4 md:ml-20 mt-6 md:mt-10">Récemment ajoutés</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex md:justify-center md:flex-wrap md:gap-10 mt-6 px-4 md:px-10">
        {recents.map((technology) => (
          <Card className="w-90" key={technology.id}>
            <CardHeader>
              <CardTitle>
                <Avatar className="mb-1">
                  <AvatarImage src={technology.image} />
                  <AvatarFallback>
                    {technology.name.slice(0, 2).toUpperCase()}{" "}
                  </AvatarFallback>
                </Avatar>
                {technology.name}
              </CardTitle>
              {technology.description && (
                <CardDescription>{technology.description}</CardDescription>
              )}
              <CardAction>
                <StarIcon
                  fill={technology.favoris ? "yellow" : ""}
                  color="yellow"
                  width={20}
                />
              </CardAction>
            </CardHeader>
            <CardContent className="flex gap-2">
              {(technology.categories ?? []).map((c) => (
                <Fragment key={c.id}>
                  <Badge className="text-blue-800">
                    {c.name.toUpperCase()}
                  </Badge>
                </Fragment>
              ))}
            </CardContent>
            <CardFooter className="flex flex-1 gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p>{technology.level.name}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
