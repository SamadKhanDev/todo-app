"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/" },
  { name: "All Tasks", href: "/all-tasks" },
  { name: "Completed", href: "/completed" },
  { name: "Pending", href: "/pending" },
];

function Navbar() {
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      const saved = localStorage.getItem("todos");

      const todos = saved
        ? JSON.parse(saved)
        : [];

      const done = todos.filter(
        (t: any) => t.completed
      ).length;

      const pendingCount =
        todos.length - done;

      setCompleted(done);
      setPending(pendingCount);
    };

    updateCounts();

    window.addEventListener(
      "todo-update",
      updateCounts
    );

    return () =>
      window.removeEventListener(
        "todo-update",
        updateCounts
      );
  }, []);

  return (
    <Disclosure
      as="nav"
      className="bg-zinc-900 text-white border-b border-white/10"
    >

      <div className="flex h-16 items-center justify-between px-6">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">

          {/* LOGO */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/8476/8476676.png"
            alt="logo"
            className="h-10 w-10"
          />

          {/* DESKTOP MENU */}
          <div className="hidden sm:flex space-x-4">

            {navigation.map((item) => (

              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition"
              >
                {item.name}

                {item.name === "Completed" && (
                  <span className="ml-1 text-green-400">
                    ({completed})
                  </span>
                )}

                {item.name === "Pending" && (
                  <span className="ml-1 text-yellow-400">
                    ({pending})
                  </span>
                )}

              </Link>

            ))}

          </div>

        </div>

        {/* MOBILE BUTTON */}
        <div className="sm:hidden">

          <DisclosureButton className="p-2 rounded-md hover:bg-white/10">

            <Bars3Icon className="block h-6 w-6 ui-open:hidden" />

            <XMarkIcon className="hidden h-6 w-6 ui-open:block" />

          </DisclosureButton>

        </div>

      </div>

      {/* MOBILE MENU */}
      <DisclosurePanel className="sm:hidden px-4 pb-3 space-y-2">

        {navigation.map((item) => (

          <Link
            key={item.name}
            href={item.href}
            className="block rounded-md px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            {item.name}

            {item.name === "Completed" && (
              <span className="ml-2 text-green-400">
                ({completed})
              </span>
            )}

            {item.name === "Pending" && (
              <span className="ml-2 text-yellow-400">
                ({pending})
              </span>
            )}

          </Link>

        ))}

      </DisclosurePanel>

    </Disclosure>
  );
}

export default Navbar;