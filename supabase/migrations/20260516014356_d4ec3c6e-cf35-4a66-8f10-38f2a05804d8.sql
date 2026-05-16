CREATE TABLE public.lead_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  city text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  accepted_privacy_policy boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'workshop_modal_form',
  status text NOT NULL DEFAULT 'new',
  page_path text,
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX lead_requests_created_at_idx ON public.lead_requests (created_at DESC);
CREATE INDEX lead_requests_email_idx ON public.lead_requests (email);

ALTER TABLE public.lead_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit lead requests"
ON public.lead_requests FOR INSERT
TO anon, authenticated
WITH CHECK (accepted_privacy_policy = true);

CREATE POLICY "Admins can view leads"
ON public.lead_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update leads"
ON public.lead_requests FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_lead_requests_updated_at
BEFORE UPDATE ON public.lead_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();