import { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-2 flex space-x-2  text-base sm:text-lg text-gray-500 dark:text-gray-400">
          <div>Forward</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400"></div>
      </div>
    </footer>
  );
};

export default Footer;
