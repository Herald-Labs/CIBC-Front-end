"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"

// Define the data type for our table
type Company = {
  id: string
  name: string
  revenue: number
  loanType: string 
  covenantStatus: "Within Limits" | "Violated"
}

// Sample data
const data: Company[] = [
  { id: "1", name: "Acme Corp", revenue: 5000000, loanType: "Term Loan", covenantStatus: "Within Limits", updateDate: "4 November 2024" },
  { id: "2", name: "Globex", revenue: 7500000, loanType: "Revolving Loan", covenantStatus: "Violated", updateDate: "12 November 2024" },
  { id: "3", name: "Initech", revenue: 3000000, loanType: "Term Loan", covenantStatus: "Within Limits", updateDate: "2 November 2024" },
  { id: "4", name: "LexCorp", revenue: 9500000, loanType: "Revolving Loan", covenantStatus: "Violated", updateDate: "8 November 2024" },
  { id: "5", name: "Hooli", revenue: 8000000, loanType: "Term Loan", covenantStatus: "Violated", updateDate: "15 November 2024" },
  { id: "6", name: "Stark Industries", revenue: 12000000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "18 November 2024" },
  { id: "7", name: "Wayne Enterprises", revenue: 9500000, loanType: "Term Loan", covenantStatus: "Violated", updateDate: "5 November 2024" },
  { id: "8", name: "Aperture Science", revenue: 4000000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "10 November 2024" },
  { id: "9", name: "Cyberdyne Systems", revenue: 8500000, loanType: "Term Loan", covenantStatus: "Violated", updateDate: "7 November 2024" },
  { id: "10", name: "Wonka Industries", revenue: 5000000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "14 November 2024" },
  { id: "11", name: "Soylent Corp", revenue: 6000000, loanType: "Term Loan", covenantStatus: "Violated", updateDate: "6 November 2024" },
  { id: "12", name: "Oceanic Airlines", revenue: 7000000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "3 November 2024" },
  { id: "13", name: "Massive Dynamic", revenue: 8000000, loanType: "Term Loan", covenantStatus: "Within Limits", updateDate: "17 November 2024" },
  { id: "14", name: "Tyrell Corporation", revenue: 9000000, loanType: "Revolving Loan", covenantStatus: "Violated", updateDate: "9 November 2024" },
  { id: "15", name: "Pied Piper", revenue: 4500000, loanType: "Term Loan", covenantStatus: "Within Limits", updateDate: "11 November 2024" },
  { id: "16", name: "Monsters Inc.", revenue: 5500000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "13 November 2024" },
  { id: "17", name: "Oscorp", revenue: 10000000, loanType: "Term Loan", covenantStatus: "Violated", updateDate: "1 November 2024" },
  { id: "18", name: "Umbrella Corp", revenue: 10000000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "16 November 2024" },
  { id: "19", name: "Dunder Mifflin", revenue: 3000000, loanType: "Term Loan", covenantStatus: "Within Limits", updateDate: "18 November 2024" },
  { id: "20", name: "Spacely Sprockets", revenue: 6500000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "7 November 2024" },
  { id: "21", name: "Globex Corporation", revenue: 7500000, loanType: "Term Loan", covenantStatus: "Violated", updateDate: "9 November 2024" },
  { id: "22", name: "Vandelay Industries", revenue: 3500000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "3 November 2024" },
  { id: "23", name: "Bluth Company", revenue: 4000000, loanType: "Term Loan", covenantStatus: "Violated", updateDate: "10 November 2024" },
  { id: "24", name: "Prestige Worldwide", revenue: 5000000, loanType: "Revolving Loan", covenantStatus: "Within Limits", updateDate: "15 November 2024" },
  { id: "25", name: "Planet Express", revenue: 5500000, loanType: "Term Loan", covenantStatus: "Within Limits", updateDate: "8 November 2024" },
];

// Define the columns for our table
const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "loanType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loan Type 
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <span className="font-medium">{row.getValue("loanType")}</span>,
  },
  {
    accessorKey: "covenantStatus",
    header: "Covenant Status",
    cell: ({ row }) => {
      const status = row.getValue("covenantStatus") as string
      return (
        <Badge variant={status === "Within Limits" ? "success" : "secondary"} className={status === "Violated" ? "bg-red-200 text-red-800 hover:bg-red-300" : ""}>
          {status}
        </Badge>
      )
    },
  },
]

// Faceted filter component
function DataTableFacetedFilter({
  column,
  title,
  options,
}: {
  column: any
  title: string
  options: { label: string; value: string }[]
}) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Plus className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }
                      const filterValues = Array.from(selectedValues)
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      )
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      className="mr-2 h-4 w-4"
                    />
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function CompanyDatatable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleRowClick = (companyId: string) => {
    router.push(`/portfolio/${companyId}`)
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Filter companies..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableFacetedFilter
          column={table.getColumn("covenantStatus")}
          title="Covenant Status"
          options={[
            { label: "Within Limits", value: "Within Limits" },
            { label: "Violated", value: "Violated" },
          ]}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id} className={index === 0 ? "pl-4" : ""}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(row.original.id)}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id} className={index === 0 ? "pl-4" : ""}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
