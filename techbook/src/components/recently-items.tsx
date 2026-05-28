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
      {recents.length > 0 && <h2 className="ml-20 mt-10">Récemment ajoutés</h2>}
      <div className="flex justify-center flex-wrap gap-10 mt-6">
        {recents.map((technology) => (
          <Card className="w-80" key={technology.id}>
            <CardHeader>
              <CardTitle>
                <Avatar className="mb-1">
                  <AvatarImage src={technology.image} />
                  <AvatarFallback>CN</AvatarFallback>
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
