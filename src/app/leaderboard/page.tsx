"use client";

import { Header } from "@/components/page/header";
import {
  Flex,
  IconButton,
  Text,
  Table,
  Button,
  TextField,
  Heading,
  Card,
  Skeleton,
} from "@radix-ui/themes";
import { flexRender } from "@tanstack/react-table";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import Link from "next/link";
import { UserType } from "@/types/user";
import { RankCard } from "@/components/user/rank";
import { ResponsiveLine, Serie } from "@nivo/line";

export default function Leaderboard() {
  const [players, setPlayers] = useState<UserType[]>([]);
  const [rankDistribution, setRankDistribution] = useState<Serie>({
    data: [],
    id: "Rank distribution",
  });

  const columns = useMemo<ColumnDef<UserType>[]>(
    () => [
      {
        invertSorting: true,
        accessorKey: "position",
        header: () => "Rank",
        cell: (info) => <Text>{info.getValue() as any}</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "rating",
        header: () => "Rating",
        cell: (info) => <RankCard rating={info.getValue() as number} />,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "name",
        header: () => "Name",
        cell: (info) => (
          <Link
            style={{
              color: "white",
              textDecoration: "none",
            }}
            href={`/players/${info.row.original.steamID}`}
          >
            <Text weight="medium">{info.getValue() as any}</Text>
          </Link>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "teamId",
        header: () => "Team",
        cell: (info) => <Text>{info.getValue() as any}</Text>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  useEffect(() => {
    axios.get("/api/users").then((res) => {
      const users: UserType[] = res.data.users;
      setPlayers(users.sort((a, b) => a.position - b.position));

      // Calculate rank distribution
      const step = 1000;
      const maxRating =
        Math.ceil(Math.max(...users.map((user) => user.rating)) / step) * step;
      const distribution = [];

      for (let i = 0; i <= maxRating; i += step) {
        distribution.push({
          x: `${i}-${i + step}`,
          y: users.filter((user) => user.rating >= i && user.rating < i + step)
            .length,
        });
      }

      setRankDistribution({
        id: "Rank distribution",
        data: distribution,
      });
    });
  }, []);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data: players,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <Flex direction="column" gap="4" height="100%" pb="8">
      <Flex align="center" justify="between">
        <Header>Leaderboard</Header>
        <Flex align="center" gap="4">
          <TextField.Root
            placeholder="Filter name"
            onChange={(e) =>
              table.getFlatHeaders()[2].column.setFilterValue(e.target.value)
            }
            value={
              (table.getFlatHeaders()[2].column.getFilterValue() ??
                "") as string
            }
          />
          <Flex justify="center" align="center" gap="3">
            <IconButton
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
              variant="soft"
            >
              <BsCaretLeftFill />
            </IconButton>
            <Text>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </Text>
            <IconButton
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
              variant="soft"
            >
              <BsCaretRightFill />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeaderCell
                  key={header.id}
                  colSpan={header.colSpan}
                  width={`${header.getSize()}px` || "auto"}
                >
                  <Button
                    variant="ghost"
                    style={{ width: "100%", height: "100%" }}
                    onClick={header.column.getToggleSortingHandler()}
                    radius="medium"
                  >
                    <Flex width="100%" align="center" justify="start" gap="1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <BsCaretUpFill />,
                        desc: <BsCaretDownFill />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </Flex>
                  </Button>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Flex direction="column" gap="2">
        <Heading>Rank distribution</Heading>
        <Skeleton loading={players.length === 0}>
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
    </Flex>
  );
}
