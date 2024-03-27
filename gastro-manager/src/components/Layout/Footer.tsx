import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faInstagram, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <div className="container p-4 mx-auto flex items-center sm:flex-row flex-col bg-bronze-200">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <img src="/images/transparent-logo.png" alt="logo" className="w-16" />
      </a>

      <p className="text-sm text-bronze-950 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-bronze-600 sm:py-2 sm:mt-0 mt-4">
        © 2020 GastroManager
      </p>

      <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-bronze-950">
        <a>
          <FontAwesomeIcon icon={faSquareFacebook} className="w-5 h-5" />
        </a>

        <a className="ml-3">
            <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
        </a>

        <a className="ml-3">
            <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
        </a>
        <a className="ml-3">
            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
        </a>
      </span>
    </div>
  );
};
