"use client"

import * as React from "react"
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
import { ArrowUpDown, ChevronDown, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Define the data type for our table
type Report = {
  id: string
  name: string  // Report Name
  company: string  // Company
  dateUploaded: Date  // Date Uploaded
  status: "Scanned" | "Error Scanning" | "Pending"  // Status
}

// Sample data using the companies provided
const reports: Report[] = [
  { id: "1", name: "Q1 Financial Report", company: "Acme Corp", dateUploaded: new Date('2023-01-15'), status: "Scanned" },
  { id: "2", name: "Q2 Financial Report", company: "Globex", dateUploaded: new Date('2023-04-20'), status: "Error Scanning" },
  { id: "3", name: "Annual Report", company: "Initech", dateUploaded: new Date('2023-06-30'), status: "Pending" },
  { id: "4", name: "Q3 Financial Report", company: "Umbrella Corp", dateUploaded: new Date('2023-09-10'), status: "Scanned" },
  { id: "5", name: "Q4 Financial Report", company: "Hooli", dateUploaded: new Date('2023-12-05'), status: "Scanned" },
  { id: "6", name: "Q1 Financial Report", company: "Stark Industries", dateUploaded: new Date('2023-02-18'), status: "Scanned" },
  { id: "7", name: "Q2 Financial Report", company: "Wayne Enterprises", dateUploaded: new Date('2023-05-25'), status: "Error Scanning" },
  { id: "8", name: "Annual Report", company: "Aperture Science", dateUploaded: new Date('2023-07-15'), status: "Pending" },
  { id: "9", name: "Q3 Financial Report", company: "Cyberdyne Systems", dateUploaded: new Date('2023-08-22'), status: "Scanned" },
  { id: "10", name: "Q4 Financial Report", company: "Wonka Industries", dateUploaded: new Date('2023-11-30'), status: "Scanned" },
  { id: "11", name: "Q1 Financial Report", company: "Soylent Corp", dateUploaded: new Date('2023-03-10'), status: "Pending" },
  { id: "12", name: "Q2 Financial Report", company: "Oceanic Airlines", dateUploaded: new Date('2023-06-05'), status: "Scanned" },
  { id: "13", name: "Annual Report", company: "Massive Dynamic", dateUploaded: new Date('2023-09-25'), status: "Error Scanning" },
  { id: "14", name: "Q3 Financial Report", company: "Tyrell Corporation", dateUploaded: new Date('2023-10-12'), status: "Pending" },
  { id: "15", name: "Q4 Financial Report", company: "Pied Piper", dateUploaded: new Date('2023-12-20'), status: "Scanned" },
  { id: "16", name: "Q1 Financial Report", company: "Monsters Inc.", dateUploaded: new Date('2023-01-28'), status: "Error Scanning" },
  { id: "17", name: "Q2 Financial Report", company: "Oscorp", dateUploaded: new Date('2023-05-10'), status: "Scanned" },
  { id: "18", name: "Annual Report", company: "LexCorp", dateUploaded: new Date('2023-08-08'), status: "Scanned" },
  { id: "19", name: "Q3 Financial Report", company: "Dunder Mifflin", dateUploaded: new Date('2023-09-18'), status: "Pending" },
  { id: "20", name: "Q4 Financial Report", company: "Spacely Sprockets", dateUploaded: new Date('2023-11-15'), status: "Scanned" },
  { id: "21", name: "Q1 Financial Report", company: "Globex Corporation", dateUploaded: new Date('2023-02-05'), status: "Error Scanning" },
  { id: "22", name: "Q2 Financial Report", company: "Vandelay Industries", dateUploaded: new Date('2023-05-20'), status: "Scanned" },
  { id: "23", name: "Annual Report", company: "Bluth Company", dateUploaded: new Date('2023-07-30'), status: "Pending" },
  { id: "24", name: "Q3 Financial Report", company: "Prestige Worldwide", dateUploaded: new Date('2023-10-05'), status: "Scanned" },
  { id: "25", name: "Q4 Financial Report", company: "Planet Express", dateUploaded: new Date('2023-12-25'), status: "Scanned" },
]

// Define the columns for our table
const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "name",
    header: "Report Name",
    cell: ({ row }) => (
      <DialogTrigger asChild>
        <span className="font-medium cursor-pointer hover:underline">{row.getValue("name")}</span>
      </DialogTrigger>
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "dateUploaded",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Uploaded
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("dateUploaded") as Date
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let badgeClass = ""
      switch (status) {
        case "Scanned":
          badgeClass = "bg-green-200 text-green-800 hover:bg-green-300"
          break
        case "Error Scanning":
          badgeClass = "bg-red-200 text-red-800 hover:bg-red-300"
          break
        case "Pending":
          badgeClass = "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
          break
        default:
          badgeClass = ""
      }
      return (
        <Badge className={badgeClass}>
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

export default function ReportDatatable() {
  const router = useRouter() // Initialize the router
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: reports,
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
  
  const handleRowClick = (id: string) => {
    router.push(`/reports/${id}`)
  }

  return (
    <Dialog>
      <div className="w-full">
        <div className="flex items-center py-4 space-x-4">
          <Input
            placeholder="Filter reports..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={[
              { label: "Scanned", value: "Scanned" },
              { label: "Error Scanning", value: "Error Scanning" },
              { label: "Pending", value: "Pending" },
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
                    onClick={() => handleRowClick(row.original.id)} // Call the navigation handler
                    className="cursor-pointer" // Add a pointer cursor for clickable rows
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report Information</DialogTitle>
          <DialogDescription>
            Detailed information about the selected report.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Report Name:</span>
            <span className="col-span-3">{table.getRowModel().rows[0]?.getValue("name")}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Company:</span>
            <span className="col-span-3">{table.getRowModel().rows[0]?.getValue("company")}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Date Uploaded:</span>
            <span className="col-span-3">{new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(table.getRowModel().rows[0]?.getValue("dateUploaded"))}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Status:</span>
            <span className="col-span-3">
              <Badge className={
                table.getRowModel().rows[0]?.getValue("status") === "Scanned" ? "bg-green-200 text-green-800 hover:bg-green-300" :
                table.getRowModel().rows[0]?.getValue("status") === "Error Scanning" ? "bg-red-200 text-red-800 hover:bg-red-300" :
                "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
              }>
                {table.getRowModel().rows[0]?.getValue("status")}
              </Badge>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

