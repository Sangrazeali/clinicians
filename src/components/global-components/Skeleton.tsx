import {Skeleton as ReactSkeleton} from "@nextui-org/react";

export default function Skeleton() {
  return (
    <div className=" w-full flex items-center gap-3">
      <div>
        <ReactSkeleton className="flex rounded-full w-12 h-12"/>
      </div>  
      <div className="w-full flex flex-col gap-2">
        
        <ReactSkeleton className="h-3 w-4/5 rounded-lg"/>
      </div>
    </div>
  );
}