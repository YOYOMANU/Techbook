import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

export default function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = "Une erreur est survenue";
    let message = "Quelque chose s'est mal passé. Veuillez réessayer.";
    let status: number | null = null;

    if (isRouteErrorResponse(error)) {
        status = error.status;
        title =
            error.status === 404
                ? "Page introuvable"
                : error.status === 403
                    ? "Accès refusé"
                    : "Erreur serveur";
        message = error.data?.message ?? error.statusText;
    } else if (error instanceof Error) {
        // DOM reconciliation errors (drag & drop, browser extensions)
        if (
            error.message.includes("removeChild") ||
            error.message.includes("NotFoundError")
        ) {
            title = "Conflit d'interface";
            message =
                "Un conflit a été détecté avec le navigateur (extension ou drag & drop). La page va se recharger automatiquement.";

            // Auto-reload after 2s for DOM errors
            setTimeout(() => window.location.reload(), 2000);
        } else {
            message = error.message;
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-destructive"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Status */}
                {status && (
                    <p className="text-5xl font-bold text-destructive">{status}</p>
                )}

                {/* Content */}
                <div className="space-y-2">
                    <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                    <p className="text-sm text-muted-foreground">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
                    >
                        ← Retour
                    </button>
                    <button
                        onClick={() => navigate("/", { replace: true })}
                        className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        Accueil
                    </button>
                </div>
            </div>
        </div>
    );
}