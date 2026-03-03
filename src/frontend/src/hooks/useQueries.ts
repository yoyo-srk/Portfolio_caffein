import { useMutation, useQuery } from "@tanstack/react-query";
import type { About, Experience, Project, Skill } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAbout() {
  const { actor, isFetching } = useActor();
  return useQuery<About>({
    queryKey: ["about"],
    queryFn: async () => {
      if (!actor) {
        return {
          bio: "Full Stack Developer with a passion for building elegant, performant web applications. Experienced in React, Node.js, TypeScript, and cloud infrastructure. I love turning complex problems into simple, beautiful solutions.",
          yearsExperience: BigInt(5),
          projectsCount: BigInt(40),
          clientsCount: BigInt(20),
        };
      }
      return actor.getAbout();
    },
    enabled: !isFetching,
  });
}

export function useGetProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      const projects = await actor.getProjects();
      return projects;
    },
    enabled: !isFetching,
  });
}

export function useGetSkills() {
  const { actor, isFetching } = useActor();
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSkills();
    },
    enabled: !isFetching,
  });
}

export function useGetExperience() {
  const { actor, isFetching } = useActor();
  return useQuery<Experience[]>({
    queryKey: ["experience"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExperience();
    },
    enabled: !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message,
    }: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContact(name, email, subject, message);
    },
  });
}
