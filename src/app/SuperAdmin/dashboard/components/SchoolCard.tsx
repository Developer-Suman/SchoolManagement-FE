import { LocateIcon, Mail, Phone } from "lucide-react";

export default function SchoolInfoCard() {
  return (
    <div className="relative bg-gradient-to-r from-green-900 to-green-500 text-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">
        RELIANCE ENGLISH SECONDARY SCHOOL
        <span className="text-xs font-normal pl-2">(Estd 2065 BS)</span>
      </h2>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center">
          <LocateIcon className="mr-3" />
          Milkajung-7, Morang
        </div>
        <div className="flex items-center">
          <Mail className="mr-3" />
          RESS@gmail.com
        </div>
        <div className="flex items-center">
          <Phone className="mr-3" />
          021-342324
        </div>
        <div className="hidden sm:block absolute md:top-20 md:left-110 lg:top-15 lg:left-260 sm:left-80 top-24 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            // src={logo}
            alt="School Logo"
            className="object-cover hidden sm:block"
            sizes="(max-width: 640px) 48px, (max-width: 768px) 96px, 96px"
          />
        </div>
      </div>
    </div>
  );
}
