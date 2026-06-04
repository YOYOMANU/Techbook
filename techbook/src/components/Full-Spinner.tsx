import { Spinner } from "./ui/spinner";

export default function FullPageSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Spinner className="w-6 h-6 text-muted-foreground" />
        </div>
    );
}