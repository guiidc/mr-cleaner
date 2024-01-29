-- public.companies definition

-- Drop table

-- DROP TABLE public.companies;

CREATE TABLE public.companies (
	id text NOT NULL,
	"name" text NOT NULL,
	email text NOT NULL,
	phone text NOT NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	deleted_at timestamp(3) NULL,
	coordinate_x float8 NOT NULL,
	coordinate_y float8 NOT NULL,
	CONSTRAINT companies_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX companies_email_key ON public.companies USING btree (email);
CREATE UNIQUE INDEX companies_phone_key ON public.companies USING btree (phone);
