import { getPlayerColor } from "@/utils/color";
import { formatNumber } from "@/utils/numberFormat";
import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { BsStars } from "react-icons/bs";

export function RankCard({ rating = 3000 }: { rating: number }) {
  const color = getPlayerColor(rating);
  return (
    <Flex
      style={{
        transform: `skew(-10deg)`,
        transformOrigin: "top left",
        position: "relative",
      }}
      width="fit-content"
    >
      <svg
        viewBox="0 0 17 32"
        style={{
          zIndex: 1,
          transform: "skew(10deg)",
          position: "absolute",
          height: "100%",
          left: "-2px",
        }}
      >
        <path
          style={{ fill: `var(--${color}-9)` }}
          d="M5.44 2.13A2.6 2.6 0 0 1 7.99 0h1.86a.6.6 0 0 1 .6.7L4.83 31.5a.6.6 0 0 1-.6.5h-2.3c-1 0-1.76-.9-1.58-1.89l5.1-27.98ZM11.82.99c.1-.57.6-.99 1.18-.99h2.93a.6.6 0 0 1 .59.7l-5.4 30.31c-.1.57-.6.99-1.18.99H7a.6.6 0 0 1-.59-.7L11.82.98Z"
        />
      </svg>
      <Text
        size="2"
        weight="bold"
        style={{
          color: `var(--${color}-11)`,
          borderRadius: "2px",
          backgroundColor: `var(--${color}-2)`,
          border: `1.5px solid var(--${color}-9)`,
          paddingLeft: "10px",
          paddingRight: "4px",
        }}
      >
        <Flex gap="1" align="center" justify="center">
          <Flex align="center" justify="center">
            R <BsStars />
          </Flex>
          {formatNumber(rating, ",")}
        </Flex>
      </Text>
    </Flex>
  );
}
