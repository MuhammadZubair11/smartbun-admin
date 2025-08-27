
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { AddResidentDialog } from "./add-resident-dialog";
import { EditResidentDialog } from "./edit-resident-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useSearch } from "@/contexts/search-context";

export const initialResidents = [
  {
    id: "RES001",
    name: "Jane Cooper",
    age: 82,
    room: "101A",
    lastSeen: "2 minutes ago",
    status: "Active",
    medicalHistory: "Hypertension, mild arthritis.",
    avatar: "https://i.pravatar.cc/150?img=1",
    bloodO2: "98%",
    nextAppointment: "2024-08-15",
  },
  {
    id: "RES002",
    name: "John Smith",
    age: 75,
    room: "102B",
    lastSeen: "15 minutes ago",
    status: "Active",
    medicalHistory: "Type 2 Diabetes, controlled.",
    avatar: "https://i.pravatar.cc/150?img=2",
    bloodO2: "97%",
    nextAppointment: "2024-08-12",
  },
  {
    id: "RES003",
    name: "Cody Fisher",
    age: 88,
    room: "103A",
    lastSeen: "30 minutes ago",
    status: "Active",
    medicalHistory: "History of falls, uses a walker.",
    avatar: "https://i.pravatar.cc/150?img=3",
    bloodO2: "99%",
    nextAppointment: "2024-08-20",
  },
  {
    id: "RES004",
    name: "Esther Howard",
    age: 91,
    room: "201A",
    lastSeen: "1 hour ago",
    status: "Inactive",
    medicalHistory: "Dementia, requires assistance with daily activities.",
    avatar: "https://i.pravatar.cc/150?img=4",
    bloodO2: "96%",
    nextAppointment: "2024-08-18",
  },
  {
    id: "RES005",
    name: "Robert Fox",
    age: 79,
    room: "202B",
    lastSeen: "2 hours ago",
    status: "Active",
    medicalHistory: "COPD, uses supplemental oxygen.",
    avatar: "https://i.pravatar.cc/150?img=5",
    bloodO2: "94%",
    nextAppointment: "2024-08-22",
  },
  {
    id: "RES006",
    name: "Eleanor Pena",
    age: 85,
    room: "203A",
    lastSeen: "3 hours ago",
    status: "Active",
    medicalHistory: "Coronary artery disease, stable.",
    avatar: "https://i.pravatar.cc/150?img=6",
    bloodO2: "98%",
    nextAppointment: "2024-08-14",
  },
  {
    id: "RES007",
    name: "Jacob Jones",
    age: 81,
    room: "301B",
    lastSeen: "4 hours ago",
    status: "Active",
    medicalHistory: "Previous stroke, minor mobility issues.",
    avatar: "https://i.pravatar.cc/150?img=7",
    bloodO2: "97%",
    nextAppointment: "2024-08-25",
  },
  {
    id: "RES008",
    name: "Kristin Watson",
    age: 77,
    room: "302A",
    lastSeen: "5 hours ago",
    status: "Inactive",
    medicalHistory: "Recovering from hip surgery.",
    avatar: "https://i.pravatar.cc/150?img=8",
    bloodO2: "99%",
    nextAppointment: "2024-08-30",
  },
];

export type Resident = typeof initialResidents[0];

export function ResidentsTable() {
  const [residents, setResidents] = useState(initialResidents);
  const [editingResident, setEditingResident] = useState<Resident | null>(
    null
  );
  const { searchQuery } = useSearch();

  const addResident = (resident: Omit<Resident, "id" | "lastSeen" | "status" | "bloodO2">) => {
    const newResident: Resident = {
      ...resident,
      id: `RES${(residents.length + 1).toString().padStart(3, "0")}`,
      lastSeen: "Just now",
      status: "Active",
      bloodO2: "99%",
    };
    setResidents([newResident, ...residents]);
  };

  const updateResident = (updatedResident: Resident) => {
    setResidents(
      residents.map((r) => (r.id === updatedResident.id ? updatedResident : r))
    );
    setEditingResident(null);
  };

  const deleteResident = (residentId: string) => {
    setResidents(residents.filter((r) => r.id !== residentId));
  };

  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
       <div className="mb-4 flex justify-end">
        <AddResidentDialog onAddResident={addResident} />
       </div>
       {editingResident && (
        <EditResidentDialog
          resident={editingResident}
          onUpdateResident={updateResident}
          onClose={() => setEditingResident(null)}
        />
      )}
      <ScrollArea className="h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Blood O2</TableHead>
              <TableHead>Next Appointment</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResidents.length > 0 ? (
              filteredResidents.map((resident) => (
              <TableRow key={resident.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <img src={resident.avatar} alt={resident.name} className="h-8 w-8 rounded-full"/>
                  <div>
                    <div className="font-bold">{resident.name}</div>
                    <div className="text-sm text-muted-foreground">{resident.age} years old</div>
                  </div>
                </TableCell>
                <TableCell>{resident.room}</TableCell>
                <TableCell>
                  <Badge
                    variant={resident.status === "Active" ? "default" : "secondary"}
                    className={
                      resident.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                  >
                    {resident.status}
                  </Badge>
                </TableCell>
                <TableCell>{resident.bloodO2}</TableCell>
                <TableCell>{resident.nextAppointment ? new Date(resident.nextAppointment).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => alert(`Viewing details for ${resident.name}`)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setEditingResident(resident)}>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the resident&apos;s data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteResident(resident.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No residents found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
