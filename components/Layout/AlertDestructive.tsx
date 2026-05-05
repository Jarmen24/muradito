import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDestructive({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle className="text-sm">{title}</AlertTitle>
      <AlertDescription className="text-xs">{description}</AlertDescription>
    </Alert>
  );
}
