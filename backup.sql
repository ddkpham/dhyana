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
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    date_created date,
    description character varying(1023),
    task_id integer NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


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
    last_name character varying(255),
    job_title character varying(255),
    biography character varying(1023)
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
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


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
23	23	17
27	24	18
27	25	19
27	26	20
28	27	21
28	28	22
29	29	23
29	30	24
29	31	25
29	32	26
31	33	27
32	34	28
32	35	29
30	36	30
33	37	31
34	38	32
34	39	33
34	40	34
35	41	35
27	43	37
27	44	38
27	45	39
27	46	40
28	47	41
28	48	42
28	49	43
27	50	44
30	51	45
30	52	46
29	53	47
29	54	48
29	55	49
28	56	50
30	57	51
30	58	52
30	59	53
30	60	54
27	42	36
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments (id, user_id, date_created, description, task_id) FROM stdin;
1	9	2010-10-10	good work	22
2	42	2020-08-11	buy a lot of them	33
3	42	2020-08-11	task 1task 1task 1	24
4	42	2020-08-11	task 1task 1task 1task 1task 1task 1	24
5	42	2020-08-11	task 1	43
6	42	2020-08-11	task 1task 1task 1task 1task 1	43
7	42	2020-08-11	task 1task 1task 1task 1task 1task 1	44
8	42	2020-08-11	get an a in this class	45
9	42	2020-08-11	tf? go for an a+	45
10	42	2020-08-11	create	46
11	42	2020-08-11	a. 	46
12	42	2020-08-11	chain 	46
13	42	2020-08-11	of 	46
14	42	2020-08-11	comments	46
15	42	2020-08-11	to 	46
16	42	2020-08-11	get	46
17	42	2020-08-11	a	46
18	42	2020-08-11	scroll	46
19	42	2020-08-11	-	46
20	42	2020-08-11	bar	46
21	42	2020-08-11	task2	49
22	42	2020-08-11	task2	49
23	42	2020-08-11	task2	49
24	42	2020-08-11	task2task2	48
25	42	2020-08-11	task2	48
26	42	2020-08-11	task2task2	48
27	42	2020-08-11	dsfdsf	42
28	42	2020-08-11	dsfsdf	42
29	42	2020-08-11	sdfsdfsdf	42
30	42	2020-08-11	sdf sdf sd	42
31	42	2020-08-11	sdf sdf 	42
32	42	2020-08-11	dsf sdf sdf 	25
33	42	2020-08-11	dsf sdf	25
34	42	2020-08-11	 sdf sdf sd	25
35	42	2020-08-11	dsf sdf dsf	25
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
23	Bigfoot	0
24	Tinyfoot	1
26	Nofoot	2
27	Help the world	0
28	Asgard	1
29	Battle	2
30	Victory	3
31	Queue up	0
32	devour tacos alone	1
33	start of the saga	0
34	recruit other humans	1
35	Get gods in	2
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
14	23	12
14	24	13
14	26	15
17	27	16
17	28	17
17	29	18
17	30	19
15	31	20
15	32	21
16	33	22
16	34	23
16	35	24
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
12	dhyana project	test project	9
13	dhyana project	test project	9
14	Bigfoot	a foot that&#x27;s big	22
15	Hornet Frogs	frogs that have horns	26
16	The avengers initiative	thanos did nothing wrong	24
17	Endgame	we are in the endgame now	24
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tasks (id, name, description, date_created, date_modified, user_id_created, user_id_assigned, priority, time_estimated, time_elapsed, flag) FROM stdin;
21	testtesttest	\N	2020-12-12	\N	4	\N	\N	\N	\N	\N
22	testtesttest	\N	2020-12-12	\N	4	\N	\N	\N	\N	\N
23	Seed the db	add data through the app	2020-08-11	2020-08-11	42	14	4	1	\N	t
27	Get the hammer	Am i worthy?	2020-08-11	\N	42	45	1	\N	\N	t
28	bring the stones		2020-08-11	\N	42	44	3	\N	\N	f
29	First battle	we lost	2020-08-11	\N	42	44	\N	13.5	\N	t
30	go to ny		2020-08-11	\N	42	45	\N	1.5	\N	f
55	task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2	task2task2task2task2task2	2020-08-11	\N	42	1	1	\N	\N	t
33	Go to TB	buy tacos from taco bell\n	2020-08-11	2020-08-11	42	\N	0	\N	\N	f
34	im full		2020-08-11	\N	42	\N	\N	\N	\N	f
35	victory?		2020-08-11	2020-08-11	42	27	0	1	2	f
56	task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2task2	task2task2task2task2task2	2020-08-11	\N	42	45	\N	123124314123	\N	t
57	task3	task3	2020-08-11	\N	42	44	2	123124213123	\N	t
31	how jarvis came about		2020-08-11	2020-08-11	42	44	0	1.2312432534534566e+18	\N	t
32	meet peggy carter		2020-08-11	2020-08-11	42	\N	3	0.5	\N	f
37	recruit caption america	recruit cpt. ameriaca	2020-08-11	\N	42	45	3	1.5	\N	t
38	recruit iron man		2020-08-11	\N	42	44	\N	\N	\N	f
39	recruit black widow		2020-08-11	\N	42	1	1	\N	\N	t
40	recruit mr bow and arrow	hawkeye is useless	2020-08-11	\N	42	42	2	0.5	\N	t
41	recruit thor		2020-08-11	\N	42	46	4	1	\N	t
36	tony is dead	:(	2020-08-11	2020-08-11	42	44	4	2	\N	t
26	go back in time		2020-08-11	2020-08-11	42	42	2	\N	\N	t
24	Get the stones	as the title suggests	2020-08-11	2020-08-11	42	1	5	24	29	t
43	repeat	get the second championship	2020-08-11	2020-08-11	42	46	2	18.5	\N	t
44	go for the 3peat	hattrick!!!	2020-08-11	2020-08-11	42	42	4	0.5	\N	t
45	Get cracked	Become a disciple of that cracked kid ;)	2020-08-11	2020-08-11	42	46	4	33	\N	t
58	sdfsdf	fsdf sdf sdf	2020-08-11	\N	42	46	5	123124314	\N	t
46	task 1	first task in help the world	2020-08-11	2020-08-11	42	1	1	123124	2.131534556456564e+15	t
47	task1	task1	2020-08-11	\N	42	1	5	\N	\N	f
50	task2task2	task2vtask2task2task2	2020-08-11	\N	42	1	3	123124	\N	t
49	task2t ask2 task 2 task2ta sk 2	task2	2020-08-11	2020-08-11	42	46	5	2	12312	t
48	task1task1task1task1task1 task1task1task1task1task1task1	task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1task1	2020-08-11	2020-08-11	42	42	2	0.5	\N	f
51	task2	task2	2020-08-11	\N	42	44	3	123	\N	f
52	task2task2	task2	2020-08-11	\N	42	44	3	1	\N	t
53	task2task2task2task2	task2task2task2	2020-08-11	\N	42	46	2	\N	\N	f
54	task2	task2	2020-08-11	\N	42	42	4	9	\N	f
59	sdggjg. hgfhj ghjk l; 		2020-08-11	2020-08-11	42	46	3	0.5	\N	t
60	task3task3task3task3task3	task3task3task3task3	2020-08-11	\N	42	42	2	\N	\N	t
42	get the first championship	as the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do itas the title suggests, do it	2020-08-11	2020-08-11	42	45	1	2.5	7.5	t
25	get tony on board		2020-08-11	2020-08-11	42	46	4	2	\N	t
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
18	flying cheetahs
19	test project
22	ok boomer
24	greefood challenge
25	Tokimon Finders
26	Taco Tuesdays
\.


