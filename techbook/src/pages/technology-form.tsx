import { useForm, Controller, type Resolver } from "react-hook-form";
import axios from "axios";
import Header from "../components/header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "../components/ui/spinner";
import {
  createTechnology,
  getCategories,
  getLevels,
  getStatuses,
  getTechnology,
  updateTechnology,
} from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { ImageInput } from "../components/ui/image-input";
import type { Category, Level, Status, Technology } from "../types";
import { useEffect, useState } from "react";
import { useTechnologies } from "../context/Technologies-context";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

const skillSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  level_id: z.coerce.number().min(1, "Le niveau est requis"),
  status_id: z.coerce.number().min(1, "Le status est requis"),
  category_ids: z
    .array(z.coerce.number())
    .min(1, "Au moins une catégorie est requise"),
  description: z.string().optional(),
  favoris: z.boolean(),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= 2 * 1024 * 1024,
      "L'image doit faire moins de 2MB",
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].type.startsWith("image/"),
      "Le fichier doit être une image",
    ),
});

export type TechnologyFormData = z.infer<typeof skillSchema>;

export default function TechnologyForm() {
  const { refresh } = useTechnologies();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [technology, setTechnology] = useState<Technology | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    getCategories().then(setCategories);
    getLevels().then(setLevels);
    getStatuses().then(setStatuses);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TechnologyFormData>({
    mode: "onBlur",
    resolver: zodResolver(skillSchema) as Resolver<TechnologyFormData>,
    defaultValues: {
      name: "",
      description: "",
      category_ids: [],
      favoris: false,
    },
  });

  useEffect(() => {
    const init = async () => {
      const [cats, lvls, stats] = await Promise.all([
        getCategories(),
        getLevels(),
        getStatuses(),
      ]);
      setCategories(cats);
      setLevels(lvls);
      setStatuses(stats);

      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data: Technology = await getTechnology(parseInt(id));
        setTechnology(data);
        reset({
          name: data.name ?? "",
          description: data.description ?? "",
          level_id: data.level?.id,
          status_id: data.status?.id,
          favoris: data.favoris ?? false,
          category_ids: data.categories?.map((c) => c.id) ?? [],
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          setFetchError("Accès non autorisé à cette technologie.");
        } else {
          setFetchError("Erreur lors du chargement.");
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, reset]);

  const handleOnSubmit = async (data: TechnologyFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("level_id", String(data.level_id));
    formData.append("status_id", String(data.status_id));
    formData.append("favoris", data.favoris ? "1" : "0");
    data.category_ids.forEach((catId) =>
      formData.append("category_ids[]", String(catId)),
    );
    if (data.description) formData.append("description", data.description);
    if (data.image?.[0]) formData.append("image", data.image[0]);

    try {
      if (isEdit) {
        await updateTechnology(id!, formData);
        refresh();
        navigate("/", {
          replace: true,
          state: { toast: "Technologie mise à jour avec succès !" },
        });
      } else {
        await createTechnology(formData);
        refresh();
        navigate("/", {
          replace: true,
          state: { toast: "Technologie ajoutée avec succès !" },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const serverErrors = error.response.data.errors as Record<
          string,
          string[]
        >;
        Object.entries(serverErrors).forEach(([field, messages]) => {
          setError(field as keyof TechnologyFormData, { message: messages[0] });
        });
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center my-20 md:my-70 px-2">
          <Button variant="secondary" disabled size="sm">
            <Spinner data-icon="inline-start" />
            Patienter
          </Button>
        </div>
      </>
    );
  }


  if (fetchError) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center my-20 px-2">
          <p className="text-destructive">{fetchError}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full max-w-xl mx-auto my-6 md:my-10 px-3 md:px-4">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
          {isEdit ? "Modifier la technologie" : "Ajouter une technologie"}
        </h1>

        <form
          key={technology?.id ?? "new"}
          noValidate
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-3 md:gap-5"
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium">Image</label>
            <ImageInput
              accept="image/*"
              id="image"
              defaultValue={technology?.image}
              aria-invalid={!!errors.image}
              className="w-24 h-24 md:w-40 md:h-40"
              {...register("image")}
            />
            {errors.image && (
              <p className="text-destructive text-xs md:text-sm">
                {errors.image.message as string}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium">Nom</label>
            <Input
              placeholder="ex: React"
              {...register("name")}
              className="text-xs md:text-sm h-8 md:h-10"
            />
            {errors.name && (
              <p className="text-destructive text-xs md:text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium">Description</label>
            <textarea
              placeholder="Courte description..."
              className="border rounded-md px-3 py-2 text-xs md:text-sm resize-none h-20 bg-background"
              {...register("description")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium">Niveau</label>
            <select
              className="border rounded-md px-3 py-2 text-xs md:text-sm bg-background h-8 md:h-10"
              {...register("level_id")}
              defaultValue={technology?.level?.id ?? ""}  // ← ajoute ça
            >
              <option value="">-- Choisir un niveau --</option>
              {levels.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.level_id && (
              <p className="text-destructive text-xs md:text-sm">
                {errors.level_id.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs md:text-sm font-medium">Status</label>
            <select
              className="border rounded-md px-3 py-2 text-xs md:text-sm bg-background h-8 md:h-10"
              {...register("status_id")}
              defaultValue={technology?.status?.id ?? ""}
            >
              <option value=""> -- Choisir un Status --</option>
              {statuses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.status_id && (
              <p className="text-destructive text-xs md:text-sm">
                {errors.status_id.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Catégories</label>
            <Controller
              name="category_ids"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {categories
                    ? (categories ?? []).map((c) => {
                      const selected = field.value?.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            const next = selected
                              ? field.value.filter((catId) => catId !== c.id)
                              : [...(field.value ?? []), c.id];
                            field.onChange(next);
                          }}
                          className={`px-3 py-1 rounded-full text-sm border transition ${selected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:border-primary"
                            }`}
                        >
                          {c.name.toUpperCase()}
                        </button>
                      );
                    })
                    : ""}
                </div>
              )}
            />
            {errors.category_ids && (
              <p className="text-destructive text-sm">
                {errors.category_ids.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="favoris"
              control={control}
              render={({ field }) => (
                <Label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  Favoris ?
                </Label>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 hover:cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Spinner className="mr-2" />
                Enregistrement...
              </>
            ) : isEdit ? (
              "Mettre à jour"
            ) : (
              "Enregistrer"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
