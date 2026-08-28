import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import "./App.css";

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

  const gadgetTable = useReactTable({
    data: gadgets,
    columns: gadgetColumns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
    setPagination({
      pageIndex: Math.floor(gadgets.length / 3),
      pageSize: 3,
    });
    setDeviceName("");
    setDeviceType("");
    setMaker("");
    setHealthScore("");
    setBrand("");
    setRole("");
    setCurrentView("registry");
  };

  return (
    <>
      <h1>Tech Gadget & Inventory Hub</h1>

      {currentView === "form" ? (
        <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="deviceName">Gadget Name</label>
          <input
            id="deviceName"
            type="text"
            value={deviceName}
            onChange={(event) => {
              setDeviceName(event.target.value);
              checkDeviceName(event.target.value);
            }}
            required
            minLength={3}
          />
          {nameError && <p>{nameError}</p>}
        </div>

        <div>
          <label htmlFor="deviceType">Category</label>
          <select
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
          {typeError && <p>{typeError}</p>}
        </div>

        <div>
          <label htmlFor="maker">Manufacturer</label>
          <input
            id="maker"
            type="text"
            value={maker}
            onChange={(event) => {
              setMaker(event.target.value);
              checkMaker(event.target.value);
            }}
            required
          />
          {makerError && <p>{makerError}</p>}
        </div>

        <div>
          <label htmlFor="healthScore">Health Rating</label>
          <input
            id="healthScore"
            type="number"
            value={healthScore}
            onChange={(event) => {
              setHealthScore(event.target.value);
              checkHealthScore(event.target.value);
            }}
            required
            min={1}
            max={100}
          />
          {scoreError && <p>{scoreError}</p>}
        </div>

        <div>
          <label htmlFor="brand">Tech Brand Name</label>
          <input
            id="brand"
            type="text"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
              checkBrand(event.target.value);
            }}
            required
          />
          {brandError && <p>{brandError}</p>}
        </div>

        <div>
          <p>User Role</p>

          <label>
            <input
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

          <label>
            <input
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

          {roleError && <p>{roleError}</p>}
        </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Gadget Registry</h2>

          <button type="button" onClick={() => setCurrentView("form")}>
            Add Another Gadget
          </button>

          <table>
            <thead>
              {gadgetTable.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
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
              {gadgetTable.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button
              type="button"
              onClick={() => gadgetTable.previousPage()}
              disabled={!gadgetTable.getCanPreviousPage()}
            >
              Previous
            </button>

            <p>
              Page {gadgetTable.getState().pagination.pageIndex + 1} of{" "}
              {gadgetTable.getPageCount()}
            </p>

            <button
              type="button"
              onClick={() => gadgetTable.nextPage()}
              disabled={!gadgetTable.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
