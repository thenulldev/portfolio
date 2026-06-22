import React from "react";
import {
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faCertificate, faShieldHalved, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Socials: React.FC = () => {
  const socials = [
    {
      link: "https://github.com/Snipey",
      icon: faGithub,
      name: "GitHub",
      color: "hover:text-slate-800 dark:hover:text-slate-200",
    },
    {
      link: "https://www.linkedin.com/in/thatnulldev/",
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
    {
      link: "https://profile.hackthebox.com/profile/019c5ac7-7d6d-73ea-9476-7a01f4f679fb",
      icon: faTerminal,
      name: "Hack The Box",
      color: "hover:text-green-600 dark:hover:text-green-400",
    },
  ];

  return (
    <div className="flex justify-center flex-wrap gap-3 w-full">
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
            p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 
            dark:from-slate-700 dark:to-slate-800 
            border border-slate-300 dark:border-slate-600
            text-slate-600 dark:text-slate-400
            hover:shadow-lg hover:scale-105 hover:border-sky-300 dark:hover:border-sky-500
            transition-all duration-300 ease-in-out
            ${social.color}
          `}>
            <FontAwesomeIcon 
              icon={social.icon} 
              className="w-5 h-5 transition-colors duration-300"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
