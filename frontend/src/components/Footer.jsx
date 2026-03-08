import React from "react";
import { Mail, Instagram, Github } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div>
      <hr className="border-base-300" />
      <footer className="flex md:flex-row flex-col gap-4 justify-between p-4 md:p-6 text-center">
        <h1 className="md:text-2xl text-lg font-bold tracking-tight text-base-content leading-none">
          Just Notes
        </h1>
        <p className="md:text-lg text-md text-base-content/70">
          &copy; {year} Siddhesh Umesh Sarang
        </p>

        <div className="flex gap-10 justify-center">
          <Link
            to={"mailto:web.just.notes@gmail.com"}
            target="_blank"
            className="text-base-content/70 hover:text-primary transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={30} />
          </Link>
          <Link
            to={"https://instagram.com/iamsid08"}
            target="_blank"
            className="text-base-content/70 hover:text-primary transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram size={30} />
          </Link>
          <Link
            to={"https://github.com/chmcs-siddheshumeshsarang/just-notes"}
            target="_blank"
            className="text-base-content/70 hover:text-primary transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={30} />
          </Link>
          <p className="md:text-lg hidden md:flex gap-1 text-base-content/70">
            powered by{" "}
            <Link
              to={"https://cloudinary.com/"}
              className="hover:text-primary hover:underline underline-offset-2 transition-colors duration-200"
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
