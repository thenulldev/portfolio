import React from "react";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faCertificate, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Socials: React.FC = () => {
  const socials = [
    {
      link: "https://github.com/snipey",
      icon: faGithub,
      name: "GitHub",
      color: "hover:text-slate-800 dark:hover:text-slate-200",
    },
    {
      link: "https://linkedin.com/in/stephenfdev",
      icon: faLinkedin,
      name: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      link: "https://www.credly.com/users/stephen-freerking",
      icon: faCertificate,
      name: "Credly",
      color: "hover:text-orange-600 dark:hover:text-orange-400",
    },
    {
      link: "https://tryhackme.com/p/ThatNullDev",
      icon: faShieldHalved,
      name: "TryHackMe",
      color: "hover:text-red-600 dark:hover:text-red-400",
    },
  ];

  return (
    <div className="flex justify-center md:justify-start gap-6 w-full">
      {socials.map((social, index) => (
        <Link 
          key={index} 
          href={social.link}
          target="_blank"
          rel="me noopener noreferrer"
          className="group"
          aria-label={`Visit ${social.name}`}
        >
          <div className={`
            p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 
            dark:from-slate-700 dark:to-slate-800 
            border border-slate-300 dark:border-slate-600
            text-slate-600 dark:text-slate-400
            hover:shadow-lg hover:scale-105 hover:border-sky-300 dark:hover:border-sky-500
            transition-all duration-300 ease-in-out
            ${social.color}
          `}>
            <FontAwesomeIcon 
              icon={social.icon} 
              size="lg" 
              className="transition-colors duration-300"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
