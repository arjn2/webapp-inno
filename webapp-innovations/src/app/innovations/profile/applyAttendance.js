"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ApplyAttendance() {
    const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [participationTypes, setParticipationTypes] = useState([]);
  const [selectedParticipation, setSelectedParticipation] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2);
  const [total, setTotal] = useState(0);
  // const [selectedDate, setSelectedDate] = useState('');
  const [date, setDate] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchAllActivities() {
        let allActivities = [];
        let currentPage = 1;
        let totalPages;

        try {
            while (true) {
              
              const response = await fetch("/api/fetch/activities", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ page: currentPage, pageSize }),
              });
              
    
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
    
              const data = await response.json();
              
              allActivities = [...allActivities, ...data.activities];
              setTotal(data.total);
    
              totalPages = Math.ceil(data.total / pageSize);
              if (currentPage >= totalPages) break;
    
              currentPage++;
            }
    
            setActivities(allActivities);
            
          } catch (error) {
            console.error("Error fetching activities:", error);
          } finally {
            setLoading(false);
          }
        }

        fetchAllActivities();

        async function fetchParticipationTypes() {
            try {
              const response = await fetch("api/fetch/participationType", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              
              const data = await response.json();
              
              if (data && Array.isArray(data.participationType)) {
                setParticipationTypes(data.participationType);
                
              } else {
                console.error("Unexpected data structure:", data);
              }
            } catch (error) {
              console.error("Error fetching participation types:", error);
            }
          }
          fetchParticipationTypes();
  
  }, [pageSize]);


    const handleActivityChange = (event) => {
        const selectedActivityId = parseInt(event.target.value, 10);
        setSelectedActivity(selectedActivityId);
      
        const selectedActivity = activities.find(
          (activity) => activity.id === selectedActivityId
        );
        // console.log("Activity Selected:", selectedActivity);
      
        if (selectedActivity) {
        //   console.log("participationType List", participationTypes);
          const selectedParticipationTypes = participationTypes.filter(
            (participationType) =>
              participationType.activity_id === selectedActivity.id
          );
          setParticipationTypes(selectedParticipationTypes);
        //   console.log("Selected Participation Types:", selectedParticipationTypes);
      
          const dateString = selectedActivity.activity_datetime;
        //   console.log(dateString);
      
          const formatDate = (dateString) => {
            const date = new Date(dateString);
      
            // Check if the date is valid
            if (isNaN(date.getTime())) {
              console.error("Invalid date string:", dateString);
              return null; // Return an empty string or handle it as needed
            }
      
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
      
            return `${day}-${month}-${year}`;
          };
      
          const formattedDate = formatDate(dateString);
        //   console.log("Formatted Date:", formattedDate);
        }
      };

    const handleParticipationChange = (event) => {
        setSelectedParticipation(event.target.value);
      };

    //   handleSubmit

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!session) {
      console.error("User is not authenticated");
      return;
    }

    // console.log("-------------------");
    // console.log(session);

    const userEmail = session.user.email;
    // console.log(userEmail);

    try {
      const response = await fetch("/api/attendance/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          activityId: selectedActivity,
          participationType: selectedParticipation,
          date,
        }),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Attendance applied successfully");
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("Error applying attendance:", errorData);
      }
    } catch (error) {
      console.error("Error applying attendance:", error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
            Apply Attendance
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl h-[500px]">
          <DialogHeader>
            <DialogTitle>Attendance Application</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid flex-1 gap-2">
              <label htmlFor="activity-dropdown">Event/Activity:</label>
              <select
                id="activity-dropdown"
                value={selectedActivity}
                onChange={handleActivityChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option key={0} value="">Select an activity</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {`${activity.id}-${activity.name}`}
                  </option>
                ))}
              </select>
              <label htmlFor="participation-dropdown">
                Type of Participation:
              </label>
              <select
                id="participation-dropdown"
                value={selectedParticipation}
                onChange={handleParticipationChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option key={0} value="">Select a participation type</option>
                {Array.isArray(participationTypes) &&
                  participationTypes.map((type) => (
                    <option key={type.id} value={type.type}>
                      {type.type}
                    </option>
                  ))}
              </select>
              <label htmlFor="date-input">Date:</label>
              <input
                type="date"
                id="date-input"
                value={date}
                onChange={(e) => setDate(e.target.value)} // Allow user to change the date if needed
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <Button
              type="submit"
              className="mt-4 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
            >
              Apply
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
