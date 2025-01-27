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
import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";
import {
  IContactItem,
  IExperienceItem,
  IServicesItem,
  ISkillItem,
  IWorkItem,
} from "~/utils/interfaces/components";
import { INavItem } from "~/utils/interfaces/routes";
import { DevOps, MobApps, RunofshowImage, ShoeStore, StuntListing, UIUX, WebApps } from "./assets/images";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg",
    first: "Shruti",
    last: "Kapoor",
    twitter: "@shrutikapoor08",
  },
  {
    avatar:
      "https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg",
    first: "Glenn",
    last: "Reyes",
    twitter: "@glnnrys",
  },
  {
    avatar:
      "https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg",
    first: "Ryan",
    last: "Florence",
  },
  {
    avatar:
      "https://sessionize.com/image/d14d-400o400o2-pyB229HyFPCnUcZhHf3kWS.png",
    first: "Oscar",
    last: "Newman",
    twitter: "@__oscarnewman",
  },
  {
    avatar:
      "https://sessionize.com/image/fd45-400o400o2-fw91uCdGU9hFP334dnyVCr.jpg",
    first: "Michael",
    last: "Jackson",
  },
  {
    avatar:
      "https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg",
    first: "Christopher",
    last: "Chedeau",
    twitter: "@Vjeux",
  },
  {
    avatar:
      "https://sessionize.com/image/262f-400o400o2-UBPQueK3fayaCmsyUc1Ljf.jpg",
    first: "Cameron",
    last: "Matheson",
    twitter: "@cmatheson",
  },
  {
    avatar:
      "https://sessionize.com/image/820b-400o400o2-Ja1KDrBAu5NzYTPLSC3GW8.jpg",
    first: "Brooks",
    last: "Lybrand",
    twitter: "@BrooksLybrand",
  },
  {
    avatar:
      "https://sessionize.com/image/df38-400o400o2-JwbChVUj6V7DwZMc9vJEHc.jpg",
    first: "Alex",
    last: "Anderson",
    twitter: "@ralex1993",
  },
  {
    avatar:
      "https://sessionize.com/image/5578-400o400o2-BMT43t5kd2U1XstaNnM6Ax.jpg",
    first: "Kent C.",
    last: "Dodds",
    twitter: "@kentcdodds",
  },
  {
    avatar:
      "https://sessionize.com/image/c9d5-400o400o2-Sri5qnQmscaJXVB8m3VBgf.jpg",
    first: "Nevi",
    last: "Shah",
    twitter: "@nevikashah",
  },
  {
    avatar:
      "https://sessionize.com/image/2694-400o400o2-MYYTsnszbLKTzyqJV17w2q.png",
    first: "Andrew",
    last: "Petersen",
  },
  {
    avatar:
      "https://sessionize.com/image/907a-400o400o2-9TM2CCmvrw6ttmJiTw4Lz8.jpg",
    first: "Scott",
    last: "Smerchek",
    twitter: "@smerchek",
  },
  {
    avatar:
      "https://sessionize.com/image/08be-400o400o2-WtYGFFR1ZUJHL9tKyVBNPV.jpg",
    first: "Giovanni",
    last: "Benussi",
    twitter: "@giovannibenussi",
  },
  {
    avatar:
      "https://sessionize.com/image/f814-400o400o2-n2ua5nM9qwZA2hiGdr1T7N.jpg",
    first: "Igor",
    last: "Minar",
    twitter: "@IgorMinar",
  },
  {
    avatar:
      "https://sessionize.com/image/fb82-400o400o2-LbvwhTVMrYLDdN3z4iEFMp.jpeg",
    first: "Brandon",
    last: "Kish",
  },
  {
    avatar:
      "https://sessionize.com/image/fcda-400o400o2-XiYRtKK5Dvng5AeyC8PiUA.png",
    first: "Arisa",
    last: "Fukuzaki",
    twitter: "@arisa_dev",
  },
  {
    avatar:
      "https://sessionize.com/image/c8c3-400o400o2-PR5UsgApAVEADZRixV4H8e.jpeg",
    first: "Alexandra",
    last: "Spalato",
    twitter: "@alexadark",
  },
  {
    avatar:
      "https://sessionize.com/image/7594-400o400o2-hWtdCjbdFdLgE2vEXBJtyo.jpg",
    first: "Cat",
    last: "Johnson",
  },
  {
    avatar:
      "https://sessionize.com/image/5636-400o400o2-TWgi8vELMFoB3hB9uPw62d.jpg",
    first: "Ashley",
    last: "Narcisse",
    twitter: "@_darkfadr",
  },
  {
    avatar:
      "https://sessionize.com/image/6aeb-400o400o2-Q5tAiuzKGgzSje9ZsK3Yu5.JPG",
    first: "Edmund",
    last: "Hung",
    twitter: "@_edmundhung",
  },
  {
    avatar:
      "https://sessionize.com/image/30f1-400o400o2-wJBdJ6sFayjKmJycYKoHSe.jpg",
    first: "Clifford",
    last: "Fajardo",
    twitter: "@cliffordfajard0",
  },
  {
    avatar:
      "https://sessionize.com/image/6faa-400o400o2-amseBRDkdg7wSK5tjsFDiG.jpg",
    first: "Erick",
    last: "Tamayo",
    twitter: "@ericktamayo",
  },
  {
    avatar:
      "https://sessionize.com/image/feba-400o400o2-R4GE7eqegJNFf3cQ567obs.jpg",
    first: "Paul",
    last: "Bratslavsky",
    twitter: "@codingthirty",
  },
  {
    avatar:
      "https://sessionize.com/image/c315-400o400o2-spjM5A6VVfVNnQsuwvX3DY.jpg",
    first: "Pedro",
    last: "Cattori",
    twitter: "@pcattori",
  },
  {
    avatar:
      "https://sessionize.com/image/eec1-400o400o2-HkvWKLFqecmFxLwqR9KMRw.jpg",
    first: "Andre",
    last: "Landgraf",
    twitter: "@AndreLandgraf94",
  },
  {
    avatar:
      "https://sessionize.com/image/c73a-400o400o2-4MTaTq6ftC15hqwtqUJmTC.jpg",
    first: "Monica",
    last: "Powell",
    twitter: "@indigitalcolor",
  },
  {
    avatar:
      "https://sessionize.com/image/cef7-400o400o2-KBZUydbjfkfGACQmjbHEvX.jpeg",
    first: "Brian",
    last: "Lee",
    twitter: "@brian_dlee",
  },
  {
    avatar:
      "https://sessionize.com/image/f83b-400o400o2-Pyw3chmeHMxGsNoj3nQmWU.jpg",
    first: "Sean",
    last: "McQuaid",
    twitter: "@SeanMcQuaidCode",
  },
  {
    avatar:
      "https://sessionize.com/image/a9fc-400o400o2-JHBnWZRoxp7QX74Hdac7AZ.jpg",
    first: "Shane",
    last: "Walker",
    twitter: "@swalker326",
  },
  {
    avatar:
      "https://sessionize.com/image/6644-400o400o2-aHnGHb5Pdu3D32MbfrnQbj.jpg",
    first: "Jon",
    last: "Jensen",
    twitter: "@jenseng",
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});

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
    imageURI: WebApps
  },
  {
    id: "si-2",
    count: 2,
    title: "Mobile Development",
    imageURI: MobApps
  },
  {
    id: "si-3",
    count: 3,
    title: "DevOps",
    imageURI: DevOps
  },
  {
    id: "si-4",
    count: 4,
    title: "UI/UX Design",
    imageURI: UIUX
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
`

export const skillItemsParagraps: string =  `
I specialize in frontend, backend, and database development, with expertise in building user-friendly interfaces, scalable server-side applications, and efficient database management systems. My skills span across creating seamless user experiences, robust APIs, and optimized data storage solutions, ensuring end-to-end development of high-performing and reliable software applications.
`

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
      web: "some"
    },
    image: RunofshowImage,
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
      web: "some"
    },
    image: StuntListing,
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
      web: "some"
    },
    image: ShoeStore,
  },
];