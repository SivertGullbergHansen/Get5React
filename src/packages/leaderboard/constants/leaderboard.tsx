import { RankCard, UserType } from "@/common";
import { Text } from "@radix-ui/themes";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const tableColumns: ColumnDef<UserType>[] = [
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
          width: "100%",
          height: "100%",
          display: "block",
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
] as const;
