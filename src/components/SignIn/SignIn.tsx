import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

function handleClick() {
  signIn("steam");
}

export function SignIn() {
    return (
      <Button onClick={handleClick}>
        Sign in
      </Button>
    );
}
