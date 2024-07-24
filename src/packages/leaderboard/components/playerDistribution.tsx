"use client";

import { ResponsiveLine, Serie } from "@nivo/line";
import { Card, Flex, Heading, Skeleton } from "@radix-ui/themes";
import React from "react";

export function PlayerDistribution({
  rankDistribution,
}: {
  rankDistribution: Serie;
}) {
  return (
    <Flex direction="column" gap="2">
      <Heading>Rank distribution</Heading>
      <Skeleton loading={rankDistribution.data.length === 0}>
        <Card>
          <Flex height="512px">
            <ResponsiveLine
              theme={{
                grid: {
                  line: {
                    stroke: "var(--gray-4)",
                  },
                },
                axis: {
                  ticks: {
                    text: {
                      fill: "var(--gray-11)",
                      fontWeight: 700,
                    },
                  },
                  legend: {
                    text: {
                      fill: "var(--gray-11)",
                      fontWeight: 700,
                    },
                  },
                },
              }}
              margin={{ top: 24, right: 32, bottom: 64, left: 48 }}
              curve="monotoneX"
              data={[rankDistribution]}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Rating",
                legendOffset: 48,
                legendPosition: "middle",
                renderTick: (tick) => (
                  <g transform={`translate(${tick.x},${tick.y + 16})`}>
                    <text
                      textAnchor="middle"
                      style={{
                        fill: "var(--gray-11)", // Change this to your desired text color
                        fontSize: 10,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: tick.value.split("-")[0],
                      }}
                    />
                    <text
                      y={16}
                      textAnchor="middle"
                      style={{
                        fill: "var(--gray-11)", // Change this to your desired text color
                        fontSize: 10,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: tick.value.split("-")[1],
                      }}
                    />
                  </g>
                ),
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Players",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
            />
          </Flex>
        </Card>
      </Skeleton>
    </Flex>
  );
}
