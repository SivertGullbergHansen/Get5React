"use client";

import { useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { Tournament } from "prisma/prisma-client";

const useTournamentPreviewHook = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tournamentData, setTournamentData] = useState<Tournament | null>(null);

  const showTournamentPreview = () => {
    setIsVisible(true);
  };

  const hideTournamentPreview = () => {
    setIsVisible(false);
  };

  return {
    showTournamentPreview,
    hideTournamentPreview,
    isVisible,
    tournamentData,
    setTournamentData,
  };
};

const init = {
  showTournamentPreview: () => {},
  hideTournamentPreview: () => {},
  isVisible: false,
  tournamentData: null,
  setTournamentData: (newData: any) => {},
};

export const useTournamentPreview = singletonHook(
  init,
  useTournamentPreviewHook
);
