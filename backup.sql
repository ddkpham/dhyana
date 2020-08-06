--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pcolumns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pcolumns (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    column_order integer NOT NULL
);


--
-- Name: columns_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.columns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: columns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.columns_id_seq OWNED BY public.pcolumns.id;


--
-- Name: columnstasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.columnstasks (
    column_id integer NOT NULL,
    task_id integer NOT NULL,
    id integer NOT NULL
);


--
-- Name: columnstasks_column_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.columnstasks_column_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: columnstasks_column_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.columnstasks_column_id_seq OWNED BY public.columnstasks.column_id;


--
-- Name: columnstasks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.columnstasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: columnstasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.columnstasks_id_seq OWNED BY public.columnstasks.id;


--
-- Name: columnstasks_tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.columnstasks_tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: columnstasks_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.columnstasks_tasks_id_seq OWNED BY public.columnstasks.task_id;


--
-- Name: projectcolumns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projectcolumns (
    project_id integer NOT NULL,
    column_id integer NOT NULL,
    id integer NOT NULL
);


--
-- Name: projectcolumns_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.projectcolumns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projectcolumns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.projectcolumns_id_seq OWNED BY public.projectcolumns.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(1023),
    team_id integer NOT NULL
);


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(1023),
    date_created date NOT NULL,
    date_modified date,
    user_id_created integer NOT NULL,
    user_id_assigned integer,
    priority integer,
    time_estimated double precision,
    time_elapsed double precision,
    flag boolean
);


--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: taskstasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.taskstasks (
    story_id integer NOT NULL,
    sub_task_id integer NOT NULL
);


--
-- Name: teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: teamsusers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teamsusers (
    team_id integer NOT NULL,
    user_id integer NOT NULL,
    id integer NOT NULL
);


--
-- Name: teamsusers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teamsusers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teamsusers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teamsusers_id_seq OWNED BY public.teamsusers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: columnstasks column_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.columnstasks ALTER COLUMN column_id SET DEFAULT nextval('public.columnstasks_column_id_seq'::regclass);


--
-- Name: columnstasks task_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.columnstasks ALTER COLUMN task_id SET DEFAULT nextval('public.columnstasks_tasks_id_seq'::regclass);


--
-- Name: columnstasks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.columnstasks ALTER COLUMN id SET DEFAULT nextval('public.columnstasks_id_seq'::regclass);


--
-- Name: pcolumns id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pcolumns ALTER COLUMN id SET DEFAULT nextval('public.columns_id_seq'::regclass);


--
-- Name: projectcolumns id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projectcolumns ALTER COLUMN id SET DEFAULT nextval('public.projectcolumns_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: teamsusers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teamsusers ALTER COLUMN id SET DEFAULT nextval('public.teamsusers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: columnstasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.columnstasks (column_id, task_id, id) FROM stdin;
\.


--
-- Data for Name: pcolumns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pcolumns (id, name, column_order) FROM stdin;
2	backlog	213
7	back-log	0
8	back-log	0
9	new-column	0
10	new-new-column	0
11	new-new-column	0
12	new-new-column	0
13	new-new-column	0
14	new-new-column	0
15	new-new-column	0
16	new-new-column	0
17	new-new-column	0
18	new-new-column	0
19	backlog	0
20	sprint	1
21	back log	0
22	sprint	1
\.


--
-- Data for Name: projectcolumns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projectcolumns (project_id, column_id, id) FROM stdin;
7	2	1
7	12	2
7	14	3
7	15	4
7	16	5
7	17	6
4	19	8
4	20	9
10	21	10
10	22	11
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, name, description, team_id) FROM stdin;
4	dhyana project	test project	1
5	brady-6	win 6 superbowls	9
7	brady-7		9
9	killer mike's project	killer mikes project	15
10	christmas party	get swifty	4
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tasks (id, name, description, date_created, date_modified, user_id_created, user_id_assigned, priority, time_estimated, time_elapsed, flag) FROM stdin;
21	testtesttest	\N	2020-12-12	\N	4	\N	\N	\N	\N	\N
22	testtesttest	\N	2020-12-12	\N	4	\N	\N	\N	\N	\N
\.


--
-- Data for Name: taskstasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.taskstasks (story_id, sub_task_id) FROM stdin;
\.


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.teams (id, name) FROM stdin;
1	dhyana
4	okay, boomer
5	post-malone
8	
9	brady-bunch
13	gold fire
15	deep-space
17	killer mike
\.