--
-- Data for Name: teamsusers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.teamsusers (team_id, user_id, id) FROM stdin;
9	8	1
1	8	2
4	8	3
5	8	4
22	42	6
24	42	7
25	42	8
26	42	9
22	23	10
22	43	11
22	44	12
22	14	13
22	45	14
24	46	15
24	1	16
24	45	17
24	44	18
26	27	19
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, password, first_name, last_name, job_title, biography) FROM stdin;
4	123	123	\N	\N	\N	\N
6	zz	zz	\N	\N	\N	\N
7	kingkong	kingkong	king	kong	\N	\N
8	jmayer	jmayer	john	mayer	\N	\N
9	prepFuture	prepFuture	prep	future	\N	\N
10	snowybird	snowybird	adele	bird	\N	\N
11	sbarer	sbarer	simon	barer	\N	\N
12	jcameron	jcameron	james	cameron	\N	\N
13	jkrasinski	jkrasinski	john	krasinski	\N	\N
14	scarrel	scarrel	steve	carrel	\N	\N
15	jfischer	jfischer	jenna	fischer	\N	\N
16	rwilson	rwilson	rainn	wilson	\N	\N
17	akinsey	akinsey	angela	kinsey	\N	\N
18	mKaling	mKaling	Mindy	Kaling	\N	\N
19	ehelms	ehelms	ed	helms	\N	\N
20	bbaumgartner	bbaumgartner	brian	baumgartner	\N	\N
21	bjnovak	bjnovak	bj	novak	\N	\N
22	kflannery	kflannery	kate	flannery	\N	\N
23	psmith	psmith	phyllis	smith	\N	\N
24	onunez	onunez	oscar	nunez	\N	\N
25	cbratton	cbratton	creed	bratton	\N	\N
26	ekemper	ekemper	ellie	kemper	\N	\N
27	shudson	shudson	stanley	hudson	\N	\N
28	plieberstein	plieberstein	paul	lieberstein	\N	\N
29	crobinson	crobinson	craig	robinson	\N	\N
30	rjones	rjones	rashida	jones	\N	\N
31	zwoods	zwoods	zack	woods	\N	\N
32	randerson	randerson	roy	anderson	\N	\N
33	abuckley	abuckley	andy	buckley	\N	\N
34	jspader	jspader	james	spader	\N	\N
35	aryan	aryan	amy	ryan	\N	\N
36	wferrell	wferrell	will	ferrell	\N	\N
37	aadams	aadams	amy	adams	\N	\N
38	jchan	jchan	jackie	chan	\N	\N
39	jchanny	jchanny	jackie	channy	\N	\N
40	rbobby	rbobby	ricky	bobby	\N	\N
41	sb1	1234	simon	barer	\N	\N
1	tlou2	tlo	tlo	u2	\N	\N
42	testuser1	$2b$10$qjvBxAD8VTsctr/Dd6zvReM8v.67DsQj47FXdTHf28EkHCdnovkKS	testuser1	testuser1	\N	\N
43	thanos	$2b$10$0WIv3i4IuCtkAABTnThCYOex51zM/psDkHm7rVBlgri2qWi8nlCqa	the world	saver	\N	\N
44	ironman	$2b$10$E/FJ.lnq/zp0VPFYYX0/geMzin3R.M./JCyqY30J1LrTw6cVGzb/a	iron	man	\N	\N
45	srogers	$2b$10$72USJ4Sq8NqI6o3maJVEJuMXZqvSuRRVJmWLqaT.M74QzNvITqu/O	Steve 	Rogers	\N	\N
46	ggbaker	$2b$10$FMItHxDoSdeF2YtZj7DW2elbIk2WFed14OvHlHtxZphA.SxVlxypK	Greg	Baker	\N	\N
\.


--
-- Name: columns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columns_id_seq', 35, true);


--
-- Name: columnstasks_column_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columnstasks_column_id_seq', 1, false);


--
-- Name: columnstasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columnstasks_id_seq', 54, true);


--
-- Name: columnstasks_tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.columnstasks_tasks_id_seq', 1, false);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 35, true);


--
-- Name: projectcolumns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projectcolumns_id_seq', 24, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.projects_id_seq', 17, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tasks_id_seq', 60, true);


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.teams_id_seq', 26, true);


--
-- Name: teamsusers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.teamsusers_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 46, true);


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
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


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
-- Name: comments task commented on ; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "task commented on " FOREIGN KEY (task_id) REFERENCES public.tasks(id);


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
-- Name: comments user who created comment; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "user who created comment" FOREIGN KEY (user_id) REFERENCES public.users(id);


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

