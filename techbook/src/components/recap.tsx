import type { PaginatedCollection, Technology } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  data: PaginatedCollection<Technology>;
};

export default function Recap({ data }: Props) {
  return (
    <div className="flex justify-center gap-20 mt-10">
      {data.stats ? (
        <>
          <Card className="w-60 h-30 pl-3">
            <CardHeader>
              <CardTitle className="text-4xl"> {data.stats.total} </CardTitle>
            </CardHeader>
            <CardContent>
              <p> Technologies </p>
            </CardContent>
          </Card>

          <Card className="w-60 h-30 pl-3">
            <CardHeader>
              <CardTitle className="text-4xl">
                {" "}
                {data.stats.maitrises}{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p> Maîtrisées </p>
            </CardContent>
          </Card>

          <Card className="w-60 h-30 pl-3">
            <CardHeader>
              <CardTitle className="text-4xl">
                {" "}
                {data.stats.en_cours}{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p> En cours </p>
            </CardContent>
          </Card>

          <Card className="w-60 h-30 pl-3">
            <CardHeader>
              <CardTitle className="text-4xl">
                {" "}
                {data.stats.a_explorer}{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p> À explorer </p>
            </CardContent>
          </Card>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
