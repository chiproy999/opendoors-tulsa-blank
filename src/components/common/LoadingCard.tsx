import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-12 w-full" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
};

export default LoadingCard;