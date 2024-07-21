"use client";

import { Header } from "@/components/page/header";
import { User } from "@prisma/client";
import {
  Flex,
  IconButton,
  Text,
  Table,
  Link as RadixLink,
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
import { formatNumber } from "@/utils/numberFormat";

type UserType = User & { position: number };

export default function Leaderboards() {
  const [players, setPlayers] = useState<UserType[]>([]);

  const columns = useMemo<ColumnDef<UserType>[]>(
    () => [
      {
        accessorKey: "position",
        header: () => "Rank",
        cell: (info) => <Text>{info.getValue() as any}</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "rating",
        header: () => "Rating",
        cell: (info) => <Text>{formatNumber(info.getValue() as any)}</Text>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "name",
        header: () => "Name",
        cell: (info) => (
          <Link
            style={{
              textDecoration: "none",
            }}
            href={`/players/${info.row.original.steamID}`}
          >
            <RadixLink weight="medium">{info.getValue() as any}</RadixLink>
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
    <Flex direction="column" gap="4" height="100%">
      <Flex align="center" justify="between">
        <Header>Leaderboards</Header>
        <Flex align="center" gap="4">
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
                  <div
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: <BsCaretUpFill />,
                      desc: <BsCaretDownFill />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
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
    </Flex>
  );
}
