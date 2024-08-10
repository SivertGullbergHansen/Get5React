import { Prisma } from "@prisma/client";

type Tournament = Prisma.TournamentGetPayload<{
  include: { teams: true };
}>;

export const exampleTournaments: Tournament[] = [
  {
    id: 1,
    name: "Old But Gold",
    description:
      "Celebrate the legacy of Counter-Strike with Old But Gold, a tournament that brings together veteran players and classic strategies.",
    banner: "/refuse_banner.png",
    logo: "",
    endDate: new Date(2024, 8, 18, 17, 0),
    isActive: true,
    startDate: new Date(2024, 8, 14, 17, 0),
    teams: [],
    type: "DoubleElimination",
    isOpen: true,
    isPublic: true,
    maxTeams: 16,
    minRating: 3,
    maxRating: 6,
  },
  {
    id: 2,
    name: "Clutch Kings: Clash!",
    description:
      "Witness the ultimate test of nerves and skill in Clutch Kings Clash, where only the coolest and most calculated players will reign supreme.",
    banner: "/banner_example.png",
    logo: "",
    endDate: new Date(2024, 8, 18, 17, 0),
    isActive: true,
    startDate: new Date(2024, 8, 14, 17, 0),
    teams: [],
    type: "SingleElimination",
    isOpen: true,
    isPublic: true,
    maxTeams: 16,
    minRating: 0,
    maxRating: 32,
  },
  {
    id: 3,
    name: "Operation Overdrive",
    description:
      "Dive into the fast-paced action of Operation Overdrive, where elite teams battle it out in a high-octane Counter-Strike showdown.",
    banner: "/banner_t.png",
    logo: "",
    endDate: new Date(2024, 8, 18, 17, 0),
    isActive: true,
    startDate: new Date(2024, 8, 14, 17, 0),
    teams: [],
    type: "Swiss",
    isOpen: true,
    isPublic: true,
    maxTeams: 16,
    minRating: 12,
    maxRating: 16,
  },
] as const;
