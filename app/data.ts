////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { EmailIcon, LocationIcon, PhoneIcon } from "~/assets/icon";
import {
  DjangoLogo,
  FlaskLogo,
  MaterialUILogo,
  MongoDBLogo,
  MySQLLogo,
  NestLogo,
  NextLogo,
  PostgresSQLLogo,
  PythonLogo,
  ReactLogo,
  ReduxLogo,
  RemixLogo,
  ThreeJSLogo,
  WebpackLogo,
  JSLogo,
  TypescriptLogo,
  GitLogo,
  GithubLogo,
  FigmaLogo,
  TensorflowLogo,
} from "~/assets/logos";
import {
  IContactItem,
  IExperienceItem,
  IServicesItem,
  ISkillItem,
  IWorkItem,
} from "~/utils/interfaces/components";
import { INavItem } from "~/utils/interfaces/routes";
import {
  DevOps,
  MobApps,
  RunofshowImages,
  ShoeStoreImages,
  StuntListingImages,
  SkyElectricImages,
  UIUX,
  WebApps,
  MingleeImages,
} from "./assets/images";


// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------

export const navData: INavItem[] = [
  {
    name: "",
    label: "Home",
  },
  {
    name: "services",
    label: "Services",
  },
  {
    name: "resume",
    label: "Resume",
  },
  {
    name: "work",
    label: "Work",
  },
  {
    name: "contacts",
    label: "Contacts",
  },
];

export const serviceItems: IServicesItem[] = [
  {
    id: "si-1",
    count: 1,
    title: "Web Development",
    imageURI: WebApps,
  },
  {
    id: "si-2",
    count: 2,
    title: "Mobile Development",
    imageURI: MobApps,
  },
  {
    id: "si-3",
    count: 3,
    title: "DevOps",
    imageURI: DevOps,
  },
  {
    id: "si-4",
    count: 4,
    title: "UI/UX Design",
    imageURI: UIUX,
  },
];

export const skillItems: ISkillItem[] = [
  {
    name: "Nest JS",
    Icon: NestLogo,
  },
  {
    name: "Django",
    Icon: DjangoLogo,
  },
  {
    name: "Flask",
    Icon: FlaskLogo,
  },
  {
    name: "PostgresSQL",
    Icon: PostgresSQLLogo,
  },
  {
    name: "MySQL",
    Icon: MySQLLogo,
  },
  {
    name: "MongoDB",
    Icon: MongoDBLogo,
  },
  {
    name: "Python",
    Icon: PythonLogo,
  },
  {
    name: "Next JS",
    Icon: NextLogo,
  },
  {
    name: "Remix JS",
    Icon: RemixLogo,
  },
  {
    name: "React JS",
    Icon: ReactLogo,
  },
  {
    name: "Three JS",
    Icon: ThreeJSLogo,
  },
  {
    name: "Redux JS",
    Icon: ReduxLogo,
  },
  {
    name: "WebPack",
    Icon: WebpackLogo,
  },
  {
    name: "Material UI",
    Icon: MaterialUILogo,
  },
  {
    name: "JavaScript",
    Icon: JSLogo,
  },
  {
    name: "TypeScript",
    Icon: TypescriptLogo,
  },
  {
    name: "Git",
    Icon: GitLogo,
  },
  {
    name: "GitHub",
    Icon: GithubLogo,
  },
  {
    name: "Figma",
    Icon: FigmaLogo,
  },
  {
    name: "TensorFlow",
    Icon: TensorflowLogo,
  },
];

export const contacts: IContactItem[] = [
  {
    label: "Email",
    value: "shkhaider2015@gmail.com",
    Icon: EmailIcon,
    type: "EMAIL",
  },
  {
    label: "Phone No.",
    value: "+92 346 0027852",
    Icon: PhoneIcon,
    type: "PHONE",
  },
  {
    label: "Address",
    value: "Banaras, Pathan Colony, Karachi, Pakistan",
    Icon: LocationIcon,
    type: "ADDRESS",
  },
];

