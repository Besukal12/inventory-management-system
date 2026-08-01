"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

const emptyForm = {
  name: "",
  email: "",
  role: "Employee",
  password: "",
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/auth/get_users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const activeMenu = openMenuId
        ? menuRefs.current[openMenuId]
        : undefined;

      if (activeMenu && !activeMenu.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleDeleteUser = async (userId: string) => {
    try {
      setDeletingId(userId);
      const response = await fetch("/api/auth/delete_user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      if (editingUser?.id === userId) {
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    } finally {
      setDeletingId(null);
      setOpenMenuId(null);
    }
  };

  const openEditForm = (user: UserRow) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setOpenMenuId(null);
  };

  const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingUser) {
      return;
    }

    try {
      setSaving(true);
      const response = await fetch("/api/auth/edit_user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingUser.id,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
          password: formData.password.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.user.id ? updatedUser.user : user,
        ),
      );
      setEditingUser(null);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and roles.
          </p>
        </div>
        <Link
          href="/users/new"
          className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add User
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="font-medium bg-gray-50">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.isActive ? "neon" : "secondary"}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div
                  ref={(el) => {
                    menuRefs.current[user.id] = el;
                  }}
                  className="relative inline-flex justify-end"
                >
                  <button
                    className="inline-flex items-center justify-center rounded-full h-8 w-8 hover:bg-muted transition-colors"
                    onClick={() =>
                      setOpenMenuId(openMenuId === user.id ? null : user.id)
                    }
                    aria-label="Open actions"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  {openMenuId === user.id && (
                    <div className="absolute right-10 -top-1 z-10 w-40 rounded-md border bg-background shadow-lg">
                      <button
                        type="button"
                        onClick={() => openEditForm(user)}
                        className="flex w-full items-center gap-2 rounded-t-md px-3 py-2 text-sm text-left hover:bg-muted"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === user.id}
                        onClick={() => handleDeleteUser(user.id)}
                        className="flex w-full items-center gap-2 rounded-b-md px-3 py-2 text-sm text-left text-red-600 hover:bg-muted disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        {deletingId === user.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingUser && (
        <form
          onSubmit={handleEditUser}
          className="space-y-4 rounded-xl border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Edit User</h2>
              <p className="text-sm text-muted-foreground">
                Update the selected account details.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="rounded-full border px-3 py-1 text-sm"
            >
              Close
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm font-medium">
              <span>Name</span>
              <input
                value={formData.name}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-medium">
              <span>Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-medium">
              <span>Role</span>
              <select
                value={formData.role}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    role: event.target.value,
                  }))
                }
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium">
              <span>Password</span>
              <input
                type="password"
                value={formData.password}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                className="w-full rounded-md border px-3 py-2"
                placeholder="Leave blank to keep current password"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-sidebar px-4 py-2 text-sm font-medium text-sidebar-foreground disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
