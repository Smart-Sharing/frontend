import React from "react";
import { MachineState } from "./types";

export interface IMachineInfo {
  id: string;
  state: MachineState;
  voltage: number;
  ipAddr: string;
}

interface MachineInfoProps {
  info: IMachineInfo;
}

const MachineInfo: React.FC<MachineInfoProps> = ({ info }) => {
  return (
    <>
      <h2 className="mb-2 text-center text-xl font-semibold text-gray-900 dark:text-white">
        Машина:{" "}
        <span className="inline-block bg-gray-600 px-2.5 py-1 rounded">
          {info.id}
        </span>
      </h2>
      <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
        <div className="margin-auto items-center py-3">
          <div className="flex flex-row justify-center text-center font-semibold">
            {info?.state === 0 ? (
              <td className="px-6 py-4 flex flex-row gap-2 items-center text-green-600">
                <div className="circle bg-green-600"></div>
                <div>Свободна</div>
              </td>
            ) : (
              <td className="px-6 py-4 flex flex-row gap-2 items-center text-red-400">
                <div className="circle bg-red-400"></div>
                <div>В использовании</div>
              </td>
            )}
          </div>
        </div>
      </dl>
    </>
  );
};

export default MachineInfo;
