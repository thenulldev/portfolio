import React from "react";
import {
  faGithub,
  faLinkedin,
  faMastodon,
  faTwitter,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Socials: React.FC = () => {
  const socials = [
    {
      link: "https://github.com/snipey",
      icon: faGithub,
    },
    {
      link: "https://linkedin.com/in/stephenfdev",
      icon: faLinkedin,
    },
    {
      link: "https://twitter.com/snipeydev",
      icon: faXTwitter,
    },
    {
      link: "https://fosstodon.org/@StephenDev",
      icon: faMastodon,
    },
    {
      link: "https://www.credly.com/users/stephen-freerking",
      icon: faCertificate,
    },
  ];

  return (
    <div className="flex justify-between w-1/2 social">
      {socials.map((social, index) => (
        <Link rel="me" key={index} href={social.link}>
          <div className="hover:text-sky-500 dark:hover:text-sky-400 text-slate-900">
            <FontAwesomeIcon icon={social.icon} size="2x" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Socials;
