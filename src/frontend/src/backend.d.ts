import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Contact {
    subject: string;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Tech {
    name: string;
}
export interface Skill {
    name: string;
    proficiency: bigint;
    category: Category;
}
export interface Experience {
    endDate?: Time;
    role: string;
    description: string;
    company: string;
    isCurrent: boolean;
    startDate: Time;
}
export interface About {
    bio: string;
    clientsCount: bigint;
    yearsExperience: bigint;
    projectsCount: bigint;
}
export interface Project {
    title: string;
    description: string;
    githubUrl: string;
    imageUrl: string;
    category: Category__1;
    liveUrl: string;
    techStack: Array<Tech>;
}
export enum Category {
    DataScience = "DataScience",
    Frontend = "Frontend",
    DevOps = "DevOps",
    Backend = "Backend"
}
export enum Category__1 {
    Frontend = "Frontend",
    FullStack = "FullStack",
    Backend = "Backend",
    Mobile = "Mobile"
}
export interface backendInterface {
    addExperience(role: string, company: string, startDate: Time, endDate: Time | null, description: string, isCurrent: boolean): Promise<void>;
    addProject(title: string, description: string, techStack: Array<Tech>, liveUrl: string, githubUrl: string, category: Category__1, imageUrl: string): Promise<void>;
    addSkill(name: string, category: Category, proficiency: bigint): Promise<void>;
    getAbout(): Promise<About>;
    getAllContacts(): Promise<Array<Contact>>;
    getExperience(): Promise<Array<Experience>>;
    getProjects(): Promise<Array<Project>>;
    getSkills(): Promise<Array<Skill>>;
    removeExperience(role: string): Promise<void>;
    removeProject(title: string): Promise<void>;
    removeSkill(name: string): Promise<void>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<void>;
    updateAbout(bio: string, yearsExperience: bigint, projectsCount: bigint, clientsCount: bigint): Promise<void>;
}