export const experienceItems: IExperienceItem[] = [
  {
    date: "2022 - Continue",
    title: "Frontend Lead Developer",
    companyName: "RunOfShowApp",
  },
  {
    date: "2021 - 2022",
    title: "Jr. Mobile Developer",
    companyName: "Retrocube Pvt. Ltd",
  },
  {
    date: "2020 - 2021",
    title: "Jr. Web Developer",
    companyName: "Concept Recall Pvt. Ltd",
  },
  {
    date: "2020 - Continue",
    title: "Fullstack Developer",
    companyName: "Freelance",
  },
  {
    date: "2020 - 2020",
    title: "Internship",
    companyName: "Sky Electric Pvt. Ltd",
  },
];

export const educationItem: IExperienceItem[] = [
  {
    date: "2015 - 2019",
    title: "BS Software Engineer",
    companyName: "Indus University Pvt. Ltd",
  },
  {
    date: "2013 - 2015",
    title: "FSc Pre-Engineering",
    companyName: "Pakistan Shipowner's Collage",
  },
  {
    date: "2004 - 2013",
    title: "SSc (Matriculation)",
    companyName: "Al Nasir School Pvt.",
  },
];

export const experienceParagraph: string = `
With over 5 years in software development, I’ve worked across frontend, mobile, and full-stack domains, starting as an intern at Sky Electric Pvt. Ltd and advancing to roles at Concept Recall Pvt. Ltd and Retrocube Pvt. Ltd. Currently, I’m the Frontend Lead Developer at RunOfShowApp, leading a team to create user-friendly interfaces while freelancing as a Fullstack Developer since 2020. My career showcases adaptability, teamwork, and a commitment to high-quality solutions. Passionate about coding and problem-solving, I continuously learn and grow as a versatile developer.
`;

export const educationParagraph: string = `
My educational journey began with SSC from Al Nasir School Pvt., sparking my interest in problem-solving. I pursued FSc Pre-Engineering at Pakistan Shipowner's College, strengthening my analytical skills. Later, I earned a BS in Software Engineering from Indus University Pvt. Ltd., gaining expertise in programming and software design. This academic foundation has shaped my technical skills and growth mindset, preparing me for a successful career in software development.
`;

export const skillItemsParagraps: string = `
I specialize in frontend, backend, and database development, with expertise in building user-friendly interfaces, scalable server-side applications, and efficient database management systems. My skills span across creating seamless user experiences, robust APIs, and optimized data storage solutions, ensuring end-to-end development of high-performing and reliable software applications.
`;

export const workItems: IWorkItem[] = [
  {
    count: 1,
    title: "The RunOfShow",
    role: "Frontend Lead",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "React.js", "Redux.js", "Ant Design", "AWS Auth"],
    links: {
      playStore: "some",
      github: "some",
      web: "some",
    },
    image: RunofshowImages,
  },
  {
    count: 2,
    title: "Stunt Listing",
    role: "Frontend Developer",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "React.js", "Redux.js", "Material UI"],
    links: {
      playStore: "some",
      github: "some",
      web: "some",
    },
    image: StuntListingImages,
  },
  {
    count: 3,
    title: "Shoe Store",
    role: "Frontend Developer",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "React.js", "Redux.js", "Material UI"],
    links: {
      playStore: "some",
      github: "some",
      web: "some",
    },
    image: ShoeStoreImages,
  },
  {
    count: 4,
    title: "Minglee",
    role: "Full Stack Developer",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "React.js", "Redux.js", "Material UI"],
    links: {
      playStore: "some",
      github: "some",
      web: "some",
    },
    image: MingleeImages,
  },
  {
    count: 5,
    title: "Sky Electric",
    role: "Mobile Developer",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, alias obcaecati? Repellendus ut id, alias asperiores odio velit, voluptatibus quam nisi cum, ullam quisquam minus dolores unde voluptatem temporibus fugiat?",
    techStack: ["Next.js", "React.js", "Redux.js", "Material UI"],
    links: {
      playStore: "some",
      github: "some",
      web: "some",
    },
    image: SkyElectricImages,
  },
];
