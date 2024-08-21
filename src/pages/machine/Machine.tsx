import React, { useState, useEffect } from "react";
import MachineInfo, {
  IMachineInfo,
} from "../../components/machines/MachineInfo";
import ControlButtons from "../../components/machines/ControlButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MachineState } from "../../components/machines/types";

import Cookies from "js-cookie";
import axios from "axios";

const Machine: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const machineId = searchParams.get("id");

  const [info, setInfo] = useState<IMachineInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = Cookies.get("authToken");

  useEffect(() => {
    console.log("machine info fetching");
    const fetchMachineInfo = async () => {
      try {
        if (!token) {
          navigate("/login");
        }

        const response = await axios.get(
          `http://91.236.197.212:8080/get_machine?machine_id=${machineId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response", response);
        setInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch machines data");
        console.log(err);
        setLoading(false);
      }
    };

    fetchMachineInfo();
  }, [navigate, loading, machineId, token]);

  const sendUnlockMachine = async (machineId: string) => {
    try {
      const url = "http://91.236.197.212:8080/unlock_machine"; // Replace with your API endpoint
      const data = {
        machine_id: machineId,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Example for an authorization token
      };

      const response = await axios.post(url, data, { headers });
      console.log(response);
      console.log(info);

      if (info !== null) {
        info.state = MachineState.InUse;
        setInfo(info);
      }
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const sendLockMachine = async (machineId: string) => {
    try {
      const url = "http://91.236.197.212:8080/lock_machine"; // Replace with your API endpoint
      const data = {
        machine_id: machineId,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Example for an authorization token
      };

      const response = await axios.post(url, data, { headers });
      console.log(response);

      if (info !== null) {
        info.state = MachineState.Free;
        setInfo(info);
      }
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStart = () => {
    if (!machineId) {
      return <p className="text-center text-gray-500">Wrong machine 'id'</p>;
    }
    sendUnlockMachine(machineId);
  };

  const handleStop = () => {
    // some logic
  };

  const handleFinish = () => {
    if (!machineId) {
      return <p className="text-center text-gray-500">Wrong machine 'id'</p>;
    }
    sendLockMachine(machineId);
  };

  if (token === undefined) {
    navigate("/login");
    return;
  }

  if (!machineId) {
    return <p>Machine Id is incorrect</p>;
  }

  if (loading || info === null) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <MachineInfo info={info} />
        <ControlButtons
          machineState={info?.state}
          onStart={handleStart}
          onStop={handleStop}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
};

export default Machine;
