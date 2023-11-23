import React, { useRef, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

const MenuDropDown = ({ setOpen, loading, matchRoute, subLinks }) => {
  const [catalogDropDown, setCatalogDropDown] = useState(false);
  const ref = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div
      className="absolute text-white bg-richblack-800 rounded-lg right-4 pb-3 z-[999] w-[200px] md:hidden"
      ref={ref}
    >
      <ul className="flex flex-col items-center text-richblack-25 ">
        {NavbarLinks.map((link, index) => (
          <li key={index}>
            {link.title === "Catalog" ? (
              <>
                <div
                  className={`group relative flex flex-col cursor-pointer pt-3 ${
                    matchRoute("/catalog/:catalogName")
                      ? "text-yellow-25"
                      : "text-richblack-25"
                  }`}
                >
                  <div
                    className="flex gap-x-2 items-center pb-2 pl-3"
                    onClick={() => setCatalogDropDown(!catalogDropDown)}
                  >
                    <p>{link.title}</p>
                    {catalogDropDown ? <BsChevronUp /> : <BsChevronDown />}
                  </div>
                  {catalogDropDown && (
                    <>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className={`rounded-lg bg-transparent py-2 pl-10 text-richblack-25 ${
                                  matchRoute(
                                    `/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`
                                  ) && "text-yellow-25"
                                } hover:bg-richblack-50 hover:text-richblack-900`}
                                key={i}
                                onClick={() => setOpen(false)}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </>
                  )}
                </div>

                <div className="h-[1px] w-[200px] bg-richblack-50"></div>
              </>
            ) : (
              <Link to={link?.path}>
                <p
                  className={`${
                    matchRoute(link?.path)
                      ? "text-yellow-25"
                      : "text-richblack-25"
                  } p-3`}
                  onClick={() => setOpen(false)}
                >
                  {link.title}
                </p>
                <div className="h-[1px] w-[200px] bg-richblack-50"></div>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="items-center flex flex-col text-richblack-25">
        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
          <Link
            to="/dashboard/cart"
            className={`relative self-start pl-3 py-3 w-full ${
              matchRoute("/dashboard/cart")
                ? "text-yellow-25"
                : "text-richblack-25"
            }`}
            onClick={() => setOpen(false)}
          >
            Cart
          </Link>
        )}
        {token === null && (
          <Link to="/login">
            <button
              className="text-richblack-100 p-2 w-[200px] hover:bg-richblack-50 hover:text-richblack-900"
              onClick={() => setOpen(false)}
            >
              Log in
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button
              className="text-richblack-100 p-2 w-[200px] hover:bg-richblack-50 hover:text-richblack-900"
              onClick={() => setOpen(false)}
            >
              Sign up
            </button>
          </Link>
        )}
        {token !== null && <ProfileDropdown setmainDropMenu={setOpen} />}
      </div>
    </div>
  );
};

export default MenuDropDown;
