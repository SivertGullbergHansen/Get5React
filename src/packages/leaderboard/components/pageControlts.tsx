import { UserType } from "@/common";
import { Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { Table } from "@tanstack/react-table";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

export function PageControls({ table }: { table: Table<UserType> }) {
  return (
    <Flex align="center" gap="4">
      <TextField.Root
        placeholder="Filter name"
        onChange={(e) =>
          table.getFlatHeaders()[2].column.setFilterValue(e.target.value)
        }
        value={
          (table.getFlatHeaders()[2].column.getFilterValue() ?? "") as string
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
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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
  );
}
