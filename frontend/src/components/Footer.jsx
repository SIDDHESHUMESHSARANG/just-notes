import React from "react";
import { Mail, Instagram, Github } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <hr className="border border-base-300" />
      <footer className="flex md:flex-row flex-col gap-4 justify-between p-4 text-center">
        <h1
          className="md:text-2xl text-lg font-bold tracking-tighter
                 text-[#808080] leading-none"
        >
          Just Notes
        </h1>
        <p className="md:text-lg text-md text-[#808080]">
          &copy; {year} SIDDHESHUMESHSARANG
        </p>

        <div className="flex gap-10 justify-center">
          <i className="text-[#808080]">
            <Link to={"mailto:web.just.notes@gmail.com"} target="_blank">
              <Mail size={30} />
            </Link>
          </i>
          <i className="text-[#808080]">
            <Link to={"https://instagram.com/iamsid08"} target="_blank">
              <Instagram size={30} />
            </Link>
          </i>
          <i className="text-[#808080]">
            <Link
              to={"https://github.com/chmcs-siddheshumeshsarang/just-notes"}
              target="_blank"
            >
              <Github size={30} />
            </Link>
          </i>
          <p className="md:text-lg hidden md:flex gap-1 text-[#808080]">
            powered by {" "}
            <Link
              to={"https://cloudinary.com/"}
              className="hover:underline hover:text-secondary underline-offset-2"
              target="_blank"
            >
               cloudinary
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
