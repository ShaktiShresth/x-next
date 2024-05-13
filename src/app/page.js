import Feed from "@/components/Feed";
import Input from "@/components/Input";
import SessionButtonsXs from "@/components/SessionButtonsXs";
import { HiHome } from "react-icons/hi";

const page = () => {
  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen">
      <div className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 bg-opacity-90">
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">
            <div className="flex items-center gap-1">
              <HiHome className="size-6 sm:size-7 sm:hidden" />
              Home
            </div>
          </h2>
          <SessionButtonsXs className="size-7" />
        </div>
      </div>
      <Input />
      <Feed />
    </div>
  );
};

export default page;