--
-- Data for Name: teamsusers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.teamsusers (team_id, user_id, id) FROM stdin;
9	8	1
1	8	2
4	8	3
5	8	4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password, first_name, last_name) FROM stdin;
4	123	123	\N	\N
6	zz	zz	\N	\N
7	kingkong	kingkong	king	kong
8	jmayer	jmayer	john	mayer
9	prepFuture	prepFuture	prep	future
10	snowybird	snowybird	adele	bird
11	sbarer	sbarer	simon	barer
12	jcameron	jcameron	james	cameron
13	jkrasinski	jkrasinski	john	krasinski
14	scarrel	scarrel	steve	carrel
15	jfischer	jfischer	jenna	fischer
16	rwilson	rwilson	rainn	wilson
17	akinsey	akinsey	angela	kinsey
18	mKaling	mKaling	Mindy	Kaling
19	ehelms	ehelms	ed	helms
20	bbaumgartner	bbaumgartner	brian	baumgartner
21	bjnovak	bjnovak	bj	novak
22	kflannery	kflannery	kate	flannery
23	psmith	psmith	phyllis	smith
24	onunez	onunez	oscar	nunez
25	cbratton	cbratton	creed	bratton
26	ekemper	ekemper	ellie	kemper
27	shudson	shudson	stanley	hudson
28	plieberstein	plieberstein	paul	lieberstein
29	crobinson	crobinson	craig	robinson
30	rjones	rjones	rashida	jones
31	zwoods	zwoods	zack	woods
32	randerson	randerson	roy	anderson
33	abuckley	abuckley	andy	buckley
34	jspader	jspader	james	spader
35	aryan	aryan	amy	ryan
36	wferrell	wferrell	will	ferrell
37	aadams	aadams	amy	adams
38	jchan	jchan	jackie	chan
39	jchanny	jchanny	jackie	channy
40	rbobby	rbobby	ricky	bobby
41	sb1	1234	simon	barer
1	tlou2	tlo	tlo	u2
\.


--
-- Name: columns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columns_id_seq', 22, true);


--
-- Name: columnstasks_column_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columnstasks_column_id_seq', 1, false);


--
-- Name: columnstasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columnstasks_id_seq', 16, true);


--
-- Name: columnstasks_tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columnstasks_tasks_id_seq', 1, false);


--
-- Name: projectcolumns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projectcolumns_id_seq', 11, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_id_seq', 10, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tasks_id_seq', 22, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.teams_id_seq', 17, true);


--
-- Name: teamsusers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.teamsusers_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 41, true);


--
-- Name: pcolumns columns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pcolumns
    ADD CONSTRAINT columns_pkey PRIMARY KEY (id);


--
-- Name: columnstasks columnstasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.columnstasks
    ADD CONSTRAINT columnstasks_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: teams unique_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- Name: projects unique_project_name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT unique_project_name UNIQUE (name);


--
-- Name: users username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username UNIQUE (username) INCLUDE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: columnstasks column_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.columnstasks
    ADD CONSTRAINT column_id FOREIGN KEY (column_id) REFERENCES public.pcolumns(id);


--
-- Name: projectcolumns column_id FK ; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projectcolumns
    ADD CONSTRAINT "column_id FK " FOREIGN KEY (column_id) REFERENCES public.pcolumns(id);


--
-- Name: projectcolumns project_id FK ; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projectcolumns
    ADD CONSTRAINT "project_id FK " FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- Name: taskstasks story_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.taskstasks
    ADD CONSTRAINT story_id FOREIGN KEY (story_id) REFERENCES public.tasks(id);


--
-- Name: taskstasks sub_task_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.taskstasks
    ADD CONSTRAINT sub_task_id FOREIGN KEY (sub_task_id) REFERENCES public.tasks(id);


--
-- Name: columnstasks task_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.columnstasks
    ADD CONSTRAINT task_id FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: projects team_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT team_id FOREIGN KEY (team_id) REFERENCES public.teams(id) NOT VALID;


--
-- Name: teamsusers team_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teamsusers
    ADD CONSTRAINT team_id FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: teamsusers user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teamsusers
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: tasks user_id_assigned; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT user_id_assigned FOREIGN KEY (user_id_assigned) REFERENCES public.users(id) NOT VALID;


--
-- Name: tasks user_id_created; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT user_id_created FOREIGN KEY (user_id_created) REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

