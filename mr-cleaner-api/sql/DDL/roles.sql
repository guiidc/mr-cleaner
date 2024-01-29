-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id text NOT NULL,
	"role" text NOT NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	deleted_at timestamp(3) NULL,
	CONSTRAINT roles_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX roles_role_key ON public.roles USING btree (role);
