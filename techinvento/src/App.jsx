import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const gadgetColumns = [
  {
    accessorKey: "deviceName",
    header: "Gadget Name",
  },
  {
    accessorKey: "deviceType",
    header: "Category",
  },
  {
    accessorKey: "maker",
    header: "Manufacturer",
  },
  {
    accessorKey: "healthScore",
    header: "Health Rating",
  },
  {
    accessorKey: "brand",
    header: "Tech Brand Name",
  },
  {
    accessorKey: "role",
    header: "User Role",
  },
];

function App() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [maker, setMaker] = useState("");
  const [healthScore, setHealthScore] = useState("");
  const [brand, setBrand] = useState("");
  const [role, setRole] = useState("");
  const [gadgets, setGadgets] = useState([]);
  const [currentView, setCurrentView] = useState("form");
  const [clickedGadget, setClickedGadget] = useState(null);
  const [activeGadget, setActiveGadget] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  const [nameError, setNameError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [makerError, setMakerError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [roleError, setRoleError] = useState("");

  const visibleGadgets =
    categoryFilter === "All"
      ? gadgets
      : gadgets.filter((gadget) => gadget.deviceType === categoryFilter);

  const gadgetTable = useReactTable({
    data: visibleGadgets,
    columns: gadgetColumns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  useEffect(() => {
    setActiveGadget(clickedGadget);
  }, [clickedGadget]);

  const checkDeviceName = (value) => {
    if (value.trim() === "") {
      setNameError("Gadget name is required.");
      return false;
    }

    if (value.trim().length < 3) {
      setNameError("Gadget name must be at least 3 characters.");
      return false;
    }

    setNameError("");
    return true;
  };

  const checkDeviceType = (value) => {
    if (value === "") {
      setTypeError("Category is required.");
      return false;
    }

    setTypeError("");
    return true;
  };

  const checkMaker = (value) => {
    if (value.trim() === "") {
      setMakerError("Manufacturer is required.");
      return false;
    }

    setMakerError("");
    return true;
  };

  const checkHealthScore = (value) => {
    if (value === "") {
      setScoreError("Health rating is required.");
      return false;
    }

    if (Number(value) < 1 || Number(value) > 100) {
      setScoreError("Health rating must be between 1 and 100.");
      return false;
    }

    setScoreError("");
    return true;
  };

  const checkBrand = (value) => {
    if (value.trim() === "") {
      setBrandError("Tech brand name is required.");
      return false;
    }

    setBrandError("");
    return true;
  };

  const checkRole = (value) => {
    if (value === "") {
      setRoleError("User role is required.");
      return false;
    }

    setRoleError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameOkay = checkDeviceName(deviceName);
    const categoryOkay = checkDeviceType(deviceType);
    const makerOkay = checkMaker(maker);
    const scoreOkay = checkHealthScore(healthScore);
    const brandOkay = checkBrand(brand);
    const roleOkay = checkRole(role);

    const everythingOkay =
      nameOkay &&
      categoryOkay &&
      makerOkay &&
      scoreOkay &&
      brandOkay &&
      roleOkay;

    if (!everythingOkay) {
      return;
    }

    const newGadget = {
      id: Date.now(),
      deviceName,
      deviceType,
      maker,
      healthScore: Number(healthScore),
      brand,
      role,
    };

    setGadgets([...gadgets, newGadget]);
    setCategoryFilter("All");
    setPagination({
      pageIndex: Math.floor(gadgets.length / 3),
      pageSize: 3,
    });
    setClickedGadget(null);
    setDeviceName("");
    setDeviceType("");
    setMaker("");
    setHealthScore("");
    setBrand("");
    setRole("");
    setCurrentView("registry");
  };

  const handleFilter = (event) => {
    setCategoryFilter(event.target.value);
    setPagination({
      pageIndex: 0,
      pageSize: 3,
    });
    setClickedGadget(null);
  };

  return (
    <div className="min-h-screen bg-[#EEF6F3] text-[#123F3A]">
      <header className="border-b-4 border-[#F06A50] bg-[#123F3A] text-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em]">
            <span className="rounded-full bg-[#FFC857] px-3 py-1 text-[#123F3A]">
              Invento
            </span>
            <span className="text-white/70">Gadget Registry</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tech Gadget & Inventory Hub
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
            Register devices, review their health, and keep your testing
            inventory organized.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        {currentView === "form" ? (
          <section className="mx-auto max-w-3xl rounded-2xl border border-[#123F3A]/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F06A50]">
                New Entry
              </p>
              <h2 className="mt-2 text-2xl font-bold">Register a gadget</h2>
              <p className="mt-2 text-sm text-[#123F3A]/65">
                Fill in the device information and assign the correct user role.
              </p>
            </div>

            <form
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="deviceName"
                >
                  Gadget Name
                </label>
                <input
                  className="w-full rounded-lg border border-[#123F3A]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F06A50] focus:ring-2 focus:ring-[#F06A50]/20"
                  id="deviceName"
                  type="text"
                  placeholder="Nova Watch"
                  value={deviceName}
                  onChange={(event) => {
                    setDeviceName(event.target.value);
                    checkDeviceName(event.target.value);
                  }}
                  required
                  minLength={3}
                />
                {nameError && (
                  <p className="mt-2 text-sm font-medium text-[#F06A50]">
                    {nameError}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="deviceType"
                >
                  Category
                </label>
                <select
                  className="w-full rounded-lg border border-[#123F3A]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F06A50] focus:ring-2 focus:ring-[#F06A50]/20"
                  id="deviceType"
                  value={deviceType}
                  onChange={(event) => {
                    setDeviceType(event.target.value);
                    checkDeviceType(event.target.value);
                  }}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Wearable">Wearable</option>
                  <option value="Audio">Audio</option>
                </select>
                {typeError && (
                  <p className="mt-2 text-sm font-medium text-[#F06A50]">
                    {typeError}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="maker"
                >
                  Manufacturer
                </label>
                <input
                  className="w-full rounded-lg border border-[#123F3A]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F06A50] focus:ring-2 focus:ring-[#F06A50]/20"
                  id="maker"
                  type="text"
                  placeholder="Vertex Labs"
                  value={maker}
                  onChange={(event) => {
                    setMaker(event.target.value);
                    checkMaker(event.target.value);
                  }}
                  required
                />
                {makerError && (
                  <p className="mt-2 text-sm font-medium text-[#F06A50]">
                    {makerError}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="healthScore"
                >
                  Health Rating
                </label>
                <input
                  className="w-full rounded-lg border border-[#123F3A]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F06A50] focus:ring-2 focus:ring-[#F06A50]/20"
                  id="healthScore"
                  type="number"
                  placeholder="1–100"
                  value={healthScore}
                  onChange={(event) => {
                    setHealthScore(event.target.value);
                    checkHealthScore(event.target.value);
                  }}
                  required
                  min={1}
                  max={100}
                />
                {scoreError && (
                  <p className="mt-2 text-sm font-medium text-[#F06A50]">
                    {scoreError}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="brand"
                >
                  Tech Brand Name
                </label>
                <input
                  className="w-full rounded-lg border border-[#123F3A]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F06A50] focus:ring-2 focus:ring-[#F06A50]/20"
                  id="brand"
                  type="text"
                  placeholder="Invento Tech"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                    checkBrand(event.target.value);
                  }}
                  required
                />
                {brandError && (
                  <p className="mt-2 text-sm font-medium text-[#F06A50]">
                    {brandError}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <p className="mb-3 text-sm font-semibold">User Role</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                      role === "Engineer"
                        ? "border-[#F06A50] bg-[#F06A50]/10"
                        : "border-[#123F3A]/15 hover:border-[#123F3A]/35"
                    }`}
                  >
                    <input
                      className="accent-[#F06A50]"
                      type="radio"
                      name="role"
                      value="Engineer"
                      checked={role === "Engineer"}
                      onChange={(event) => {
                        setRole(event.target.value);
                        checkRole(event.target.value);
                      }}
                      required
                    />
                    Engineer
                  </label>

                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition ${
                      role === "Tester"
                        ? "border-[#F06A50] bg-[#F06A50]/10"
                        : "border-[#123F3A]/15 hover:border-[#123F3A]/35"
                    }`}
                  >
                    <input
                      className="accent-[#F06A50]"
                      type="radio"
                      name="role"
                      value="Tester"
                      checked={role === "Tester"}
                      onChange={(event) => {
                        setRole(event.target.value);
                        checkRole(event.target.value);
                      }}
                      required
                    />
                    Tester
                  </label>
                </div>
                {roleError && (
                  <p className="mt-2 text-sm font-medium text-[#F06A50]">
                    {roleError}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2 md:col-span-2">
                <button
                  className="w-full rounded-lg bg-[#F06A50] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#dc5b43] sm:w-auto"
                  type="submit"
                >
                  Add to Registry
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F06A50]">
                  Inventory
                </p>
                <h2 className="mt-2 text-2xl font-bold">Gadget Registry</h2>
                <p className="mt-2 text-sm text-[#123F3A]/65">
                  Select a row to view its complete device profile.
                </p>
              </div>

              <button
                className="rounded-lg bg-[#123F3A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1a554e]"
                type="button"
                onClick={() => {
                  setCurrentView("form");
                  setClickedGadget(null);
                }}
              >
                Add Another Gadget
              </button>
            </div>

            <div className="mb-5 rounded-xl border border-[#123F3A]/10 bg-white p-4 shadow-sm">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#123F3A]/65"
                htmlFor="categoryFilter"
              >
                Filter by category
              </label>
              <select
                className="w-full rounded-lg border border-[#123F3A]/20 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#F06A50] sm:max-w-xs"
                id="categoryFilter"
                value={categoryFilter}
                onChange={handleFilter}
              >
                <option value="All">All categories</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Wearable">Wearable</option>
                <option value="Audio">Audio</option>
              </select>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#123F3A]/10 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] border-collapse">
                  <thead className="bg-[#123F3A] text-white">
                    {gadgetTable.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody>
                    {gadgetTable.getRowModel().rows.length > 0 ? (
                      gadgetTable.getRowModel().rows.map((row) => (
                        <tr
                          className={`cursor-pointer border-b border-[#123F3A]/10 text-sm transition last:border-b-0 ${
                            clickedGadget?.id === row.original.id
                              ? "bg-[#F06A50]/15"
                              : "hover:bg-[#EEF6F3]"
                          }`}
                          key={row.id}
                          onClick={() => setClickedGadget(row.original)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td className="px-4 py-4" key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="px-4 py-10 text-center text-sm text-[#123F3A]/60"
                          colSpan={gadgetColumns.length}
                        >
                          No gadgets match this category.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-[#123F3A]/10 px-4 py-4">
                <button
                  className="rounded-lg border border-[#123F3A]/20 px-4 py-2 text-sm font-semibold transition hover:border-[#123F3A] disabled:cursor-not-allowed disabled:opacity-35"
                  type="button"
                  onClick={() => gadgetTable.previousPage()}
                  disabled={!gadgetTable.getCanPreviousPage()}
                >
                  Previous
                </button>

                <p className="text-sm font-semibold">
                  Page {gadgetTable.getState().pagination.pageIndex + 1} of{" "}
                  {Math.max(gadgetTable.getPageCount(), 1)}
                </p>

                <button
                  className="rounded-lg border border-[#123F3A]/20 px-4 py-2 text-sm font-semibold transition hover:border-[#123F3A] disabled:cursor-not-allowed disabled:opacity-35"
                  type="button"
                  onClick={() => gadgetTable.nextPage()}
                  disabled={!gadgetTable.getCanNextPage()}
                >
                  Next
                </button>
              </div>
            </div>

            {activeGadget ? (
              <section className="mt-6 rounded-2xl border-l-4 border-[#F06A50] bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-3 border-b border-[#123F3A]/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F06A50]">
                      Active Gadget
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                      {activeGadget.deviceName}
                    </h3>
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                      activeGadget.role === "Engineer"
                        ? "bg-[#123F3A] text-white"
                        : "bg-[#FFC857] text-[#123F3A]"
                    }`}
                  >
                    {activeGadget.role}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#123F3A]/50">
                      Category
                    </p>
                    <p className="mt-1 font-semibold">
                      {activeGadget.deviceType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#123F3A]/50">
                      Manufacturer
                    </p>
                    <p className="mt-1 font-semibold">{activeGadget.maker}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#123F3A]/50">
                      Tech Brand
                    </p>
                    <p className="mt-1 font-semibold">{activeGadget.brand}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#123F3A]/50">
                      Health Rating
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#F06A50]">
                      {activeGadget.healthScore}/100
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-[#123F3A]/25 bg-white/60 p-6 text-center text-sm text-[#123F3A]/60">
                Choose a gadget row to open its active profile.
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
