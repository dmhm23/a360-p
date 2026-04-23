import { useEffect, useRef, useState } from "react";
import { Loader2, RotateCcw, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { HeroMedia } from "@/components/HeroMedia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { HeroMediaType, HeroMediaValue } from "@/hooks/useHeroMedia";

const ACCEPTED = ".png,.jpg,.jpeg,.webp,.gif,.mp4,.webm,.mov";
const MAX_SIZE_BYTES = 20 * 1024 * 1024;
const SETTING_KEY = "hero_media";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  current: HeroMediaValue;
};

export function HeroMediaSettingsModal({ open, onOpenChange, current }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(current.src);
  const [type, setType] = useState<HeroMediaType>(current.type);
  const [poster, setPoster] = useState<string>(current.poster ?? "");
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (open) {
      setPendingFile(null);
      setPreviewUrl(current.src);
      setType(current.type);
      setPoster(current.poster ?? "");
    }
  }, [open, current]);

  useEffect(() => {
    if (!pendingFile) return;
    const url = URL.createObjectURL(pendingFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingFile]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.size > MAX_SIZE_BYTES) {
      toast({
        title: "Archivo demasiado grande",
        description: "El archivo supera el límite de 20 MB.",
        variant: "destructive",
      });
      return;
    }
    setPendingFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const save = async () => {
    if (!user) return;
    setSaving(true);
    try {
      let publicUrl = current.src;

      if (pendingFile) {
        const ext = pendingFile.name.split(".").pop()?.toLowerCase() ?? "bin";
        const path = `hero/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("site-media")
          .upload(path, pendingFile, {
            cacheControl: "3600",
            upsert: false,
            contentType: pendingFile.type || undefined,
          });
        if (upErr) throw upErr;
        const { data } = supabase.storage.from("site-media").getPublicUrl(path);
        publicUrl = `${data.publicUrl}?v=${Date.now()}`;
      }

      const value = {
        src: publicUrl,
        type,
        poster: poster.trim() || null,
      };

      const { error: upsertErr } = await supabase
        .from("site_settings")
        .upsert(
          { key: SETTING_KEY, value, updated_by: user.id, updated_at: new Date().toISOString() },
          { onConflict: "key" },
        );
      if (upsertErr) throw upsertErr;

      toast({ title: "Medio actualizado", description: "El hero se actualizó correctamente." });
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      toast({ title: "No se pudo guardar", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const restoreDefault = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from("site_settings").delete().eq("key", SETTING_KEY);
      if (error) throw error;
      toast({ title: "Restaurado", description: "Se volvió al medio por defecto." });
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      toast({ title: "No se pudo restaurar", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurar medio del hero</DialogTitle>
          <DialogDescription>
            Sube una imagen o video que se mostrará en la portada de la landing. Máx. 20 MB.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Vista previa</Label>
            <div className="rounded-lg border bg-muted/30 p-2">
              <HeroMedia
                src={previewUrl}
                type={type}
                poster={poster || undefined}
                alt="Vista previa del medio del hero"
                className="w-full rounded-md"
              />
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
              dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm font-medium">
              {pendingFile ? pendingFile.name : "Arrastra un archivo o haz clic para subir"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, WEBP, GIF, MP4, WEBM, MOV · máx. 20 MB
            </p>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED}
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tipo de medio</Label>
              <Select value={type} onValueChange={(v) => setType(v as HeroMediaType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (por extensión)</SelectItem>
                  <SelectItem value="image">Imagen</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="poster">Poster (opcional, video)</Label>
              <Input
                id="poster"
                placeholder="https://..."
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="ghost"
            onClick={restoreDefault}
            disabled={saving}
            className="sm:mr-auto"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Restaurar por defecto
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={save} disabled={saving || (!pendingFile && type === current.type && (poster || "") === (current.poster ?? ""))}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
