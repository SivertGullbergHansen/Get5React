"use client";

import { Dialog } from "@radix-ui/themes";
import React from "react";
import { useTournamentPreview } from "../hooks/useTournamentPreview";

export function TournamentPreview() {
  const { isVisible, tournamentData, hideTournamentPreview } =
    useTournamentPreview();

  if (!tournamentData) return null;

  return (
    <Dialog.Root
      open={isVisible}
      onOpenChange={(open) => {
        if (!open) hideTournamentPreview();
      }}
    >
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{tournamentData.name}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {tournamentData.description}
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
}
