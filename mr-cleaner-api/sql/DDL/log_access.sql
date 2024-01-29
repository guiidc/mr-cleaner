-- public.logs_access definition

-- Drop table

-- DROP TABLE public.logs_access;

CREATE TABLE public.logs_access (
	user_id text NOT NULL,
	created_at timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(3) NOT NULL,
	deleted_at timestamp(3) NULL,
	id serial4 NOT NULL,
	CONSTRAINT logs_access_pkey PRIMARY KEY (id)
);
