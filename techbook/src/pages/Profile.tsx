import InfoProfile from "@/components/Info-Profile";
import ProfilePassword from "@/components/Profile-Password";
import DeleteAccount from "@/components/Delete-account";
import Header from "@/components/header";
import ProfileAvatar from "@/components/ProfileAvatar";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Profile() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Profil</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos informations personnelles et votre sécurité.
          </p>
        </div>

        <ProfileAvatar />
        {/* ── Infos profil ── */}
        <InfoProfile />
        {/* ── Mot de passe ── */}
        <ProfilePassword />
        {/* ── Suppression ── */}
        <DeleteAccount />
      </div>
    </>
  );
}
